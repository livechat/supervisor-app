import React, { Component } from 'react';
import { Grid, AppBar, Tabs, Tab, Icon } from 'material-ui';
import './Colors';
import Ratings from './Ratings/Ratings';
import Times from './Times/Times';

export default class Main extends Component {
  state = {
    value: 0,
    indicatorColor: window.ratingsMainColor,
  };

  constructor(props) {
    super(props);
    window.addEventListener('resize', this.recalculateSizes);
  }

  recalculateSizes = () => {
    this.setState(this.state);
  };

  handleChange = (event, value) => {
    this.ratings.tabChanged(value);
    this.times.tabChanged(value);
    this.setState({ value, indicatorColor: value === 0 ? window.ratingsMainColor : window.timesMainColor });
  };

  render() {
    return (
      <Grid>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor={this.state.indicatorColor}
          >
            <Tab icon={<Icon>star</Icon>} style={{ width: '50%', color: this.state.value === 0 ? window.ratingsMainColorStrong : window.tabOff }} label="Ratings" />
            <Tab icon={<Icon>access_time</Icon>} style={{ width: '50%', color: this.state.value === 1 ? window.timesMainColorStrong : window.tabOff }} label="Times" />
          </Tabs>
        </AppBar>
        <Ratings ref={(ref) => { this.ratings = ref; }} show={this.state.value === 0} />
        <Times ref={(ref) => { this.times = ref; }} show={this.state.value === 1} />
      </Grid>
    );
  }
}
