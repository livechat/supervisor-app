import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const success = require('./assets/success.png');

export default class TicketStatus extends Component {

  onCancelClicked = () => {
    this.props.hide(-1);
  };

  render() {
    return (
      <div className={css(styles.container)}>
        <span className={css(styles.title)}>Request sent</span>
        <img className={css(styles.icon)} src={success} alt="" />
        <button onClick={this.onCancelClicked} className={css(styles.dismiss)}>Dismiss</button>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '15em',
    height: '15em',
    border: '2px solid #1E88E5',
    bottom: 0,
    left: 0,
    marginLeft: '1em',
    borderRadius: '2em',
    marginBottom: '1em',
    backgroundColor: '#f6f8fa',
  },
  title: {
    color: '#666',
    fontWeight: '500',
    fontSize: '110%',
  },
  icon: {
    width: '10em',
    height: '10em',
  },
  dismiss: {
    cursor: 'pointer',
    padding: '0.5em 1.5em 0.5em 1.5em',
    marginRight: '1em',
    borderRadius: '1em',
    border: '1px solid #43A047',
    color: '#43A047',
    backgroundColor: 'white',
    fontSize: '100%',
    ":focus": {
      outline: 'none',
    },
    ":hover": {
      outline: 'none',
    },
    ":active": {
      outline: 'none',
    },
  },
});
