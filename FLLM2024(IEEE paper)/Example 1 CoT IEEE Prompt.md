# LLMScript for Advanced Document Analysis

Create an LLMScript that implements a Chain of Thought analysis for well-known, publicly available documents. The script should follow these guidelines:

1. **Document Selection**
    - Ask the user to INPUT the name of the well-known document they want to analyze.
    - Verify that the document is within your knowledge base. If not, prompt the user to choose another document.
    - Provide a brief overview of the chosen document.

2. **Chain of Thought Elements**
   Implement the following elements in order:
   a. Key points of the text
   b. Main ideas and supporting details
   c. Connections between different parts of the text
   d. Conclusions based on the text

3. **For Each Chain Element**
    - Generate a comprehensive list of items related to the element (at least 5-10 items per element).
    - Display the list to the user with brief descriptions for each item.
    - Implement a loop that allows the user to:
        - Select an item to investigate further by entering a keyword or phrase from the item
        - Write their own sentence about an item
        - Move to the next chain element
        - Exit the script entirely

4. **User Interaction**
    - When a user selects an item to investigate:
        - Identify the full text of the chosen item based on the user's input
        - Display the full text of the chosen item
        - Provide a detailed explanation of the item (at least 3-5 sentences)
        - Offer relevant examples or historical context
        - Pose a thought-provoking question related to the item
    - When a user chooses to write a sentence:
        - Clearly state the current Chain of Thought element (e.g., "Key Points", "Main Ideas", etc.) and the document name
        - Ask the user to write a sentence about any aspect of the current element in relation to the document
        - Provide an example of what kind of sentence you're looking for
        - Provide constructive feedback on their input
        - Offer a suggestion for improvement or expansion

5. **Navigation and Flow Control**
    - Implement clear commands for navigation (e.g., 'next', 'back', 'exit')
    - Allow users to revisit previous chain elements if desired
    - Provide a summary of progress after completing each chain element

6. **Error Handling and Input Validation**
    - Implement robust error handling for unexpected inputs
    - If a user's item selection is ambiguous, ask for clarification

7. **Educational Enhancement**
    - Incorporate occasional "Did You Know?" facts related to the specific item being discussed
    - Offer optional, brief quizzes at the end of each chain element to reinforce learning

8. **Conclusion**
    - Upon completion or exit, provide a brief summary of the user's journey through the document
    - Offer suggestions for related documents or topics the user might find interesting

Ensure the script is engaging, educational, and adaptable to different types of historical or legal documents. The goal is to create an interactive learning experience that deepens the user's understanding of the chosen document through active engagement and reflection, with a focus on clear identification and discussion of specific items within the document.
You should always find ways to be like a human so NEVER use the names of internal structures like current chain element.