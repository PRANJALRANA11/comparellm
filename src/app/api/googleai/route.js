import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
export async function POST(NextRequest) {
  try {
    
  
  const { final } = await NextRequest.json();
  const {
    key,
    model,
    prompt: { system, user },
    slider: {
      temperature,
      maxLength: max_tokens,
      topP: top_p,
      topK: top_k,
      frequencyPenalty: frequency_penalty,
      presencePenalty: presence_penalty,
    },
  } = final;
  console.log(
    key,
    model,
    system,
    user,
    temperature,
    max_tokens[0],
    top_p,
    top_k,
    frequency_penalty,
    presence_penalty
  );
  let res = [];
  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: max_tokens[0],
    temperature: temperature[0],
    topP: top_p[0],
    topK: top_k[0],
  };
  let API_KEY;
  for (let i = 0; i < model.length; i++) {
    for (let j = 0; j < key.length; j++) {
      if (key[j].startsWith("AIza")) {
        API_KEY = key[j];
      }
    }
    if (model[i] === "gemini-1.0-pro") {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.0-pro",
        generationConfig,
      });
      const result = await model.generateContent(user);
      const response = await result.response;
      const text = response.text();
      res[i] = [text];
      console.log(text);
    }
  }
  return NextResponse.json(res);
}
  catch (error) {
    return NextResponse.json(error);
  }
}
