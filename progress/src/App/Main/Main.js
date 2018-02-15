import React, { Component } from 'react';
import { Grid, AppBar, Tabs, Tab, Icon } from 'material-ui';
import PropTypes from 'prop-types';
import Ratings from './Ratings/Ratings';
import Times from './Times/Times';
import Colors from './Colors';

export default class Main extends Component {
  state = {
    value: 0,
    indicatorColor: Colors.ratingsMainColor,
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
    this.setState({ value, indicatorColor: value === 0 ? Colors.ratingsMainColor : Colors.timesMainColor });
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
            <Tab
              icon={<Icon>star</Icon>}
              style={{ width: '50%', color: this.state.value === 0 ? Colors.ratingsMainColorStrong : Colors.tabOff }}
              label="Ratings"
            />
            <Tab
              icon={<Icon>access_time</Icon>}
              style={{ width: '50%', color: this.state.value === 1 ? Colors.timesMainColorStrong : Colors.tabOff }}
              label="Times"
            />
          </Tabs>
        </AppBar>
        <Ratings accessToken={this.props.accessToken} ref={(ref) => { this.ratings = ref; }} show={this.state.value === 0} />
        <Times accessToken={this.props.accessToken} ref={(ref) => { this.times = ref; }} show={this.state.value === 1} />
      </Grid>
    );
  }
}

Main.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
