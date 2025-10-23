import axios from "axios";
import { a } from "../utils/http";
console.log(a);

let username = "";
let password = "";
let token = "";

// 登录
const login = async () => {
  // 获取环境变量
  QLAPI.getEnvs({ searchValue: "cgUsername" }).then((x) => {
    username = x.data[0].value;
    console.log(username);
  });
  QLAPI.getEnvs({ searchValue: "cgPassword" }).then((x) => {
    password = x.data[0].value;
    console.log(password);
  });

  // 调用接口
  const { data } = await axios.post("https://uc.cztv.tv/api/auth/login/pwd", {
    username,
    password,
    with_applications: 1,
  });

  token = data.data.access_token_for_clients["2024110112345678"];
};

// 签到
const checkin = async () => {
  // 调用接口
  const { data } = await axios.post(
    "https://kcz.cztv.tv/api/v1/user/checkin",
    {
      client_id: "rongmei",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);
};

// 执行
const fn = async () => {
  try {
    await login();
    await checkin();
    console.log("✅✅✅ 签到成功 ✅✅✅");
  } catch {
    console.log("❌❌❌ 签到失败 ❌❌❌");
  }
};

fn();
