import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { final } = await req.json();
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
    let openai;
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < key.length; j++) {
        if (key[j].startsWith("sk-")) {
          openai = new OpenAI({
            apiKey: key[j],
          });
        }
      }
      if (["gpt-4o", "gpt-3.5-turbo", "gpt-4-turbo"].includes(model[i])) {
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
          top_p: top_p[0],
          frequency_penalty: frequency_penalty[0],
          presence_penalty: presence_penalty[0],
        });

        res[i] = [response.choices[0].message.content];
        console.log(model[i], response.choices[0].message.content);
      }
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
