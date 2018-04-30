import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { fadeInUp, fadeOutDown } from 'react-animations';
import Email from './Email';
import Description from './Description';
import TicketStatus from './TicketStatus';

const bulbOn = require('./assets/bulbOn.png');

export default class RequestForm extends Component {

  state = {
    isEmailWrong: false,
    isDescriptionWrong: false,
    hideAnimation: false,
    showTicketStatus: -1,
  };

  showTicketSendStatus = (status) => {
    if (status === -1) this.props.deepHide();
    this.setState({ showTicketStatus: status });
  };

  onCancelClicked = () => {
    this.setState({ hideAnimation: true });
    this.props.hide();
  };

  onSendClicked = () => {
    const email = this.email.getInputValue();
    const description = this.description.getInputValue();

    this.setState({
      isEmailWrong: !email,
      isDescriptionWrong: !description,
    });

    if (email && description) this.props.send(email, description);
  };

  render() {
    if (this.state.showTicketStatus >= 0) {
      return (<TicketStatus
        hide={this.showTicketSendStatus}
        status={this.state.showTicketStatus}
      />);
    }
    return (
      <div className={css([
       this.state.hideAnimation ? styles.containerHide : styles.container,
       this.props.position === 'bottomLeft' ? styles.positionLeft : styles.positionRight
      ])}
      >
        <div className={css(styles.topBar)}>
          <span className={css(styles.title)}>Feature</span>
          <img
            className={css(styles.icon)}
            src={bulbOn}
            alt=""
          />
          <span className={css(styles.title)}>Request</span>
        </div>
        <div className={css(styles.inputContainer)}>
          <Email
            error={this.state.isEmailWrong}
            ref={ref => this.email = ref}
          />
          <Description
            error={this.state.isDescriptionWrong}
            ref={ref => this.description = ref}
          />
        </div>
        <div className={css(styles.buttonsContainer)}>
          <button onClick={this.onCancelClicked} className={css(styles.cancel)}>
            Cancel
          </button>
          <button onClick={this.onSendClicked} className={css(styles.send)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '20em',
    border: '2px solid #1E88E5',
    bottom: 0,
    borderRadius: '2em',
    marginBottom: '1em',
    backgroundColor: '#f6f8fa',
    animationName: [fadeInUp],
    animationDuration: '0.5s',
  },
  containerHide: {
    position: 'absolute',
    width: '20em',
    border: '2px solid #1E88E5',
    bottom: 0,
    borderRadius: '2em',
    marginBottom: '1em',
    backgroundColor: '#f6f8fa',
    animationName: [fadeOutDown],
    animationDuration: '0.5s',
  },
  inputContainer: {
    padding: '1em 1.5em 1em 1.5em',
  },
  positionLeft: {
    marginLeft: '0.75em',
    left: 0,
  },
  positionRight: {
    marginRight: '0.75em',
    right: 0,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: '2em',
    borderTopRightRadius: '2em',
    paddingTop: '0.25em',
    paddingBottom: '0.25em',
    justifyContent: 'center',
  },
  title: {
    color: '#555',
    fontWeight: '500',
    fontSize: '120%',
  },
  icon: {
    width: '2.5em',
    height: '2.5em',
    marginLeft: '1.25em',
    marginRight: '1.25em',
    backgroundColor: '#1E88E5',
    borderRadius: '50%',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '20em',
    marginTop: '0.25em',
    marginBottom: '1em',
    justifyContent: 'center',
  },
  cancel: {
    cursor: 'pointer',
    padding: '0.5em 1.5em 0.5em 1.5em',
    marginRight: '1em',
    borderRadius: '1em',
    border: '1px solid #aaa',
    color: '#aaa',
    fontSize: '100%',
    backgroundColor: 'white',
    ":focus": {
      outline: 'none',
    },
    ":hover": {
      outline: 'none',
      border: '1px solid #EF5350',
      color: '#EF5350',
    },
    ":active": {
      outline: 'none',
    },
  },
  send: {
    cursor: 'pointer',
    padding: '0.5em 2em 0.5em 2em',
    marginLeft: '1em',
    borderRadius: '1em',
    border: '1px solid #666',
    color: '#666',
    fontSize: '100%',
    backgroundColor: 'white',
    ":focus": {
      outline: 'none',
    },
    ":hover": {
      outline: 'none',
      border: '1px solid #4CAF50',
      color: '#4CAF50',
    },
    ":active": {
      outline: 'none',
    },
  },
});
