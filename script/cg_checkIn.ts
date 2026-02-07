/**
 * cron: 30 8 * * *
 * new Env('常观每日任务');
 */

import { getArticleList } from "../api/index.ts";

// 完成每日任务

const fn = async () => {
  const { data } = await getArticleList({ page: 1 });
  console.log(data);
};

fn();
