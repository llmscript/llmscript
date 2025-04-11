# LLMScript

LLMScript is an AI Workflow engine driven by a Scripting Language based on JavaScript. It provides a specialized environment for executing structured commands with AI capabilities, supporting loops, conditional statements, functions, custom queries, recursion, and nested calls.

This work was originally presented in:
"Introducing LLMScript: A Turing Complete Prompt Based Scripting Language for LLMs with No External Coding Required"
Shahin Mowzoon, Mishkin Faustini
2024 2nd International Conference on Foundation and Large Language Models (FLLM)
Published paper: https://ieeexplore.ieee.org/document/10852477

For questions, comments, please contact: mishkin@personl.ai

## Core Definition

LLMScript is a Turing complete scripting language that runs entirely inside the LLM with no external coding required. It enables the creation of AI-driven workflows that can:

- Execute complex reasoning chains
- Make decisions using iterative workflows
- Integrate Chain of Thought (CoT), Tree of Thought (ToT), and Graph of Thought (GoT) reasoning
- Create dynamic, interactive AI solutions

## Getting Started

To use LLMScript, follow these steps:

1. **Copy the LLMScript Definition**
   - Copy the entire definition block below
   - Paste it into your preferred LLM (ChatGPT, Claude, etc.)
   - The LLM will respond with: `LLMScript environment ready. Enter your LLMScript command:`

2. **Write or Use LLMScript Code**
   - Write your own code using the provided primitives
   - Use one of the example scripts from this repository
   - Modify existing examples to suit your needs

3. **Execute Your Script**
   - Paste your LLMScript code into the LLM
   - The LLM will execute it according to the rules
   - Interact with any prompts or inputs required

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

## Example Scripts

Below are example scripts you can copy and use after initializing the LLMScript environment in your LLM. Feel free to modify them or use them as inspiration for your own scripts.

### 1. Choose Your Own Adventure
```javascript
// Initial setup
let genre = INPUT("Choose genre (fantasy, sci-fi, mystery):")
let playerName = INPUT("Enter your character's name:")

// Initialize story state
let health = 100
let inventory = []
let currentLocation = "start"

// Generate story beginning
let intro = AI(`Create a brief ${genre} story introduction where ${playerName} faces a challenge.
End with exactly two choices the player must make.`)
OUTPUT(intro)

// Main story loop
while (health > 0 && currentLocation !== "end") {
    // Get player's choice
    let choice = INPUT("What do you choose? (1 or 2):")

    // Generate consequence based on choice and current state
    let consequence = JSON(AI(`Given:
    - Player ${playerName} with health ${health}
    - Inventory: ${inventory.join(', ')}
    - Current location: ${currentLocation}
    - Genre: ${genre}
    Generate consequence for choice ${choice} including:
    {
        "outcome": "brief description of what happens",
        "healthChange": number between -30 and +20,
        "itemFound": "item or empty",
        "newLocation": "location name",
        "isEnding": boolean
    }`)).RESULT

    // Update game state
    health += consequence.healthChange
    if (consequence.itemFound) {
        inventory.push(consequence.itemFound)
        OUTPUT(`You found: ${consequence.itemFound}`)
    }
    currentLocation = consequence.newLocation

    // Display outcome
    OUTPUT(`\nHealth: ${health}
${consequence.outcome}`)

    // If not an ending, generate new choices
    if (!consequence.isEnding && health > 0) {
        let nextChoices = AI(`Create two new choices for ${playerName} in ${currentLocation},
considering their inventory: ${inventory.join(', ')}`)
        OUTPUT(nextChoices)
    } else {
        currentLocation = "end"
    }
}

// Generate ending based on final state
let ending = AI(`Create a ${health <= 0 ? "tragic" : "triumphant"} ending for ${playerName}'s
${genre} adventure, mentioning their final health (${health}) and key items: ${inventory.join(', ')}`)
OUTPUT(ending)
```

### 2. Vacation Planner
```javascript
// Get vacation preferences
let preferences = JSON(AI(`Create a travel preference questionnaire with 4 key questions`)).RESULT

// Get user inputs
let answers = {}
for (let question of preferences) {
    answers[question] = INPUT(question)
}

// Generate destination suggestions
let destinations = JSON(AI(`Based on these preferences:
${JSON.stringify(answers, null, 2)}
Suggest 3 perfect vacation destinations. Include for each:
- Location name
- Best time to visit
- Estimated daily budget
- Top 3 attractions`)).RESULT

// Get user's chosen destination
let chosen = INPUT(`Choose one destination from:\n${destinations.map(d => d.location).join('\n')}`)

// Create detailed itinerary
let itinerary = JSON(AI(`Create a 5-day itinerary for ${chosen} considering:
- Preferences: ${JSON.stringify(answers)}
- Daily budget: ${destinations.find(d => d.location === chosen).budget}
- Must-see attractions: ${destinations.find(d => d.location === chosen).attractions.join(', ')}`)).RESULT

// Generate final travel plan
let travelPlan = AI(`Create a comprehensive travel plan for ${chosen}:
1. Detailed day-by-day itinerary: ${JSON.stringify(itinerary)}
2. Packing suggestions based on destination and activities
3. Local customs and etiquette tips
4. Emergency contact information and travel tips`)

OUTPUT(travelPlan)
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
- Requires clarification for unclear commands and sometimes
- Current version: alpha 0.2

## Contributing

We welcome contributions to LLMScript! The project is open source and encourages experimentation with different language-environment pairs within the LLM's prompt world.

## License

This project is licensed under the MIT License.