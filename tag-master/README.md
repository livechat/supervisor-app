# Tag Master

Simple application that shows how to create Agent App Extension with use of LiveChat Rest Api.

Tag Master allows user to create, view and delete tags and canned responses in easy and predictable way.

You can read more about tags [here](https://www.livechatinc.com/kb/tagging-chats-and-tickets/) and about canned responses [here](https://www.livechatinc.com/kb/canned-responses/).

## Preview

![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/tag-master-preview1.png)

![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/tag-master-preview2.png)

## How it works?

Agent App Extensions are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App sidebar as you can see on pictures above.

You can find more information about use cases of Agent App Extensions [here](https://docs.livechatinc.com/agent-app-widgets/).

To get information like tags and canned responses we need to use [LiveChat Rest Api](https://docs.livechatinc.com/rest-api/).

Rest Api requires you to include **access_token** in all requests in order to get information from our server. You can get it using [LiveChat Boilerplate](https://docs.livechatinc.com/boilerplate/) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).

You can also read more about Authorization [here](https://docs.livechatinc.com/authorization/).





