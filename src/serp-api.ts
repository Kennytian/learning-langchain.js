import { SerpAPI } from "@langchain/community/tools/serpapi";
import { OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";

dotenv.config();

const model = new OpenAI({
  streaming: true,
  openAIApiKey: process.env.OPEN_AI_API_KEY,
  temperature: 0.9,
});

const tools = [
  new SerpAPI(process.env.SERP_API_API_KEY, {
    location: "Austin,Texas,United States",
    gl: "us",
    hl: "zh-cn",
  }),
  new Calculator(),
];

async function run() {
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    verbose: true,
  });

  console.log("Loaded agent.");

  const input = "谁是周杰伦的老婆？她的年纪加上10是多少?";
  console.log(`Executing with input "${input}"...`);

  const result = await executor.invoke({ input });

  console.log(`Got output ${result.output}`);
}

run();
