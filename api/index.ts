import HTTP from "../utils/http.ts";
import { PaginatedListResponse } from "./type.ts";

// https://kcz.cztv.tv/api/v1

// 登录
export const login = () => {
  return fetch("https://uc.cztv.tv/api/auth/login/pwd", {
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
};

// 签到
export const checkIn = () => {
  return HTTP.post("user/checkin", { client_id: "rongmei" });
};

// 启动客户端
export const startClient = () => {
  return HTTP.get("system/settings?version=4");
};

// 获取 天下 栏目列表的文章
export const getArticleList = ({
  page,
}: {
  page: number;
}): Promise<PaginatedListResponse> => {
  return HTTP.get(`homepage/column/80?page=${page}`);
};

// 获取 视频 栏目列表的视频
export const getVideoList = ({
  page,
}: {
  page: number;
}): Promise<PaginatedListResponse> => {
  return HTTP.get(`homepage/column/75?page=${page}`);
};

// 获取文章详情数据
export const getArticleDetail = ({ articleId }: { articleId: string }) => {
  return HTTP.get(`article/${articleId}`);
};

// 点赞文章
export const likeArticle = ({ articleId }: { articleId: string }) => {
  return HTTP.post(`article/${articleId}/like`);
};

// 评论文章
export const commentArticle = (
  params: { articleId: string },
  data: { content: string },
) => {
  return HTTP.post(`article/${params.articleId}/comment`, data);
};

// 分享文章
export const shareArticle = (data: { s_t: string }) => {
  return HTTP.post(`share-config/callback`, data);
};
