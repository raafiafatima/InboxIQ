import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";

// make chain and export, call response when email loads 

const googleApikey = import.meta.env.VITE_GOOGLE_API_KEY
const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.5-flash", 
    apiKey: googleApikey
})

const systemTemp = `You are an AI assistant for customer support. 
You will be given:
- The subject of the email : {subject}
- The body of the email : {body}
- The detected sentiment of the email : {sentiment}

Your task:
- Generate exactly 3 possible reply suggestions that a support agent can send back.
- Make the replies polite, professional, and concise.
- Adapt the tone slightly depending on the sentiment (e.g., empathetic if negative, cheerful if positive).
- Do not include the subject, sentiment, or any explanations in your output.
- Only return the reply bodies as a json object, numbered 1 through 3.
`

const systemPrompt = ChatPromptTemplate.fromTemplate(systemTemp)

const jsonParser = new JsonOutputParser()

const ReplyChain = systemPrompt.pipe(llm).pipe(jsonParser)

export default ReplyChain

