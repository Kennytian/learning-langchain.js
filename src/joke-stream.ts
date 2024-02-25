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
    const stream = await chatModel.stream([new HumanMessage("讲个笑话")]);
    for await (const chunk of stream) {
      console.log(chunk);
    }
  } catch (e) {
    console.error(e);
  }
}

run();
