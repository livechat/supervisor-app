let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  config = {
    app_client_id: 'ff46e9487112381d8a3d68ab71d16d48',
    api_url: "https://accounts.livechatinc.com/",
    serverUrl: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi',
  }
} else {
  // production code
  config = {
    app_client_id: 'ff46e9487112381d8a3d68ab71d16d48',
    api_url: "https://accounts.livechatinc.com/",
    serverUrl: 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi',
  }
}

export default config;
