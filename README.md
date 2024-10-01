# LLMScript

LLMScript is ...

## Purpose

Please write a purpose here

## Table of Contents

- [LLMScript](#llmscript)
  - [Purpose](#purpose)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Running an Example](#running-an-example)
      - [Example:](#example)
    - [Custom Conversation](#custom-conversation)
      - [Example:](#example-1)
    - [Uploading Images](#uploading-images)
  - [Available Examples](#available-examples)
  - [Logging](#logging)
  - [Available Options](#available-options)
  - [Environment Variables](#environment-variables)
  - [License](#license)

---

## Installation

1. **Clone the repository**:

    ```bash
    git clone <repo_url>
    cd llm-script
    ```

2. **Install the dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file** with your LLM API keys:

    ```bash
    LLM_API_KEY_GPT=<Your OpenAI API Key>
    LLM_API_KEY_CLAUDE=<Your Claude API Key>
    LLMSCRIPT_VERSION=1.0.0
    ```

---

## Usage

You can run the LLMScript CLI to either execute predefined examples or start custom conversations with a supported LLM (e.g., GPT, Claude).

### Running an Example

To run a specific example:

```bash
node cli.js run --example <example_name> --llm <llm_name>
```

- Replace `<example_name>` with the name of the example file (e.g., `chain_of_thought`).
- Replace `<llm_name>` with the name of the LLM you want to use (`gpt`, `claude`).

#### Example:

```bash
node cli.js run --example "chain_of_thought" --llm gpt
```

This will run the "chain_of_thought" example with GPT.

### Custom Conversation

If you want to start a custom conversation without an example:

```bash
node cli.js run --llm <llm_name>
```

#### Example:

```bash
node cli.js run --llm gpt
```

This starts a conversation with GPT, and you can interact with the assistant via the terminal.

### Uploading Images

You can drag and drop an image into the terminal or input the file path to upload it during a conversation.

- **To upload an image file** (local image):
    - Just type or paste the image file path during a conversation (e.g., `/path/to/your/image.png`).

- **To upload an image URL**:
    - Type or paste the image URL during the conversation (e.g., `https://example.com/image.png`).

---

## Available Examples

The following examples are included in the `examples` folder and can be run directly from the CLI:

1. **Chain of Thought (`1 - chain of thought.js`)**
   This script helps demonstrate how the LLM can chain thoughts and actions together in a structured reasoning process.

   ```bash
   node cli.js run --example "chain of thought" --llm gpt
   ```

2. **Tree of Thought (`2 - tree of thought.js`)**
   Demonstrates a decision-making tree process using the LLM to explore different branches of reasoning.

   ```bash
   node cli.js run --example "tree of thought" --llm gpt
   ```

3. **Graph of Thought (`3 - graph of thought.js`)**
   Executes a more complex graph traversal using the LLM, allowing for interconnected reasoning paths.

   ```bash
   node cli.js run --example "graph of thought" --llm gpt
   ```

4. **Soduko Solver (`A - Soduko.js`)**
   This script helps solve a Sudoku puzzle using the LLM's reasoning capabilities.

   ```bash
   node cli.js run --example "Soduko" --llm gpt
   ```

5. **Complicated Math (`a - ComplicatedMath.js`)**
   A math-focused example that challenges the LLM to solve complex mathematical problems.

   ```bash
   node cli.js run --example "ComplicatedMath" --llm gpt
   ```

6. **Solve 24 Puzzle (`C - Solve24Puzzle.js`)**
   This example tackles solving the classic "24 puzzle," a math challenge where the goal is to use four numbers and basic arithmetic to reach 24.

   ```bash
   node cli.js run --example "Solve24Puzzle" --llm gpt
   ```

7. **Quantum Math (`e - QuantumMath.js`)**
   This example delves into the realm of quantum mathematics, allowing the LLM to tackle highly complex equations.

   ```bash
   node cli.js run --example "QuantumMath" --llm gpt
   ```

---

## Logging

Each run generates a log file saved in the `logs` directory. The log file will contain a timestamp and either the name of the example run or `custom_run` if no example was provided.

- If an example was run:
    - `logs/chain_of_thought_gpt_1696108461312.txt`

- If it was a custom conversation:
    - `logs/custom_run_gpt_1696108461312.txt`

The log file contains the entire conversation, including the prompts and responses.

---

## Available Options

Here’s a list of available options for the `run` command:

| Option             | Description                                             | Default Value |
|--------------------|---------------------------------------------------------|---------------|
| `--example, -e`    | Specify the example to run (e.g., "chain_of_thought").   | N/A           |
| `--llm, -l`        | Specify the LLM to use (`gpt` or `claude`).              | gpt           |

---

## Environment Variables

To run the CLI properly, you need to provide your LLM API keys in a `.env` file. Here are the required environment variables:

```bash
LLM_API_KEY_GPT=<Your OpenAI API Key>
LLM_API_KEY_CLAUDE=<Your Claude API Key>
LLMSCRIPT_VERSION=1.0.0
```

- **LLM_API_KEY_GPT**: Your API key for OpenAI GPT.
- **LLM_API_KEY_CLAUDE**: Your API key for Anthropic Claude.
- **LLMSCRIPT_VERSION**: The current version of your LLMScript setup.

---

## License

This project is licensed under the MIT License.

---

Feel free to adjust this `README.md` to suit additional details about the functionality and purpose of your LLMScript project.