let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  config = {
    app_client_id: '23928dbd7f7f331205ef5c187c4e6428',
    api_url: "https://accounts.livechatinc.com/",
    app_url: 'http://localhost:3000/',
  }
} else {
  // production code
  config = {
    app_client_id: '23928dbd7f7f331205ef5c187c4e6428',
    api_url: "https://accounts.livechatinc.com/",
    app_url: 'https://tag-master-adc5e.firebaseapp.com/',
  }
}

export default config;
