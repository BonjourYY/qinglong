/**
 * cron: 30 8 * * *
 * new Env('刷新常观 Token');
 */

const refresToken = async () => {
  const res = await fetch("https://uc.cztv.tv/api/auth/login/pwd", {
    method: "POST",
    body: JSON.stringify({
      username: QLAPI.getEnvs({ searchValue: "cg_username" }).then((x) => {
        return x.data[0].value;
      }),
      password: QLAPI.getEnvs({ searchValue: "cg_password" }).then((x) => {
        return x.data[0].value;
      }),
      with_applications: 1,
    }),
  });
  const data = await res.json();
  console.log(data);
};
