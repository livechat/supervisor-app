import {StyleSheet} from "aphrodite";

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '95%',
    marginBottom: '1vh',
    cursor: 'pointer',
  },
  containerSelected: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '95%',
    border: '2px solid #FF9800',
    borderRadius: '2%',
    marginBottom: '1vh',
    cursor: 'pointer',
  },
  optionsContainer: {
    paddingBottom: '0.5vh',
    paddingTop: '0.5vh',
    marginRight: '12vw',
  },
  arrowDown: {
    fontSize: 36,
    color: '#888',
  },
  textRow: {
    color: '#555',
    paddingLeft: '6vw',
  },
  arrowUp: {
    fontSize: 36,
    color: '#F57C00',
  },
  item: {
    backgroundColor: 'white',
    marginTop: '1vh',
    width: '95%',
  },
  itemSelected: {
    backgroundColor: '#E3F2FD',
    padding: '2vw',
    paddingLeft: '1vw',
    marginTop: '1vh',
    marginBottom: '1vh',
    width: '95%',
  },
  avatar: {
    width: '11vw',
    height: '11vw',
    marginRight: '2vw',
    borderRadius: '50%',
    backgroundColor: '#AAA'
  },
  leftContainer: {
    display: 'flex',
    flex: 1,
    paddingLeft: '2vw',
    flexDirection: 'column'
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  name: {
    margin: 0,
    color: '#555',
    fontWeight: '600',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  },
  login: {
    margin: 0,
    color: '#888',
    fontSize: '80%',
    paddingTop: '0.5vh',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  },
});