// LLMScript: Graph of Thought for Vacation Planning

function PlanVacation() {
  // Step 1: Select Vacation Type
  log("Step 1: Choose the type of vacation...");
  let vacationTypes = [
    "Adventure",
    "Relaxation",
    "Cultural Exploration",
    "Family-Friendly",
    "Romantic Getaway",
  ];
  log("Vacation Type options: " + vacationTypes);

  let chosenVacationType = INPUT("Choose your vacation type:");
  log("Chosen vacation type: " + chosenVacationType);

  // Step 2: Select Destination based on Vacation Type
  log("Step 2: Finding destinations based on vacation type...");
  let destinationOptions = PARALLEL(
    AI("Suggest 5 adventure vacation destinations."),
    AI("Suggest 5 relaxing vacation destinations."),
    AI("Suggest 5 cultural exploration vacation destinations."),
    AI("Suggest 5 family-friendly vacation destinations."),
    AI("Suggest 5 romantic getaway vacation destinations.")
  );
  log("Destination options: " + destinationOptions);

  let chosenDestination = INPUT("Choose your destination:");
  log("Chosen destination: " + chosenDestination);

  // Step 3: Select Activities based on Destination
  log("Step 3: Choosing activities at " + chosenDestination + "...");
  let activityOptions = PARALLEL(
    AI("Suggest 5 adventure activities at " + chosenDestination + "."),
    AI("Suggest 5 relaxing activities at " + chosenDestination + "."),
    AI("Suggest 5 cultural activities at " + chosenDestination + "."),
    AI("Suggest 5 family-friendly activities at " + chosenDestination + "."),
    AI("Suggest 5 romantic activities at " + chosenDestination + ".")
  );
  log("Activity options: " + activityOptions);

  let chosenActivities = INPUT("Choose your activities (select multiple):");
  log("Chosen activities: " + chosenActivities);

  // Step 4: Set Budget and Calculate Costs for Destination and Activities
  log("Step 4: Set your total budget...");
  let totalBudget = INPUT("Enter your total vacation budget (in USD):");
  log("Total Budget: $" + totalBudget);

  // Estimate cost for destination and activities
  let destinationCost = AI(
    "What is the estimated cost for a vacation in " + chosenDestination + "?"
  );
  let activitiesCost = AI(
    "What is the estimated cost for the following activities: " +
      chosenActivities +
      " in " +
      chosenDestination +
      "?"
  );

  let totalCost = parseFloat(destinationCost) + parseFloat(activitiesCost);
  log("Estimated total cost for destination and activities: $" + totalCost);

  // Check if the total cost exceeds the budget
  if (totalCost > totalBudget) {
    log(
      "Warning: The total cost exceeds your budget by $" +
        (totalCost - totalBudget) +
        "."
    );
    log(
      "You may need to adjust your destination or activities to fit within your budget."
    );
  } else {
    log("You are within your budget.");
  }

  // Step 5: Set Duration based on Destination
  log("Step 5: Choosing the duration of your stay...");
  let durationOptions = ["3 days", "5 days", "7 days", "10 days", "14 days"];
  log("Duration options: " + durationOptions);

  let chosenDuration = INPUT("Choose the duration of your stay:");
  log("Chosen duration: " + chosenDuration);

  // Recalculate budget based on duration (longer trips may increase costs)
  let adjustedCost = AI(
    "Adjust the total cost for a vacation at " +
      chosenDestination +
      " for " +
      chosenDuration +
      "."
  );
  log("Adjusted total cost for " + chosenDuration + " stay: $" + adjustedCost);

  // Final Budget Check
  if (adjustedCost > totalBudget) {
    log(
      "Warning: The total cost for " +
        chosenDuration +
        " exceeds your budget by $" +
        (adjustedCost - totalBudget) +
        ". You may need to reduce your trip duration or change activities."
    );
  } else {
    log("You are within your budget with the adjusted duration.");
  }

  // Final Itinerary and Itemized Budget
  log("Final Vacation Itinerary:");
  log("Vacation Type: " + chosenVacationType);
  log("Destination: " + chosenDestination);
  log("Activities: " + chosenActivities);
  log("Duration: " + chosenDuration);
  log("Total Estimated Cost: $" + adjustedCost);
  log(
    "Itemized Budget: Destination: $" +
      destinationCost +
      ", Activities: $" +
      activitiesCost +
      ", Duration Adjustment: $" +
      (adjustedCost - totalCost)
  );
}

// Execute the Graph of Thought process to plan the vacation
PlanVacation();
