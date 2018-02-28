import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'material-ui';
import { StyleSheet, css } from 'aphrodite';
import RestAPI from '../../../RestAPI/RestAPI';
import ChattingHours from './ChattingHours/ChattingHours';
import WorkingHours from './WorkingHours/WorkingHours';
import ChatRatings from './ChatRatings/ChatRatings';

export default class InfoDialogs extends Component {
  state = {
    dialogIndex: -1,
    agentName: null,
    isLoading: true,
    dataForCharts: null,
    chatRatings: null,
  };

  openDialog = (index, agentName) => {
    this.downloadDataToShow(index, agentName);
    this.setState({ dialogIndex: index, agentName, isLoading: true, dataForCharts: null });
  };

  createArraysOfData = (object, bar) => {
    const arrayOfData = [];
    arrayOfData.push(['Interval', 'Time']);
    Object.keys(object).forEach((key) => { arrayOfData.push([key, object[key].hours]); });
    return arrayOfData;
  };

  extractChattingTime = (chattingTimes) => {
    const areaDataArray = this.createArraysOfData(chattingTimes);
    this.setState({ dataForCharts: areaDataArray, isLoading: false })
  };

  extractAvailabilityTime = (chattingTimes) => {
    const areaDataArray = this.createArraysOfData(chattingTimes);
    this.setState({ dataForCharts: areaDataArray, isLoading: false })
  };

  extractChatRatings = (data) => {
    let good = 0, bad = 0, chats = 0;
    Object.keys(data).forEach((key) => {
      good += data[key].good;
      bad += data[key].bad;
      chats += data[key].chats;
    });
    this.setState({ chatRatings: {good, bad, chats}, isLoading: false })
  };

  downloadDataToShow = (index, agentName) => {
    switch(index){
      case 0:
        RestAPI.getAvailabilityTime(this.props.accessToken, agentName)
          .then(response => this.extractAvailabilityTime(response))
          .catch(error => console.error(error));
        break;
      case 1:
        RestAPI.getChattingTime(this.props.accessToken, agentName)
          .then(response => this.extractChattingTime(response))
          .catch(error => console.error(error));
        break;
      case 2:
        RestAPI.getChatRatings(this.props.accessToken, agentName)
          .then(response => this.extractChatRatings(response))
          .catch(error => console.error(error));
        break;
      default:
    }
  };

  handleClose = () => {
    this.setState({ dialogIndex: -1 });
  };

  render() {
    let dialogToDisplay;
    switch(this.state.dialogIndex){
      case 0:
        dialogToDisplay = <WorkingHours data={this.state.dataForCharts} />;
        break;
      case 1:
        dialogToDisplay = <ChattingHours data={this.state.dataForCharts} />;
        break;
      case 2:
        dialogToDisplay = <ChatRatings data={this.state.chatRatings} />;
        break;
      default:
        dialogToDisplay = null;
    }

    return (
      <Dialog
        style={{width:'100%'}}
        open={this.state.dialogIndex >= 0}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {this.state.isLoading && <div className={css(styles.spinner)}/>}
        {!this.state.isLoading && dialogToDisplay}
      </Dialog>
    )
  }
}

InfoDialogs.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

const spin = {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
};

const styles = StyleSheet.create({
  spinner: {
    border: '3vw solid #BBDEFB',
    borderTop: '3vw solid #2196F3',
    borderRadius: '50%',
    margin: '4vh',
    width: '14vw',
    height: '14vw',
    animationName: [spin],
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});
