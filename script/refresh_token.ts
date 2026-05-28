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
    body: JSON.stringify({
      username,
      password,
      with_applications: 1,
    }),
  });
  const data = await res.json();
  console.log(data);
};

refresToken();
