/**
 * cron: 30 8 * * *
 * new Env('刷新常观 Token');
 */

let username: string;
let password: string;

QLAPI.getEnvs({ searchValue: "cg_username" }).then((x) => {
  username = x.data[0].value;
});

QLAPI.getEnvs({ searchValue: "cg_password" }).then((x) => {
  password = x.data[0].value;
});

const refresToken = async () => {
  const res = await fetch("https://uc.cztv.tv/api/auth/login/pwd", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      with_applications: 1,
    }),
  });
  const data = await res.json();
  console.log(data);
};

refresToken();
