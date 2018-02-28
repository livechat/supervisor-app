import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios';
import Colors from '../Colors';
import Config from '../../Config';
import { Chart } from 'react-google-charts';

const timeIntervals = ['day', 'week', 'month', 'quarter', 'year'];

export default class Ratings extends Component{
  state = {
    lastTabIndex: -1,
    currentTabIndex : 0,
    isDownloadingRatings: false,
    good: 0,
    bad: 0,
    chats: 0,
  };

  componentDidMount() {
    this.downloadRatingsFromServer();
  }

  tabChanged = (value) => {
    if (value === 1) this.setState({ lastTabIndex: this.state.currentTabIndex });
  };

  updateRatings = (response) => {
    if (response.status === 200) {
      this.extractRatingsInfo(response.data);
    } else {
      this.errorWhenDownloading(response);
    }
  };

  errorWhenDownloading = (error) => {
    this.setState({ isDownloadingRatings: false });
    console.error(error);
  };

  downloadRatingsFromServer = (tabId = 0) => {
    this.setState({isDownloadingRatings: true, currentTabIndex: tabId, lastTabIndex: -1});

    axios.get(Config.serverUrl + '/ratings/' + timeIntervals[tabId],{
      headers: {
        "Authorization": 'Bearer ' + this.props.accessToken,
        "X-API-Version": '2',
      },
    })
      .then(this.updateRatings)
      .catch(this.errorWhenDownloading);
  };

  onChartsReady = () => {
    this.downloadRatingsFromServer();
  };

  handleChange = (event, tabId) => {
    if (!this.state.isDownloadingRatings) {
      this.downloadRatingsFromServer(tabId);
    }
  };

  extractRatingsInfo = (data) => {
    let good = 0, bad = 0, chats = 0;
    Object.keys(data).forEach((key) => {
      good += data[key].good;
      bad += data[key].bad;
      chats += data[key].chats;
    });
    this.setState({ isDownloadingRatings: false, good, bad, chats });
  };

  render() {
    return(
      <Grid style={{ display: this.props.show ? 'block' : 'none' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.currentTabIndex}
            onChange={this.handleChange}
            indicatorColor={Colors.ratingsMainColorLight}
          >
            <Tab style={{ width: '20%' }} label="Day" />
            <Tab style={{ width: '20%' }} label="Week" />
            <Tab style={{ width: '20%' }} label="Month" />
            <Tab style={{ width: '20%' }} label="Quarter" />
            <Tab style={{ width: '20%' }} label="Year" />
          </Tabs>
        </AppBar>
        <Chart
          chartType="PieChart"
          data={[
            ['Pie', 'Pie'],
            ['Good', this.state.good],
            ['Bad', this.state.bad],
          ]}
          options={{
            title: 'Good / Bad Ratio',
            colors: ['#43A047', '#F44336'],
            backgroundColor: { fill: '#F5F5F5', strokeWidth: 40, stroke: 'white' },
            chartArea: { left: '25%', top: '20%' , height: '70%', width: '80%' },
            titleTextStyle: { color: '#555', fontSize: '13' },
            enableInteractivity: !(this.bad === 0 && this.good === 0),
          }}
          graph_id="PieChart"
          legend_toggle
          width="100vw"
          height="35vh"
        />
        <Chart
          chartType="ColumnChart"
          data={[
            ['Column', 'Column', { role: 'style' }],
            ['Total', this.state.chats, '#2196F3'],
            ['Good', this.state.good, '#43A047'],
            ['Bad', this.state.bad, '#F44336'],
          ]}
          options={{
            title: 'Chats summary',
            legend: { position: 'none' },
            backgroundColor: { fill: '#F5F5F5', strokeWidth: 40, stroke: 'white' },
            chartArea: { top: '20%', height: '60%', width: '72%', left: '16%' },
            animation: { duration: 500, startup: true },
            titleTextStyle: { color: '#555', fontSize: '13' },
          }}
          graph_id="ColumnChart"
          width="100vw"
          height="50vh"
        />
      </Grid>
    );
  }
}

Ratings.propTypes = {
  show: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
};
