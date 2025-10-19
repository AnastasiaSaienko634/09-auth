import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});
