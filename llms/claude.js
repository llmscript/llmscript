// llms/claude.js
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.LLM_API_KEY_CLAUDE,
});

let conversationContext = []; // Keep track of all messages in the conversation

// Function to handle Claude conversation
export async function runClaudeConversation(userMessage) {
  try {
    // Append the user's message to the conversation history
    conversationContext.push({ role: "user", content: userMessage });

    const response = await anthropic.completions.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: conversationContext, // Send the conversation history
    });

    const assistantMessage = response.completion;

    // Append the assistant response to the conversation history
    conversationContext.push({ role: "assistant", content: assistantMessage });

    return assistantMessage;
  } catch (error) {
    throw new Error(`Error during Claude conversation: ${error.message}`);
  }
}

// Function to reset the conversation history
export function resetConversation() {
  conversationContext = []; // Reset conversation history
}
