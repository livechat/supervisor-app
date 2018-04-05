import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab} from 'material-ui';
import TopBar from "./TopBar/TopBar";
import {StyleSheet, css} from "aphrodite";
import Map from "./Map/Map";
import VisitorsList from "./VisitorsList/VisitorsList";
import Charts from "./Charts/Charts";
import axios from 'axios';
import Config from '../Config';

export default class Main extends Component {
  state = {
    tabIndex: 0,
    visitors: [],
    browsingCount: 0,
  };

  constructor(props) {
    super(props);
    window.addEventListener('resize', this.recalculateSizes);
  }

  recalculateSizes = () => {
    this.setState(this.state);
  };

  componentDidMount(){
    this.getBrowsingCount(this.props.accessToken)
      .then(data => {
        this.getVisitors(this.props.accessToken, data.visitors_count)
          .then(data => this.setState({ visitors: data }))
          .catch(error => console.error(error));
        this.setState({ browsingCount: data.visitors_count})
      })
      .catch(error => console.error(error));
  }

  refreshVisitorsData = () => {
    this.getVisitors(this.props.accessToken)
      .then(data => this.setState({ visitors: data }))
      .catch(error => console.error(error));
  };

  getBrowsingCount = (accessToken) => {
    return new Promise((resolve, reject) => {
      axios.get(Config.server_url + '/visitors/count', {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'X-API-Version': '2',
        },
      })
        .then(response => {
          parseInt(response.status, 10) === 200 ? resolve(response.data) : reject('error');
        })
        .catch(error => reject('error'));
    })
  };

  getVisitors = (accessToken, count) => {
    const path = count > 100 ? '/visitors' : '/visitors/all';
    return new Promise((resolve, reject) => {
      axios.get(Config.server_url + path, {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'X-API-Version': '2',
        },
      })
        .then(response => {
          parseInt(response.status, 10) === 200 ? resolve(response.data) : reject('error');
        })
        .catch(error => reject('error'));
    })
  };

  handleChange = (event, tabIndex) => {
    if(this.state.tabIndex !== tabIndex) this.setState({ tabIndex });
  };

  render() {
    return (
      <div className={css(styles.container)}>
        <TopBar refresh={this.refreshVisitorsData}/>
        <AppBar position="static">
          <Tabs
            className={css(styles.tabs)}
            value={this.state.tabIndex}
            indicatorColor="#FF5722"
            onChange={this.handleChange}
          >
            <Tab className={css(styles.tab)} label="Map" />
            <Tab className={css(styles.tab)} label="List" />
            <Tab className={css(styles.tab)} label="Charts" />
          </Tabs>
        </AppBar>
        {this.state.tabIndex === 0 && <Map visitors={this.state.visitors}/>}
        {this.state.tabIndex === 1 && <VisitorsList visitors={this.state.visitors}/>}
        {this.state.tabIndex === 2 && <Charts browsingCount={this.state.browsingCount} visitors={this.state.visitors}/>}
      </div>
    );
  }
}

Main.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  tabs: {
    backgroundColor: '#FF9800',
  },
  tab: {
    width: '33%',
  }
});