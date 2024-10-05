import { Command } from "commander";
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import {
  runOpenAIConversation,
  resetConversation as resetOpenAIConversation,
} from "./llms/openai.js";
import {
  runClaudeConversation,
  resetConversation as resetClaudeConversation,
} from "./llms/claude.js";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const llmScriptVersion = process.env.LLMSCRIPT_VERSION || "unknown"; // LLMScript version

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir); // Create the logs directory if it doesn't exist
}

// Function to detect if a message is code or plain text and apply colorization
function colorizeOutput(message) {
  const codeBlockPattern = /```(.*?)```/gs;

  const codeSnippets = message.match(codeBlockPattern);

  if (codeSnippets) {
    // Replace the code blocks with colorized versions
    message = message.replace(codeBlockPattern, (match, p1) => {
      return chalk.green(p1.trim()); // Colorize code blocks green
    });
  }

  // Replace key words that look like code with chalk styles
  message = message.replace(/(let|const|var|function|log)/g, chalk.blue("$1")); // Keywords in blue
  message = message.replace(/(".*?")/g, chalk.yellow("$1")); // String literals in yellow

  return message;
}

// Function to detect if input is an image file path or URL
function isImageFile(filePath) {
  const fileExtension = path.extname(filePath).toLowerCase();
  return [".png", ".jpg", ".jpeg", ".gif", ".bmp"].includes(fileExtension);
}

function isImageUrl(input) {
  return input.startsWith("http://") || input.startsWith("https://");
}

// Function to clean the file path (remove escape characters and handle spaces)
function cleanFilePath(filePath) {
  return path.resolve(filePath.replace(/\\ /g, " ")); // Replace escaped spaces with actual spaces and resolve the path
}

// Create a new log file
function createLogFile(logFileName) {
  const logFilePath = path.join(logsDir, logFileName);
  const initialContent = `LLMScript Version: ${llmScriptVersion}\nConversation Log:\n\n`;
  fs.writeFileSync(logFilePath, initialContent);
  return logFilePath;
}

// Append messages to the log file
function appendToLog(logFilePath, message, role) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${role.toUpperCase()}: ${message}\n\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

// Start the conversation loop
async function startConversation(
  llmName,
  initialPrompt,
  exampleScript = null,
  exampleName = null
) {
  // Generate the log file name based on whether an example was provided
  const examplePart = exampleName ? exampleName : "custom_run";
  const logFileName = `${examplePart}_${llmName}_${Date.now()}.txt`;
  const logFilePath = createLogFile(logFileName);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "You: ",
  });

  // Prepare the initial message (LLMScript prompt + optional example script)
  let initialMessage = initialPrompt;

  // Append the initial prompt to the log
  appendToLog(logFilePath, initialMessage, "user");

  // Start the conversation based on the LLM being used
  let userMessage = initialMessage;
  let response;

  if (llmName === "gpt") {
    resetOpenAIConversation(); // Reset the conversation context
    response = await runOpenAIConversation(userMessage);
  } else if (llmName === "claude") {
    resetClaudeConversation(); // Reset the conversation context
    response = await runClaudeConversation(userMessage);
  }

  console.log("\n");
  console.log(chalk.bold("Assistant:"));
  console.log(colorizeOutput(response)); // Use colorizeOutput to print colorized output
  appendToLog(logFilePath, response, "assistant");

  if (llmName === "gpt") {
    appendToLog(logFilePath, exampleScript, "user");
    response = await runOpenAIConversation(exampleScript);
  } else if (llmName === "claude") {
    appendToLog(logFilePath, exampleScript, "user");
    response = await runClaudeConversation(exampleScript);
  }

  console.log("\n");
  console.log(chalk.bold("Assistant:"));
  console.log(colorizeOutput(response)); // Use colorizeOutput to print colorized output
  appendToLog(logFilePath, response, "assistant");

  rl.prompt();

  rl.on("line", async (line) => {
    userMessage = line.trim();

    if (userMessage.toLowerCase() === "exit") {
      rl.close();
    } else if (isImageUrl(userMessage)) {
      console.log(chalk.green("Detected an image URL. Uploading..."));
      appendToLog(logFilePath, userMessage, "user");

      if (llmName === "gpt") {
        response = await runOpenAIConversation("", userMessage, true); // Send image URL to OpenAI
      } else if (llmName === "claude") {
        response = await runClaudeConversation("", userMessage, true); // Send image URL to Claude
      }

      console.log("\n");
      console.log(chalk.bold("Assistant:"));
      console.log(colorizeOutput(response)); // Colorized output
      appendToLog(logFilePath, response, "assistant");
    } else if (isImageFile(userMessage)) {
      console.log(chalk.green("Detected a local image file. Uploading..."));

      // Clean the file path and resolve it
      const cleanedImagePath = cleanFilePath(userMessage);
      appendToLog(logFilePath, cleanedImagePath, "user");

      if (llmName === "gpt") {
        response = await runOpenAIConversation("", cleanedImagePath, false); // Send local image to OpenAI
      } else if (llmName === "claude") {
        response = await runClaudeConversation("", cleanedImagePath, false); // Send local image to Claude
      }

      console.log("\n");
      console.log(chalk.bold("Assistant:"));
      console.log(colorizeOutput(response), "\n\n"); // Colorized output
      appendToLog(logFilePath, response, "assistant");
    } else {
      appendToLog(logFilePath, userMessage, "user");

      if (llmName === "gpt") {
        response = await runOpenAIConversation(userMessage);
      } else if (llmName === "claude") {
        response = await runClaudeConversation(userMessage);
      }

      console.log("\n");
      console.log(chalk.bold("Assistant:"));
      console.log(colorizeOutput(response)); // Colorized output
      appendToLog(logFilePath, response, "assistant");
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Conversation ended. Log saved to", logFileName);
    process.exit(0);
  });
}

const program = new Command();

program
  .command("run")
  .description("Start a conversation with the AI")
  .option("-l, --llm <name>", "Specify the LLM to use (gpt, claude)", "gpt")
  .option("-e, --example <name>", "Run a specific example by name")
  .action((options) => {
    const llmScriptPrompt = fs.readFileSync("LLMScript-new.md", "utf8");
    let exampleScript = null;
    let exampleName = null;

    // If an example is provided, load it
    if (options.example) {
      const examplePath = path.resolve(
        __dirname,
        "examples",
        `${options.example}.js`
      );
      if (fs.existsSync(examplePath)) {
        exampleScript = `
        // --------------- BEGINNING OF LLMScript CODE ---------------
        ${fs.readFileSync(examplePath, "utf8")}
        // --------------- END OF LLMScript CODE ---------------

        LLMScript Execution Output:
        `;
        exampleName = options.example; // Capture the example name for the log file
      } else {
        console.error(`Example "${options.example}" not found.`);
        process.exit(1);
      }
    }

    // Begin a conversation with the selected LLM (with or without the example script)
    startConversation(options.llm, llmScriptPrompt, exampleScript, exampleName);
  });

program.parse(process.argv);
