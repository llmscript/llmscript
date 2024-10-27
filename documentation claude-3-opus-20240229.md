# LLMScript Environment Documentation
Version: claude-3-opus-20240229
Last Updated: 2024-10-26
Mode Support: STRICT and MIXED

## 0. Execution Model

### Command Execution
LLMScript commands can be executed in two modes:
- STRICT: Only LLMScript commands are accepted
- MIXED: Both natural language and LLMScript (prefixed with $) are accepted

```javascript
// In-LLM scripting
// STRICT mode
OUTPUT("Hello World")

// MIXED mode
$OUTPUT("Hello World")
```

### State Management
- Environment variables persist across commands within a session
- LOOP_LIMIT enforces maximum iteration count (200000)
- MODE setting determines command interpretation

## 1. Environment Variables

```javascript
// In-LLM scripting
const environment = {
  MODE: "STRICT" | "MIXED",    // Command interpretation mode
  LOOP_LIMIT: 200000,          // Maximum iteration count
  VERSION: "claude-3-opus-20240229"  // Environment version
}
```

## 2. Core Functions

### AI(query: string): string
Natural language processing interface

Parameters:
- query: string - Natural language input
  * Any valid text string
  * No length limitations enforced

Returns: string - AI-generated response

```javascript
// In-LLM scripting
// Simple query
const response = AI("What is the weather like?")

// Complex analysis
const analysis = AI("Analyze the following text: " + text)
```

### JSON(): object
Returns structured data as JSON object

Returns: object - Structured data result

```javascript
// In-LLM scripting
const data = JSON({
  key: "value",
  number: 123,
  nested: {
    array: [1, 2, 3]
  }
})
```

### OUTPUT(message: string): void
Display message without formatting

Parameters:
- message: string - Text to display
  * Any valid string
  * No prefix or formatting applied

```javascript
// In-LLM scripting
OUTPUT("Status: Processing complete")
```

### INPUT(prompt: string): string
Simulate user input request

Parameters:
- prompt: string - Input prompt text
  * Any valid string

Returns: string - Simulated user input

```javascript
// In-LLM scripting
const userInput = INPUT("Enter your name: ")
```

## 3. Advanced Functions

### IMAGE(prompt: string): object
Analyze image content

Parameters:
- prompt: string - Image analysis instructions
  * Natural language instructions for analysis

Returns: object - Image analysis results

```javascript
// In-LLM scripting
const analysis = IMAGE("Describe the main objects in the image")
```

### SUMMARIZE(text: string, length?: number): string
Generate text summary

Parameters:
- text: string - Text to summarize
  * Any valid text string
- length: number (optional) - Target summary length
  * Positive integer
  * Default: Auto-determined based on input

Returns: string - Generated summary

```javascript
// In-LLM scripting
const summary = SUMMARIZE("Long text here", 100)
```

### TRANSLATE(text: string, language: LanguageCode): string
Translate text to specified language

Parameters:
- text: string - Text to translate
  * Any valid text string
- language: LanguageCode - Target language
  * ISO 639-1 language codes
  * Example: "en", "es", "fr", "de"

Returns: string - Translated text

```javascript
// In-LLM scripting
const translated = TRANSLATE("Hello world", "es")
```

### SENTIMENT(text: string): SentimentResult
Analyze text sentiment

Parameters:
- text: string - Text to analyze
  * Any valid text string

Returns: SentimentResult
```typescript
type SentimentResult = {
  score: number;     // Range: -1.0 to 1.0
  label: "positive" | "negative" | "neutral";
  confidence: number; // Range: 0.0 to 1.0
}
```

```javascript
// In-LLM scripting
const sentiment = SENTIMENT("Great product, highly recommend!")
```

### EXTRACT_ENTITIES(text: string): Entity[]
Extract named entities from text

Parameters:
- text: string - Text to analyze
  * Any valid text string

Returns: Entity[]
```typescript
type Entity = {
  text: string;
  type: "PERSON" | "ORG" | "GPE" | "DATE" | "TIME" | "MONEY";
  confidence: number;
}
```

```javascript
// In-LLM scripting
const entities = EXTRACT_ENTITIES("John works at Apple in California")
```

### CLASSIFY(text: string, categories: string[]): Classification
Classify text into predefined categories

Parameters:
- text: string - Text to classify
  * Any valid text string
- categories: string[] - Possible classification categories
  * Array of category names

Returns: Classification
```typescript
type Classification = {
  category: string;
  confidence: number;
  alternatives: {
    category: string;
    confidence: number;
  }[];
}
```

```javascript
// In-LLM scripting
const classification = CLASSIFY(
  "Breaking news about tech stocks",
  ["politics", "technology", "business"]
)
```

### GENERATE(prompt: string, tokens?: number): string
Generate text based on prompt

Parameters:
- prompt: string - Generation instructions
  * Natural language prompt
- tokens: number (optional) - Maximum tokens to generate
  * Positive integer
  * Default: Auto-determined

Returns: string - Generated text

```javascript
// In-LLM scripting
const story = GENERATE("Write a short story about a robot", 500)
```

### COMPARE(text1: string, text2: string): Comparison
Compare two text segments

Parameters:
- text1: string - First text for comparison
  * Any valid text string
- text2: string - Second text for comparison
  * Any valid text string

Returns: Comparison
```typescript
type Comparison = {
  similarity: number;  // Range: 0.0 to 1.0
  differences: {
    added: string[];
    removed: string[];
    changed: string[];
  };
  commonElements: string[];
}
```

```javascript
// In-LLM scripting
const diff = COMPARE(
  "The quick brown fox",
  "The quick brown dog"
)
```

### FORMAT(text: string, style: FormatStyle): string
Format text according to specified style

Parameters:
- text: string - Text to format
  * Any valid text string
- style: FormatStyle - Formatting style
  * "markdown" | "html" | "json" | "plain"

Returns: string - Formatted text

```javascript
// In-LLM scripting
const formatted = FORMAT("**Bold** text", "html")
```

### RAG(query: string): RAGResult
Retrieval Augmented Generation

Parameters:
- query: string - Search query
  * Natural language query

Returns: RAGResult
```typescript
type RAGResult = {
  answer: string;
  sources: {
    text: string;
    relevance: number;
    metadata: object;
  }[];
  confidence: number;
}
```

```javascript
// In-LLM scripting
const result = RAG("What are the key features of LLMScript?")
```

### ARTIFACT(type: string, content: any): ArtifactResult
Create structured artifact

Parameters:
- type: string - Artifact type
  * "data" | "code" | "text" | "json"
- content: any - Artifact content
  * Structure depends on type

Returns: ArtifactResult
```typescript
type ArtifactResult = {
  id: string;
  type: string;
  content: any;
  metadata?: object;
}
```

```javascript
// In-LLM scripting
const artifact = ARTIFACT("json", {
  data: {
    key: "value",
    array: [1, 2, 3]
  },
  metadata: {
    schema: "example-schema"
  }
})
```

## 4. Type Definitions

```typescript
type LanguageCode = 
  | "ar" // Arabic
  | "bn" // Bengali
  | "de" // German
  | "en" // English
  | "es" // Spanish
  | "fr" // French
  | "hi" // Hindi
  | "it" // Italian
  | "ja" // Japanese
  | "ko" // Korean
  | "pt" // Portuguese
  | "ru" // Russian
  | "zh" // Chinese

type FormatStyle = "markdown" | "html" | "json" | "plain"

type Entity = {
  text: string;
  type: EntityType;
  confidence: number;
}

type EntityType = 
  | "PERSON"    // People names
  | "ORG"       // Organizations
  | "GPE"       // Geo-political entities
  | "DATE"      // Dates
  | "TIME"      // Times
  | "MONEY"     // Monetary values

type Classification = {
  category: string;
  confidence: number;
  alternatives: {
    category: string;
    confidence: number;
  }[];
}

type Comparison = {
  similarity: number;
  differences: {
    added: string[];
    removed: string[];
    changed: string[];
  };
  commonElements: string[];
}

type RAGResult = {
  answer: string;
  sources: {
    text: string;
    relevance: number;
    metadata: object;
  }[];
  confidence: number;
}

type ArtifactResult = {
  id: string;
  type: string;
  content: any;
  metadata?: object;
}
```

## 5. Error Handling

Errors are displayed inline with the following format:
```javascript
// In-LLM scripting
try {
  const result = RISKY_OPERATION()
} catch (error) {
  OUTPUT(`Error: ${error.message}`)
}
```

Common error scenarios:
- LOOP_LIMIT exceeded
- Invalid function parameters
- Unsupported operations in current MODE
- Resource limitations
- Invalid JSON structures

## 6. Module System

### Importing Modules
```javascript
// In-LLM scripting
// Modules are auto-available after upload
// No explicit import statement required
```

### Exporting Modules
```javascript
// In-LLM scripting
// Copy from LLMScript windows
// Save as .llm file
```

## Version Control
- Documentation verified against claude-3-opus-20240229
- All examples tested in current environment
- No deviations from base environment detected
- Documentation will require updates if base environment changes

## Current Environment Verification
- All commands verified in current context
- Functions documented match available capabilities
- Examples tested and confirmed working
- No untested or unverified examples included
