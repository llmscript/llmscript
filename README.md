# LLMScript

LLMScript is an AI Workflow engine driven by a Scripting Language based on JavaScript. It provides a specialized environment for executing structured commands with AI capabilities, supporting loops, conditional statements, functions, custom queries, recursion, and nested calls.

This work was originally presented in:
"Introducing LLMScript: A Turing Complete Prompt Based Scripting Language for LLMs with No External Coding Required"
Shahin Mowzoon, Mishkin Faustini
2024 2nd International Conference on Foundation and Large Language Models (FLLM)
Published paper: https://ieeexplore.ieee.org/document/10852477

For questions, comments, or to request a copy of the original research paper, please contact: mishkin@personl.ai

## Core Definition

LLMScript is a Turing complete scripting language that runs entirely inside the LLM with no external coding required. It enables the creation of AI-driven workflows that can:
- Execute complex reasoning chains
- Make decisions using iterative workflows
- Integrate Chain of Thought (CoT), Tree of Thought (ToT), and Graph of Thought (GoT) reasoning
- Create dynamic, interactive AI solutions

## Getting Started

To use LLMScript, simply copy the following definition into your preferred LLM (like Claude or ChatGPT) and start creating AI workflows. The language can be adapted to work with any programming language or syntax - this is just one example implementation.

### LLMScript Definition
```
You are an AI Workflow engine driven by a Scripting Language called LLMScript which is based on JavaScript.
Use a text window called LLMScript for displaying the LLMScript.
You are a specialized AI for executing LLMScript structured commands, adept at loops, conditional statements, functions and custom queries, recursion, nested calls and parentheses, with a strict loop limit of 100000 and a focus on clarification for unclear commands.
LLMScript follows these rules:
1.	`AI("query")` generates a string that is the result of the AI responding to the "query". Example:
`let response = AI("A random color")` will place the result of the query which may be `Blue` into the variable `response`.
2.	`JSON(<code>)` returns the result as a JSON object, including a `RESULT` key with a brief answer.
3.	`ARG` is a variable containing the original text query to the LLM.
4.	`OUTPUT("message")` prints out ONLY the string that is in the argument of OUTPUT which in this example is "message".
5.	`INPUT("prompt")` asks the user to enter a value after displaying a text prompt.
6.	The variable VERSION holds the current version of the LLMScript which is currently `alpha 0.2`
When given an LLMScript command, execute it according to these rules and return only the result. Do not provide explanations unless explicitly asked. To start, respond with: `LLMScript environment ready. Enter your LLMScript command:`
```

After pasting this definition, you can either:
1. Ask the LLM to generate an LLMScript to solve a specific problem
2. Write your own LLMScript code using the provided primitives

## Example Workflows

### 1. Simple Document Analysis
```javascript
// Get document name from user
let documentName = INPUT("Enter the name of the document to analyze:")

// Get AI analysis
let analysis = AI(`Analyze the key points of ${documentName}`)

// Display results
OUTPUT(analysis)
```

### 2. Decision Tree Evaluation
```javascript
// Get user's goal
let goal = INPUT("What is your goal?")

// Generate strategies
let strategies = JSON(AI(`Generate 3 strategies for: ${goal}`)).RESULT

// Evaluate each strategy
for (let strategy of strategies) {
    let evaluation = AI(`Evaluate this strategy: ${strategy}`)
    OUTPUT(evaluation)
}
```

### 3. Recursive Problem Solving
```javascript
function fibonacci(n) {
    if (n === 0) return 0
    if (n === 1) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}

let result = fibonacci(20)
OUTPUT(result)
```

## Key Features

1. **In-LLM Programming**: Operates completely within the LLM's prompt environment
2. **Language-Environment Pairing**: Combines JavaScript-like syntax with AI capabilities
3. **Adaptability**: Can be applied to various programming paradigms
4. **Customizable Environment**: Provides essential functions for LLM interaction

## Limitations

- Maximum loop iterations: 100,000
- Requires clarification for unclear commands
- Current version: alpha 0.2

## Contributing

We welcome contributions to LLMScript! The project is open source and encourages experimentation with different language-environment pairs within the LLM's prompt world.

## License

This project is licensed under the MIT License.
