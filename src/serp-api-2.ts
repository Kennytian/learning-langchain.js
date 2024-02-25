import { SerpAPI } from "@langchain/community/tools/serpapi";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { Calculator } from "langchain/tools/calculator";

dotenv.config();

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  verbose: true,
});

const tools = [
  new Calculator(),
  new SerpAPI(process.env.SERP_API_API_KEY, { hl: "zh-cn" }),
];

async function run() {
  // Plan and execute
  // https://js.langchain.com/docs/modules/agents/agent_types/plan_and_execute
  const executor = await PlanAndExecuteAgentExecutor.fromLLMAndTools({
    llm: model,
    tools,
  });

  const input: string = "中国主席是谁？他现在的年龄是多少？他的夫人是谁？";
  console.log(`使用输入执行 "${input}"...`);

  const result = await executor.invoke({ input });

  console.log(`Got output ${result}`);
}

run();
