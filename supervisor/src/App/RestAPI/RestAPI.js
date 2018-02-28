import Config from '../Config';
import axios from 'axios';

class RestAPI {

  getAgents = (accessToken) => {
    return new Promise((resolve, reject) => {
      axios.get(Config.server_url + '/agents', {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'X-API-Version': '2',
        },
      })
        .then(response => {
          parseInt(response.status, 10) === 200 ? resolve(response.data) : reject('error');
        })
        .catch(error => reject('error'));
    })
  };

  getChatRatings = (accessToken, agentName) => {
    return new Promise((resolve, reject) => {
      axios.get(Config.server_url + '/ratings/week', {
        headers: {
          "Authorization": 'Bearer ' + accessToken,
          "X-API-Version": '2',
          "Agent": agentName,
        },
      })
        .then(response => {
          parseInt(response.status, 10) === 200 ? resolve(response.data) : reject('error');
        })
        .catch(error => reject('error'));
    })
  };

  getAvailabilityTime = (accessToken, agentName) => {
    return new Promise((resolve, reject) => {
      axios.get(Config.server_url + '/availability', {
        headers: {
          "Authorization": 'Bearer ' + accessToken,
          "DateInterval": 1,
          "Agent": agentName,
          "X-API-Version": '2',
        },
      })
        .then(response => {
          parseInt(response.status, 10) === 200 ? resolve(response.data) : reject('error');
        })
        .catch(error => reject('error'));
    })
  };

  getChattingTime = (accessToken, agentName) => {
    return new Promise((resolve, reject) => {
      axios.get(Config.server_url + '/chatting', {
        headers: {
          "Authorization": 'Bearer ' + accessToken,
          "DateInterval": 1,
          "Agent": agentName,
          "X-API-Version": '2',
        },
      })
        .then(response => {
          parseInt(response.status, 10) === 200 ? resolve(response.data) : reject('error');
        })
        .catch(error => reject('error'));
    })
  };

}

export default new RestAPI();