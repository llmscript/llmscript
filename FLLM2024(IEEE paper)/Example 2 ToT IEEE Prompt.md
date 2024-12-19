
I need you to generate a function that follows the Tree of Thought (ToT) technique to help a user evaluate multiple strategies to achieve a goal. The key details are as follows:

	1.	Dynamic Goal Input: The user will start by inputting their goal. Ask for this in a natural, human way, varying the way it’s asked each time using AI-generated prompts.
	2.	AI-Generated Strategies: After the goal is provided, you should generate a list of strategies automatically based on the user’s goal. Present these strategies to the user in a clear, engaging manner. If the user wants to add additional strategies, give them the option to do so.
	3.	User-Driven Strategy Selection:
	•	Instead of evaluating strategies sequentially, allow the user to select which strategy they want to evaluate next.
	•	The user can make this selection as many times as they like, and revisit strategies at any time before moving on to the final stage.
	•	After all evaluations, show the list of strategies with the numeric score in parentheses (e.g., “Expand your website with an eCommerce platform to sell exclusive prints and digital downloads (4)”).
	•	Each strategy starts with a score of zero by default. The score is calculated based on the user’s positive and negative selections while evaluating each component.
	4.	Strategy Evaluation:
	•	For each selected strategy, break it down into key components (e.g., marketing, implementation, partnerships, product offerings).
	•	Use AI-generated questions and suggestions to interact with the user on each component multiple times.
	•	After interacting with each component, the user will classify the component using a numbered system:
	•		1.	Good (+1)
	•		2.	Don’t care (0)
	•		3.	Bad (-1)
	•		4.	Skip (no effect on the score)
	•	The score for each strategy is computed based on the user’s classification choices.
	5.	Score Display and Best Strategy Selection:
	•	Once the user has finished evaluating the strategies, show the list of strategies along with their computed scores in parentheses.
	•	Select the strategy with the highest score as the winner and present it as the best option to achieve their goal.
	6.	Refinement Option:
	•	Allow the user to revisit or refine any strategy or component after the initial evaluation.
	•	Use AI to dynamically generate prompts for refining each component and re-evaluating its classification (Good, Don’t care, Bad, Skip), which will update the score accordingly.
	•	Recalculate the best strategy if any refinements are made and inform the user.
	7.	AI-Generated Prompts for INPUT and OUTPUT:
	•	All INPUT and OUTPUT interactions must use AI-generated prompts to keep the conversation varied, fresh, and natural. Avoid repetitive language.
	•	Ensure all prompts feel supportive, encouraging, and human-like, making the process engaging for the user.
	8.	Positive, Encouraging Language: Use AI-generated positive language to keep the user motivated and engaged throughout the entire process. End the process with a congratulatory and supportive message when the user has finalized their decision.

Example Execution Flow:

	•	Ask the user for their goal in a dynamic way.
	•	Generate a set of strategies automatically based on their goal.
	•	Let the user pick strategies to evaluate in any order.
	•	For each selected strategy, break it into components and let the user classify those components.
	•	Keep a numeric score for each strategy based on the user’s classifications (1 for Good, -1 for Bad, 0 for Don’t care, and no effect for Skip).
	•	Allow the user to refine or revisit strategies.
	•	After the user finishes, display the list of strategies with their scores and present the strategy with the highest score as the winner.

This updated prompt ensures that users can evaluate strategies in any order, and it provides a clear, score-based evaluation at the end.

