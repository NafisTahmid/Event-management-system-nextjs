import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";
import { GoogleGenAI } from "@google/genai";

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyDqHBupBk - Qc8Jzc6DTNsj4Hwrid5p_kVA" || "",
});
export const runtime = "edge";
const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages: Message[] = []): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export async function POST(request: Request) {
  const { message } = await request.json();
  const stream = await streamText({
    model: google("gemini-pro"),
    messages: buildGoogleGenAIPrompt(message),
    temperature: 0.7,
  });
  return stream?.toDataStreamResponse();
}
