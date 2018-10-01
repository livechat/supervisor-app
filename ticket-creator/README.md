## How to build  LiveChat widget with Netlify

Hello there,

today I want to show you easiest way to create simple widget for creating [Tickets](https://www.livechatinc.com/kb/support-tickets-in-livechat/) and how you can host in with Netlify in just few minutes.

Before we begin you can find full source code on [GitHub](https://github.com/livechat/sample-apps/tree/master/ticket-creator).

**Remember to change `client_id` with id of your widget**.

Our widget will look like this:
![Preview](https://raw.githubusercontent.com/livechat/sample-apps/master/ticket-creator/clips/peview.png)

### Creating Widget
1. Go to [developers console](https://developers.livechatinc.com/console/), open **Apps** tab, click **New App** and give it a name.

2.  Go to **Building blocks** section and create new **Authorization** block.
There you will find your `client_id` which you should save for later because we will need it in our widget.

3. Now it is time to build our widget. We will use *React* as our main tool.
4. We will install `livechat-widget-sdk` which is module that takes care of authorization and REST Api for our application.
5. Can can install this module using command:
```js
npm install -save livechat-widget-sdk
```
6. To start using our module import it in the root of your project:
```js
import LiveChat from 'livechat-widget-sdk';
```
7. Right now we must load our widget and get `access_token `so we can make REST Api calls:
```js
async componentDidMount() {  
  LiveChat.init({  
    client_id: 'your_client_id',  
  });  
  
  try {  
    const result = await LiveChat.getAccessToken();  
    this.setState({  
      accessToken: result.access_token,  
      agent: result.entity_id  
    });  
  } catch (e) {  
    this.setState({ accessToken: 'error' });  
    console.error(e);  
  }  
};
```
8.  After getting `access_token` and setting basic front-end as you can see in render() method in this [file](https://github.com/livechat/sample-apps/blob/master/ticket-creator/src/App.js#L82) we can set up method that will create ticket from input data.
9. Our `livechat-widget-sdk` comes with ready build in function for that. It looks like this:
```js
const result = await LiveChat.createTicket(accessToken, {  
   requester: {  
     mail: agent  
  },  
   subject,  
   message,  
 });
``` 
10. Rest of code you can find in this [repository](https://github.com/livechat/sample-apps/tree/master/ticket-creator).

### Hosting and creating Widget

Now when we have our application set up we need to host it in order to get URL address for our widget. 

Recently Netlify come up with amazing feature called "Drag and drop hosting".
It basically allows you to drag and drop your project on Netlify page and get your application hosted.

You can watch this short video (*48s*) to get all information you need:
https://www.youtube.com/watch?v=vywDFg2uIxY

Now with working URL of our application we can create widget block and set it up.

It is the same path as with Authorization Block but right now add **Widget Block** instead.

You must put your generated URL from Netlify under ``Widget source URL`` input field.

After accepting all changes you should be able to Installation tab and click **Install app** button.

### Congratulations
Log in to your LiveChat account, open sample chat, find your widget and create some tickets!








