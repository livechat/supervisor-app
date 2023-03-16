![](https://i.ibb.co/J5CxbdT/supervisor-icon.png)

# Supervisor

**Supervisor** is a simple widget helping you monitor the weekly progress of your agents and their availability. With **Supervisor**, you can check the list of available agents. Also, it shows the agents' basic statistics from the last 10 days. 

The statistics include the following information:

- **Agent working time** 
- **Chatting time** 
- **Agent ratings** 


## Preview

![Alt Text](https://i.ibb.co/rfnHsTz/supervisor.png)

# App setup

## Before you start

To use this application in your LiveChat dashboard, you'll need to create your own app in [Developers Console](https://developers.livechatinc.com/console) and get the **Client Id**.

## Getting started

1. Go to [Apps](https://developers.livechatinc.com/console/apps) in [Developers Console](https://developers.livechatinc.com/console).
2. Click **New App** and give it an **App Name**.
3. Select *Agent App Widget* as the **App Template**.
4. Go to **Develop -> Building Blocks**.
5. Add **App Authorization** and mark it as *JavaScript App*. Your **Client Id** will be displayed there.
6. Fetch the **Supoervisor** app repository.
7. In the app directory, do the following steps :

    * Install dependencies (`npm install`).
    * In your project, go to `src/utils/congif.js` and replace `client_id` with your own **Client Id** (the one from **Step 5**).
    * Run your app (`npm start`).
8. Add your app url (for example: `https://localhost:3000`) in these two locations:

    * **Redirect URI whitelist**
    * **Agent App Widgets**
9. In **Private installation**, click **Install app**. 

You should now be able to use **Supervisor** with LiveChat.

# How it works

[Agent App Widgets](https://docs.livechatinc.com/agent-app-widgets/) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App sidebar.

To get information such as tags and canned responses, you need to use [LiveChat Rest API](https://docs.livechatinc.com/rest-api/).

In order to pull data from our server, Rest API requires you to include an **access_token** in all the requests. You can get it using [LiveChat Boilerplate](https://docs.livechatinc.com/boilerplate/) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).

You should also get familiar with [Authorization](https://docs.livechatinc.com/authorization/).

# More sample apps 
Experiment more with two different sample apps:
 - [Tag Master](https://github.com/livechat/tag-master) - widget for helping your agents manage tags and canned responses.
 - [Progress](https://github.com/livechat/progress-app) - widget for helping you monitor statistics of your team, such as chat ratings, response times, and chatting times.

# Feedback
If you find some bugs, please create an issue in this repo. We will try to fix is ASAP ;)

# If you're new to LiveChat

**LiveChat** is an online customer service software with live support, help desk software, and web analytics capabilities. It's used by more than 27,000 companies all over the world. For more info, check out [LiveChat for Developers](https://developers.livechatinc.com/).

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
