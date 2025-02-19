import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/dashboard`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_PATHS = {
  DASHBOARD: {
    TOTAL_SALESMAN: "/total-salesman",
    VISITED_TODAY: "/visited-today",
    NOT_VISITED_TODAY: "/not-visited-today",
  },
  // Add more paths here
};
