import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

dotenv.config();

const extractionFunctionSchema = {
  name: "extractor",
  description: "Extracts fields from the input",
  parameters: zodToJsonSchema(
    z.object({
      tone: z
        .enum(["positive", "negative"])
        .describe("The overall tone of the input"),
      entity: z.string().describe("The entity mentioned in the input"),
      word_count: z.number().describe("The number of words in the input"),
      chat_response: z.string().describe("A response to the human's input"),
      final_punctuation: z
        .optional(z.string())
        .describe("The final punctuation mark in the input, if any."),
    }),
  ),
};

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
  modelName: "gpt-4",
}).bind({
  functions: [extractionFunctionSchema],
  function_call: { name: "extractor" },
});

async function run() {
  const result = await model.invoke([
    new HumanMessage("What a beautiful day!"),
  ]);
  console.log("result====", result);
}

run();
