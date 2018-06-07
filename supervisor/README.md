
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

## How to start?

In order to use this application in your LiveChat dashboard,

first of all you have to create your own app in [Developers Console](https://developers.livechatinc.com/console)
and get `Client Id`.

To do so:
1. Go to [apps](https://developers.livechatinc.com/console/apps)
2. Click **New App** and give it a name.
3. Go to **Develop** -> **Building Blocks**
4. Add `Authorizaton` and mark it as **Web App**
5. Your `Client Id` will be displayed there.
6. Go to `src/App/Config.js` in your project and replace `app_client_id` with your own `client id`.
7. That's all. Don't forget to add your app url to **Redirect URI whitelist**

## How it works?

[Agent App Widgets](https://docs.livechatinc.com/agent-app-widgets/) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App sidebar as you can see on pictures above.

To get information like tags and canned responses we need to use [LiveChat Rest Api](https://docs.livechatinc.com/rest-api/).

Rest Api requires you to include **access_token** in all requests in order to get information from our server. You can get it using [LiveChat Boilerplate](https://docs.livechatinc.com/boilerplate/) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).

You should also get familiar with [Authorization](https://docs.livechatinc.com/authorization/).

If you found any bugs, please create issue in this repo and I will try to fix is ASAP ;)
