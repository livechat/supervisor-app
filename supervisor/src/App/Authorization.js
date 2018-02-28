import React, { Component } from 'react';
import LiveChat from '@livechat/agent-app-widget-sdk';
import Main from './Main/Main';
import Config from './Config';

export default class Authorization extends Component {
  state = {
    errorMessage: null,
    access_token: null
  };

  componentDidMount() {
    this.initApp();
  }

  initApp() {
    LiveChat.init({ authorize: false });

    if(window.location.hash && window.location.hash.search('access_token') > -1 ){
      this.setState({ access_token: window.location.hash.substr(14).split('&')[0] })
    } else {
      if(window.location.hash.search('error') > -1) this.setState({ errorMessage: 'Problem with authorization'});
      else window.location.href = `${Config.api_url}?response_type=token&client_id=${Config.app_client_id}&redirect_uri=${window.location.href}`;
    }
  }

  render() {
    if (this.state.access_token) {
      return <Main accessToken={this.state.access_token}/>;
    }
    return this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (<p>Loading...</p>);
  }
}

