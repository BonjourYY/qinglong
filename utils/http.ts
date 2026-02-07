// 封装 Axios
import axios from "axios";

// 从环境变量获取 Token

let accessToken = "";

QLAPI.getEnvs({ searchValue: "cg_token" }).then((x) => {
  accessToken = x.data[0].value;
});

const HTTP = axios.create({
  baseURL: "https://kcz.cztv.tv/api/v1",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${accessToken}`,
    // Authorization:
    // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJTTTIifQ.eyJzZXRSZWZyZXNoVFRMIjoyMDE2MCwiaXNzIjoiaHR0cDovL3VjLmN6dHYudHYvYXBpL2F1dGgvbG9naW4vcHdkIiwiaWF0IjoxNzcwNDQ4NDIyLCJleHAiOjE3NzEwNTMyMjIsIm5iZiI6MTc3MDQ0ODQyMiwianRpIjoicTRhbndoOUd6V0RYZGhQSiIsInN1YiI6Ijg2NDEzN2VkLTNjODUtNDQ4Ni1hMTIwLTNiN2FkODVhMTg2MyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJiYXNlaW5mbyI6InNtMjpaVEkzWXpNM09EQmxOekEyT1dKa1lUY3dPREpoTWpOaE5EZzVaRGMzTlRnM1kyVXpNRGsxT0RObFpEazVNalV6WmpZMlpURmtPVGd6TTJWa01XRXhaREJpTldObE9EWmtZelkzTVRSbE9UazNOR05tTWpVNE5UZzVNVE01WkRkaU1UZzFOV1U0WXpsbVlUSm1NbU14TVRjMVpXVXhNak5oT1RWaE1qTmxPV0k1TTJJek5UQTBPVFUwWkRBMlpUTTNaV1k1TlRNNE5qVXdZek5oT1daaE5HUXhZMk01TVRNek5UZzFaR0kyWldZMlpHTm1NVEl4Tm1NMFpHRTFZak13TmpWaU16YzVORGt6WVRBNE9EYzJOVGd5TUdZelltVXdZV1JqTmpSaE56RTFPREUxTWpsalpXTTRNRFU1WlRRek9HSXpORE5qTjJWaU5UQmhPVE14WWpBMFl6ZGtORGMyT0RKbE5UTmxZalU0TW1GaU16Y3lZVGc1TVRFM1pqQm1Nek5pWkROalpXTm1NemhsTWpneFkyTTFabVZqTldVd1pEVXlaRE5tWmpJd1pUa3lZMkZsT1RrM01EZGlOakEzWXpKaFpURmhNVGswWVRCa09UTTBNRFkxT0dFellXTmlPVEExWXpRNE5UVTFOR1UwWm1FMk56VTBaakE0TWpjNE16ZGhPVGs0TXpjMVpUSTFOR0V3TmpnM1ptTmhOemd4WWpObE1UZGtOamRrWm1VNU1UQXpaR0l5TURBelpqVTJPRGMzTW1VeU5qWmtaakl4T1RSbE5tWTNaV1l6TnpKaVptUmpZV0ZoWm1Ka05qRmxZalF5TkRKaE5UVTBOMlE1TUdSaFpUYzRaalEwWmpZMk1qRmxZMlUzWldVd05EWXpNemRqTjJRd05XSTBZak15T1dRME5UTTBZVEZoWTJabU5HSm1Zams1WTJWak1tVTRZalJrTW1RNE5qUmxaRGsyWW1SalptTXhOMll6T1RCbU9EZzBaV1V5TkRVMk1qTmpOVEZrTkRVd01HTXpaRFZsWTJRM09XVmhZakJrTnpnNFlqVmtObVUyTmprM05UaGlaREJoWW1SbU56UmlOak5qTnpFMFltSTVZak0zTURNNU1UY3paRFV4WWpoa04ySm1ORGcyTTJNeE1HRmlZamd3TVdOaE5tTTNOR0k0WldJMU16WmhOREkwTXpVME9UVXpPRGhrTldObE1qTXhObUprT1RZNE5EVTBNelZsTm1Kak5qSXdZelU1TkRsalpERTJNek5qTURrMVpXTmtPR0ZpTXpsaFpqaGtNemxoTUE9PSIsImNsaWVudF9pZCI6IjIwMjQxMTAxMTIzNDU2NzgifQ.MzA0NTAyMjAzNmE0YmM3Y2JhODYzODVhM2Y1NWM0ZTBiZmFlNjQ4NjA4YWNjNDg2YjFlN2Q2NzE1ZTZjMTMyNTc1NzBiN2RjMDIyMTAwOTdkZTU2ZmM1MjJhYzA5MzQwMzFiZGNkMTg4YjFhZDczMzczMzYzMDQ2NDkyMzc5NjhhMWUwMTYxMjViOTZlMw",
  },
});

// 请求拦截器
HTTP.interceptors.request.use(
  (config) => {
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
    console.log(error);
    // console.log(
    //   `HTTP Error ${error.response.status}:`,
    //   JSON.stringify(error.response.data, null, 2),
    // );
    process.exit(1);
  },
);

export default HTTP;
