import axios from "axios";
console.log(axios);

// 获取环境列表
QLAPI.getEnvs({ searchValue: "dddd" }).then((x) => {
  console.log("getEnvs", x);
});
