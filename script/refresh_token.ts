/**
 * cron: 20 3 1,5,9,13,17,21,25,29 * *
 * new Env('刷新常观 Token');
 */

const refresToken = async () => {
  const [usernameRes, passwordRes] = await Promise.all([
    QLAPI.getEnvs({ searchValue: "cg_username" }),
    QLAPI.getEnvs({ searchValue: "cg_password" }),
  ]);
  const username = usernameRes.data[0].value;
  const password = passwordRes.data[0].value;

  console.log(username, password);

  const res = await fetch("https://uc.cztv.tv/api/auth/login/pwd", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username,
      password,
      with_applications: "1",
    }).toString(),
  });
  const data = await res.json();
  const token = data.data.access_token_for_clients["2024110112345678"];

  const tokenRes = await QLAPI.getEnvs({ searchValue: "cg_token" });
  const tokenEnv = tokenRes.data.find((x: any) => x.name === "cg_token");
  if (!tokenEnv) {
    throw new Error("cg_token env not found");
  }

  await QLAPI.updateEnv({
    env: {
      id: tokenEnv.id,
      name: "cg_token",
      value: token,
      remarks: new Date().toLocaleString("zh-CN", {
        timeZone: "Asia/Shanghai",
      }),
    },
  });

  console.log(token);
};

refresToken();
