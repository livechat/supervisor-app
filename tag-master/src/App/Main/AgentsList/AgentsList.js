import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { List, FormControl, Input, Tabs, Tab } from 'material-ui';
import AgentRow from './AgentRow/AgentRow';
import InfoDialogs from './InfoDialogs/InfoDialogs';

export default class AgentsList extends Component {

  state = {
    search: '',
    tabIndex: 0,
    tabColors: ['#2196F3', '#4CAF50', '#EF5350'],
  };

  searchForAgent = (event) => {
    this.setState({ search: event.target.value });
  };

  changeTab = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  openInfoDialog = (index, agentLogin) => {
    this.infoDialog.openDialog(index, agentLogin);
  };

  render() {
    return(
      <div className={css(styles.container)}>
        <div className={css(styles.footer)}>
          <p className={css(styles.title)}>List of agents:</p>
          <p className={css(styles.subTitle)}>*click agent to get more information</p>
        </div>
        <Tabs
          value={this.state.tabIndex}
          className={css(styles.tabs)}
          onChange={this.changeTab}
          indicatorColor={this.state.tabColors[this.state.tabIndex]}
          fullWidth
        >
          <Tab label="ALL" />
          <Tab label="ONLINE" />
          <Tab label="OFFLINE" />
        </Tabs>
        <div className={css(styles.listContainer)}>
          <List className={css(styles.list)}>
            {this.props.agents
              .map(agent => {
                agent.status = this.state.tabIndex === 2
                  ? agent.status === 'accepting chats'
                    ? agent.status
                    : 'offline'
                  : agent.status;
                return agent;
              })
              .filter(agent => agent.status === [agent.status, 'accepting chats', 'offline'][this.state.tabIndex])
              .filter(agent => agent.name.toLowerCase().includes(this.state.search.toLowerCase()))
              .map(agent => <AgentRow open={this.openInfoDialog} key={agent.login} data={agent} />)}
          </List>
        </div>
        <FormControl fullWidth className={css(styles.searchForm)}>
          <Input
            className={css(styles.search)}
            disableUnderline
            placeholder="Search..."
            value={this.state.search}
            onChange={this.searchForAgent}
          />
        </FormControl>
        <InfoDialogs accessToken={this.props.accessToken} ref={(ref) => { this.infoDialog = ref; }}/>
      </div>
    );
  }
}

AgentsList.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

AgentsList.propTypes = {
  agents: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: '9vh',
  },
  footer: {
    backgroundColor: '#F5F5F5',
    margin: '1.5vh',
    marginBottom: '1vh',
  },
  tabs: {
    backgroundColor: '#f5f5f5',
    marginTop: '1.5vh',
  },
  title: {
    padding: '1vh 2vw 1vh 4vw',
    margin: 0,
    fontSize: '100%',
    color: '#555',
    fontWeight: '600',
  },
  subTitle: {
    margin: 0,
    fontSize: '80%',
    marginLeft: '3vw',
    color: '#42A5F5',
    paddingBottom: '1vh',
  },
  listContainer: {
    height: '67vh',
    overflow: 'scroll',
    marginTop: '1vh',
    backgroundColor: '#f5f5f5',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchForm: {
    position: 'absolute', bottom: 0,
  },
  search: {
    padding: '2%',
    paddingLeft: '5%',
    fontSize: '120%',
    fontWeight: '400',
    backgroundColor: '#F5F5F5',
  },
});
