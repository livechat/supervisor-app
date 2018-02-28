import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Grid, ListItem, Icon, Typography, List, FormControl, Input, Button } from 'material-ui';
import axios from 'axios';
import Colors from '../Colors';
import TagListItem from './TagListItem';
import CreateTagDialog from './CreateTagDialog';
import DeleteTagDialog from './DeleteTagDialog';
import GroupsDialog from '../GroupsDialog/GroupsDialog';
import Config from '../../Config';

export default class Tags extends Component {
  state = {
    search: '',
    currentGroupId: 0,
  };

  searchData = (event) => {
    this.setState({ search: event.target.value });
  };

  showCreateTagDialog = () => {
    this.createDialog.changeDialogState(this.state.currentGroupId);
  };

  showDeleteTagDialog = (name, group) => {
    this.deleteDialog.changeDialogState(name, group);
  };

  addTagAndRefresh = (response) => {
    if (response.data.name) {
      this.props.reload();
    }
  };

  deleteTagAndRefresh = (response) => {
    if (response.data.ok) {
      this.props.reload();
    }
  };

  createTag = (name, groupId) => {
    axios.post(Config.serverUrl + '/tags', {
      data: {
        token: this.props.accessToken,
        group: groupId,
        tag: name.substring(1, name.length),
      },
    })
      .then(this.addTagAndRefresh)
      .catch(function (error) {
        console.error(error);
      });
  };

  deleteTag = (name, groupId) => {
    axios.delete(Config.serverUrl + '/tags', {
      data: {
        token: this.props.accessToken,
        group: groupId,
        tag: name,
      },
    })
      .then(this.deleteTagAndRefresh)
      .catch(function (error) {
        console.error(error);
      });
  };

  renderList = () => {
    const listOfItems = [];
    this.props.tags.forEach((item) => {
      if (this.state.search === '' || item.name.includes(this.state.search)) {
        if (this.state.currentGroupId === 0) {
          listOfItems.push(<TagListItem
            delete={this.showDeleteTagDialog}
            key={Math.random()}
            groups={this.props.groups}
            item={item}
          />);
        } else if (item.group === this.state.currentGroupId) {
          listOfItems.push(<TagListItem
            delete={this.showDeleteTagDialog}
            key={Math.random()}
            groups={this.props.groups}
            item={item}
          />);
        }
      }
    });
    return listOfItems;
  };

  changeGroup = (groupName) => {
    this.setState({ currentGroupId: this.getGroupId(groupName) });
  };

  openChangeGroupDialog = groupName => () => {
    this.groupsDialog.changeDialogState(groupName, 0);
  };

  getGroupId = (groupName) => {
    const found =  this.props.groups.filter(item => item.name === groupName);
    return found[0].id || 0;
  };

  getGroupName = () => {
    if (this.props.groups.length < 2) return null;
    const found =  this.props.groups.filter(item => item.id === this.state.currentGroupId);
    if (found[0]) {
      return (<ListItem className={css(styles.groupsItem)}>
        <Typography className={css(styles.groupsText)}>{found[0].name}</Typography>
        <Button
          onClick={this.openChangeGroupDialog(found[0].name)}
          style={{ color: Colors.tagMainColor }}
        >Change
        </Button>
      </ListItem>);
    }
    return null;
  };

  render() {
    return (
      <Grid>
        <ListItem className={css(styles.addItem)} button onClick={this.showCreateTagDialog}>
          <Icon className={css(styles.add)}>
            add_circle
          </Icon>
          <Typography className={css(styles.addText)}>Add new tag</Typography>
        </ListItem>
        {this.getGroupName()}
        <List className={css(this.props.groups.length < 2 ? styles.list : styles.listShort)}>
          {this.renderList()}
        </List>
        <FormControl fullWidth className={css(styles.searchForm)}>
          <Input
            className={css(styles.search)}
            id="name-simple"
            disableUnderline
            placeholder="Search..."
            value={this.state.search}
            onChange={this.searchData}
          />
        </FormControl>
        <CreateTagDialog create={this.createTag} groups={this.props.groups} ref={(ref) => { this.createDialog = ref; }} />
        <DeleteTagDialog delete={this.deleteTag} ref={(ref) => { this.deleteDialog = ref; }} />
        <GroupsDialog change={this.changeGroup} ref={(ref) => { this.groupsDialog = ref; }} groups={this.props.groups}/>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  addItem: {
    backgroundColor: Colors.tagMainColor,
    marginTop: '3%',
  },
  add: {
    color: 'white',
    fontSize: '240%',
  },
  addText: {
    paddingLeft: '4%',
    flex: 1,
    color: 'white',
    fontSize: '120%',
  },
  groupsItem: {
    backgroundColor: '#F5F5F5',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  groupsText: {
    color: '#888',
    fontSize: '110%',
    fontWeight: '400',
  },
  list: {
    position: 'absolute',
    width: '100%',
    height: '76%',
    overflow: 'scroll',
  },
  listShort: {
    position: 'absolute',
    width: '100%',
    height: '69%',
    overflow: 'scroll',
  },
  searchForm: {
    position: 'absolute',
    bottom: 0,
  },
  search: {
    padding: '2%',
    paddingLeft: '5%',
    fontSize: '120%',
    fontWeight: '400',
    backgroundColor: '#F5F5F5',
  },
});

Tags.propTypes = {
  reload: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  tags: PropTypes.array,
  groups: PropTypes.array,
};

Tags.defaultProps = {
  tags: [],
  groups: [],
};
