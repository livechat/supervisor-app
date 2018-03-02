import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import AppTopBar from './AppTopBar/AppTopBar';
import AgentsList from './AgentsList/AgentsList';
import RestAPI from '../RestAPI/RestAPI';

export default class Main extends Component {

  state = {
    isDownloadingAgents: true,
    agents: [],
  };

  downloadAgents = () => {
    RestAPI.getAgents(this.props.accessToken)
      .then(agents => this.setState({ isDownloadingAgents: false, agents }))
      .catch(error => this.setState({ isDownloadingAgents: false }));
  };

  componentDidMount(){
    this.downloadAgents();
    this.downloadAgentsInterval = setInterval(this.downloadAgents, 60 * 5 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.downloadAgentsInterval);
  }

  render(){
    if(!this.state.isDownloadingAgents) {
      return (
        <div>
          <AppTopBar/>
          <AgentsList accessToken={this.props.accessToken} agents={this.state.agents}/>
        </div>
      )
    } else {
      return (
        <div className={css(styles.spinnerContainer)}>
          <div className={css(styles.spinner)} />
        </div>
      );
    }
  }
}

Main.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

const spin = {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  spinner: {
    border: '2vw solid #BBDEFB',
    borderTop: '2vw solid #2196F3',
    borderRadius: '50%',
    width: '16vw',
    height: '16vw',
    animationName: [spin],
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});
