let username = "";
let password = "";

// 获取环境列表
const { data: cgUsername } = QLAPI.getEnvs({ searchValue: "cgUsername" });
// username = cgUsername.value;

const { data: cgPassword } = QLAPI.getEnvs({ searchValue: "cgPassword" });
// password = cgPassword.value;

// 常观签到
import { login } from "./api/index.ts";

const loginRes = await login({
  username,
  password,
  with_applications: 0,
});

console.log("loginRes", loginRes);
