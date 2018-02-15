import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios/index';
import Colors from '../../Colors';

export default class Response extends Component {
  state = {
    lastTabIndex: -1,
    currentTabIndex: 0,
    isDownloadingResponses: false,
    canUseThisMethod: true,
  };

  tabChanged = () => {
    this.setState({ lastTabIndex: this.state.currentTabIndex});
  };

  handleChange = (event, tabId) => {
    if (!this.state.isDownloadingResponses) {
      this.updateResponseTimes(tabId);
    }
  };

  extractReponseTimes = (data) => {
    this.responseTimes = data;
    this.setState({ isDownloadingResponses: false });
  };

  updateResponseTimes = (response) => {
    if (response.status === 200) {
      if (response.data.status === 403) this.setState({ canUseThisMethod: false });
      this.extractReponseTimes(response.data);
    } else {
      this.errorWhenDownloading(response);
    }
  };

  errorWhenDownloading = (error) => {
    this.setState({ isDownloadingResponses: false });
    console.error(error);
  };

  downloadResponsesFromServer = (tabId = 0) => {
    this.setState({ isDownloadingResponses: true, currentTabIndex: tabId, lastTabIndex: -1 });

    axios.get(Colors.serverUrl + '/responses', {
      headers: {
        "Authorization": 'Bearer ' + this.props.accessToken,
        "DateInterval": tabId,
        "X-API-Version": '2',
      },
    })
      .then(this.updateResponseTimes)
      .catch(this.errorWhenDownloading);
  };

  onChartsReady = () => {
    this.downloadResponsesFromServer();
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
        arrayOfData.push([key , object[key].avg_response_time.seconds, Colors.responseMainColor]);
      });
    } else {
      arrayOfData.push(['Interval', 'Time']);
      Object.keys(object).forEach((key) => {
        arrayOfData.push([key, object[key].avg_response_time.seconds]);
      });
    }
    return arrayOfData;
  };

  drawCharts = () => {
    const areaDataArray = this.createArraysOfData(this.responseTimes);
    const barDataArray = this.createArraysOfData(this.responseTimes, 'bar');

    this.areaData = window.google.visualization.arrayToDataTable(areaDataArray);
    this.barData = window.google.visualization.arrayToDataTable(barDataArray);

    this.areaOptions = {
      title: 'Average response time (in seconds)',
      legend: { position: 'none' },
      backgroundColor: { fill: '#F5F5F5', strokeWidth: window.innerWidth / 10, stroke: 'white' },
      colors:[Colors.responseMainColor],
      chartArea: { width: '78%', left: window.innerWidth / 8 },
      titleTextStyle: { color: '#555', fontSize: '13' },
      vAxis: { minValue: 0 },
      animation: { duration: 500, startup: true },
    };

    this.barOptions = {
      title: 'Average response time (in seconds)',
      legend: { position: 'none' },
      backgroundColor: { fill: '#F5F5F5', strokeWidth: window.innerWidth / 10, stroke: 'white' },
      chartArea: this.state.currentTabIndex === 0 ? { width: '70%', left: window.innerWidth / 6 } : { width: '66%', left: (window.innerWidth * 4) / 17 },
      titleTextStyle: { color: '#555', fontSize: '13' },
      hAxis: { minValue: 0 },
      animation: { duration: 500, startup: true },
    };

    this.areaChart = new window.google.visualization.LineChart(document.getElementById('area-chart-response'));
    this.barChart = new window.google.visualization.BarChart(document.getElementById('bar-chart-response'));

    setTimeout(this.updateCharts);
  };

  updateCharts = () => {
    this.areaChart.draw(this.areaData, this.areaOptions);
    this.barChart.draw(this.barData, this.barOptions);
  };

  render() {
    if (!this.state.canUseThisMethod) {
      return <h4 style={headerStyle}>This method is allowed only for the following plans: enterpriseplus, enterprise, basic, premium, pro.</h4>;
    }
    if (this.state.lastTabIndex !== this.state.currentTabIndex) {
      if (window.google.visualization && this.props.show && !this.state.isDownloadingChatting) this.drawCharts();
    }
    return (
      <Grid style={{ display: this.props.show ? 'block' : 'none' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.currentTabIndex}
            onChange={this.handleChange}
            indicatorColor={Colors.responseMainColorLight}
          >
            <Tab style={{ width: '33.33%' }} label="Day" />
            <Tab style={{ width: '33.33%' }} label="Week" />
            <Tab style={{ width: '33.33%' }} label="Month" />
          </Tabs>
        </AppBar>
        <div id="area-chart-response" style={{ height: (window.innerHeight * 2) / 5 }} />
        <div id="bar-chart-response" style={{ height: (window.innerHeight * 2) / 5, marginTop: (-window.innerHeight / 50) }} />
      </Grid>
    );
  }
}

const headerStyle = {
  padding: '8%', color: '#444',
};

Response.propTypes = {
  show: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
};
