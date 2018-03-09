import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import {css, StyleSheet} from "aphrodite";

export default class Charts extends Component {

  extractGreetings = () => {
    let accepted = 0, all = 0, refused = 0;
    this.props.visitors.forEach(visitor => {
      if(visitor.greetings_accepted) accepted += parseInt(visitor.greetings_accepted, 10);
      if(visitor.greetings_all) all += parseInt(visitor.greetings_all, 10);
      if(visitor.greetings_refused) refused += parseInt(visitor.greetings_refused, 10);
    });
    return {accepted, all, refused};
  };

  render() {
    const chattingCount = this.props.visitors.length;
    const browsingCount = this.props.browsingCount;
    const greetings = this.extractGreetings();
    return(
      <div className={css(styles.container)}>
        <div className={css(styles.pie)}>
          <Chart
            chartType="PieChart"
            data={[
              ['Status', 'Count'],
              ['Chatting', chattingCount === 0 ? 1 : chattingCount],
              ['Browsing', browsingCount === 0 ? 1 : browsingCount],
            ]}
            options={{
              legend: { position: 'labeled' },
              chartArea: { width: '96%', height: '80%' },
              backgroundColor: { fill: '#F5F5F5' },
              animation: { duration: 500, startup: true },
              titleTextStyle: { color: '#555', fontSize: '13' },
              enableInteractivity: !(chattingCount === 0 && browsingCount === 0),
            }}
            graph_id="PieChart"
            legend_toggle
            width="96vw"
            height="36vh"
          />
        </div>
        <div className={css(styles.bar)}>
          <Chart
            chartType="ColumnChart"
            data={[
              ['Column', 'Column', { role: 'style' }],
              ['All', greetings.all, '#2196F3'],
              ['Accepted', greetings.accepted, '#43A047'],
              ['Refused', greetings.refused, '#F44336'],
            ]}
            options={{
              title: 'Greetings summary',
              legend: { position: 'none' },
              backgroundColor: { fill: '#F5F5F5' },
              chartArea: { left: '10%', width: '86%', height: '84%' },
              animation: { duration: 500, startup: true },
              titleTextStyle: { color: '#555', fontSize: '13' },
              vAxis: { viewWindow: {min: 0} },
            }}
            graph_id="ColumnChart"
            width="96vw"
            height="46vh"
          />
        </div>
      </div>
    )
  }
}

Charts.propTypes = {
  browsingCount: PropTypes.number.isRequired,
  visitors: PropTypes.array,
};

Charts.defaultProps = {
  visitors: []
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  pie: {
    backgroundColor: 'white',
    paddingLeft: '2vw',
    marginTop: '2vh',
  },
  bar: {
    backgroundColor: 'white',
    paddingLeft: '2vw',
    marginTop: '2vh',
  },
});
