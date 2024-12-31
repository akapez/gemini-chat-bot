"use server";
import { Prompt } from "@repo/types";

export async function createChatCompletion(request: string): Promise<Prompt> {
  const response = await fetch(`${process.env.API_URL}/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: request }),
  });
  return response.json();
}
