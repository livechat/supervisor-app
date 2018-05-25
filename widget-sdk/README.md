# Widget SDK

### Main idea:

![Idea](https://raw.githubusercontent.com/livechat/sample-apps/master/widget-sdk/widget-sdk-idea.png)

### Basic flow:

#### Installation:
Using npm:
```js
npm install -save livechat-widget-sdk
```
Using cdn:
```js
<script src="to be..."></script>
```

#### Usage

```js
import LiveChat from 'livechat-widget-sdk';

// if installed using cdn:
var LiveChat = window.widgetSDK;

// Agent app part
LiveChat.init({  
  client_id: 'app_client_id',  
});

// Authorization part
LiveChat.getAccessToken()

//Rest API part
LiveChat.getAllAgents(accessToken)
```

### Documents to read before start
[LiveChat Rest API](https://docs.livechatinc.com/rest-api/), 
[Agent App  Widgets](https://docs.livechatinc.com/agent-app-widgets/),
[Authorization](https://docs.livechatinc.com/authorization/)

### Getting `access_token`

```js
LiveChat.getAccessToken()  
  .then(data => {  
    const accessToken = data.access_token;  
  })  
  .catch(error => console.error(error));
```


### Available methods
#### Basic methods
|Name| Params | Note|
|---|---|---|
| init | object: { client_id } | Initialisation method that must be called first. It will let the Agent App know when to hide the spinning loader.|
| putMessage | string: message| It appends given message at the end of current conversation input window or into ticket window. Agent has to confirm sending this message. |
| getAccessToken | none | Return promise with `access_token` for current user |
| openAuthorizationPopup | none | Opens window, where user can log in to LiveChat account. |

#### REST methods
You can use all REST methods like seen in [docs](https://docs.livechatinc.com/rest-api/).

**Examples:**
```js
// getting list of all agents
LiveChat.getAllAgents(this.state.accessToken)  
  .then(agents => console.warn(agents.data) )  
  .catch(error => console.error(error) )
  
// get chat ratings from date
LiveChat.getChatsRating(this.state.accessToken, {  
  date_from: '2018-05-11',  
})  
  .then(ratings => console.warn(ratings) )  
  .catch(error => console.error(error) )
```


|Name| Link |
|---|---|
| getAllAgents | https://docs.livechatinc.com/rest-api/#list-all-agents |
| getSingleAgent | https://docs.livechatinc.com/rest-api/#get-a-single-agent-details |
| getChats | https://docs.livechatinc.com/rest-api/#get-list-of-chats |
| getSingleChat | https://docs.livechatinc.com/rest-api/#get-single-chat |
| getCannedResponses | https://docs.livechatinc.com/rest-api/#list-all-canned-responses |
| getSingleCannedResponse | https://docs.livechatinc.com/rest-api/#get-a-single-canned-response |
| getGreetings | https://docs.livechatinc.com/rest-api/#list-all-greetings |
| getSingleGreeting | https://docs.livechatinc.com/rest-api/#get-a-single-greeting |
| getAllGroups | https://docs.livechatinc.com/rest-api/#list-all-groups |
| getSingleGroup | https://docs.livechatinc.com/rest-api/#get-a-single-group-details |
| getTags | https://docs.livechatinc.com/rest-api/#list-all-tags |
| getTickets | https://docs.livechatinc.com/rest-api/#get-list-of-tickets |
| getSingleTicket | https://docs.livechatinc.com/rest-api/#get-single-ticket |
| getChatsCount | https://docs.livechatinc.com/rest-api/#total-chats |
| getChatEngagement | https://docs.livechatinc.com/rest-api/#chat-engagement |
| getChatsRating | https://docs.livechatinc.com/rest-api/#chat-ratings-report |
| getChatsRanking | https://docs.livechatinc.com/rest-api/#chat-ranking |
| getQueuedVisitors | https://docs.livechatinc.com/rest-api/#queued-visitors |
| getQueueWaitingTimes | https://docs.livechatinc.com/rest-api/#queue-waiting-times |
| getAgentsAvailability | https://docs.livechatinc.com/rest-api/#availability |
| getAgentChattingTime | https://docs.livechatinc.com/rest-api/#chatting-time |
| getChatsResponseTime | https://docs.livechatinc.com/rest-api/#chats-response-time |
| getNewTickets | https://docs.livechatinc.com/rest-api/#new-tickets |
| getTicketRatingReport | https://docs.livechatinc.com/rest-api/#ticket-ratings-report |



### Init and receive customer profile
You can get **current user data** by setting `customer_profile` listener:

```js
LiveChat.on("customer_profile", function( data ) {
	console.log( data )
})
```

### Scopes problem

Make sure to check scopes you need for your applicaton in **Developers Console**.

You can get `401` HTTP error.

```js
error: 'insufficient scope for this resource'
```

![Scopes](https://raw.githubusercontent.com/livechat/sample-apps/master/widget-sdk/scopes.png)

