import { HTTP } from "../../utils/http";

// 登陆
export const login = (data: {
  username: string;
  password: string;
  with_applications: 0 | 1;
}) => {
  return HTTP.post("https://uc.cztv.tv/api/auth/login/pwd", data);
};
