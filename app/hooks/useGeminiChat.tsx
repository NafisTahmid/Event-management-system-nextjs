// hooks/useGeminiChat.ts
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDqHBupBk-Qc8Jzc6DTNsj4Hwrid5p_kVA"; // Replace with your actual API key

export function useGeminiChat() {
  const [messages, setMessages] = useState<
    { role: "user" | "model"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const aiMessage = { role: "model" as const, content: text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error("Error generating content:", err);
      setError("An error occurred while generating the response.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  };
}
