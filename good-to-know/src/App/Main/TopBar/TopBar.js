import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css} from 'aphrodite';
import { AppBar, Toolbar, Icon, Typography } from 'material-ui';

export default class TopBar extends Component {

  onRefreshClick = () => {
    this.props.refresh();
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={css(styles.topBar)}>
            <Icon>thumb_up</Icon>
            <Typography className={css(styles.title)} variant="title" color="inherit">
              Good To Know - Visitors
            </Typography>
            <div onClick={this.onRefreshClick} className={css(styles.refreshContainer)}>
              <Icon className={css(styles.refreshIcon)}>refresh</Icon>
              <span className={css(styles.refresh)}>Refresh</span>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  refresh: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#FB8C00',
  },
  title: {
    color: 'white',
    paddingLeft: '4%',
    flex: 1,
    fontSize: '116%',
  },
  refreshContainer: {
    cursor: 'pointer',
    border: '1px solid white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6%',
    ':hover': {
      backgroundColor: '#ffffffDD'
    }
  },
  refresh: {
    color: 'white',
    paddingLeft: '1vw',
    paddingRight: '1vw',
    fontSize: '90%',
  },
  refreshIcon: {
    color: 'white',
    paddingLeft: '1vw',
  }
});
