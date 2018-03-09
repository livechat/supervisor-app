import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, ListItem, Typography, Collapse, List, ListItemText, Grid } from 'material-ui';
import { StyleSheet, css } from 'aphrodite';
import Colors from '../Colors';

export default class TagListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      showInfo: false,
      date: null,
    };

    const time = new Date(this.state.item.creation_date * 1000);
    this.state.date = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
  }

  getUsedCount = (count) => {
    return count.inChats + count.inTickets;
  };

  openInformation = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  deleteTag = (e) => {
    e.stopPropagation();
    this.props.delete(this.state.item.name, this.state.item.group);
  };

  getGroupName = () => {
    const found =  this.props.groups.filter(item => item.id === this.state.item.group);
    if (found[0]) {
      return found[0].name;
    }
    return 'All operators';
  };

  render() {
    return (
      <Grid>
        <ListItem button onClick={this.openInformation}>
          {this.state.showInfo ? <Icon className={css(styles.info)}>info</Icon>
            : <Icon className={css(styles.info)}>info_outline</Icon>}
          <Typography className={css(styles.name)}>#{this.state.item.name}</Typography>
          <Typography className={css(styles.count)}>
            Usage: {this.getUsedCount(this.state.item.count)}
          </Typography>
          <Icon onClick={this.deleteTag} className={css(styles.remove)}>
            remove_circle_outline
          </Icon>
        </ListItem>

        <Collapse component="li" in={this.state.showInfo} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemText inset primary={
                <span>Used in chats: <strong>{this.state.item.count.inChats}</strong></span>
              }/>
            </ListItem>
            <ListItem>
              <ListItemText inset primary={
                <span>Used in tickets: <strong>{this.state.item.count.inTickets}</strong></span>
              }/>
            </ListItem>
            { this.state.item.author ?  <ListItem>
              <ListItemText inset primary={
                <span>Author: <strong>{this.state.item.author}</strong></span>
                }/>
            </ListItem> : null}
            <ListItem>
              <ListItemText inset primary={
                <span>Created at: <strong>{this.state.date}</strong></span>
              }/>
            </ListItem>
            <ListItem>
              <ListItemText inset primary={
                <span>Group: <strong>{this.getGroupName()}</strong></span>
              }/>
            </ListItem>
          </List>
        </Collapse>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    color: Colors.tagMainColor,
    fontSize: '250%',
  },
  name: {
    color: '#444',
    marginLeft: '3%',
    flex: 1,
    fontSize: '96%',
    fontWeight: '500',
  },
  count: {
    fontSize: '80%',
    fontWeight: '300',
    color: '#757575',
    marginRight: '2%',
  },
  remove: {
    color: '#F44336',
    fontSize: '250%',
  },
});

TagListItem.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line
  delete: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};
