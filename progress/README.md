#  Progress

Simple application that shows how to create Agent App Extension with use of LiveChat Rest Api.

Progress is a sample app that creates reports based on data from chats.

In widget you can find statistics about:

- **Ratings** ( per day, week, month, quarter, year)
- **Chatting times**  ( per day, week, month, quarter, year)
- [Response Time](https://docs.livechatinc.com/rest-api/#chats-first-response-time)  ( per day, week, month, quarter, year)


##  Preview


![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/progress_photo1.png)


![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/progress_photo2.png)


![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/progress_photo3.png)


##  How it works?

[Agent App Widgets](https://docs.livechatinc.com/agent-app-widgets/) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App sidebar as you can see on pictures above.

To get information like tags and canned responses we need to use [LiveChat Rest Api](https://docs.livechatinc.com/rest-api/).

Rest Api requires you to include **access_token** in all requests in order to get information from our server. You can get it using [LiveChat Boilerplate](https://docs.livechatinc.com/boilerplate/) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).


You should also get familiar with [Authorization](https://docs.livechatinc.com/authorization/).

If you found any bugs, please create issue in this repo and I will try to fix is ASAP ;)
