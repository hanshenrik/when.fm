import axios from "axios";

import config from "../config/local.json";

const LAST_FM_API_KEY = config.lastFmApiKey;

const lastFmClient = axios.create({
  baseURL: "http://ws.audioscrobbler.com/2.0/",
  params: {
    method: "user.getrecenttracks",
    api_key: LAST_FM_API_KEY,
    format: "json",
    limit: 200
  }
});

export default lastFmClient;
