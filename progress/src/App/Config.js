let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  config = {
    app_client_id: 'your_client_id',
    api_url: "https://accounts.livechatinc.com/",
    serverUrl: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi',
  }
} else {
  // production code
  config = {
    app_client_id: 'your_client_id',
    api_url: "https://accounts.livechatinc.com/",
    serverUrl: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi',
  }
}

export default config;
