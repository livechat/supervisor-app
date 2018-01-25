import React, { Component } from 'react';
import { Grid, AppBar, Tabs, Tab } from 'material-ui';
import axios from 'axios';
import Colors from './Colors'; // eslint-disable-line
import Tags from './Tags/Tags';
import Cans from './Cans/Cans';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      indicatorColor: window.tagMainColor,
      cansGroup: 0,
    };
    window.LiveChat_tags = [];
    window.LiveChat_cans = [];
    window.LiveChat_groups = [];
    this.downloadGroups();
    this.downloadTags();
    this.downloadCans();
  }

   downloadGroups = () => {
     axios.get(window.serverUrl + '/groups',{
       headers: {
         'Authorization': 'Bearer ' + window.access_token,
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
      window.LiveChat_groups = response.data;
      this.setState(this.state);
    } else {
      console.error(response);
    }
  };

  updateTagsTab = (response) => {
    if (response.status === 200) {
      window.LiveChat_tags = response.data;
      this.setState(this.state);
    } else {
      console.error(response);
    }
  };

  updateCansTab = (response) => {
    if (response.status === 200) {
      window.LiveChat_cans = response.data;
      this.setState(this.state);
    } else {
      console.error(response);
    }
  };

  downloadCans = (groupId = 0) => {
    this.state.cansGroup = groupId;
    axios.get(window.serverUrl + '/cans',{
      headers: {
        'Authorization': 'Bearer ' + window.access_token,
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
    axios.get(window.serverUrl + '/tags',{
      headers: {
        'Authorization': 'Bearer ' + window.access_token,
        'X-API-Version': '2',
      },
    })
      .then(this.updateTagsTab)
      .catch(function (error) {
        console.error(error);
      });
  };

  handleChange = (event, value) => {
    this.setState({ value, indicatorColor: value === 0 ? window.tagMainColor : window.canMainColor });
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
        {this.state.value === 0 ? <Tags reload={this.downloadTags} /> : <Cans group={this.state.cansGroup} reload={this.downloadCans} />}
      </Grid>
    );
  }
}
