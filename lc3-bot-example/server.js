// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const axios = require("axios");

const serverUrl =
  "https://us-central1-livechat-experiments.cloudfunctions.net/restApi/proxy-lc3";
const clientId = "85b59a376cb6f9ded39c878f1355031e";
const clientSecret = "66a4be2fd3a25afd1d3003a8e9a15bc7";

function generateID() {
  return Math.random().toString(36);
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.post("/token", function(req, res) {
  const code = req.body.code;
  const redirectUri = req.body.redirect_uri;

  if (code && redirectUri) {
    axios
      .post(
        `https://accounts.livechatinc.com/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`
      )
      .then(function(response) {
        res.send(response.data);
      })
      .catch(function(error) {
        res.send(error.status);
      });
  } else {
    res.send(403);
  }
});

app.post("/webhook", function(req, res) {
  const secret = JSON.parse(req.body.secret_key);
  const accessToken = secret.token;
  const action = req.body.action;
  
  if (accessToken && action) {
    if (action === "incoming_chat_thread") {
      const chatId = req.body.data.chat.id;

      axios
        .post(
          serverUrl + "/agent/action/send_event",
          {
            action: "send_event",
            request_id: generateID(),
            "author_id": secret.botId,
            payload: {
              chat_id: chatId,
              event: {
                type: "message",
                recipients: "all",
                text: "Just quick remark. I am just a bot so if I don't do my job right. You can transfer to real agent anytime ;)"
              }
            }
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        .then(function() {
          res.send(200);
        })
        .catch(function(error) {
          res.send(error.status);
        });
    } else if (action === "incoming_event") {
      const event_type = req.body.data.event.type;
      const author_id = req.body.data.event.author_id;
      const chatId = req.body.data.chat_id;

      if (event_type === "message" && author_id !== secret.botId) {
        axios
          .post(
            serverUrl + "/agent/action/send_event",
            {
              action: "send_event",
              request_id: generateID(),
              "author_id": secret.botId,
              payload: {
                chat_id: chatId,
                event: {
                  type: "message",
                  recipients: "all",
                  text: "Beep boop. I'm a bot"
                }
              }
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
          .then(function(response) {
            res.send(200);
          })
          .catch(function(error) {
            res.send(error.status);
          });
      } else {
        res.send(200);
      }
    } else {
      res.send(404);
    }
  } else {
    res.send(403);
  }
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
