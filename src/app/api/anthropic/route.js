import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

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
    temperature[0],
    max_tokens[0],
    top_p[0],
    top_k[0],
  );
  let msg;
  for(let i = 0;i<model.length;i++){
  const anthropic = new Anthropic({
    apiKey: key, 
  });
  if(model[i] == "claude-3-opus-20240229" || model[i] == "claude-3-sonnet-20240229", model[i] == "claude-3-haiku-20240307"){
   msg = await anthropic.messages.create({
    model:  model[i],
    max_tokens: max_tokens[0],
    temperature: temperature[0],
    top_p: top_p[0],
    // top_k: top_k[0],
    system: system,
    messages: [{ role: "user", content: user }],
  });
  console.log(msg);
  res[i]=[msg];
}
  }
  return NextResponse.json(msg);
}
