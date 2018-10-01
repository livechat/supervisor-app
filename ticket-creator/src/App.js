import React, { Component } from 'react';
import LiveChat from 'livechat-widget-sdk';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

export default class App extends Component {
  state = {
    accessToken: null,
    agent: null,
    subject: '',
    message: '',
    isSending: false,
  };

  async componentDidMount() {
    LiveChat.init({
      client_id: 'your_client_id',
    });

    try {
      const result = await LiveChat.getAccessToken();
      this.setState({
        accessToken: result.access_token,
        agent: result.entity_id
      });
    } catch (e) {
      this.setState({ accessToken: 'error' });
      console.error(e);
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createTicket = async () => {
    const {
      subject,
      message,
      isSending,
      accessToken,
      agent
    } = this.state;

    if ( !subject || !message) {
      alert('Fill up all required fields');
      return;
    }

    if (isSending) return;

    this.setState({ isSending: true });

    try {
     const result = await LiveChat.createTicket(accessToken, {
        requester: {
          mail: agent
        },
        subject,
        message,
      });

     if (result.data.subject) {
       this.setState({ isSending: false }, () => {
         alert('Ticket created successfully.');
       });
     } else {
       alert('Something went wrong. Please check out logs.');
       this.setState({ isSending: false });
       console.error(result);
     }
    } catch (e) {
      alert('Something went wrong. Please check out logs.');
      this.setState({ isSending: false });
      console.error(e);
    }
  };

  render() {
    const {
      accessToken,
      subject,
      message,
      isSending
    } = this.state;

    if (accessToken === 'error') {
      return <span>Authorization problem</span>
    }

    return (
      <div className="container">
        <span className="title">
          LiveChat Ticket Creator
        </span>
        <TextField
          label="Subject"
          fullWidth
          helperText="Type subject of your ticket"
          required
          value={subject}
          onChange={this.handleChange('subject')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Message"
          required
          multiline
          helperText="Enter message of your ticket"
          rows={3}
          rowsMax={5}
          value={message}
          onChange={this.handleChange('message')}
          margin="normal"
          variant="outlined"
        />

        <div
          onClick={this.createTicket}
          className="button"
        >
          {isSending
            ? <CircularProgress size={25} style={spinnerStyle}/>
            : 'Create Ticket'}
        </div>
      </div>
    );
  }
}

const spinnerStyle = { color: 'white'};
