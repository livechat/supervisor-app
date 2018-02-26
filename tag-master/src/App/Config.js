let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // development
  config = {
    app_client_id: 'c4603a8a3489cb2291a8d3825c4c43e6',
    api_url: "https://accounts.livechatinc.com/",
    serverUrl: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi\n',
  }
} else {
  // production
  config = {
    app_client_id: 'c4603a8a3489cb2291a8d3825c4c43e6',
    api_url: "https://accounts.livechatinc.com/",
    serverUrl: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi\n',
  }
}

export default config;
