import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios/index';
import Colors from '../../Colors';
import Config from '../../../Config';
import { Chart } from 'react-google-charts';

export default class Response extends Component {
  state = {
    lastTabIndex: -1,
    currentTabIndex: 0,
    isDownloadingResponses: false,
    canUseThisMethod: true,
    responseTimes: [],
  };

  componentDidMount() {
    this.downloadResponsesFromServer();
  }

  tabChanged = () => {
    this.setState({ lastTabIndex: this.state.currentTabIndex});
  };

  handleChange = (event, tabId) => {
    if (!this.state.isDownloadingResponses) {
      this.downloadResponsesFromServer(tabId);
    }
  };

  extractReponseTimes = (data) => {
    this.setState({ isDownloadingResponses: false, responseTimes: data });
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
    console.error('error', error);
  };

  downloadResponsesFromServer = (tabId = 0) => {
    this.setState({ isDownloadingResponses: true, currentTabIndex: tabId, lastTabIndex: -1 });

    axios.get(Config.serverUrl + '/responses', {
      headers: {
        "Authorization": 'Bearer ' + this.props.accessToken,
        "DateInterval": tabId,
        "X-API-Version": '2',
      },
    })
      .then(this.updateResponseTimes)
      .catch(this.errorWhenDownloading);
  };

  createArraysOfData = (object, bar) => {
    const arrayOfData = [];
    if (bar) {
      arrayOfData.push(['Interval', 'Time', { role: 'style' }]);
      Object.keys(object).forEach((key) => {
        arrayOfData.push([key , object[key].first_response_time.seconds || 0, Colors.responseMainColor]);
      });
    } else {
      arrayOfData.push(['Interval', 'Time']);
      Object.keys(object).forEach((key) => {
        arrayOfData.push([key, object[key].first_response_time.seconds || 0]);
      });
    }
    return arrayOfData;
  };

  render() {
    if (!this.state.canUseThisMethod) {
      return <h4 style={headerStyle}>This method is allowed only for the following plans: enterpriseplus, enterprise, basic, premium, pro.</h4>;
    }

    const areaDataArray = this.createArraysOfData(this.state.responseTimes);
    const barDataArray = this.createArraysOfData(this.state.responseTimes, 'bar');

    if(this.props.show) {
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
          {areaDataArray.length > 1 && <Chart
            chartType="AreaChart"
            data={areaDataArray}
            options={{
              title: 'Average response time (in seconds)',
              legend: { position: 'none' },
              backgroundColor: { fill: '#F5F5F5', strokeWidth: 20, stroke: 'white' },
              colors:[Colors.responseMainColor],
              chartArea: { width: '82%', left: '11%' },
              titleTextStyle: { color: '#555', fontSize: '13' },
              vAxis: { minValue: 0 },
              animation: { duration: 500, startup: true },
            }}
            graph_id="AreaChartResponse"
            width="100vw"
            height="40vh"
          />}
          {barDataArray.length > 1 && <div style={{ marginTop: '-2%'}}>
            <Chart
              chartType="BarChart"
              data={barDataArray}
              options={{
                title: 'Average response time (in seconds)',
                legend: { position: 'none' },
                backgroundColor: { fill: '#F5F5F5', strokeWidth: 20, stroke: 'white' },
                chartArea: this.state.currentTabIndex === 0 ? { width: '70%', left: '16%' } : { width: '70%', left: '22%' },
                titleTextStyle: { color: '#555', fontSize: '13' },
                hAxis: { minValue: 0 },
                animation: { duration: 500, startup: true },
              }}
              graph_id="BarChartResponse"
              width="100vw"
              height="40vh"
            />
          </div>}
        </Grid>
      );
    }
    return null;
  }
}

const headerStyle = {
  padding: '8%', color: '#444',
};

Response.propTypes = {
  show: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
};
