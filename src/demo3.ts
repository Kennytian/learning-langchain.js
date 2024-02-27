import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";

dotenv.config();

const chatModel = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY, //你的OpenAI API Key
  temperature: 0.9,
});

async function run() {
  try {
    const messages = [
      new SystemMessage("你是一位语言模型专家"),
      new HumanMessage("模型正则化的目的是什么？"),
    ];
    const result = await chatModel.invoke(messages);
    console.log("result====", result);
  } catch (e) {
    console.error(e);
  }
}

run();
