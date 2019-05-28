![](https://i.ibb.co/4mQ3f7G/tag-master-icon.png)
# Tag Master

<!--It's a simple application that shows how to create an Agent App extension with the use of the **LiveChat Rest API**.-->

**Tag Master** allows you to create, view, and delete [tags](https://www.livechatinc.com/kb/tagging-chats-and-tickets/) and [canned responses](https://www.livechatinc.com/kb/canned-responses/) in an easy and predictable way.

# Preview

![Alt Text](https://i.ibb.co/f9t4RFW/tagmaster.png)

# App setup

## Before you start

To use this application in your LiveChat dashboard, you'll need to create your own app in [Developers Console](https://developers.livechatinc.com/console) and get the **Client Id**.

## Getting started

1. Go to [Apps](https://developers.livechatinc.com/console/apps) in [Developers Console](https://developers.livechatinc.com/console).
2. Click **New App** and give it an **App Name**.
3. Select *Agent App Widget* as the **App Template**.
4. Go to **Develop -> Building Blocks**.
5. Add **App Authorization** and mark it as *JavaScript App*. Your **Client Id** will be displayed there.
6. Fetch the **Tag Master** app repository.
7. In the app directory, do the following steps :

    * Install dependencies (`npm install`).
    * In your project, go to `src/utils/congif.js` and replace `client_id` with your own **Client Id** (the one from **Step 5**).
    * Run your app (`npm start`).
8. Add your app url (for example: `https://localhost:3000`) in these two locations:

    * **Redirect URI whitelist**
    * **Agent App Widgets**
9. In **Private installation**, click **Install app**. 

You should now be able to use **Tag Master** with LiveChat.



# How it works

[Agent App Widgets](https://docs.livechatinc.com/agent-app-widgets/) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App right sidebar.

To get information such as tags and canned responses, you need to use [LiveChat Rest API](https://docs.livechatinc.com/rest-api/).

In order to pull data from our server, Rest API requires you to include an **access_token** in all the requests. You can get it using [LiveChat Boilerplate](https://docs.livechatinc.com/boilerplate/) and [JavaScript Widget API](https://docs.livechatinc.com/agent-app-widgets/#javascript-api).

You should also get familiar with [Authorization](https://docs.livechatinc.com/authorization/).

# Feedback
If you find some bugs, please create an issue in this repo. We will try to fix is ASAP ;)

# If you're new to LiveChat

**LiveChat** is an online customer service software with live support, help desk software, and web analytics capabilities. It's used by more than 27,000 companies all over the world. For more info, check out [LiveChat for Developers](https://developers.livechatinc.com/).

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
