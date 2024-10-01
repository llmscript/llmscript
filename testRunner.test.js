// testRunner.test.js
import { runOpenAIExample } from "./llms/openai.js";
import { runClaudeExample } from "./llms/claude.js";
import fs from "fs";
import path from "path";
import { expect } from "chai";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const examplesDir = path.resolve(__dirname, "examples");

async function runExampleWithLLM(examplePath, llm) {
  const llmScriptPrompt = fs.readFileSync(
    path.resolve(__dirname, "LLMScript.md"),
    "utf8"
  );
  const exampleScript = fs.readFileSync(examplePath, "utf8");
  const fullPrompt = `${llmScriptPrompt}\n\n${exampleScript}`;

  switch (llm) {
    case "gpt":
      return await runOpenAIExample(fullPrompt);
    case "claude":
      return await runClaudeExample(fullPrompt);
    default:
      throw new Error(`Unsupported LLM: ${llm}`);
  }
}

describe("LLMScript Example Tests", function () {
  this.timeout(15000); // Adjust based on API response time
  const exampleFiles = fs
    .readdirSync(examplesDir)
    .filter((file) => file.endsWith(".js"));

  ["gpt", "claude"].forEach((llm) => {
    describe(`Testing ${llm.toUpperCase()}`, () => {
      exampleFiles.forEach((file) => {
        it(`should correctly run ${file} on ${llm.toUpperCase()}`, async () => {
          const examplePath = path.join(examplesDir, file);
          const result = await runExampleWithLLM(examplePath, llm);

          expect(result).to.be.a("string"); // Adjust based on expected API response format
        });
      });
    });
  });
});
