import config from "./config";
import axios from "axios";

const GET = "GET";

const { server_url } = config;

const createApiRequest = (method, route, accessToken, data, interval) =>
  axios({
    method,
    url: server_url + route,
    headers: {
      Authorization: "Bearer " + accessToken,
      DateInterval: interval,
      "X-API-Version": "2"
    },
    data
  }).catch(function(error) {
    console.error(error);
  });

const api = {
  fetchRatings: (interval, accessToken) =>
    createApiRequest(GET, `/ratings/${interval}`, accessToken),
  fetchResponseTimes: (interval, accessToken) =>
    createApiRequest(GET, `/responses`, accessToken, null, interval),
  fetchChattingTimes: (interval, accessToken) =>
    createApiRequest(GET, `/chatting`, accessToken, null, interval)
};

export default api;
