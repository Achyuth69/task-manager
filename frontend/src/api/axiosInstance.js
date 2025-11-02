import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://mern-task-manager-backend.onrender.com/api" // 🔥 your deployed backend URL
      : "http://localhost:6969/api", // for local dev
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
