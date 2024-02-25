import { HumanMessage } from "@langchain/core/messages";
import { OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";

dotenv.config();

const chatModel = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY, //你的OpenAI API Key
  temperature: 0.3,
  streaming: true,
});

async function run() {
  try {
    const messages = [new HumanMessage("请讲一个笑话")];
    const result = await chatModel.invoke(messages, {
      callbacks: [
        {
          handleLLMNewToken(token: string): void {
            console.log({ token });
          },
        },
      ],
    });
    console.log("result====", result);
  } catch (e) {
    console.error(e);
  }
}

run();
