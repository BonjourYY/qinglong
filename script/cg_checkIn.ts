/**
 * cron: 30 8 * * *
 * new Env('常观每日任务');
 */

import {
  startClient,
  getArticleList,
  getVideoList,
  getArticleDetail,
  likeArticle,
  commentArticle,
} from "../api/index.ts";

// 生成随机5位数字字符串
const generateRandomComment = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
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
    await getArticleDetail({ articleId });
    console.log(`✓ 获取文章详情成功: ${articleId}`);

    // 点赞文章
    await likeArticle({ articleId });
    console.log(`✓ 点赞文章成功: ${articleId}`);

    // 评论文章（随机5位数字）
    const randomComment = generateRandomComment();
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
