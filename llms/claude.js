import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.LLM_API_KEY_CLAUDE,
});

let conversationContext = []; // Keep track of all messages in the conversation

function encodeImageToBase64(imagePath) {
  const resolvedPath = path.resolve(imagePath);
  const imageBuffer = fs.readFileSync(resolvedPath);
  return imageBuffer.toString("base64");
}

export async function runClaudeConversation(
  inputMessage,
  imagePath = null,
  isImageUrl = false
) {
  try {
    let content = [{ type: "text", text: inputMessage }];

    if (imagePath) {
      if (isImageUrl) {
        content.push({
          type: "image",
          source: {
            type: "url",
            url: imagePath,
          },
        });
      } else {
        const base64Image = encodeImageToBase64(imagePath);
        content.push({
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: base64Image,
          },
        });
      }
    }

    conversationContext.push({ role: "user", content });

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: conversationContext,
      temperature: 0.7,
    });

    const assistantMessage = response.content[0].text;
    conversationContext.push({
      role: "assistant",
      content: [{ type: "text", text: assistantMessage }],
    });

    return assistantMessage;
  } catch (error) {
    console.error("Full error object:", error);
    throw new Error(`Error during Claude conversation: ${error.message}`);
  }
}

export function resetConversation() {
  conversationContext = [];
}
