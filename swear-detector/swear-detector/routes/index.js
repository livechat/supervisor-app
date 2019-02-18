var express = require('express');
var router = express.Router();
const path = require('path');
var LiveChatWebsocket = require('./websocket');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../index.html'))
});

router.get('/server', function(req, res) {
  const webSocket = Object.assign({}, LiveChatWebsocket);
  webSocket.init();
  res.send(200);
});

module.exports = router;
