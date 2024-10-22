Create an LLMScript function called CollectiveGroupProblemSolving. 

Ask the user for INPUT on the problem they want to solve. 
Vary the way you ask for this using a call to AI() to generate upbeat friendly questions.

The problem resolution discussion methods and their characteristics are defined in the 
following JSON object

{
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
"Debate": {
"Objective": "Persuasion",
"Structure": "Formal, Turn-based, Adversarial",
"Communication Style": "Competitive",
"Role of Participants": ["Adversarial", "Turn-based"],
"Conflict Management": ["Engagement", "Escalation"],
"Decision-Making Process": "Majority Rule",
"Outcomes": ["Judgment", "Winner/Loser"],
"Timeframe": "Fixed"
},
"Dialogue": {
"Objective": "Information sharing",
"Structure": "Freeform, Unmoderated",
"Communication Style": "Exploratory",
"Role of Participants": ["Equal"],
"Conflict Management": "Avoidance",
"Decision-Making Process": "Open-ended",
"Outcomes": ["Ongoing", "Knowledge Sharing"],
"Timeframe": "Flexible"
},
"BohmDialogue": {
"Objective": "Exploration of thought and shared understanding",
"Structure": "Freeform, Unstructured",
"Communication Style": "Reflective, Collaborative",
"Role of Participants": ["Equal", "Facilitator"],
"Conflict Management": "Avoidance",
"Decision-Making Process": "Open-ended",
"Outcomes": ["Deeper understanding", "Collective insight"],
"Timeframe": "Flexible"
},
"SixThinkingHats": {
"Objective": "Structured thinking and problem-solving",
"Structure": "Formal, Turn-based",
"Communication Style": "Structured, Multi-perspective",
"Role of Participants": ["Equal, Assigned roles based on 'hats'"],
"Conflict Management": "Engagement through perspective switching",
"Decision-Making Process": "Consensus or majority based on collective insights",
"Outcomes": ["Creative problem-solving", "Well-rounded decision"],
"Timeframe": "Fixed or flexible"
},
"QuakerDiscussionMethod": {
"Objective": "Reaching a 'sense of the meeting' through reflective silence and input",
"Structure": "Moderated, Highly structured, Emphasizes silence",
"Communication Style": "Reflective, Non-confrontational",
"Role of Participants": ["Equal", "Facilitator (Clerk)"],
"Conflict Management": "Resolution through reflection and silence",
"Decision-Making Process": "Consensus (Sense of the meeting)",
"Outcomes": ["Resolution", "Collective insight"],
"Timeframe": "Flexible"
},
"Brainstorming": {
"Objective": "Generating creative ideas",
"Structure": "Freeform or facilitated",
"Communication Style": "Collaborative, Ideation-based",
"Role of Participants": ["Equal", "Facilitator (optional)"],
"Conflict Management": "Avoidance",
"Decision-Making Process": "Open-ended (for idea generation)",
"Outcomes": ["List of creative ideas", "Solution possibilities"],
"Timeframe": "Flexible"
},
"Negotiation": {
"Objective": "Reaching a compromise or agreement",
"Structure": "Formal or informal, Turn-based or freeform",
"Communication Style": "Transactional, Collaborative or Adversarial",
"Role of Participants": ["Equal or Hierarchical"],
"Conflict Management": ["Engagement", "Resolution"],
"Decision-Making Process": "Compromise",
"Outcomes": ["Agreement", "Compromise"],
"Timeframe": "Fixed or flexible"
},
"PanelDiscussion": {
"Objective": "Sharing expert knowledge and perspectives",
"Structure": "Moderated, Structured",
"Communication Style": "Exploratory, Multi-expert",
"Role of Participants": ["Experts", "Moderator"],
"Conflict Management": ["Engagement", "Resolution through expertise"],
"Decision-Making Process": "Open-ended",
"Outcomes": ["Knowledge sharing", "Expert opinions"],
"Timeframe": "Fixed"
},
"Deliberation": {
"Objective": "Judgment or policy formation",
"Structure": "Formal, Turn-based",
"Communication Style": "Analytical, Judgmental",
"Role of Participants": ["Equal", "Facilitator (optional)"],
"Conflict Management": "Engagement through structured argument",
"Decision-Making Process": "Majority rule or consensus",
"Outcomes": ["Decision", "Policy formation"],
"Timeframe": "Fixed or flexible"
},
"SuhrawardiIlluminationistMethod": {
"Objective": "Reaching deeper metaphysical truths and enlightenment",
"Structure": "Unstructured, Contemplative",
"Communication Style": "Reflective, Philosophical",
"Role of Participants": ["Equal, sharing insights from reflection and spiritual understanding"],
"Conflict Management": "Avoidance, seeking higher truth rather than confrontation",
"Decision-Making Process": "No explicit decision-making; shared understanding",
"Outcomes": ["Heightened spiritual insight", "Deeper metaphysical understanding"],
"Timeframe": "Flexible, allowing for deep reflection"
}
}

Present the user with a numbered list of "DiscussionMethods" and ask the user to INPUT a number 
to selected a method. Give the user an option to see the properties of the method they selected as a bulleted list.
If the user selects to see the properties then give the use an option to select a different method.
Once the user has selected a method then ask the user for the number of participants they want in
the problem solving with a maximum of 9. Randomly, generate the participants by using the 
following JSON definition for a human and then randomly selecting values for each property.

{   "Human 2": {
        "Name": "Sara",
        "Age": 42,
        "Gender": "Female",
        "Occupation": "Educator",
        "Education": "PhD in Educational Psychology",
        "Cognitive Strengths": ["Creativity", "Empathy"],
        "Openness": 9,
        "Conscientiousness": 8,
        "Extraversion": 7,
        "Agreeableness": 10,
        "Neuroticism": 3,
        "Ethical Values": ["Equality", "Empathy"],
        "Ethical Stance": "Deontological ethics",
        "Belief": "Baha'i",
        "Political Leaning": "Progressive",
        "Detachment": 10,
        "Humility": 9,
        "Commitment to Unity": 9,
        "Listening Ability": 10,
        "Emotional Intelligence": 8,
        "Conflict Resolution Style": "Harmonizer",
        "Knowledge Base": ["Education", "Psychology"],
        "Cultural Background": "Middle Eastern",
        "Past Experiences": ["Developed educational curricula", "Mentored teachers"],
        "Patience Level": 9,
        "Optimism": 8,
        "Risk Tolerance": 5,
        "Emotional Regulation": 8,
        "Role in Consultation": "Mediator"
    }
}

Create a scale from -10 to 10 to represent the intensity of an individual’s numeric 
based characteristics that indicate the characteristic 
or lack thereof, with 0 representing a neutral position or “don’t care”. This scale 
could be used to measure how strongly an individual embodies or lacks certain characteristics, 
with positive numbers indicating positive alignment with the characteristic and negative 
numbers representing opposition or violation of the Characteristic.

Assign the participants a role based on the requirements of the problem solving methodology.

OUTPUT a numeric list of the participants including name, age, gender, Occupation, 
and role in the resolution process if any.

Allow the user to select for any participant using the number they are in the list to see all the 
individual's values OUTPUT as a bulleted list. Enable the user to move to the next step once they 
have finished exploring the individual properties. They may not want to explore any properties 
to begin with.

Assume that all the methods function via a dialog between the participants. You will report what 
is said by each participant by an OUTPUT of the participants name followed by a ':' and what
they said. Some of the methods have roles such as "Facilitator" in which case they start the process. 
If no obvious participant is found to start, you the "AI" will start the meeting and randomly 
choose a participant to continue the dialog. Use best know dialog practices for the method 
selected. If there are any other roles needed you the "AI" will fulfill them.
After every 10 interactions ask the user a yes/no question as to whether the dialog 
should continue. If the user says yes then continue otherwise terminate the dialog and give 
a summary of the dialog. Allow the user to start again or exit the application completely.






