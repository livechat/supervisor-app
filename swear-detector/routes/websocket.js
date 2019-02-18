const WebSocket = require('ws');

const generateID = function() {
  return Math.random().toString(36)
};

const swearWords = [
  'fuck', 'bitch', 'asshole', 'holy shit', 'motherfucker', 'nigga',
  'crap', 'shit', 'twat' , 'son of a bitch', 'son of a whore', 'cunt'
];

const parameters = {};

const LiveChatWebsocket = {
  init: function () {
    this.cfg = {
      apiUrl: "wss://api.livechatinc.com/v3.0/agent/rtm/ws",
      accessToken: 'Bearer ' + '',
    };

    this.ChatID = null;
    this.PING = null;
    this.context = this;

    this.client = new WebSocket(this.cfg.apiUrl);
    this.client.onmessage = this.onMessage(this.context);
    this.client.onopen = this.onConnect(this.context);
    this.client.onclose = this.onDisconnect(this.context);
  },

  onMessage: function(context) {
    return function (d) {
      var msg = JSON.parse(d.data);
      context.ChatID = msg.payload && msg.payload.chat_id;

      //handle unsucceeded messages
      if (msg.success === false) {
        console.error(msg.payload.error);
        return
      }

      console.log("You have received message:", msg);

      if (msg.payload && msg.payload.event && msg.payload.event.text && msg.payload.event.type === 'message') {
        var words = msg.payload.event.text.split(" ");
        if (words.filter(word => swearWords.includes(word)).length > 0) {
          context.apiSendChatMessage(context, "Hey don't swear, please. We are nice people here 😉")
        }
      }

      // handle protocol responses
      switch (msg.action) {
        case "login":
          return context.onMessageLogin(msg);

        case "start_chat":
          return context.onMessageStartChat(context, msg);
      }
    };
  },

  sendMessage: function(context, name, payload) {
    // wrap protocol message data
    const protocolMessage = {
      action: name,
      request_id: generateID(), // id for match response
    };

    // add payload if exist
    if (payload) {
      protocolMessage.payload = payload
    }

    console.log("send:", protocolMessage);
    // emit via socket.io
    context.client.send(JSON.stringify(protocolMessage));
  },

  onMessageLogin: function(msg) {
    console.log("Your agent ID:", msg.payload.my_profile.id)
  },

  onMessageStartChat: function(context, msg) {
    console.log("start_chat payload:", msg.payload);
    context.apiSendChatMessage(msg.payload.chat.id)
  },

  apiSendLogin: function(context) {
    context.sendMessage(context,"login", {token: context.cfg.accessToken})
  },

  onConnect: function(context) {
    return function () {
      console.log("You are connected!");

      context.apiSendLogin(context);

      context.PING = setInterval(context.sendPing(context), 15000)
    };
  },

  sendPing: function(context) {
    return function() {
      context.sendMessage(context,"ping")
    }
  },

  onDisconnect: function (context) {
    return function () {
      console.log("You are disconnected!");

      if (context.PING) {
        clearInterval(context.PING);
        context.PING = null
      }
    }
  },

  apiSendChatMessage: function(context, message) {
    context.sendMessage(context,"send_event", {
      "chat_id": context.ChatID,
      "event": {
        "type": "message",
        "text": message
      }});
  }
};

module.exports = LiveChatWebsocket;
