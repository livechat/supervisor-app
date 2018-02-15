import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Input, Typography, ListItem } from 'material-ui';
import GroupsDialog from '../GroupsDialog/GroupsDialog';
import { StyleSheet, css } from 'aphrodite';
import Colors from '../Colors';

export default class CreateCanDialog extends Component {

  state = {
    show: false,
    name: '#',
    description: '',
    currentGroupId: 0,
  };

  changeDialogState = () => {
    this.setState({ show: !this.state.show, name: '#', description: '' });
  };

  createNewCan = () => {
    if (this.state.name.length > 1 && this.state.description.length > 0) {
      this.props.create(this.state.name, this.state.description, this.state.currentGroupId);
      this.changeDialogState();
    }
  };

  handleChange = (event) => {
    if (event.target.value.charAt(0) !== '#') event.target.value = '#';
    if (event.target.value.length < 36) this.setState({ name: event.target.value });
  };

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  openChangeGroupDialog = groupName => () => {
    this.groupsDialog.changeDialogState(groupName, 1);
  };

  changeGroup = (groupName) => {
    this.setState({ currentGroupId: this.getGroupId(groupName) });
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
        <DialogTitle id="form-dialog-title">Create canned response</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you often reply to the same customer questions, consider using canned responses.
            It will shorten your response times and save keystrokes on repetitive typing.
          </DialogContentText>

          <div className={css(styles.container)} >
            <a
              className={css(styles.a)}
              href="https://www.livechatinc.com/kb/canned-responses/"
              target="_blank"
              rel="noopener noreferrer">
              Learn more about canned responses.
            </a>
          </div>
          {this.getGroupName()}
          <Typography className={css(styles.name)}>Tag name:</Typography>
          <Input
            margin="dense"
            onChange={this.handleChange}
            value={this.state.name}
            disableUnderline
            className={css(styles.nameInput)}
            fullWidth
          />
          <Typography className={css(styles.desc)}>Description:</Typography>
          <Input
            margin="dense"
            value={this.state.description}
            disableUnderline
            onChange={this.handleDescription}
            multiline
            placeholder="Write something..."
            className={css(styles.descInput)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.changeDialogState} className={css(styles.cancel)}>
            Cancel
          </Button>
          <Button onClick={this.createNewCan} className={css(styles.create)}>
            Create
          </Button>
        </DialogActions>
        <GroupsDialog
          change={this.changeGroup}
          groups={this.props.groups}
          ref={(ref) => { this.groupsDialog = ref; }}
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
    color: Colors.canMainColor, textDecoration: 'none',
  },
  cancel: {
    color: Colors.canMainColor,
  },
  create: {
    color: '#388E3C',
  },
  change: {
    color: Colors.canMainColor,
  },
  name: {
    color: '#777', marginBottom: '2%', marginTop: '3%',
  },
  nameInput: {
    fontSize: '125%', borderBottom: '1px solid #777',
  },
  desc: {
    color: '#777', marginTop: '6%', marginBottom: '2%',
  },
  descInput: {
    fontSize: '100%', borderBottom: '1px solid #777',
  },
  groupsItem: {
    backgroundColor: '#F5F5F5', paddingTop: '2%', paddingBottom: '2%'
  },
  groupsText: {
    color: '#888', fontSize: '110%', fontWeight: '400',
  },
});

CreateCanDialog.propTypes = {
  create: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};
