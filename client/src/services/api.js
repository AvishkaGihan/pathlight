import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pathlight_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("pathlight_token");
      localStorage.removeItem("pathlight_user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  googleAuth: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },
};

export const quizAPI = {
  submit: (answers) => api.post("/quiz/submit", { answers }),
};

export const reportAPI = {
  getLatest: () => api.get("/report/latest"),
};

export const careerAPI = {
  getRoadmap: (careerId) => api.get(`/careers/${careerId}/roadmap`),
  getDetailedRoadmap: (careerId) =>
    api.get(`/careers/${careerId}/detailed-roadmap`),
};

export default api;
