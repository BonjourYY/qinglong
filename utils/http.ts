import axios from "axios";

// Create Axios Instance
const HTTP = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// Request Interceptor
HTTP.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
HTTP.interceptors.response.use(
  // 2XX Status Code
  (response) => {
    return response.data;
  },
  // 4XX, 5XX Status Code
  (error) => {
    return Promise.reject(error);
  }
);

export { HTTP };
