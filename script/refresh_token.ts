/**
 * cron: 30 8 * * *
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

  await Promise.all([
    QLAPI.updateEnv({
      name: "cg_token",
      value: data.data.access_token_for_clients["2024110112345678"],
    }),
  ]);

  console.log(data.data.access_token_for_clients["2024110112345678"]);
};

refresToken();
