# Widget SDK

### Main idea:

![Idea](https://raw.githubusercontent.com/livechat/sample-apps/master/widget-sdk/widget-sdk-idea.png)

### Basic flow:

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

### Scopes problem

Make sure to check scopes you need for your applicaton in **Developers Console**.

You can get `401` HTTP error.

```js
error: 'insufficient scope for this resource'
```

![Scopes](https://raw.githubusercontent.com/livechat/sample-apps/master/widget-sdk/scopes.png)

### Instalation

```js
npm install -save livechat-widget-sdk
```
