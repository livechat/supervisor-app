import config from "./config";
import axios from "axios";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const { server_url } = config;

const createApiRequest = (method, route, accessToken, data) =>
  axios({
    method,
    url: server_url + route,
    headers: {
      Authorization: "Bearer " + accessToken,
      "X-API-Version": "2"
    },
    data
  }).catch(function(error) {
    console.error(error);
  });

const api = {
  fetchCans: accessToken => createApiRequest(GET, "/cans", accessToken),

  fetchTags: accessToken => createApiRequest(GET, "/tags", accessToken),

  removeTag: (name, accessToken) =>
    createApiRequest(DELETE, "/tags", accessToken, {
      token: accessToken,
      tag: name
    }),

  removeCan: (id, accessToken) =>
    createApiRequest(DELETE, "/cans", accessToken, {
      token: accessToken,
      id
    }),

  createCan: (content, tags, accessToken) =>
    createApiRequest(POST, "/cans", accessToken, {
      data: {
        token: accessToken,
        tags,
        text: content
      }
    }),

  createTag: (tag, accessToken) =>
    createApiRequest(POST, "/tags", accessToken, {
      data: {
        token: accessToken,
        tag
      }
    }),

  updateCan: (id, content, tags, accessToken) =>
    createApiRequest(PUT, "/cans", accessToken, {
      data: {
        token: accessToken,
        tags,
        text: content,
        id
      }
    })
};

export default api;
