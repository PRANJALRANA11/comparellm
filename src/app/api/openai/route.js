import { NextRequest } from "next/server";
import OpenAI from "openai";


export async function GET (NextRequest){
    const body = await NextRequest.json()
    const openai = new OpenAI({
        apiKey: key,
      });
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": system
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": user
              }
            ]
          },
          {
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": "Hello! How can I assist you today?"
              }
            ]
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    return NextResponse.json({message: 'GET request to the homepage'})
}




