import axios from "axios";

export const nextServer = axios.create({
  baseURL: "https://09-auth-mocha-mu.vercel.app",
  withCredentials: true,
});
