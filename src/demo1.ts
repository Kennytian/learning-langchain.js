import { OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv"

dotenv.config();

const model = new OpenAI({
    openAIApiKey: process.env.OPEN_AI_API_KEY, // 你的OpenAI API Key
    temperature: 0.9
});

async function run() {
    try {
        const res = await model.invoke( "写一首诗，限制20个字");
        console.log(res);
    } catch (e) {
        console.error(e)
    }
}

run();
