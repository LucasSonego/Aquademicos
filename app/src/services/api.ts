import axios from "axios";
import "dotenv/config";
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
