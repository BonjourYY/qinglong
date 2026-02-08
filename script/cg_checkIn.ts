/**
 * cron: 30 8 * * *
 * new Env('常观每日任务');
 */

import axios from "axios";
import {
  startClient,
  getArticleList,
  getVideoList,
  getArticleDetail,
  likeArticle,
  commentArticle,
  shareArticle,
} from "../api/index.ts";
import comments from "../utils/content.json" with { type: "json" };

// 从 content.json 中随机取一条评论
const getRandomComment = (): string => {
  const index = Math.floor(Math.random() * comments.length);
  return comments[index].content;
};

// 延迟函数
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 从分享链接中提取 s_t 参数
const extractShareToken = (shareLink: string): string | null => {
  try {
    const url = new URL(shareLink);
    return url.searchParams.get("s_t");
  } catch {
    return null;
  }
};

// 处理单篇文章
const processArticle = async (articleId: string, articleTitle: string) => {
  try {
    console.log(`开始处理文章 : ${articleTitle}`);

    // 启动客户端
    await startClient();
    console.log(`✓ 启动客户端成功: ${articleId}`);

    // 获取文章详情
    const detail = await getArticleDetail({ articleId });
    console.log(`✓ 阅读文章成功成功: ${articleId}`);

    // 分享文章
    const shareLink = detail?.data?.data?.share_config?.share_link;
    if (shareLink) {
      const s_t = extractShareToken(shareLink);
      if (s_t) {
        try {
          await shareArticle({ s_t });
          console.log(`✓ 分享文章成功: ${articleId}`);
        } catch (error) {
          console.error(`✗ 分享文章失败: ${articleId}`, error);
        }
      } else {
        console.log(`✗ 未能从分享链接提取 s_t 参数: ${articleId}`);
      }
    } else {
      console.log(`✗ 文章没有分享链接: ${articleId}`);
    }

    // 请求文章缩略图
    const thumbnails = detail?.data?.data?.thumbnails ?? [];
    for (const thumb of thumbnails) {
      if (thumb.src) {
        try {
          await axios.get(thumb.src);
          console.log(`✓ 请求缩略图成功: ${thumb.src}`);
        } catch {
          console.log(`✗ 请求缩略图失败: ${thumb.src}`);
        }
      }
    }

    // 点赞文章
    await likeArticle({ articleId });
    console.log(`✓ 点赞文章成功: ${articleId}`);

    // 评论文章（随机从 content.json 中取一条）
    const randomComment = getRandomComment();
    await commentArticle({ articleId }, { content: randomComment });
    console.log(`✓ 评论文章成功: ${articleId}, 评论内容: ${randomComment}`);

    console.log(`文章 ${articleId} 处理完成\n`);
  } catch (error) {
    console.error(`处理文章 ${articleId} 失败:`, error);
  }
};

// 完成每日任务
const fn = async () => {
  try {
    console.log("开始获取文章列表...\n");
    const [articleRes, videoRes] = await Promise.all([
      getArticleList({ page: 1 }),
      getVideoList({ page: 2 }),
    ]);
    const articleList = [
      ...articleRes.data.data.slice(0, 6),
      ...videoRes.data.data.slice(0, 3),
    ];

    console.log(`共获取到 ${articleList.length} 篇文章\n`);

    // 遍历文章列表
    for (let i = 0; i < articleList.length; i++) {
      const article = articleList[i];
      await processArticle(article.redirectable.redirectable_id, article.title);

      // 如果不是最后一篇文章，等待30秒
      if (i < articleList.length - 1) {
        console.log("等待 30 秒后处理下一篇...\n");
        await sleep(30000);
      }
    }

    console.log("所有文章处理完成！");
  } catch (error) {
    console.error("执行任务失败:", error);
  }
};

fn();
