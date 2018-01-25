import React, { Component } from 'react';
import Main from './Main/Main';

export default class Authorization extends Component {
  render() {
    if (window.access_token) {
      return <Main />;
    }
    return (<p>Loading...</p>);
  }
}

