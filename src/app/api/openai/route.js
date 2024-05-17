import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(NextRequest) {
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
    max_tokens,
    top_p,
    top_k,
    frequency_penalty,
    presence_penalty
  );
  let res = [];
for(let i = 0;i<model.length;i++){
  const openai = new OpenAI({
    apiKey: key,
  });
  const response = await openai.chat.completions.create({
    model: model[i],
    messages: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: user,
      },
    ],
    temperature: temperature[0],
    max_tokens: max_tokens[0],
    // top_k: top_k,
    top_p: top_p[0],
    frequency_penalty: frequency_penalty[0],
    presence_penalty: presence_penalty[0],
  });
  res[i] = [response.choices[0].message.content];
}
  return NextResponse.json(res);
}
