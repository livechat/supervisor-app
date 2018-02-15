let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  config = {
    app_client_id: 'fb600cdbae3803f768a697311fb2484b',
    api_url: "https://accounts.livechatinc.com/",
    app_url: 'http://localhost:3000/',
  }
} else {
  // production code
  config = {
    app_client_id: 'fb600cdbae3803f768a697311fb2484b',
    api_url: "https://accounts.livechatinc.com/",
    app_url: 'https://progress-7a8d8.firebaseapp.com/',
  }
}

export default config;
