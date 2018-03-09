import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import {StyleSheet, css} from "aphrodite";

export default class Map extends Component {
  state = {
    countryData: [], // showing number of visitors / country
  };

  prepareDataToDisplay = () => {
    const countryData = [['Country', 'Number of visitors']];

    this.props.visitors.forEach(visitor => {
      let replace = -1;
      countryData.forEach((child, index) => {
        if (child[0] === visitor.country) replace = index;
      });
      if(replace > 0) countryData[replace] = [visitor.country, countryData[replace][1] + 1];
      else countryData.push([visitor.country, 1]);
    });
    return countryData;
  };

  componentDidMount = () => {
    window.google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': 'AIzaSyCxWJcDDzXlEhK4KRKPdaCkS40r6jqvEMw',
    });
    window.google.charts.setOnLoadCallback(this.drawRegionsMap);
  };

  drawRegionsMap = (visitors) =>{
    setTimeout(() => {
      const data = window.google.visualization.arrayToDataTable(visitors);
      const options = {
        colorAxis: {colors: ['#FFF3E0', '#FFA726', '#F57C00']},
      };
      const chart = new window.google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(data, options);
    });
  };

  render() {
    const visitors = this.prepareDataToDisplay();
    if(window.google && window.google.visualization && visitors.length > 1) this.drawRegionsMap(visitors);
    return(
      <div>
       <div className={css(styles.map)} id="regions_div"/>
        <div className={css(styles.pie)}>
          <Chart
            chartType="PieChart"
            data={visitors}
            options={{
              chartArea: { width: '100%', height: '70%' },
              legend: { position: 'labeled', maxLines: 8 },
              colors: ['#F57C00', '#FB8C00', '#FF9800', '#FFA726', '#FFB74D', '#FFCC80'],
            }}
            graph_id="PieChart"
            width="90vw"
            height="40vh"
            legend_toggle
          />
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    marginTop: '6%',
    marginBottom: '6%',
    width: '100vw',
    height: '36vh',
  },
  pie: {
    backgroundColor: 'white',
    paddingLeft: '4vw',
  },
});

Map.propTypes = {
  visitors: PropTypes.array,
};

Map.defaultProps = {
  visitors: []
};
