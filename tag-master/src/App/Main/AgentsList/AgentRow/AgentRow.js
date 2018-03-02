import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import { Collapse, Button, Icon } from 'material-ui';
import { ListItem } from 'material-ui/List';
import styles from './RowStyles';

export default class AgentRow extends Component {

  state = {
    showOptions: false,
  };

  onAgentSelected = () => {
    this.setState(prevState => { return { showOptions: !prevState.showOptions }; });
  };

  openInfoDialog = (index) => () => {
    this.props.open(index, this.props.data.login);
  };

  render() {
    const agent = this.props.data;
    const permission = agent.permission.toLowerCase().length > 6
      ? agent.permission.toLowerCase().substring(0, 5)
      : agent.permission.toLowerCase();

    return (
      <div className={css(this.state.showOptions ? styles.containerSelected : styles.container)}>
        <ListItem onClick={this.onAgentSelected} className={css(styles.item)}>
          <img className={css(styles.avatar)} src={'https://' + agent.avatar} alt="" />
          <div className={css(styles.leftContainer)}>
            <p className={css(styles.name)}>{agent.name}</p>
            <p className={css(styles.login)}>{agent.login}</p>
          </div>
          <div className={css(styles.rightContainer)}>
            <p className={css(permissionTypes[permission].style)}>{permission.charAt(0).toUpperCase() + permission.slice(1)}</p>
            <p className={css(agent.status === 'accepting chats' ? styles.online : styles.offline)}>
              {agent.status === 'accepting chats' ? 'online' : 'offline'}
            </p>
          </div>
        </ListItem>
        <Collapse className={css(styles.optionsContainer)} in={this.state.showOptions} timeout="auto" unmountOnExit>
          <Button onClick={this.openInfoDialog(0)} className={css(styles.optionButton)}>
            <Icon className={css(styles.optionIcon)}>access_time</Icon>
            <span className={css(styles.optionSpan)}>Show <span className={css(styles.workingHours)}>working hours</span> this week</span>
          </Button>
          <Button onClick={this.openInfoDialog(1)} className={css(styles.optionButton)}>
            <Icon className={css(styles.optionIcon)}>timelapse</Icon>
            <span className={css(styles.optionSpan)}>Show <span className={css(styles.chattingTime)}>chatting time</span> this week</span>
          </Button>
          <Button onClick={this.openInfoDialog(2)} className={css(styles.optionButton)}>
            <Icon className={css(styles.optionIcon)}>star</Icon>
            <span className={css(styles.optionSpan)}>Show <span className={css(styles.chatRatings)}>chat ratings</span> this week</span>
          </Button>
        </Collapse>
      </div>
    );
  }
}

AgentRow.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};

const permissionTypes = {
  owner: {
    style: styles.permissionOwner,
  },
  admin: {
    style: styles.permissionAdmin,
  },
  normal: {
    style: styles.permissionAgent,
  },
};