import { OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";

dotenv.config();

const jsonModeModel = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY, //你的OpenAI API Key
  modelName: "gpt-4-1106-preview",
});

async function run() {
  try {
    const result = await jsonModeModel.invoke([
      ["system", "Only return JSON"],
      ["human", "Hi there!"],
    ]);
    console.log("result====", result);
  } catch (e) {
    console.error(e);
  }
}

run();
