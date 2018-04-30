import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn, fadeOut } from 'react-animations';
import * as LivechatVisitorSDK from '@livechat/livechat-visitor-sdk';
import BulbIcon from './BulbIcon';
import RequestForm from './RequestForm';

export default class FeatureRequest extends Component {
  state = {
    isRequestFormVisible: false,
    showBulb: true,
  };

  componentDidMount() {
    this.visitorSDK = LivechatVisitorSDK.init({
      license: this.props.license,
    });
  };

  sendFeatureRequest = (email, description) => {
    this.visitorSDK
      .sendTicketForm({
        name: 'Feature request',
        email,
        subject: 'Sent From Feature Request Widget',
        message: description,
      })
      .then(() => this.requestForm.showTicketSendStatus(true))
      .catch(() => this.requestForm.showTicketSendStatus(false))
  };

  showRequestForm = () => {
    this.setState({ isRequestFormVisible: true });
    setTimeout(() => {
      this.setState({ showBulb: false });
    }, 450);
  };

  hideRequestForm = () => {
    setTimeout(() => {
      this.setState({
        isRequestFormVisible: false,
        showBulb: true,
      });
    }, 450);
  };

  deepHide = () => {
    this.setState({
      isRequestFormVisible: false,
      showBulb: true,
    });
  };

  render() {
    return (
      <div className={css(styles[this.props.position])}>
        <div className={css(this.state.isRequestFormVisible ? styles.bulbHide : styles.bulbShow)}>
          {this.state.showBulb
          && <BulbIcon position={this.props.position} show={this.showRequestForm} />}
        </div>
        {this.state.isRequestFormVisible &&
          <RequestForm
            position={this.props.position}
            ref={ref => this.requestForm = ref}
            send={this.sendFeatureRequest}
            deepHide={this.deepHide}
            hide={this.hideRequestForm}
          />
        }
      </div>
    );
  }
}

FeatureRequest.propTypes = {
  license: PropTypes.number.isRequired,
  position: PropTypes.string,
};

FeatureRequest.defaultProps = {
  position: 'bottomLeft',
};

const styles = StyleSheet.create({
  bottomLeft: {
    position: 'fixed',
    bottom: '0.5em',
    left: '0.75em',
  },
  bottomRight: {
    position: 'fixed',
    bottom: '0.5em',
    right: '0.75em',
  },
  bulbShow: {
    animationName: [fadeIn],
    animationDuration: '0.25s',
  },
  bulbHide: {
    animationName: [fadeOut],
    animationDuration: '0.5s',
  },
});
