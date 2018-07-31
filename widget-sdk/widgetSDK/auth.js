import AccountsSDK from 'livechat-accounts-sdk';

class Authorization {
  getAccessToken = (clientId) => {
    return new Promise((resolve, reject) => {
      this.instance = AccountsSDK.init({
        client_id: clientId,
        response_type: 'token',
        onIdentityFetched: (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        },
      });
    });
  };

  openPopup = (clientId) => {
    this.instance = AccountsSDK.init({
      client_id: clientId,
      response_type: 'token',
    });

    this.instance.openPopup();
  };
}

export default new Authorization();