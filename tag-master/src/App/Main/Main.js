import React, { Component } from 'react';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import PropTypes from 'prop-types';
import axios from 'axios';
import Colors from './Colors';
import Config from '../Config';
import Tags from './Tags/Tags';
import Cans from './Cans/Cans';

export default class Main extends Component {

  state = {
    value: 0,
    indicatorColor: Colors.tagMainColor,
    LiveChat_tags: [],
    LiveChat_cans: [],
    LiveChat_groups: [],
  };

  componentDidMount() {
    this.cansGroup = 0;
    this.downloadGroups();
    this.downloadTags();
    this.downloadCans();
  }

   downloadGroups = () => {
     axios.get(Config.serverUrl + '/groups',{
       headers: {
         'Authorization': 'Bearer ' + this.props.accessToken,
         'X-API-Version': '2',
       },
     })
       .then(this.updateGroups)
       .catch(function (error) {
         console.error(error);
       });
   };

  updateGroups = (response) => {
    if (response.status === 200) {
      if(response.data !== 'error') this.setState({ LiveChat_groups: response.data});
    } else {
      console.error(response);
    }
  };

  updateTagsTab = (response) => {
    if (response.status === 200) {
      if(response.data !== 'error') this.setState({ LiveChat_tags: response.data });
    } else {
      console.error(response);
    }
  };

  updateCansTab = (response) => {
    if (response.status === 200) {
      if(response.data !== 'error') this.setState({ LiveChat_cans: response.data});
    } else {
      console.error(response);
    }
  };

  downloadCans = (groupId = 0) => {
    this.cansGroup = groupId;
    axios.get(Config.serverUrl + '/cans',{
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken,
        'X-API-Version': '2',
        'Group': groupId
      },
    })
      .then(this.updateCansTab)
      .catch(function (error) {
        console.error(error);
      });
  };

  downloadTags = () => {
    axios.get(Config.serverUrl + '/tags',{
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken,
        'X-API-Version': '2',
      },
    })
      .then(this.updateTagsTab)
      .catch(function (error) {
        console.error(error);
      });
  };

  handleChange = (event, value) => {
    this.setState({ value, indicatorColor: value === 0 ? Colors.tagMainColor : Colors.canMainColor });
  };

  render() {
    return (
      <Grid>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor={this.state.indicatorColor}
            fullWidth
          >
            <Tab label="Tags" />
            <Tab label="Cans" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 ? <Tags accessToken={this.props.accessToken} reload={this.downloadTags} tags={this.state.LiveChat_tags} groups={this.state.LiveChat_groups}/>
          : <Cans accessToken={this.props.accessToken} group={this.cansGroup} cans={this.state.LiveChat_cans} reload={this.downloadCans} groups={this.state.LiveChat_groups}/>}
      </Grid>
    );
  }
}

Main.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
