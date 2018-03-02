import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Icon, ListItem, Typography, Collapse, List, ListItemText } from 'material-ui';
import Colors from '../Colors';

export default class CanListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      showInfo: false,
      date: null,
    };

    const time = this.state.item.creation_date
      ? new Date(this.state.item.creation_date * 1000)
      : new Date(this.state.item.modification_date * 1000);

    this.state.date = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
  }

  getTags = () => {
    let tags = '';
    this.state.item.tags.forEach((child) => {
      tags += ' #'+child;
    });
    return tags;
  };

  openInformation = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  deleteCan = (e) => {
    e.stopPropagation();
    this.props.delete(this.state.item.tags, this.state.item.id);
  };

  render() {
    return (
      <div>
        <ListItem className={css(styles.wrapper)} button onClick={this.openInformation}>
          {this.state.showInfo ? <Icon className={css(styles.icon)}>info</Icon>
            : <Icon className={css(styles.icon)}>info_outline</Icon>}
          <div className={css(styles.wrapper)}>
            <Typography className={css(styles.tags)}>{this.getTags()}</Typography>
            <Typography className={css(styles.desc)}>{this.state.item.text}</Typography>
          </div>
          <Icon onClick={this.deleteCan} className={css(styles.remove)}>
            remove_circle_outline
          </Icon>
        </ListItem>
        <Collapse component="li" in={this.state.showInfo} timeout="auto" unmountOnExit>
          <List>
            { this.state.item.created_by ?  <ListItem>
              <ListItemText inset primary={
                <span>Author: <strong>{this.state.item.created_by}</strong></span>
              }/>
            </ListItem> : <ListItem><ListItemText inset primary={
              <span>Author: <strong>default</strong></span>
            }/>
            </ListItem>}
            <ListItem>
              <ListItemText inset primary={
                <span>Created at: <strong>{this.state.date}</strong></span>
              }/>
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '91%',
    maxWidth: '91%',
  },
  icon: {
    color: Colors.canMainColor,
    fontSize: '250%',
    alignSelf: 'flex-start',
  },
  tags: {
    color: '#333',
    paddingLeft: '4%',
    paddingRight: '4%',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    flex: 1,
    fontSize: '100%',
    fontWeight: '500',
  },
  desc: {
    paddingLeft: '4%',
    paddingRight: '4%',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    flex: 1,
    fontWeight: '300',
    color: '#757575',
  },
  remove: {
    color: '#F44336',
    fontSize: '250%',
    alignSelf: 'flex-start',
  },
});

CanListItem.propTypes = {
  item: PropTypes.object.isRequired, //eslint-disable-line
  delete: PropTypes.func.isRequired,
};
