import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "edge";

// Initialize the GoogleGenAI client with your API key
const ai = new GoogleGenAI({
  apiKey: "AIzaSyDqHBupBk-Qc8Jzc6DTNsj4Hwrid5p_kVA" || "",
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Construct the contents array for the API request
    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Generate content using the Gemini 2.0 Flash model
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });
    console.log(response);

    // Return the generated text as a JSON response
    return NextResponse.json({
      content: response.text,
      role: "model",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
