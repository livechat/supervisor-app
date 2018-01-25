import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, ListItem, Typography, Collapse, List, ListItemText, Grid } from 'material-ui';

export default class CanListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      showInfo: false,
      date: null,
    };

    const time = this.state.item.creation_date ? new Date(this.state.item.creation_date * 1000) : new Date(this.state.item.modification_date * 1000);
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
      <Grid>
        <ListItem button onClick={this.openInformation}>
          {this.state.showInfo ? <Icon style={styles.icon}>info</Icon>
            : <Icon style={styles.icon}>info_outline</Icon>}

          <Grid style={{ flex: 1 }}>
            <Typography style={styles.tags}>{this.getTags()}</Typography>
            <Typography style={styles.desc}>{this.state.item.text}</Typography>
          </Grid>

          <Icon onClick={this.deleteCan} style={styles.remove}>
            remove_circle_outline
          </Icon>

        </ListItem>

        <Collapse component="li" in={this.state.showInfo} timeout="auto" unmountOnExit>
          <List>
            { this.state.item.created_by ?  <ListItem>
              <ListItemText inset primary={'Author: ' + this.state.item.created_by} />
            </ListItem> : <ListItem><ListItemText inset primary={'Author: default'} /></ListItem>}
            <ListItem>
              <ListItemText inset primary={'Created at: ' + this.state.date} />
            </ListItem>
          </List>
        </Collapse>

      </Grid>
    );
  }
}

const styles = {
  icon: {
    color: window.canMainColor, fontSize: '250%',
  },
  tags: {
    color: '#333', paddingLeft: '4%', paddingRight: '4%', flex: 1, fontSize: '100%', fontWeight: '500',
  },
  desc: {
    paddingLeft: '4%', paddingRight: '4%', flex: 1, fontSize: '90%', fontWeight: '300', color: '#757575',
  },
  remove: {
    color: '#F44336', fontSize: '250%',
  },
};

CanListItem.propTypes = {
  item: PropTypes.object.isRequired, //eslint-disable-line
  delete: PropTypes.func.isRequired,
};
