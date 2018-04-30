import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import TextareaAutosize from 'react-autosize-textarea';

export default class Description extends Component {

  state = {
    value: '',
  };

  onValueChange = event => this.setState({ value: event.target.value });

  getInputValue = () => this.state.value;

  render() {
    return (
      <div className={css(styles.container)}>
        <span
          className={css(styles.title)}
        >
          Feature Description:
        </span>
        <TextareaAutosize
          className={css(this.props.error ? styles.inputError : styles.input)}
          rows={4}
          maxRows={10}
          value={this.state.value}
          onChange={this.onValueChange}
          placeholder="Enter feature description..."
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: '1em',
    flexDirection: 'column',
  },
  title: {
    color: '#777',
    fontSize: '90%',
    marginLeft: '0.5em',
  },
  input: {
    fontSize: '100%',
    marginTop: '0.5em',
    borderRadius: '1em',
    minHeight: '5em',
    border: '1px solid #ccc',
    padding: '0.5em 0.75em 0.5em 0.75em',
    color: '#555',
    ":focus": {
      outline: 'none',
    },
    "::placeholder": {
      color: '#AAA',
      fontSize: '90%',
    },
  },
  inputError: {
    fontSize: '100%',
    marginTop: '0.5em',
    borderRadius: '1em',
    minHeight: '5em',
    border: '1px solid #EF5350',
    padding: '0.5em 0.75em 0.5em 0.75em',
    color: '#555',
    ":focus": {
      outline: 'none',
    },
    "::placeholder": {
      color: '#E57373',
      fontSize: '90%',
    },
  },
});
