import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Input, ListItem, Typography } from 'material-ui';
import GroupsDialog from '../GroupsDialog/GroupsDialog';
import Colors from '../Colors';

export default class CreateTagDialog extends Component {

  state = {
    show: false,
    name: '#',
    currentGroupId: 0
  };

  changeDialogState = (currentGroupId) => {
    this.setState({ show: !this.state.show, name: '#', currentGroupId });
  };

  createNewTag = () => {
    if (this.state.name.length > 1) {
      this.props.create(this.state.name, this.state.currentGroupId);
      this.changeDialogState();
    }
  };

  handleChange = (event) => {
    if (event.target.value.charAt(0) !== '#') event.target.value = '#';
    if (event.target.value.length < 16) this.setState({ name: event.target.value });
  };

  openChangeGroupDialog = (groupName) => () => {
    this.groupsDialog.changeDialogState(groupName, 0);
  };

  changeGroup = (groupName) => {
    this.setState({currentGroupId: this.getGroupId(groupName)})
  };

  getGroupId = (groupName) => {
    const found =  this.props.groups.filter(item => item.name === groupName);
    return found[0].id || 0;
  };

  getGroupName = () => {
    if (this.props.groups.length < 2 ) return null;
    const found =  this.props.groups.filter(item => item.id === this.state.currentGroupId);
    if (found[0]) {
      return (<ListItem className={css(styles.groupsItem)}>
        <Typography className={css(styles.groupsText)}>{found[0].name}</Typography>
        <Button
          onClick={this.openChangeGroupDialog(found[0].name)}
          className={css(styles.change)}>
          Change
        </Button>
      </ListItem>);
    }
    return null;
  };

  render() {
    return (
      <Dialog
        open={this.state.show}
        onClose={this.changeDialogState}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tags help you organize and categorize your LiveChat content. To put it simply,
            tags are words that identify the topic of a chat or ticket.
          </DialogContentText>

          <div className={css(styles.container)}>
            <a
              className={css(styles.a)}
              href="https://www.livechatinc.com/kb/tagging-chats-and-tickets/"
              target="_blank"
              rel="noopener noreferrer"
              >Learn more about tags.
            </a>
          </div>
          {this.getGroupName()}
          <Input
            margin="dense"
            onChange={this.handleChange}
            value={this.state.name}
            disableUnderline
            className={css(styles.input)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.changeDialogState} className={css(styles.cancel)}>
            Cancel
          </Button>
          <Button onClick={this.createNewTag} className={css(styles.create)}>
            Create
          </Button>
        </DialogActions>
        <GroupsDialog
          change={this.changeGroup}
          ref={(ref) => { this.groupsDialog = ref; }}
          groups={this.props.groups}
        />
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '3%', marginBottom: '3%',
  },
  a: {
    color: Colors.tagMainColor, textDecoration: 'none',
  },
  cancel: {
    color: Colors.tagMainColor
  },
  create: {
    color: '#388E3C'
  },
  change: {
    color: Colors.tagMainColor
  },
  input: {
    fontSize: '125%', borderBottom: '1px solid #777', marginTop: '5%',
  },
  groupsItem: {
    backgroundColor: '#F5F5F5', paddingTop: '2%', paddingBottom: '2%'
  },
  groupsText: {
    color: '#888', fontSize: '110%', fontWeight: '400',
  },
});

CreateTagDialog.propTypes = {
  create: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};
