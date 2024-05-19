import Groq from "groq-sdk";
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
    let res = [];
    let groq;
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < key.length; j++) {
        if (key[j].startsWith("AIza")) {
          groq = new Groq({
            apiKey: key[j],
          });
        }
      }
      if (["gpt-4o", "gpt-3.5-turbo", "gpt-4-turbo"].includes(model[i])) {
        const chatCompletion = await groq.chat.completions.create({
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
          model: model[i],
          temperature: temperature[0],
          max_tokens: max_tokens[0],
          top_p: top_p[0],
          stop: null,
        });
        res[i] = [chatCompletion.choices[0]?.message?.content || ""];
      }
    }

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
