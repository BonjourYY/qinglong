// 封装 Axios
import axios from "axios";
const HTTP = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器
HTTP.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
HTTP.interceptors.response.use(
  // 2XX状态码
  (response) => {
    return response.data;
  },
  // 非2XX状态码
  (error) => {
    console.log(
      `HTTP Error ${error.response.status}:`,
      JSON.stringify(error.response.data, null, 2)
    );
    process.exit(1);
  }
);

export default HTTP;
