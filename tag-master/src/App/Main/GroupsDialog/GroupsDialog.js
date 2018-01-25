import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, RadioGroup, FormControlLabel, Radio, DialogActions, Button } from 'material-ui';

export default class GroupsDialog extends Component {

  state = {
    show: false,
    groupName: 'None',
    groups: [],
    tagOrCan: 0,
  };

  changeDialogState = (groupName, tagOrCan) => {
    const groups = window.LiveChat_groups.map(item => item.name);
    this.setState({
      show: !this.state.show, groupName, groups, tagOrCan,
    });
  };

  hideDialog = () => {
    this.setState({ show: !this.state.show });
  };

  changeGroup = () => {
    this.props.change(this.state.groupName);
    this.hideDialog();
  };

  handleChange = (event, groupName) => {
    this.setState({ groupName });
  };

  handleEntering = () => {
    this.radioGroup.focus();
  };

  render() {
    return (
      <Dialog
        open={this.state.show}
        onClose={this.hideDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Group</DialogTitle>
        <DialogContent style={{ width: '15em' }}>
          <RadioGroup
            ref={(node) => {
              this.radioGroup = node;
            }}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.groupName}
            onChange={this.handleChange}
          >
            {this.state.groups.map(option => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio style={{ color: this.state.tagOrCan ? window.canMainColor : window.tagMainColor }} />}
                label={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideDialog} style={{ color: this.state.tagOrCan ? window.canMainColor : window.tagMainColor }}>
            Cancel
          </Button>
          <Button onClick={this.changeGroup} style={{ color: this.state.tagOrCan ? window.canMainColor : window.tagMainColor }}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GroupsDialog.propTypes = {
  change: PropTypes.func.isRequired,
};
