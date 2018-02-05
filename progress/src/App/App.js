import React, { Component } from 'react';
import Main from './Main/Main';

class App extends Component {
  render() {
    if (window.access_token) {
      return <Main />;
    }
    return (<p>Loading...</p>);
  }
}

export default App;
