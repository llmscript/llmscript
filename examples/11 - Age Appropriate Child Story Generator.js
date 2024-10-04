function generateChildStory() {
    log("Welcome to the Interactive Child Story Generator!");

    // Step 1: Get story context from image (optional)
    let storyContext = INPUT("Do you have an image for story context? (yes/no): ");
    let imageDescription = "";
    if (storyContext.toLowerCase() === "yes") {
        imageDescription = VISION("Describe the image in detail, focusing on elements that could be part of a children's story:");
        log("Image context: " + imageDescription);
    }

    // Step 2: Get child's age
    let childAge = parseInt(INPUT("Enter the age of the child this story is for: "));

    // Step 3: Get protagonist details
    let protagonistName = INPUT("Enter the name of the story's main character: ");
    let protagonistTrait = INPUT("Enter one defining trait of " + protagonistName + ": ");

    // Step 4: Get story setting
    let setting = INPUT("Enter a fun setting for the story (e.g., magical forest, space station): ");

    // Step 5: Get a challenge or problem
    let challenge = INPUT("Enter a child-friendly challenge or problem for " + protagonistName + " to face: ");

    // Step 6: Get a helper or magical element
    let helper = INPUT("Enter a helper or magical element that will assist " + protagonistName + ": ");

    // Step 7: Generate the story
    log("\nGenerating your personalized story...\n");

    let storyPrompt = `
    Create an age-appropriate story for a ${childAge}-year-old child with the following elements:
    - Main character: ${protagonistName}, who is ${protagonistTrait}
    - Setting: ${setting}
    - Challenge: ${challenge}
    - Helper/Magical element: ${helper}
    ${imageDescription ? "- Additional context: " + imageDescription : ""}

    The story should be engaging, educational, and suitable for a ${childAge}-year-old. 
    It should have a clear beginning, middle, and end, with a positive message or lesson learned.
    Keep the language and concepts appropriate for the child's age.
    `;

    let story = AI(storyPrompt);

    // Step 8: Display the story
    log("Your Personalized Story:\n");
    log(story);

    // Step 9: Optional story enhancement
    let enhance = INPUT("\nWould you like to enhance the story with an illustration prompt? (yes/no): ");
    if (enhance.toLowerCase() === "yes") {
        let illustrationPrompt = AI(`Based on the story above, create a prompt for an illustration that captures a key moment in the story. The prompt should be detailed and vivid, suitable for an artist to create an illustration for a children's book.`);
        log("\nIllustration Prompt:");
        log(illustrationPrompt);
    }

    log("\nThank you for using the Interactive Child Story Generator!");
}

// Run the story generator
generateChildStory();
