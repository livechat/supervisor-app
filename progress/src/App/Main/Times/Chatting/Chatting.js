import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios/index';
import Colors from '../../Colors';
import Config from '../../../Config';
import { Chart } from 'react-google-charts';

export default class Chatting extends Component {
  state = {
    lastTabIndex: -1,
    currentTabIndex: 0,
    isDownloadingChatting: false,
    chattingTimes: [],
  };

  componentDidMount() {
   this.downloadChatTimeFromServer();
  }

  tabChanged = () => {
    this.setState({ lastTabIndex: this.state.currentTabIndex});
  };

  handleChange = (event, tabId) => {
    if (!this.state.isDownloadingChatting) {
      this.downloadChatTimeFromServer(tabId);
    }
  };

  extractChattingTimes = (data) => {
    this.setState({ isDownloadingChatting: false, chattingTimes: data });
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

    axios.get(Config.serverUrl + '/chatting', {
      headers: {
        "Authorization": 'Bearer ' + this.props.accessToken,
        "DateInterval": tabId,
        "X-API-Version": '2',
      },
    })
      .then(this.updateChatTimes)
      .catch(this.errorWhenDownloading);
  };


  createArraysOfData = (object, bar) => {
    const arrayOfData = [];

    if (bar) {
      arrayOfData.push(['Interval', 'Time', { role: 'style' }]);
      Object.keys(object).forEach((key) => {
        if (Number.isInteger(object[key].minutes)) {
          arrayOfData.push([key, object[key].minutes, Colors.chattingMainColor]);
        } else {
          arrayOfData.push([key, object[key].hours, Colors.chattingMainColor]);
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

  render() {
    const areaDataArray = this.createArraysOfData(this.state.chattingTimes);
    const barDataArray = this.createArraysOfData(this.state.chattingTimes, 'bar');

    if(this.props.show) {
      return (
        <Grid style={{ display: this.props.show ? 'block' : 'none' }}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.currentTabIndex}
              onChange={this.handleChange}
              indicatorColor={Colors.chattingMainColorLight}
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
              title: this.state.currentTabIndex === 0 ? 'Chatting time: minutes / hour' : 'Chatting time: hours / day',
              legend: { position: 'none' },
              backgroundColor: { fill: '#F5F5F5', strokeWidth: 40, stroke: 'white' },
              colors: [Colors.chattingMainColor],
              chartArea: { width: '78%', left: '14%' },
              titleTextStyle: { color: '#555', fontSize: '13' },
              vAxis: { minValue: 0 },
              animation: { duration: 500, startup: true },
            }}
            graph_id="AreaChartChatting"
            width="100vw"
            height="40vh"
          />}
          {barDataArray.length > 1 && <div style={{ marginTop: '-5%'}}>
            <Chart
              chartType="BarChart"
              data={barDataArray}
              ref={ref=>this.chart = ref}
              width="100vw"
              height="40vh"
              options={{
                title: this.state.currentTabIndex === 0 ? 'Chatting time: minutes / hour' : 'Chatting time: hours / day',
                legend: { position: 'none' },
                backgroundColor: { fill: '#F5F5F5', strokeWidth: 40, stroke: 'white' },
                chartArea: this.state.currentTabIndex === 0 ? { width: '70%', left: '16%' } : { width: '66%', left: '22%' },
                titleTextStyle: { color: '#555', fontSize: '13' },
                hAxis: { minValue: 0 } ,
                animation: { duration: 500, startup: true },
              }}
              graph_id="BarChartChatting"
            />
          </div>}
        </Grid>
      );
    }
    return null;
  }
}

Chatting.propTypes = {
  show: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
};
