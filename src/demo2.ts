import {PromptTemplate} from "@langchain/core/prompts";
import {LLMChain} from "langchain/chains";
import {OpenAI} from "@langchain/openai";
import * as dotenv from "dotenv"

dotenv.config();

console.log('process.env.OPEN_AI_API_KEY====', process.env.OPEN_AI_API_KEY)

const model = new OpenAI({
    openAIApiKey: process.env.OPEN_AI_API_KEY,//你的OpenAI API Key
    temperature: 0.9
});

async function run() {
    try {
        const template = "What is a good name for a company that makes {product}?";
        const prompt = new PromptTemplate({
            template: template,
            inputVariables: ["product"],
        });
        const chain = new LLMChain({llm: model, prompt: prompt});
        const res = await chain.call({product: "colorful socks"});
        console.log(res);

    } catch (e) {
        console.error(e)
    }
}

run();
