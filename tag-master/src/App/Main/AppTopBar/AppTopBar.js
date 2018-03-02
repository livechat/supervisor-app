import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Icon } from 'material-ui';
import { StyleSheet, css } from 'aphrodite';

export default class AppTopBar extends Component {
  render(){
    return (
      <AppBar>
        <Toolbar className={css(styles.container)}>
          <Icon fontSize className={css(styles.icon)}>visibility</Icon>
          <Typography variant="title" className={css(styles.title)}>
            Supervisor
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

const blinkAnimation = {
  '0%': { transform: 'scaleY(1)' },
  '7%': { transform: 'scaleY(0)' },
  '14%': { transform: 'scaleY(1)' },
  '100%': { transform: 'scaleY(1)' },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3',
    height: '7vh',
  },
  icon: {
    color: 'white',
    fontSize: '200%',
    animationName: [blinkAnimation],
    animationDuration: '2.5s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  title: {
    color: 'white',
    paddingLeft: '4vw',
  },
});