import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import Response from './Response/Response';
import Chatting from './Chatting/Chatting';

export default class Times extends Component {
  state = {
    currentTabIndex: 0,
  };

  handleChange = (event, tabId) => {
    this.setState({ currentTabIndex: tabId });
  };

  tabChanged = (value) => {
    if (value === 0) {
      this.state.currentTabIndex === 0 ? this.chatting.tabChanged() : this.response.tabChanged();
    }
  };

  render() {
    return (
      <Grid style={{ display: this.props.show ? 'block' : 'none' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.currentTabIndex}
            onChange={this.handleChange}
            indicatorColor={this.state.currentTabIndex === 0 ? window.chattingMainColor : window.responseMainColor}
          >
            <Tab style={{ width: '50%' }} label="Chatting time" />
            <Tab style={{ width: '50%' }} label="Response time" />
          </Tabs>
        </AppBar>
        <Chatting ref={(ref) => { this.chatting = ref; }} show={this.state.currentTabIndex === 0 && this.props.show} />
        <Response ref={(ref) => { this.response = ref; }} show={this.state.currentTabIndex === 1 && this.props.show} />
      </Grid>
    );
  }
}

Times.propTypes = {
  show: PropTypes.bool.isRequired,
};
