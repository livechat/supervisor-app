import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import { Collapse, Icon } from 'material-ui';
import { ListItem } from 'material-ui/List';
import styles from './RowStyles';

export default class VisitorRow extends Component {

  state = {
    showMore: false,
  };

  onVisitorSelected = () => {
    this.setState(prevState => { return { showMore: !prevState.showMore }; });
  };

  render() {
    const visitor = this.props.data;
    return (
      <div onClick={this.onVisitorSelected} className={css(this.state.showMore ? styles.containerSelected : styles.container)}>
        <ListItem className={css(styles.item)}>
          <img className={css(styles.avatar)} src={`https://lipis.github.io/flag-icon-css/flags/1x1/${visitor.country_code.toLowerCase()}.svg`} alt=""/>
          <div className={css(styles.leftContainer)}>
            <p className={css(styles.name)}>{visitor.name ? visitor.name : 'Visitor'}</p>
            <p className={css(styles.login)}>{visitor.country ? visitor.country : 'Visitor'} / {visitor.city ? visitor.city : 'Visitor'}</p>
          </div>
          <div className={css(styles.rightContainer)}>
            <Icon className={css(this.state.showMore ? styles.arrowUp : styles.arrowDown)}>
              {this.state.showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </Icon>
          </div>
        </ListItem>
        <Collapse className={css(styles.optionsContainer)} in={this.state.showMore} timeout="auto" unmountOnExit>
          {visitor.page_entered && <p className={css(styles.textRow)}>Entered page at: <strong>{visitor.page_entered}</strong></p>}
          {visitor.last_visit && <p className={css(styles.textRow)}>Last visit: <strong>{visitor.last_visit}</strong></p>}
          {visitor.timezone && <p className={css(styles.textRow)}>Timezone: <strong>{visitor.timezone}</strong></p>}
          {visitor.page_views !== 0 && <p className={css(styles.textRow)}>Page views: <strong>{visitor.page_views}</strong></p>}
          {visitor.greetings_accepted !== 0 && <p className={css(styles.textRow)}>Greetings Accepted: <strong>{visitor.greetings_accepted}</strong></p>}
          {visitor.greetings_refused !== 0 && <p className={css(styles.textRow)}>Greetings Refused: <strong>{visitor.greetings_refused}</strong></p>}
          {visitor.page_current && <p className={css(styles.textRow)}>
            Current page: <a
              style={wordBreak}
              target="_blank"
              rel="noopener noreferrer"
              href={visitor.page_current}
            >{visitor.page_current}</a></p>}
        </Collapse>
      </div>
    );
  }
}

const wordBreak = {
  wordWrap: 'break-word',
  wordBreak: 'break-all'
};

VisitorRow.propTypes = {
  data: PropTypes.object.isRequired,
};
