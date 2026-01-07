// Utils/ApiCall/apiCall.js
import axios from "axios";

// Create a new instance of Axios
const api = axios.create({
  //baseURL: `http://${window.location.hostname}:8000/api`, // Base URL for your API
  baseURL: `http://192.168.0.192:8000/api`, // Base URL for your API
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Handle Content-Type for FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle global errors like 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // The useApi hook will now handle this status
      return Promise.reject({
        error: true,
        message: "Invalid Token",
        status: 401,
      });
    }

    // Returns when there is a unathorized access
    if (error.response?.status === 403) {
      return Promise.reject({
        error: true,
        message: "Access Denied",
        status: 403,
      });
    }

    return Promise.reject(error);
  }
);

const apiCall = async (method, url, data = {}, options = {}) => {
  try {
    const config = {
      method: method,
      url: url,
      data: method.toUpperCase() !== "GET" ? data : undefined,
      params: method.toUpperCase() === "GET" ? data : undefined,
      ...options, // Merge the passed-in options
    };
    const response = await api(config);

    // If the response is a blob, return it directly without parsing
    if (response.request.responseType === "blob") {
      return {
        error: false,
        data: response.data,
      };
    }

    if (response.data?.status === "error") {
      return {
        error: true,
        message: response.data.message || "An API error occurred.",
        data: null,
      };
    }

    return {
      error: false,
      message: response.data.message || "Success",
      data: response.data.data || response.data,
    };
  } catch (error) {
    if (error.response) {
      // For non-JSON responses (like blob errors), parse the error message
      if (error.response.data instanceof Blob) {
        const errorText = await error.response.data.text();
        const errorMessage =
          JSON.parse(errorText).message ||
          "An unexpected server error occurred.";
        return {
          error: true,
          message: errorMessage,
          data: null,
        };
      }

      const { status, data } = error.response;
      if (status === 422) {
        return {
          error: true,
          errors: data.errors,
          message: "Validation Errors",
          data: null,
        };
      }
      return {
        error: true,
        message: data?.message || "An unexpected server error occurred.",
        data: null,
      };
    } else if (error.message === "Network Error") {
      return {
        error: true,
        message: "Network error. Please check your connection.",
        data: null,
      };
    }
    return {
      error: true,
      message: error.message || "An unknown error occurred.",
      data: null,
    };
  }
};

export default apiCall;
