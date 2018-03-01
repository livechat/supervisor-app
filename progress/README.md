
# Supervisor

Simple widget for helping you to monitor weekly progress of your agents and also their availability.

Supervisor allows you to monitor list of available agents and also show their basic statistics from last week like:

- **Working hours** this week
- **Chatting** time this week
- **Chat ratings** from this week



## Preview

![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/supervisor1.png)
![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/supervisor3.png)
![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/supervisor2.png)
## How it works?

[Agent App Widgets](https://docs.livechatinc.com/agent-app-widgets/) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App sidebar as you can see on pictures above.

To get information like tags and canned responses we need to use [LiveChat Rest Api](https://docs.livechatinc.com/rest-api/).

Rest Api requires you to include **access_token** in all requests in order to get information from our server. You can get it using [LiveChat Boilerplate](https://docs.livechatinc.com/boilerplate/) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).

You should also get familiar with [Authorization](https://docs.livechatinc.com/authorization/).

If you found any bugs, please create issue in this repo and I will try to fix is ASAP ;)
