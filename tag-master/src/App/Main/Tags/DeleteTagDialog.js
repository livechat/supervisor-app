import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from 'material-ui';
import Colors from '../Colors';

export default class DeleteTagDialog extends Component {

  state = {
    show: false,
    name: '',
    group: 0,
  };

  changeDialogState = (name, group) => {
    this.setState({ show: !this.state.show, name, group });
  };

  hideDialog = () => {
    this.setState({ show: !this.state.show });
  };

  deleteTag = () => {
    this.props.delete(this.state.name, this.state.group);
    this.hideDialog();
  };

  render() {
    return (
      <Dialog
        open={this.state.show}
        onClose={this.hideDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete #{this.state.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After deletion, you will lose all data related to this tag and also you won't be able to use it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideDialog} className={css(styles.cancel)}>
            Cancel
          </Button>
          <Button onClick={this.deleteTag} className={css(styles.delete)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteTagDialog.propTypes = {
  delete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  cancel: {
    color: Colors.tagMainColor,
  },
  delete: {
    color: '#F44336',
  }
});
