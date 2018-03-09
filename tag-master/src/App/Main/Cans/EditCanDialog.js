import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Input, Typography, ListItem } from 'material-ui';
import { StyleSheet, css } from 'aphrodite';
import Colors from '../Colors';

export default class EditCanDialog extends Component {

  state = {
    show: false,
    tags: '',
    description: '',
    id: null,
  };

  getTags = (item) => {
    let tags = '';
    item.forEach((child) => {
      tags += ' #'+child;
    });
    return tags.substring(1);
  };

  changeDialogState = (tags, description, id) => {
    this.setState({ show: !this.state.show, tags: this.getTags(tags), description, id });
  };

  editCan = () => {
    if (this.state.tags.length > 1 && this.state.description.length > 0) {
      this.props.edit(this.state.tags, this.state.description, this.state.id);
      this.hideDialog();
    }
  };

  hideDialog = () => {
    this.setState({ show: !this.state.show});
  };

  handleChange = (event) => {
    if (event.target.value.charAt(0) !== '#') event.target.value = '#';
    if (event.target.value.length < 36) this.setState({ tags: event.target.value });
  };

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (
      <Dialog
        open={this.state.show}
        onClose={this.hideDialog}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit canned response</DialogTitle>
        <DialogContent>
          <Typography className={css(styles.name)}>Tag name:</Typography>
          <Input
            margin="dense"
            onChange={this.handleChange}
            value={this.state.tags}
            disableUnderline
            multiline
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
          <Button onClick={this.hideDialog} className={css(styles.cancel)}>
            Cancel
          </Button>
          <Button onClick={this.editCan} className={css(styles.create)}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditCanDialog.propTypes = {
  edit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: '3%',
    marginBottom: '3%',
  },
  a: {
    color: Colors.canMainColor,
    textDecoration: 'none',
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
    color: '#777',
    marginBottom: '2%',
    marginTop: '3%',
  },
  nameInput: {
    fontSize: '125%',
    borderBottom: '1px solid #777',
  },
  desc: {
    color: '#777',
    marginTop: '6%',
    marginBottom: '2%',
  },
  descInput: {
    fontSize: '100%',
    borderBottom: '1px solid #777',
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
});
