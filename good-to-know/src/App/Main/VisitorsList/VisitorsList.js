import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from "aphrodite";
import { FormControl, Input } from 'material-ui';
import { List } from 'material-ui';
import VisitorRow from "./ListRow/VisitorRow";

export default class VisitorsList extends Component {

  state = {
    visitorsList: [],
    search: '',
    tabIndex: 0,
  };

  createVisitorsList = () => {
    const visitorsList = this.props.visitors.map(child => child);
    this.setState({ visitorsList });
  };

  componentDidMount() {
    this.createVisitorsList();
  }

  searchForVisitor = (event) => {
    this.setState({ search: event.target.value });
  };

  changeTab = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    return(
      <div>
        <div className={css(styles.listContainer)}>
          <List className={css(styles.list)}>
            {this.state.visitorsList
              .filter(visitor => visitor.name.toLowerCase().includes(this.state.search.toLowerCase()))
              .map(visitor => <VisitorRow key={visitor.id} data={visitor}/>)}
          </List>
        </div>
        <FormControl fullWidth className={css(styles.searchForm)}>
          <Input
            className={css(styles.search)}
            disableUnderline
            placeholder="Search..."
            value={this.state.search}
            onChange={this.searchForVisitor}
          />
        </FormControl>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: '82vh',
    overflow: 'scroll',
    paddingTop: '1vh',
    backgroundColor: '#f5f5f5',
  },
  tabs: {
    backgroundColor: '#f5f5f5',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '12%',
  },
  searchForm: {
    position: 'absolute', bottom: 0,
  },
  search: {
    padding: '2%',
    paddingLeft: '5%',
    fontSize: '120%',
    fontWeight: '400',
    backgroundColor: '#EEEEEE',
  },
});

VisitorsList.propTypes = {
  visitors: PropTypes.array,
};

VisitorsList.defaultProps = {
  visitors: []
};
