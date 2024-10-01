// llms/openai.js
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.LLM_API_KEY_GPT,
});

let conversationContext = []; // Keep track of all messages in the conversation

// Function to encode the image into base64 format
function encodeImageToBase64(imagePath) {
  // Use path.resolve to get the absolute path and handle spaces in the file path
  const resolvedPath = path.resolve(imagePath);
  const imageBuffer = fs.readFileSync(resolvedPath); // Read the image from the resolved path
  return imageBuffer.toString("base64");
}

// Function to handle both image (URL or base64) and text input in OpenAI conversation
export async function runOpenAIConversation(
  inputMessage,
  imagePath = null,
  isImageUrl = false
) {
  try {
    // Build the base message
    let userMessage = [{ type: "text", text: inputMessage }];

    // If an image is provided, handle URL or local image encoding
    if (imagePath) {
      if (isImageUrl) {
        userMessage.push({
          type: "image_url",
          image_url: { url: imagePath },
        });
      } else {
        const base64Image = encodeImageToBase64(imagePath);
        userMessage.push({
          type: "image_url",
          image_url: { url: `data:image/jpeg;base64,${base64Image}` },
        });
      }
    }

    // Append the user's message to the conversation history
    conversationContext.push(
      conversationContext.length > 0
        ? { role: "user", content: userMessage }
        : { role: "system", content: userMessage }
    );

    // Make the API request with the constructed message
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversationContext,
      temperature: 0.2,
      top_p: 0.1,
    });

    const assistantMessage = completion.choices[0].message.content;

    // Append the assistant response to the conversation history
    conversationContext.push({ role: "assistant", content: assistantMessage });

    return assistantMessage;
  } catch (error) {
    throw new Error(
      `Error during OpenAI GPT-4o conversation: ${error.message}`
    );
  }
}

export function resetConversation() {
  conversationContext = []; // Reset conversation history
}
