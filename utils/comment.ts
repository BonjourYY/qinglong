// 调用阿里云百炼大模型，根据文章标题和内容生成评论
import OpenAI from "openai";

const openai = new OpenAI({
  // 在青龙环境变量中配置 DASHSCOPE_API_KEY
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL:
    "https://llm-h7315cs7dmhfmnen.cn-beijing.maas.aliyuncs.com/compatible-mode/v1",
});

const SYSTEM_PROMPT = `你是一名普通读者，需要针对文章内容发表一条评论。
要求：
1. 评论必须紧扣文章内容，自然真诚，像真人随手写的。
2. 严格控制在 10 个字以内。
3. 只输出评论内容本身，不要输出任何解释、引号、标点前缀等多余内容。`;

/**
 * 根据文章标题和内容生成一条 10 字以内的评论
 * @param title 文章标题
 * @param content 文章内容
 * @returns 评论内容
 */
export async function getComment(
  title: string,
  content: string,
): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "qwen-plus",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `文章标题：${title}\n\n文章内容：\n${content}\n\n请针对这篇文章生成一条评论。`,
      },
    ],
  });

  const comment = completion.choices[0]?.message?.content?.trim();
  if (!comment) {
    throw new Error("AI 未返回评论内容");
  }
  return comment;
}
