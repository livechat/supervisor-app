// server.js
// where your node app starts

// init project
const express = require('express');
const axios = require('axios');
const app = express();
const serverUrl = "https://us-central1-livechat-experiments.cloudfunctions.net/restApi/proxy-lc3";

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.json());

function generateID() {
  return Math.random().toString(36)
}

app.get('/webhook', function(request, response) {
  response.send('Ok');
})
         
app.post('/webhook', function(request, response) {
  const token = request.body.secret_key;
  const chatId = request.body.data.chat_id;
  const event_type = request.body.data.event.type;
  const text = request.body.data.event.text;
  
  if (token && chatId && event_type === 'message' && text === "What time is it?") {
    axios.post(serverUrl + '/agent/action/send_event', {
          "action": "send_event",
          "request_id": generateID(),
          "payload": {
            "chat_id": chatId,
            "event": {
              "type": "message",
              "recipients": "agents",
              "text": "Current time is: " + new Date().toLocaleString()
            }
          }
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(function (response) {
          response.send(200);
        })
          .catch(function (error) {
            response.send(error);
          })
  } else {
    response.send(403);
  }  
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
