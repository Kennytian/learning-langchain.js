import { OpenAIEmbeddings } from "@langchain/openai";
import * as dotenv from "dotenv";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

dotenv.config({ encoding: "utf8" });

// LangChain的智能知识库组件：Agent MemoryVectorStore
async function run() {
  const vectorStore = await MemoryVectorStore.fromTexts(
    ["Hello world", "Bye bye", "hello nice world"],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPEN_AI_API_KEY, //你的OpenAI API Key
    }),
  );

  const result = await vectorStore.similaritySearch("Hello world", 1);

  console.log(result);
}

run();
