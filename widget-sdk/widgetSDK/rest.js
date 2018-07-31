import axios from 'axios';
const serverUrl = 'https://us-central1-livechat-experiments.cloudfunctions.net/restApi';
// const serverUrl = 'http://localhost:4000';

class Rest {

  //AGENTS
  //get
  getAgents = async (accessToken) => {
    return await axios.get(serverUrl + '/agents', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
    })
  };

  getSingleAgent = async (accessToken, login) => {
    return await axios.get(serverUrl + '/agents', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Login': login
      },
    })
  };
  //put
  updateAgent = async (accessToken, login, data) => {
    return await axios.put(serverUrl + '/agents', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        login,
        job_title: data.job_title,
        name: data.name,
        login_status: data.login_status,
        status: data.status,
        groups: data.groups,
        notifications: data.notifications,
        daily_summary: data.daily_summary,
        max_chats_count: data.max_chats_count,
        work_scheduler: data.work_scheduler
      }
    })
  };
  //delete
  deleteAgent = async (accessToken, login) => {
    return await axios.delete(serverUrl + '/agents', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        login,
      }
    })
  };

  // ARCHIVES
  //get
  getChats = async (accessToken, params) => {
    return await axios.get(serverUrl + '/chats', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getSingleChat = async (accessToken, id) => {
    return await axios.get(serverUrl + '/chats', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Chat': id,
      },
    })
  };
  //post
  sendChatTranscriptToEmail = async (accessToken, data) => {
    return await axios.post(serverUrl + '/chats', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        chat_id: data.chat_id,
        to: data.to,
      }
    })
  };

  // CANNED RESPONSES
  //get
  getCannedResponses = async (accessToken, group) => {
    return await axios.get(serverUrl + '/cans', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Group': group,
      },
    })
  };

  getSingleCanned = async (accessToken, id) => {
    return await axios.get(serverUrl + '/cans', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Canned': id,
      },
    })
  };
  //post
  createCannedResponse = async (accessToken, data) => {
    return await axios.post(serverUrl + '/cans', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        text: data.text,
        tags: data.tags,
        group: data.group || 0,
      }
    })
  };
  //put
  updateCannedResponse = async (accessToken, data) => {
    return await axios.put(serverUrl + '/cans', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        id: data.id,
        text: data.text,
        tags: data.tags,
      }
    })
  };
  //delete
  deleteCannedResponse = async (accessToken, id) => {
    return await axios.delete(serverUrl + '/cans', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        id
      }
    })
  };

  //GREETINGS
  getGreetings = async (accessToken, group) => {
    return await axios.get(serverUrl + '/greetings', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Group': group,
      },
    })
  };

  getSingleGreeting = async (accessToken, id) => {
    return await axios.get(serverUrl + '/greetings', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Greeting': id,
      },
    })
  };

  //GROUPS
  //get
  getAllGroups = async (accessToken) => {
    return await axios.get(serverUrl + '/groups', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
    })
  };

  getSingleGroup = async (accessToken, id) => {
    return await axios.get(serverUrl + '/groups', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Group': id,
      },
    })
  };
  //post
  createNewGroup = async (accessToken, data) => {
    return await axios.post(serverUrl + '/groups', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        name: data.name,
        agents: data.agents,
      }
    })
  };
  //put
  updateGroup = async (accessToken, data) => {
  return await axios.put(serverUrl + '/groups', {
  headers: {
    'Authorization': 'Bearer ' + accessToken,
    'X-API-Version': '2',
  },
  data: {
    token: accessToken,
    id: data.id,
    name: data.name,
    agents: data.agents,
  }
})
};
  //delete
  removeGroup = async (accessToken, id) => {
    return await axios.delete(serverUrl + '/groups', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        id,
      }
    })
  };

  //TAGS
  //get
  getTags = async (accessToken) => {
    return await axios.get(serverUrl + '/tags', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
    })
  };
  //post
  createTag = async (accessToken, data) => {
    return await axios.post(serverUrl + '/tags', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        author: data.author,
        tag: data.tag,
        group: data.group || 0,
      },
    })
  };
  //delete
  deleteTag = async (accessToken, data) => {
    return await axios.delete(serverUrl + '/tags', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        tag: data.tag,
        group: data.group || 0,
      },
    })
  };

  //Tickets
  //get
  getTickets = async (accessToken, params) => {
    return await axios.get(serverUrl + '/tickets', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };
  //post
  createTicket = async (accessToken, data) => {
    return await axios.post(serverUrl + '/tickets', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      data: {
        token: accessToken,
        message: data.message,
        requester: data.requester,
        subject: data.subject,
        group: data.group || [0],
      },
    })
  };

  getSingleTicket = async (accessToken, id) => {
    return await axios.get(serverUrl + '/tickets', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
        'Ticket': id,
      },
    })
  };

  //REPORTS
  getChatsCount = async (accessToken, params) => {
    return await axios.get(serverUrl + '/chatsCount', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getChatEngagement = async (accessToken, params) => {
    return await axios.get(serverUrl + '/chatEngagement', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getChatsRating = async (accessToken, params) => {
    return await axios.get(serverUrl + '/chatRatings', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getChatsRanking = async (accessToken, params) => {
    return await axios.get(serverUrl + '/chatRanking', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getQueuedVisitors = async (accessToken, params) => {
    return await axios.get(serverUrl + '/queuedVisitors', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getQueueWaitingTimes = async (accessToken, params) => {
    return await axios.get(serverUrl + '/queueWaitingTimes', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getAgentsAvailability = async (accessToken, params) => {
    return await axios.get(serverUrl + '/agentAvailability', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getAgentChattingTime = async (accessToken, params) => {
    return await axios.get(serverUrl + '/agentChattingTime', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getChatsResponseTime = async (accessToken, params) => {
    return await axios.get(serverUrl + '/chatsResponseTime', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getNewTickets = async (accessToken, params) => {
    return await axios.get(serverUrl + '/newTickets', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

  getTicketRatingReport = async (accessToken, params) => {
    return await axios.get(serverUrl + '/ticketRatingsReport', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-API-Version': '2',
      },
      params
    })
  };

}

export default new Rest();