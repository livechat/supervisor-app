import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios/index';

export default class Chatting extends Component {
  state = {
    lastTabIndex: -1,
    currentTabIndex: 0,
    isDownloadingChatting: false,
  };

  tabChanged = () => {
    this.setState({ lastTabIndex: this.state.currentTabIndex});
  };

  handleChange = (event, tabId) => {
    if (!this.state.isDownloadingChatting) {
      this.downloadChatTimeFromServer(tabId);
    }
  };

  extractChattingTimes = (data) => {
    this.chattingTimes = data;
    this.setState({ isDownloadingChatting: false });
  };

  updateChatTimes = (response) => {
    if (response.status === 200) {
      this.extractChattingTimes(response.data);
    } else {
      this.errorWhenDownloading(response);
    }
  };

  errorWhenDownloading = (error) => {
    this.setState({ isDownloadingChatting: false });
    console.error(error);
  };

  downloadChatTimeFromServer = (tabId = 0) => {
    this.setState({ isDownloadingChatting: true, currentTabIndex: tabId, lastTabIndex: -1 });

    axios.get(window.serverUrl + '/chatting', {
      headers: {
        "Authorization": 'Bearer ' + window.access_token,
        "DateInterval": tabId,
        "X-API-Version": '2',
      },
    })
      .then(this.updateChatTimes)
      .catch(this.errorWhenDownloading);
  };

  onChartsReady = () => {
    this.downloadChatTimeFromServer();
  };

  componentDidMount() {
    window.google.charts.load('current', { 'packages': ['corechart'] });
    window.google.charts.setOnLoadCallback(this.onChartsReady);
  }

  createArraysOfData = (object, bar) => {
    const arrayOfData = [];
    if (bar) {
      arrayOfData.push(['Interval', 'Time', { role: 'style' }]);
      Object.keys(object).forEach((key) => {
        if (Number.isInteger(object[key].minutes)) {
          arrayOfData.push([key , object[key].minutes, window.chattingMainColor]);
        } else {
          arrayOfData.push([key , object[key].hours, window.chattingMainColor]);
        }
      });
    } else {
      arrayOfData.push(['Interval', 'Time']);
      Object.keys(object).forEach((key) => {
        if (Number.isInteger(object[key].minutes)) {
          arrayOfData.push([key, object[key].minutes]);
        } else {
          arrayOfData.push([key, object[key].hours]);
        }
      });
    }
    return arrayOfData;
  };

  drawCharts = () => {
    const areaDataArray = this.createArraysOfData(this.chattingTimes);
    const barDataArray = this.createArraysOfData(this.chattingTimes, 'bar');

    this.areaData = window.google.visualization.arrayToDataTable(areaDataArray);
    this.barData = window.google.visualization.arrayToDataTable(barDataArray);

    this.areaOptions = {
      title: this.state.currentTabIndex === 0 ? 'Chatting time: minutes / hour' : 'Chatting time: hours / day',
      legend: { position: 'none' },
      backgroundColor: { fill: '#F5F5F5', strokeWidth: window.innerWidth / 10, stroke: 'white' },
      colors: [window.chattingMainColor],
      chartArea: { width: '78%', left: window.innerWidth / 8 },
      titleTextStyle: { color: '#555', fontSize: '13' },
      vAxis: { minValue: 0 },
      animation: { duration: 500, startup: true },
    };

    this.barOptions = {
      title: this.state.currentTabIndex === 0 ? 'Chatting time: minutes / hour' : 'Chatting time: hours / day',
      legend: { position: 'none' },
      backgroundColor: { fill: '#F5F5F5', strokeWidth: window.innerWidth / 10, stroke: 'white' },
      chartArea: this.state.currentTabIndex === 0 ? { width: '70%', left: window.innerWidth / 6 } : { width: '66%', left: (window.innerWidth * 4) / 17 },
      titleTextStyle: { color: '#555', fontSize: '13' },
      hAxis: { minValue: 0 },
      animation: { duration: 500, startup: true },
    };

    this.areaChart = new window.google.visualization.AreaChart(document.getElementById('area-chart'));
    this.barChart = new window.google.visualization.BarChart(document.getElementById('bar-chart'));

    setTimeout(this.updateCharts);
  };

  updateCharts = () => {
    this.areaChart.draw(this.areaData, this.areaOptions);
    this.barChart.draw(this.barData, this.barOptions);
  };

  render() {
    if (this.state.lastTabIndex !== this.state.currentTabIndex) {
      if(window.google.visualization && this.props.show && !this.state.isDownloadingChatting) this.drawCharts();
    }
    return (
      <Grid style={{ display: this.props.show ? 'block' : 'none' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.currentTabIndex}
            onChange={this.handleChange}
            indicatorColor={window.chattingMainColorLight}
          >
            <Tab style={{ width: '33.33%' }} label="Day" />
            <Tab style={{ width: '33.33%' }} label="Week" />
            <Tab style={{ width: '33.33%' }} label="Month" />
          </Tabs>
        </AppBar>
        <div id="area-chart" style={{ height: (window.innerHeight * 2) / 5 }} />
        <div id="bar-chart" style={{ height: (window.innerHeight * 2) / 5, marginTop: -window.innerHeight / 50 }} />
      </Grid>
    );
  }
}

Chatting.propTypes = {
  show: PropTypes.bool.isRequired,
};
