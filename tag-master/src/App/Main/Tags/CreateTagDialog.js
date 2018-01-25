import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Input, ListItem, Typography } from 'material-ui';
import GroupsDialog from '../GroupsDialog/GroupsDialog';

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
    const found =  window.LiveChat_groups.filter(item => item.name === groupName);
    return found[0].id || 0;
  };

  getGroupName = () => {
    if (window.LiveChat_groups.length < 2) return null;
    const found =  window.LiveChat_groups.filter(item => item.id === this.state.currentGroupId);
    if (found[0]) {
      return (<ListItem style={styles.groupsItem}>
        <Typography style={styles.groupsText}>{found[0].name}</Typography>
        <Button
          onClick={this.openChangeGroupDialog(found[0].name)}
          style={{ color: window.tagMainColor }}
        >Change
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

          <div style={styles.div}>
            <a style={styles.a} href="https://www.livechatinc.com/kb/tagging-chats-and-tickets/" target="_blank">Learn more about tags.</a>
          </div>
          {this.getGroupName()}
          <Input
            margin="dense"
            onChange={this.handleChange}
            value={this.state.name}
            disableUnderline
            style={styles.input}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.changeDialogState} style={{ color: window.tagMainColor }}>
            Cancel
          </Button>
          <Button onClick={this.createNewTag} style={{ color: '#388E3C' }}>
            Create
          </Button>
        </DialogActions>
        <GroupsDialog
          change={this.changeGroup}
          ref={(ref) => {
            this.groupsDialog = ref;
          }}
        />
      </Dialog>
    );
  }
}

const styles = {
  div: {
    marginTop: '3%', marginBottom: '3%',
  },
  a: {
    color: window.tagMainColor, textDecoration: 'none',
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
};

CreateTagDialog.propTypes = {
  create: PropTypes.func.isRequired,
};
