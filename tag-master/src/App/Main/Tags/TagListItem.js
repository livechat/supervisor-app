import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, ListItem, Typography, Collapse, List, ListItemText, Grid } from 'material-ui';

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
    const found =  window.LiveChat_groups.filter(item => item.id === this.state.item.group);
    if (found[0]) {
      return found[0].name;
    }
    return 'All operators';
  };

  render() {
    return (
      <Grid>
        <ListItem button onClick={this.openInformation}>
          {this.state.showInfo ? <Icon style={styles.info}>info</Icon>
            : <Icon style={styles.info}>info_outline</Icon>}
          <Typography style={styles.name}>#{this.state.item.name}</Typography>
          <Typography
            style={styles.count}
          >Used {this.getUsedCount(this.state.item.count)} times
          </Typography>
          <Icon onClick={this.deleteTag} style={styles.remove}>
            remove_circle_outline
          </Icon>
        </ListItem>

        <Collapse component="li" in={this.state.showInfo} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemText inset primary={'Used in chats: ' + this.state.item.count.inChats} />
            </ListItem>
            <ListItem>
              <ListItemText inset primary={'Used in chats: ' + this.state.item.count.inTickets} />
            </ListItem>
            { this.state.item.author ?  <ListItem>
              <ListItemText inset primary={'Author: ' + this.state.item.author} />
            </ListItem> : null}
            <ListItem>
              <ListItemText inset primary={'Created at: ' + this.state.date} />
            </ListItem>
            <ListItem>
              <ListItemText inset primary={'Group: ' + this.getGroupName()} />
            </ListItem>
          </List>
        </Collapse>
      </Grid>
    );
  }
}

const styles = {
  info: {
    color: window.tagMainColor, fontSize: '250%',
  },
  name: {
    color: '#333', paddingLeft: '4%', flex: 1, fontSize: '110%', fontWeight: '500',
  },
  count: {
    flex: 1, fontSize: '90%', fontWeight: '300', color: '#757575',
  },
  remove: {
    color: '#F44336', fontSize: '250%',
  },
};

TagListItem.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line
  delete: PropTypes.func.isRequired,
};
