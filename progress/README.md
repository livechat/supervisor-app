![](https://i.ibb.co/Ks6jZc1/progress-icon.png)

# Progress

**Progress** is a simple app that creates reports based on data from chats. It can display the daily, weekly, monthly, and annual statistics.

It shows the following information:

- **Ratings**
- **Chatting time**
- [Response Time](https://docs.livechatinc.com/rest-api/#chats-first-response-time)

# Preview

![Alt Text](https://i.ibb.co/k6XdhJ9/progress.png)

# App setup

## Before you start

To use this application in your LiveChat dashboard, you'll need to create your own app in [Developers Console](https://developers.livechatinc.com/console) and get your **Client Id**.

## Getting started

1. Go to [Apps](https://developers.livechatinc.com/console/apps) in [Developers Console](https://developers.livechatinc.com/console).
2. Click **New App** and give it an **App Name**.
3. Select _Agent App Widget_ as the **App Template**.
4. Go to **Develop -> Building Blocks**.
5. Add **App Authorization** and mark it as _JavaScript App_. Your **Client Id** will be displayed there.
6. Add `reports_read` scope to the **App scopes and API access** box.
7. Fetch the **Progress** app repository.
8. In the app directory, do the following steps :

   - Install dependencies (`npm install`).
   - In your project, go to `src/utils/congif.js` and replace `client_id` with your own **Client Id** (the one from **Step 5**).
   - Run your app (`npm start`).

9. Add your app url (for example: `https://localhost:3000`) in these two locations:

   - **Redirect URI whitelist**
   - **Agent App Widgets**

10. In **Private installation**, click **Install app**.

You should now be able to use **Progress** with LiveChat.

# How it works

[Agent App Widgets](https://docs.livechatinc.com/agent-app-widgets/) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App right sidebar.

To get information such as **chat ratings** and **chat response time**, you need to use [Reports API](https://developers.livechat.com/docs/data-reporting/reports-api).

In order to pull data from our server, Rest API requires you to include an **access_token** in all the requests. You can get it using [Personal Access Tokens](https://developers.livechat.com/docs/authorization/agent-authorization#personal-access-tokens) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).

You should also get familiar with [Authorization](https://docs.livechatinc.com/authorization/).

# Feedback

If you find some bugs, please create an issue in this repo. We will try to fix is ASAP ;)

# If you're new to LiveChat

**LiveChat** is an online customer service software with live support, help desk software, and web analytics capabilities. It's used by more than 27,000 companies all over the world. For more info, check out [LiveChat for Developers](https://developers.livechatinc.com/).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
