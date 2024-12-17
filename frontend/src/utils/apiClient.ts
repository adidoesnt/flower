import { BACKEND_URL } from "@/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export default apiClient;
