# Feature request

Feature request is a simple widget you can put on your site, that will take information from your clients about features they would like to see on your website.

Widget is using [LiveChat Visitor SDK](https://docs.livechatinc.com/visitor-sdk/) for sending data to your LiveChat account.

Data is sent in form of [Tickets](https://www.livechatinc.com/kb/support-tickets-in-livechat/).
### Demo

You can play with all our widgets in this site:
https://livechat-widgets.firebaseapp.com/

### Instalation
Install module and import it in your project

```js
npm i -s livechat-feature-request

render() {  
  return (
	  <FeatureRequest license={your_livechat_license_id}/>
  )
}
```

### How it works

Widget is simply taking all input data from your client and send it in form of ticket.
Below showing code of how we can use `livechat-visitor-sdk` to send tickets.
```js
import * as LivechatVisitorSDK from '@livechat/livechat-visitor-sdk';

sendFeatureRequest = (email, description) => {  
  this.visitorSDK  
  .sendTicketForm({  
      name: 'Feature request',  
      email,  
      subject: 'Sent From Feature Request Widget',  
      message: description,  
    })  
    .then(() => console.warn('Ticket sent'))  
};
```

