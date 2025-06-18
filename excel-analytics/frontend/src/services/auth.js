import axios from "axios";

// Centralized Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to all outgoing requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return {
      success: true,
      message: response.data.message || "Registered successfully",
    };
  } catch (error) {
    console.error("Registration Error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed. Please try again.",
    };
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    const { token, user } = response.data;

    if (token && user) {
      // Store token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        success: true,
        token,
        user,
      };
    } else {
      return {
        success: false,
        message: "Login failed: Token or user missing.",
      };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
