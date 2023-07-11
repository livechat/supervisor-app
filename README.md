![](https://i.ibb.co/J5CxbdT/supervisor-icon.png)

# Supervisor

**Supervisor** is a simple widget helping you monitor the weekly progress of your agents and their availability. With **Supervisor**, you can check the list of available agents. Also, it shows the agents' basic statistics from the last 10 days.

The statistics include the following information:

- [Agent working time](https://platform.text.com/docs/data-reporting/reports-api#availability)
- [Chatting time](https://platform.text.com/docs/data-reporting/reports-api/v2.0#chatting-time)
- [Agent ratings](https://platform.text.com/docs/data-reporting/reports-api#ratings)

## Preview

![Alt Text](https://i.ibb.co/rfnHsTz/supervisor.png)

# App setup

## Before you start

To use this application in your LiveChat dashboard, you'll need to create your own app in [Developer Console](https://platform.text.com/console) and get the **Client Id**.

## Getting started

1. Go to [Apps](https://platform.text.com/console/apps) in [Developer Console](https://platform.text.com/console).
2. Click **New App** and give it an **App Name**.
3. Choose the **LiveChat** product as the product you want to build for.
4. Go to **Building Blocks**.
5. Add **App Authorization** and mark it as _JavaScript App_. Your **Client Id** will be displayed there.
6. Add `agents--all:ro` and `reports_read` scopes to the App scopes and API access box.
7. Fetch the **Supervisor** app repository.
8. In the app directory, do the following steps :

   - Install dependencies (`npm install`).
   - In your project, go to `src/utils/congif.js` and replace `client_id` with your own **Client Id** (the one from **Step 5**).
   - Run your app (`npm start`).

9. Add your app url (for example: `https://localhost:3000`) in these two locations:

   - **Redirect URI whitelist**
   - **Agent App Widgets**

10. In **Private installation**, click **Install app**.

You should now be able to use **Supervisor** with LiveChat.

# How it works

[Agent App Widgets](https://platform.text.com/docs/extending-agent-app) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App sidebar.

To get information such as tags, you need to use [Configuration API](https://platform.text.com/docs/management/configuration-api).

In order to pull data from our server, you need to include an **access_token** in all the requests. You can get it using one of the [agent authorization flows](https://platform.text.com/docs/authorization/agent-authorization).

# More sample apps

Experiment more with our different sample apps:

- [Tag Master](https://github.com/livechat/tag-master) - widget for helping your agents manage tags and canned responses.
- [Progress](https://github.com/livechat/progress-app) - widget for helping you monitor statistics of your team, such as chat ratings, response times, and chatting times.
- [Sample Redirect App with the redirect authorization flow](https://github.com/livechat/sample-app-redirect-auth)
- [Sample Popup App with the popup authorization flow](https://github.com/livechat/sample-app-popup-auth)

# Feedback

If you find some bugs, please create an issue in this repo. We will try to fix it ASAP ;)

# [Text Platform](https://platform.text.com/): who are we?

Behind [Text](https://www.text.com/), there’s a [team of passionate people](https://www.text.com/team/) building online customer service software with online chat, help desk software, chatbot, and web analytics capabilities.

With a suite of five products ([LiveChat](https://www.livechat.com), [ChatBot](https://chatbot.com/), [HelpDesk](https://helpdesk.com/), [KnowledgeBase](https://www.knowledgebase.com/), and [OpenWidget](https://openwidget.com/)) and their powerful APIs, we power customer communication for 36,000 companies in 150 countries.

[The Platform](https://platform.text.com/) is a range of products and services that can be used to build a variety of communication tools for businesses. Our [Developer Program](https://platform.text.com/developer-program) and [Marketplace](https://www.livechat.com/marketplace/) create an open ecosystem for developers, partners, and customers. With our [advanced APIs](https://platform.text.com/) and comprehensive [documentation](https://platform.text.com/docs), you can shape the future of communication with us — starting today.

[Join our Discord](https://discord.com/invite/NcfJu3a9kM) to learn, get inspired, and meet other developers!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
