### Widget SDK

Basic flow:

```js
import LiveChat from 'livechat-widget-sdk';

// Agent app part
LiveChat.init({  
  client_id: 'application client id',  
});

// Authorization part
LiveChat.getAccessToken();

//Rest API part
LiveChat.getAllAgents();

```
