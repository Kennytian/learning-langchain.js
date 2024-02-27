import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { HumanMessage } from "@langchain/core/messages";
import * as dotenv from "dotenv";

dotenv.config();

// Default model is qwen-turbo
const qwenTurbo = new ChatAlibabaTongyi({
  alibabaApiKey: process.env.ALI_QWEN_API_KEY,
});

// Use qwen-plus
const qwenPlus = new ChatAlibabaTongyi({
  modelName: "qwen-plus", // Available models: qwen-turbo, qwen-plus, qwen-max
  temperature: 1,
  alibabaApiKey: process.env.ALI_QWEN_API_KEY,
});

const messages = [new HumanMessage("你好，说一首唐诗")];

async function run1() {
  const res = await qwenTurbo.invoke(messages);
  /*
    AIMessage {
      content: "Hello! How can I help you today? Is there something you would like to talk about or ask about? I'm here to assist you with any questions you may have.",
    }
    */
  console.log("qwenTurbo===", res);
}
async function run2() {
  const res2 = await qwenPlus.invoke(messages);
  /*
    AIMessage {
      text: "Hello! How can I help you today? Is there something you would like to talk about or ask about? I'm here to assist you with any questions you may have.",
    }
    */
  console.log("qwenPlus===", res2);
}

run1();
run2();
