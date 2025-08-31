import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// make chain and export 

const googleApikey = import.meta.env.VITE_GOOGLE_API_KEY
const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.5-flash", 
    apiKey: googleApikey
})

const systemTemp = ``
