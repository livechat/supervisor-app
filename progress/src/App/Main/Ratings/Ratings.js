import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios';

const timeIntervals = ['day', 'week', 'month', 'quarter', 'year'];

export default class Ratings extends Component{
  state = {
    lastTabIndex: -1,
    currentTabIndex : 0,
    isDownloadingRatings: false,
  };

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

    axios.get(window.serverUrl + '/ratings/' + timeIntervals[tabId],{
      headers: {
        "Authorization": 'Bearer ' + window.access_token,
        "X-API-Version": '2',
      },
    })
      .then(this.updateRatings)
      .catch(this.errorWhenDownloading);
  };

  onChartsReady = () => {
    this.downloadRatingsFromServer();
  };

  componentDidMount() {
    window.google.charts.load('current', { 'packages': ['corechart'] });
    window.google.charts.setOnLoadCallback(this.onChartsReady);
  }

  handleChange = (event, tabId) => {
    if (!this.state.isDownloadingRatings) {
      this.downloadRatingsFromServer(tabId);
    }
  };

  getChatRatings = (child) => {
    this.good += child.good;
    this.bad += child.bad;
    this.chats += child.chats;
  };

  drawCharts = () => {
    this.pieData = window.google.visualization.arrayToDataTable([
      ['Pie', 'Pie'],
      ['Good', this.good !== 0 ? this.good : 1],
      ['Bad', this.bad !== 0 ? this.bad : 1],
    ]);

    this.pieOptions = {
      title: 'Good / Bad Ratio',
      colors: ['#43A047', '#F44336'],
      backgroundColor: { fill: '#F5F5F5', strokeWidth: window.innerWidth / 10, stroke: 'white' },
      chartArea: { left: window.innerWidth / 4, top: window.innerHeight / 11 },
      titleTextStyle: { color: '#555', fontSize: '13' },
      enableInteractivity: !(this.bad === 0 && this.good === 0),
    };

    this.columnData = window.google.visualization.arrayToDataTable([
      ['Column', 'Column', { role: 'style' }],
      ['Total', this.chats, '#2196F3'],
      ['Good', this.good, '#43A047'],
      ['Bad', this.bad, '#F44336'],
    ]);

    this.columnOptions = {
      title: 'Chats summary',
      legend: { position: 'none' },
      backgroundColor: { fill: '#F5F5F5', strokeWidth: window.innerWidth / 10, stroke: 'white' },
      chartArea: { top: window.innerHeight / 9, height: '60%' },
      animation: { duration: 500, startup: true },
      titleTextStyle: { color: '#555', fontSize: '13' },
    };

    this.pieChart = new window.google.visualization.PieChart(document.getElementById('pie-chart'));
    this.columnChart = new window.google.visualization.ColumnChart(document.getElementById("column-chart"));
    setTimeout(this.updateCharts);
  };

  updateCharts = () => {
    this.pieChart.draw(this.pieData, this.pieOptions);
    this.columnChart.draw(this.columnData, this.columnOptions);
  };

  extractRatingsInfo = (data) => {
    this.good = this.bad = this.chats = 0;
    Object.keys(data).forEach((key) => { this.getChatRatings(data[key]) });
    this.setState({isDownloadingRatings: false});
  };

  render() {
    if (this.state.lastTabIndex !== this.state.currentTabIndex) {
      if (window.google.visualization && this.props.show && !this.state.isDownloadingRatings) this.drawCharts();
    }
    return(
      <Grid style={{ display: this.props.show ? 'block' : 'none' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.currentTabIndex}
            onChange={this.handleChange}
            indicatorColor={window.ratingsMainColorLight}
          >
            <Tab style={{ width: '20%' }} label="Day" />
            <Tab style={{ width: '20%' }} label="Week" />
            <Tab style={{ width: '20%' }} label="Month" />
            <Tab style={{ width: '20%' }} label="Quarter" />
            <Tab style={{ width: '20%' }} label="Year" />
          </Tabs>
        </AppBar>
        <div id="pie-chart" style={{ height: (window.innerHeight * 2) / 5 }} />
        <div id="column-chart" style={{ height: window.innerHeight / 2, marginTop: -window.innerHeight / 20 }} />
      </Grid>
    );
  }
}

Ratings.propTypes = {
  show: PropTypes.bool.isRequired,
};
