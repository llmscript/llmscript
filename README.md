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

- Replace `<example_name>` with the name of the example file (e.g., `1 - chain of thought`).
- Replace `<llm_name>` with the name of the LLM you want to use (`gpt`, `claude`).

#### Example:

```bash
node cli.js run --example "1 - chain of thought" --llm gpt
```

This will run the "1 - chain of thought" example with GPT.

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
