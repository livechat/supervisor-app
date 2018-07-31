import Authorization from './auth';
import Rest from './rest';

const config = {};
let sessionId = null;
let pluginId = null;

// callbacks
const callbacks = {};

const setPluginId = function() {
  if (!pluginId) {
    pluginId = getUrlParam('plugin_id');
  }
  return pluginId;
};

const sendMessage = function(message) {
  const e = message;
  e.plugin_id = setPluginId();
  return window.parent.postMessage(e, config.targetOrigin || '*');
};

const messagesListener = e => {
  if (
    [
      'http://my.lc:3000',
      'https://my.labs.livechatinc.com',
      'https://my.staging.livechatinc.com',
      'https://my.livechatinc.com'
    ].indexOf(e.origin) === -1
  ) {
    console.log('incorrect origin');
    return false;
  }

  switch (e.data.event_name) {
    case 'livechat:customer_profile':
      if (!callbacks['customer_profile']) {
        return false;
      }

      return (() => {
        const result = [];
        for (let callback of callbacks['customer_profile']) {
          result.push(callback(e.data.event_data));
        }
        return result;
      })();

    case 'livechat:customer_profile_hidden':
      if (!callbacks['customer_profile_hidden']) {
        return false;
      }

      return (() => {
        const result1 = [];
        for (let callback of callbacks['customer_profile_hidden']) {
          result1.push(callback(e.data.event_data));
        }
        return result1;
      })();
    default:
  }
};

const getUrlParam = name => {
  const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(
    window.location.href
  );
  if (results) {
    return results[1] || 0;
  } else {
    return null;
  }
};

class LiveChat{
  init = (options = {}) => {
    this.clientId = options.client_id || null;
    sendMessage({ message: 'plugin_inited' });
    window.addEventListener('message', messagesListener);
  };

  getAccessToken = () => {
    return new Promise((resolve, reject) => {
      Authorization.getAccessToken(this.clientId)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  };

  openAuthorizationPopup = () => {
    Authorization.openPopup(this.clientId);
  };

  on = (method, callback) => {
    if (!callbacks[method]) {
      callbacks[method] = [];
    }

    return callbacks[method].push(callback);
  };

  track = (eventName = '', eventProperties = {}) => {
    if (typeof eventName !== 'string' || typeof eventProperties !== 'object') {
      return false;
    }

    return sendMessage({
      message: 'track',
      data: {
        event_name: eventName,
        event_properties: eventProperties
      }
    });
  };

  refreshSessionId = () => {
    return sendMessage({ message: 'plugin_loaded' });
  };

  getSessionId = () => {
    return sessionId;
  };

  putMessage = (message) => {
    return sendMessage({ message: 'put_message', data: message });
  };

  // rest api

  //AGENTS
  getAllAgents = async (token) => await Rest.getAgents(token);
  getSingleAgent = async (token, login) => await Rest.getSingleAgent(token, login);
  updateAgent = async (token, login, data) => await Rest.updateAgent(token, login, data);
  deleteAgent = async (token, login) => await Rest.deleteAgent(token, login);

  //ARCHIVES
  getChats = async (token, params = {}) => await Rest.getChats(token, params);
  getSingleChat = async (token, id) => await Rest.getSingleChat(token, id);
  sendChatTranscriptToEmail = async (token, data) => await Rest.sendChatTranscriptToEmail(token, data);

  //CANNED RESPONSES
  getCannedResponses = async (token, group = 0) => await Rest.getCannedResponses(token, group);
  getSingleCannedResponse = async (token, id) => await Rest.getSingleCanned(token, id);
  createCannedResponse = async (token, data) => await Rest.createCannedResponse(token, data);
  updateCannedResponse = async (token, data) => await Rest.updateCannedResponse(token, data);
  deleteCannedResponse = async (token, id) => await Rest.deleteCannedResponse(token, id);

  //GREETINGS
  getGreetings = async (token, group = 0) => await Rest.getGreetings(token, group);
  getSingleGreeting = async (token, id) => await Rest.getSingleGreeting(token, id);

  //GROUPS
  getAllGroups = async (token) => await Rest.getAllGroups(token);
  getSingleGroup= async (token, id) => await Rest.getSingleGroup(token, id);
  createNewGroup = async (token, data) => await Rest.createNewGroup(token, data);
  updateGroup = async (token, data) => await Rest.updateGroup(token, data);
  removeGroup = async (token, id) => await Rest.removeGroup(token, id);

  //TAGS
  getTags = async (token) => await Rest.getTags(token);
  createTag = async (token, data) => await Rest.createTag(token, data);
  deleteTag = async (token, data) => await Rest.deleteTag(token, data);

  //TICKETS
  getTickets = async (token, params = {}) => await Rest.getTickets(token, params);
  getSingleTicket = async (token, id) => await Rest.getSingleTicket(token, id);
  createTicket = async (token, data) => await Rest.createTicket(token, data);

  //REPORTS
  getChatsCount = async (token, params = {}) => await Rest.getChatsCount(token, params);
  getChatEngagement = async (token, params = {}) => await Rest.getChatEngagement(token, params);
  getChatsRating = async (token, params = {}) => await Rest.getChatsRating(token, params);
  getChatsRanking = async (token, params = {}) => await Rest.getChatsRanking(token, params);
  getQueuedVisitors = async (token, params = {}) => await Rest.getQueuedVisitors(token, params);
  getQueueWaitingTimes = async (token, params = {}) => await Rest.getQueueWaitingTimes(token, params);
  getAgentsAvailability = async (token, params = {}) => await Rest.getAgentsAvailability(token, params);
  getAgentChattingTime = async (token, params = {}) => await Rest.getAgentChattingTime(token, params);
  getChatsResponseTime = async (token, params = {}) => await Rest.getChatsResponseTime(token, params);
  getNewTickets = async (token, params = {}) => await Rest.getNewTickets(token, params);
  getTicketRatingReport = async (token, params = {}) => await Rest.getTicketRatingReport(token, params);
}

let sdk = new LiveChat();
window.widgetSDK = sdk;
export default sdk;