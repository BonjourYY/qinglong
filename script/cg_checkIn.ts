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

const articleToken = [
  "eyJpdiI6IkdoUXVqbkpmVkRUa2hGVDR4SjZHQXc9PSIsInZhbHVlIjoiYkowNkxDM3IzNExPR0MvZjh4MGpYaGU1QW4xT2Zac2NmSzdTN29LQkt3eUsvVG9pTGl3aGxZOGx1Rkczc21pMmllN1hlMmRsQTg4U2Mzb3liK2tGd3liV2JrV3pjMlBLQlVEaW8xdnlPbVU9IiwibWFjIjoiMTc1ZTdlMzg2NmQ3YmYwZWUzMjI0YTViYjk0ZTUzMmQ4Y2QxM2EyODJjOGQ2ZmEyNGViNWY4NmQ3MDY3M2RhNiIsInRhZyI6IiJ9",
  ,
  "eyJpdiI6IkpWWlIwYXIvTmsxUzlrVEtYR3haS1E9PSIsInZhbHVlIjoiSDlxOXJhNDd5Ump3bjZKUTB4VmpzM08zNGFJTjN6bzZnSndhbDdSaFA1b254UFR3RjBRblpyRmhOTXhHOW5WaDFMTTVaSndpdko0ckVqMG1aeVhtWGlkTlJlOTBSNU43T1RrOVEzUTk0Kzg9IiwibWFjIjoiZGZlMTRjZDkzNTQ1M2RjMTA1MTVlNDY4NzkwODc1ZGRjMTA0ODMyNmU3ZjA3ZDYzZTY2ZDc1NTA0OTIyMzY4YiIsInRhZyI6IiJ9",
  ,
  "eyJpdiI6ImZ5RDQ5Q0dLK3IwOXRWczUrNXd4UWc9PSIsInZhbHVlIjoickwyRmpoK2hmaTFGTXFWdkNSbHpRSEpwNEdzMmh3ZGtSM2lMZFlsSlRuNXlMRTJLaEF2Y1J2cjJoemRzWkRmTXBzY294ampXc1NnR1Q1akY3UzJqK1A3NVN5TkdZNEI4STQ2QzZpVjNMcnM9IiwibWFjIjoiZDAzMWI5N2U2ZDJhZTE5ZWUzYmEwMDA5ODIxNGIzMGViMTZlYmNiMmFiZTBiMjVkMWZjMGQzNTA5ZTZiYjIzNCIsInRhZyI6IiJ9",
];

// 从 content.json 中随机取一条评论
const getRandomComment = (): string => {
  const index = Math.floor(Math.random() * comments.length);
  return comments[index].content;
};

// 延迟函数
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 处理单篇文章
const processArticle = async (articleId: number) => {
  try {
    console.log(`开始处理文章 ID: ${articleId}`);

    // 启动客户端
    await startClient();
    console.log(`✓ 启动客户端成功: ${articleId}`);

    // 获取文章详情
    const detail = await getArticleDetail({ articleId });
    console.log(`✓ 获取文章详情成功: ${articleId}`);

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
    // 遍历 articleToken，依次分享文章
    const tokens = articleToken.filter(
      (t): t is string => typeof t === "string",
    );
    console.log(`开始分享文章，共 ${tokens.length} 个 token...\n`);
    for (let i = 0; i < tokens.length; i++) {
      try {
        await shareArticle({ s_t: tokens[i] });
        console.log(`✓ 分享文章成功 (${i + 1}/${tokens.length})`);
      } catch (error) {
        console.error(`✗ 分享文章失败 (${i + 1}/${tokens.length}):`, error);
      }
      if (i < tokens.length - 1) {
        console.log("等待 10 秒后分享下一篇...\n");
        await sleep(10000);
      }
    }
    console.log("分享文章完成！\n");

    console.log("开始获取文章列表...\n");
    const [articleRes, videoRes] = await Promise.all([
      getArticleList({ page: 1 }),
      getVideoList({ page: 2 }),
    ]);
    const articleList = [...articleRes.data.data, ...videoRes.data.data];

    console.log(`共获取到 ${articleList.length} 篇文章\n`);

    // 遍历文章列表
    for (let i = 0; i < articleList.length; i++) {
      const article = articleList[i];
      await processArticle(article.id);

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
