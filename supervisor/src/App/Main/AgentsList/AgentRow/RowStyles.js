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
    backgroundColor: '#64B5F6',
    borderRadius: '2%',
    marginBottom: '1vh',
    cursor: 'pointer',
  },
  workingHours: {
    color:'#0288D1'
  },
  chattingTime: {
    color:'#388E3C'
  },
  lastChat: {
    color:'#FF5722'
  },
  chatRatings: {
    color:'#9C27B0'
  },
  optionsContainer: {
    paddingBottom: '0.5vh',
    paddingTop: '0.5vh',
    marginRight: '12vw',
  },
  optionButton: {
    marginTop: '2.5vh',
    marginBottom: '2.5vh',
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
  },
  optionSpan: {
    color: '#555'
  },
  optionIcon: {
    paddingRight: '3vw',
    color: '#777'
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
  permissionOwner: {
    margin: 0,
    backgroundColor:'#2196F3',
    borderRadius: '5%',
    padding: '1vw 3vw 1vw 3vw',
    color: 'white',
    fontSize: '80%',
    fontWeight: '500',
  },
  permissionAdmin: {
    margin: 0,
    backgroundColor:'#EF5350',
    borderRadius: '5%',
    padding: '1vw 3vw 1vw 3vw',
    color: 'white',
    fontSize: '80%',
    fontWeight: '500',
  },
  permissionAgent: {
    margin: 0,
    backgroundColor:'#888',
    borderRadius: '5%',
    padding: '1vw 3vw 1vw 3vw',
    color: 'white',
    fontSize: '80%',
    fontWeight: '500',
  },
  online: {
    margin: 0,
    color: '#4CAF50',
    fontSize: '86%',
    paddingTop: '1vh',
  },
  offline: {
    color: '#EF5350',
    margin: 0,
    fontSize: '86%',
    paddingTop: '1vh',
  },
});