function CollectiveGroupProblemSolving() {
    // Load discussion methods
    const methods = {
        "DiscussionMethods": {
            "Consultation": {
                "Objective": "Consensus building",
                "Structure": "Moderated, Equal",
                "Communication Style": "Collaborative",
                "Role of Participants": ["Equal", "Facilitator"],
                "Conflict Management": ["Resolution", "Avoidance"],
                "Decision-Making Process": "Consensus",
                "Outcomes": ["Resolution", "Agreement"],
                "Timeframe": "Flexible"
            },
            // ... [rest of the methods object]
        }
    };

    // Generate friendly problem prompt
    let prompt = AI("Generate an upbeat, friendly question asking someone what problem they'd like to solve today");
    let problem = INPUT(prompt);

    // Present discussion methods
    OUTPUT("Available Discussion Methods:");
    let methodsList = Object.keys(methods.DiscussionMethods);
    methodsList.forEach((method, index) => {
        OUTPUT(`${index + 1}. ${method}`);
    });

    function showMethodProperties(methodName) {
        let method = methods.DiscussionMethods[methodName];
        OUTPUT(`Properties of ${methodName}:`);
        for (let prop in method) {
            OUTPUT(`• ${prop}: ${JSON.stringify(method[prop])}`);
        }
    }

    // Get method selection
    let selectedMethod;
    let validSelection = false;
    while (!validSelection) {
        let selection = parseInt(INPUT("Please enter the number of your chosen method (1-" + methodsList.length + "):"));
        if (selection > 0 && selection <= methodsList.length) {
            selectedMethod = methodsList[selection - 1];
            validSelection = true;
            
            let viewProps = INPUT("Would you like to see the properties of this method? (yes/no)");
            if (viewProps.toLowerCase() === 'yes') {
                showMethodProperties(selectedMethod);
                let changeMethod = INPUT("Would you like to select a different method? (yes/no)");
                if (changeMethod.toLowerCase() === 'yes') {
                    validSelection = false;
                }
            }
        }
    }

    // Get number of participants
    let numParticipants = parseInt(INPUT("How many participants would you like (1-9)?"));
    while (numParticipants < 1 || numParticipants > 9) {
        numParticipants = parseInt(INPUT("Please enter a valid number between 1 and 9:"));
    }

    // Generate participants
    function generateParticipant(id) {
        const names = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Casey", "Riley", "Quinn", "Pat"];
        const genders = ["Male", "Female", "Non-binary"];
        const occupations = ["Engineer", "Teacher", "Doctor", "Artist", "Scientist", "Manager", "Entrepreneur"];
        const educations = ["PhD", "Masters", "Bachelors", "High School"];
        const beliefs = ["Agnostic", "Buddhist", "Christian", "Hindu", "Jewish", "Muslim", "Secular"];
        const backgrounds = ["Asian", "African", "European", "Middle Eastern", "Latin American", "Pacific Islander"];

        return {
            "Name": names[Math.floor(Math.random() * names.length)],
            "Age": 25 + Math.floor(Math.random() * 40),
            "Gender": genders[Math.floor(Math.random() * genders.length)],
            "Occupation": occupations[Math.floor(Math.random() * occupations.length)],
            "Education": educations[Math.floor(Math.random() * educations.length)],
            "Openness": Math.floor(Math.random() * 21) - 10,
            "Conscientiousness": Math.floor(Math.random() * 21) - 10,
            "Extraversion": Math.floor(Math.random() * 21) - 10,
            "Agreeableness": Math.floor(Math.random() * 21) - 10,
            "Neuroticism": Math.floor(Math.random() * 21) - 10,
            "Belief": beliefs[Math.floor(Math.random() * beliefs.length)],
            "Cultural Background": backgrounds[Math.floor(Math.random() * backgrounds.length)]
        };
    }

    let participants = [];
    for (let i = 0; i < numParticipants; i++) {
        participants.push(generateParticipant(i));
    }

    // Assign roles based on method
    let method = methods.DiscussionMethods[selectedMethod];
    if (method["Role of Participants"].includes("Facilitator")) {
        let facilitator = participants[Math.floor(Math.random() * participants.length)];
        facilitator.role = "Facilitator";
    }
    
    // Display participants
    OUTPUT("Participants:");
    participants.forEach((p, index) => {
        OUTPUT(`${index + 1}. ${p.Name} (${p.Age}, ${p.Gender}) - ${p.Occupation}${p.role ? ' - ' + p.role : ''}`);
    });

    // Allow participant exploration
    while (true) {
        let explore = INPUT("Enter a participant number to see their details, or 'continue' to proceed:");
        if (explore.toLowerCase() === 'continue') break;
        
        let index = parseInt(explore) - 1;
        if (index >= 0 && index < participants.length) {
            for (let prop in participants[index]) {
                OUTPUT(`• ${prop}: ${participants[index][prop]}`);
            }
        }
    }

    // Start discussion
    let dialogCount = 0;
    let continueDialog = true;

    function generateDialogue(participant, problem, method) {
        return AI(`Generate a response for ${participant.Name} discussing ${problem} using the ${selectedMethod} method, considering their role${participant.role ? ' as ' + participant.role : ''}`);
    }

    while (continueDialog) {
        for (let i = 0; i < participants.length && continueDialog; i++) {
            let dialogue = generateDialogue(participants[i], problem, selectedMethod);
            OUTPUT(`${participants[i].Name}: ${dialogue}`);
            dialogCount++;

            if (dialogCount % 10 === 0) {
                let continue_response = INPUT("Continue the dialog? (yes/no)");
                continueDialog = continue_response.toLowerCase() === 'yes';
            }
        }
    }

    // Summarize
    let summary = AI(`Summarize the discussion about ${problem} using the ${selectedMethod} method`);
    OUTPUT("Summary:");
    OUTPUT(summary);

    // Option to restart or exit
    let restart = INPUT("Would you like to start another discussion? (yes/no)");
    if (restart.toLowerCase() === 'yes') {
        CollectiveGroupProblemSolving();
    }
}

// Start the process
CollectiveGroupProblemSolving();
