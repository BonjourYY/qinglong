// 封装 Axios
import axios from "axios";

// 从环境变量获取 Token

let accessToken = "";

const tokenReady = QLAPI.getEnvs({ searchValue: "cg_token" }).then((x) => {
  accessToken = x.data[0].value;
});

const HTTP = axios.create({
  baseURL: "https://kcz.cztv.tv/api/v1",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器：等待 token 就绪后动态注入 Authorization
HTTP.interceptors.request.use(
  async (config) => {
    await tokenReady;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
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
      JSON.stringify(error.response.data, null, 2),
    );
    process.exit(1);
  },
);

export default HTTP;
