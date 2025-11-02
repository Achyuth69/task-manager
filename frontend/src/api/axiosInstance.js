import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6969/api", // ✅ backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
