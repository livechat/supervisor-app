import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, ListItem, Icon, Typography, List, FormControl, Input, Button } from 'material-ui';
import CreateCanDialog from './CreateCanDialog';
import CanListItem from './CanListItem';
import DeleteCanDialog from './DeleteCanDialog';
import axios from "axios/index";
import GroupsDialog from '../GroupsDialog/GroupsDialog';

export default class Cans extends Component {

  state = {
    search: '',
  };
  
  constructor(props){
    super();
    this.currentGroupId = props.group;
  }

  getTags = (item) => {
    let tags = '';
    item.tags.forEach((child) => {
      tags += ' #'+child;
    });
    return tags;
  };

  searchData = (event) => {
    this.setState({ search: event.target.value });
  };

  showCreateCanDialog = () => {
    this.createDialog.changeDialogState();
  };

  showDeleteCanDialog = (tags, id, group) => {
    this.deleteDialog.changeDialogState(tags, id, group);
  };

  addCanAndRefresh = (response) => {
    if (response.data.text) {
      this.props.reload(this.currentGroupId);
    }
  };

  createCan = (name, description, groupId) => {
    axios.post(window.serverUrl + '/cans', {
      data: {
        token: window.access_token,
        tags: name.substring(1, name.length).split('#'),
        group: groupId,
        text: description,
      },
    })
      .then(this.addCanAndRefresh)
      .catch(function (error) {
        console.error(error);
      });
  };

  deleteCanAndRefresh = (response) => {
    if (response.data.result === 'Canned response removed successfully') {
      this.props.reload(this.currentGroupId);
    }
  };

  deleteCan = (tags, id) => {
    axios.delete(window.serverUrl + '/cans', {
      data: {
        token: window.access_token,
        id,
      },
    })
      .then(this.deleteCanAndRefresh)
      .catch(function (error) {
        console.error(error);
      });
  };

  renderList = () => {
    const listOfItems = [];
    window.LiveChat_cans.forEach((item) => {
      if (this.state.search === '' || this.getTags(item).includes(this.state.search)) {
        if (this.currentGroupId === 0) {
          listOfItems.push(<CanListItem
            delete={this.showDeleteCanDialog}
            key={Math.random()}
            item={item}
          />);
        } else if (item.group === this.currentGroupId) {
          listOfItems.push(<CanListItem
            delete={this.showDeleteCanDialog}
            key={Math.random()}
            item={item}
          />);
        }
      }
    });
    return listOfItems;
  };

  changeGroup = (groupName) => {
    this.currentGroupId = this.getGroupId(groupName);
    this.props.reload(this.currentGroupId);
  };

  openChangeGroupDialog = groupName => () => {
    this.groupsDialog.changeDialogState(groupName, 1);
  };

  getGroupId = (groupName) => {
    const found =  window.LiveChat_groups.filter(item => item.name === groupName);
    return found[0].id || 0;
  };

  getGroupName = () => {
    if (window.LiveChat_groups.length < 2) return null;
    const found =  window.LiveChat_groups.filter(item => item.id === this.currentGroupId);
    if (found[0]) {
      return (<ListItem style={styles.groupsItem}>
        <Typography style={styles.groupsText}>{found[0].name}</Typography>
        <Button
          onClick={this.openChangeGroupDialog(found[0].name)}
          style={{color: window.canMainColor}}
        >Change
        </Button>
      </ListItem>);
    }
    return null;
  };

  render() {
    return (
      <Grid>
        <ListItem style={styles.create} button onClick={this.showCreateCanDialog}>
          <Icon style={styles.addIcon}>
            add_circle
          </Icon>
          <Typography style={styles.addText}>Add new canned response</Typography>
        </ListItem>
        {this.getGroupName()}
        <List style={styles.list}>
          {this.renderList()}
        </List>

        <FormControl fullWidth style={styles.inputForm}>
          <Input
            style={styles.input}
            id="name-simple"
            disableUnderline
            placeholder="Search..."
            value={this.state.search}
            onChange={this.searchData}
          />
        </FormControl>

        <CreateCanDialog create={this.createCan} ref={(ref) => { this.createDialog = ref; }} />
        <DeleteCanDialog delete={this.deleteCan} ref={(ref) => { this.deleteDialog = ref; }} />
        <GroupsDialog
          change={this.changeGroup}
          ref={(ref) => {
            this.groupsDialog = ref;
          }}
        />
      </Grid>
    );
  }
}

const styles = {
  create: {
    backgroundColor: window.canMainColor, marginTop: '3%',
  },
  addIcon: {
    color: 'white', fontSize: '240%',
  },
  groupsItem: {
    backgroundColor: '#F5F5F5', paddingTop: '2%', paddingBottom: '2%'
  },
  groupsText: {
    color: '#888', fontSize: '110%', fontWeight: '400',
  },
  addText: {
    paddingLeft: '4%', flex: 1, color: 'white', fontSize: '120%',
  },
  list: {
    position: 'absolute', width: '100%', height: '76%', overflow: 'scroll',
  },
  inputForm: {
    position: 'absolute', bottom: 0,
  },
  input: {
    padding: '2%', paddingLeft: '5%', fontSize: '120%', fontWeight: '400', backgroundColor: '#F5F5F5',
  },
};

Cans.propTypes = {
  reload: PropTypes.func.isRequired,
  group: PropTypes.number.isRequired,
};

