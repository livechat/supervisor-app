let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // development
  config = {
    app_client_id: 'your_client_id',
    api_url: "https://accounts.livechatinc.com/",
    server_url: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi',
  }
} else {
  // production
  config = {
    app_client_id: 'your_client_id',
    api_url: "https://accounts.livechatinc.com/",
    server_url: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi',
  }
}

export default config;
