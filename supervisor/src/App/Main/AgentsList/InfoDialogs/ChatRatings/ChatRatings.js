import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Chart } from 'react-google-charts';

export default class ChatRatings extends Component {

  render() {
    const columnData = [
      ['Column', 'Column', { role: 'style' }],
      ['Total', this.props.data.chats, '#2196F3'],
      ['Good', this.props.data.good, '#43A047'],
      ['Bad', this.props.data.bad, '#F44336'],
    ];

    return(
      <div className={css(styles.container)}>
        <p className={css(styles.title)}><span className={css(styles.chattingTime)}>Chat Ratings</span> this week</p>
        {this.props.data && <Chart
          chartType="ColumnChart"
          data={columnData}
          options={{
            legend: { position: 'none' },
            backgroundColor: { fill: '#F5F5F5', strokeWidth: 20, stroke: 'white' },
            chartArea: { left:'12%', width: '80%', height: '64%' },
            animation: { duration: 500, startup: true },
            vAxis: { viewWindow: {min: 0} },
            titleTextStyle: { color: '#555', fontSize: '13' },
          }}
          graph_id="ColumnChart"
          width="84vw"
          height="40vh"
          legend_toggle
        />}
        <div className={css(styles.textContainer)}>
          <span className={css(styles.name)}>Total Number:</span>
          <span className={css(styles.value)}><strong className={css(styles.average)}>{this.props.data.chats}</strong></span>
        </div>
        <div className={css(styles.textContainer)}>
          <span className={css(styles.name)}>Rated Good:</span>
          <span className={css(styles.value)}><strong className={css(styles.longest)}>{this.props.data.good}</strong></span>
        </div>
        <div className={css(styles.textContainer)}>
          <span className={css(styles.name)}>Rated Bad:</span>
          <span className={css(styles.value)}><strong className={css(styles.shortest)}>{this.props.data.bad}</strong></span>
        </div>
      </div>
    )
  }

}

ChatRatings.propTypes = {
  data: PropTypes.object,
};

ChatRatings.defaultTypes = {
  data: null,
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    marginLeft: '-1vw'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    marginTop: '1vh',
    marginBottom: '1vh',
    marginLeft: '2vw',
  },
  title: {
    backgroundColor: '#F5F5F5',
    color: '#555',
    fontWeight: '600',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    marginTop: '1vh',
    marginBottom: '1vh',
    marginLeft: '2vw',
  },
  name: {
    color: '#777',
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    paddingLeft: '12vw',
  },
  value: {
    color: '#777',
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    paddingRight: '6vw',
  },
  chattingTime: {
    color:'#9C27B0',
    paddingLeft: '5vw',
  },
  average: {
    color: '#2196F3',
  },
  longest: {
    color: '#4CAF50',
  },
  shortest: {
    color: '#E53935',
  }
});