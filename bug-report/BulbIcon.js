import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { pulse, fadeInLeft, fadeInRight } from 'react-animations';

const bulbOn = require('./assets/bulbOn.png');
const bulbOff = require('./assets/bulbOff.png');

export default class BulbIcon extends Component {

  state = {
    isBulbOn: false,
  };

  startWritingRequest = () => {
    this.props.show();
  };

  turnBulbOn = () => {
    this.setState({ isBulbOn: true });
  };

  turnBulbOff = () => {
    this.setState({ isBulbOn: false });
  };

  render() {
    return (
      <div
        onMouseEnter={this.turnBulbOn}
        onMouseLeave={this.turnBulbOff}
        onClick={this.startWritingRequest}
        className={css(this.state.isBulbOn ? styles.containerShake : styles.container)}
      >
        {this.state.isBulbOn && this.props.position === 'bottomRight'
        && <div className={css([styles.requestContainer, styles.animationRight])}>
          <p className={css(styles.requestText)}>Request a feature!</p>
        </div>}
        <div className={css(styles.iconContainer)}>
          <img
            className={css(styles.icon)}
            src={this.state.isBulbOn ? bulbOn : bulbOff}
            alt=""
          />
        </div>
        {this.state.isBulbOn && this.props.position === 'bottomLeft'
        && <div className={css([styles.requestContainer, styles.animationLeft])}>
          <p className={css(styles.requestText)}>Request a feature!</p>
        </div>}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
  containerShake: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    animationName: [pulse],
    animationDuration: '0.3s',
    animationTimingFunction: 'linear',
  },
  iconContainer: {
    width: '4.5em',
    height: '4.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E88E5',
    borderRadius: '50%',
    border: '0.2em solid #64B5F6',
  },
  requestContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E88E5',
    height: '2.5em',
    border: '0.2em solid #64B5F6',
    borderRadius: '1em',
    width: '11em',
    marginLeft: '0.5em',
    animationDuration: '0.2s',
    animationTimingFunction: 'linear',
  },
  animationLeft: {
    animationName: [fadeInLeft],
  },
  animationRight: {
    animationName: [fadeInRight],
  },
  requestText: {
    color: 'white',
  },
  icon: {
    width: '4em',
    height: '4em',
  },
});
