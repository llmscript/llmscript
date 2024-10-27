
# LLMScript Environment Documentation
**Version:** gpt-4-turbo-preview  
**Last Updated:** 2024-10-27

## 0. Execution Model Requirements
LLMScript is a scripting environment that enables users to write AI-driven workflows. The environment can operate in two modes: `STRICT` and `MIXED`. The execution model defines how commands are processed and executed based on the active mode.

### Basic Command Execution
- **STRICT Mode:** Executes only LLMScript commands. Natural language must be processed using the `AI()` function.
- **MIXED Mode:** Allows both LLMScript commands and direct natural language input. LLMScript commands should be prefixed with `$`.

### Function Call Patterns
LLMScript follows JavaScript-like syntax, supporting functions with arguments and return values.

### Return Values
Direct return values are shown inline without prefixes or tags.

### Error Handling
Errors are displayed inline in red (if supported) without prefixes. Ensure proper validation of inputs to avoid execution errors.

### State Management
State is managed using variables and environment settings. Mode switching and function usage should account for current environment settings.

### Execution Context
Execution context boundaries depend on the active mode (`STRICT` or `MIXED`). Each command or script operates within its isolated context unless explicitly configured to share state.

## 1. Environment Variables

### MODE
**Type:** String  
**Values:** `"STRICT"` or `"MIXED"`  
**Default:** `"STRICT"`  
**Description:** Determines the type of input the environment will accept. `STRICT` mode enforces command-only execution, while `MIXED` allows both commands and natural language.

### LOOP_LIMIT
**Type:** Integer  
**Default:** `128000`  
**Description:** Maximum number of iterations allowed in a loop. Ensures scripts do not run indefinitely.

### VERSION
**Type:** String  
**Default:** `gpt-4-turbo-preview`  
**Description:** Identifies the version of the LLMScript environment.

## 2. Core Function Documentation

### AI(query: String): String
Processes a natural language query and returns a response.

**Parameters:**
- **query**: `String` - The natural language input to be processed.
  * Constraints: Must be a non-empty string.

**Returns:** `String` - The AI-generated response.

**Examples:**
```javascript
// Simple query
const response = AI("What is the weather like today?")
```

### JSON(): Object
Returns a JSON object with the result.

**Returns:** `Object` - The resulting data in JSON format.

**Examples:**
```javascript
const jsonResponse = JSON()
```

### ARG: Object
Contains the original query text.

**Examples:**
```javascript
const originalQuery = ARG
```

### OUTPUT(message: String): void
Displays a message inline without prefixes.

**Parameters:**
- **message**: `String` - The message to be displayed.

**Returns:** `void`

**Examples:**
```javascript
OUTPUT("Process completed successfully")
```

### INPUT(prompt: String): String
Simulates user input.

**Parameters:**
- **prompt**: `String` - The prompt message displayed to the user.
  
**Returns:** `String` - The user input.

**Examples:**
```javascript
const userInput = INPUT("Please enter your name:")
```

### IMAGE(prompt: String): Object
Analyzes the provided image based on the prompt.

**Parameters:**
- **prompt**: `String` - Description of the image to be analyzed.

**Returns:** `Object` - Analysis result.

**Examples:**
```javascript
const imageAnalysis = IMAGE("Analyze the image for objects.")
```

### SUMMARIZE(text: String, length: Integer): String
Generates a summary of the provided text.

**Parameters:**
- **text**: `String` - The text to be summarized.
- **length**: `Integer` - The desired summary length.
  * Constraints: Positive integer.

**Returns:** `String` - The summarized text.

**Examples:**
```javascript
const summary = SUMMARIZE("This is a long article...", 50)
```

### TRANSLATE(text: String, language: String): String
Translates the given text to the specified language.

**Parameters:**
- **text**: `String` - The text to be translated.
- **language**: `String` - Target language code (e.g., "en", "es", "fr").

**Returns:** `String` - The translated text.

**Examples:**
```javascript
const translatedText = TRANSLATE("Bonjour", "en")
```

### SENTIMENT(text: String): String
Analyzes the sentiment of the provided text.

**Parameters:**
- **text**: `String` - The text to analyze.

**Returns:** `String` - Sentiment result (e.g., "positive", "negative", "neutral").

**Examples:**
```javascript
const sentiment = SENTIMENT("I love this product!")
```

### EXTRACT_ENTITIES(text: String): Array
Extracts entities from the provided text.

**Parameters:**
- **text**: `String` - The text from which to extract entities.

**Returns:** `Array` - List of extracted entities.

**Examples:**
```javascript
const entities = EXTRACT_ENTITIES("Barack Obama was the president of the USA.")
```

### CLASSIFY(text: String, categories: Array): String
Classifies the text into one of the specified categories.

**Parameters:**
- **text**: `String` - The text to classify.
- **categories**: `Array` - Array of possible categories.

**Returns:** `String` - The category that best matches the text.

**Examples:**
```javascript
const classification = CLASSIFY("This is a great day!", ["positive", "neutral", "negative"])
```

### FUNCTION(name: String, args: Object): Object
Calls an external function.

**Parameters:**
- **name**: `String` - The name of the function.
- **args**: `Object` - Arguments for the function.

**Returns:** `Object` - Result from the external function.

**Examples:**
```javascript
const result = FUNCTION("customFunction", { key: "value" })
```

### TOOL(name: String, args: Object): Object
Utilizes an external tool.

**Parameters:**
- **name**: `String` - The name of the tool.
- **args**: `Object` - Arguments for the tool.

**Returns:** `Object` - Result from the tool.

**Examples:**
```javascript
const toolResult = TOOL("imageEnhancer", { imageId: "12345" })
```

### GENERATE(prompt: String, tokens: Integer): String
Generates text based on the prompt.

**Parameters:**
- **prompt**: `String` - The text prompt.
- **tokens**: `Integer` - The maximum number of tokens to generate.
  * Constraints: Positive integer.

**Returns:** `String` - The generated text.

**Examples:**
```javascript
const generatedText = GENERATE("Write a poem about autumn", 100)
```

## Module System
LLMScript supports modules that can be imported or exported.

### Import
Upload `.llm` files via the LLMScript interface. Modules become automatically available after upload.

### Export
Modules can be copied directly from LLMScript windows.

## Command
### TOGGLE_MODE
Switches between `STRICT` and `MIXED` modes.

**Examples:**
```javascript
TOGGLE_MODE
```

---
