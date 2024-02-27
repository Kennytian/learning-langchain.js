import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

dotenv.config();

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe("人类的名字"),
    surname: z.string().describe("人类的姓氏"),
    age: z.number().describe("人类的年龄"),
    appearance: z.string().describe("人类的外形描述"),
    shortBio: z.string().describe("简介"),
    university: z.string().optional().describe("就读大学的名称"),
    gender: z.string().describe("人类的性别"),
    interests: z.array(z.string()).describe("关于人类兴趣的 json 数组"),
  }),
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: ``,
  inputVariables: ["description"],
  partialVariables: { format_instructions: formatInstructions },
});

async function run() {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_API_KEY, //你的OpenAI API Key
    temperature: 0.5,
    modelName: "gpt-3.5-turbo",
  });

  const input = await prompt.format({
    description: "一个男人，生活在英国",
  });
  const response = await model.invoke(input);
  console.log("生成的结果：", response);
}

run();
