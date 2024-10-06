setDebugMode(true);

// Social Media Signup Application

// Function to get user information
function getUserInfo() {
  let username = prompt.text("Enter your desired username:", 3, 20);
  let email = prompt.email("Enter your email address:");
  let password = prompt.password("Create a password:", 8);
  let birthdate = prompt.date("Enter your birthdate:");
  return { username, email, password, birthdate };
}

// Function to display potential friends and allow selection
function selectFriends(potentialFriends) {
  prompt.log(
    "SELECT: Here are some potential friends you might want to connect with. Please enter the numbers of all that apply, separated by commas."
  );
  potentialFriends.forEach((friend, index) => {
    prompt.log(
      `${index + 1}. ${friend.name} (${friend.mutualFriends} mutual friends)`
    );
  });
  let selection = prompt.input("Enter your selections:");
  let selectedIndices = selection.split(",").map((s) => parseInt(s.trim()) - 1);
  return potentialFriends.filter((_, index) => selectedIndices.includes(index));
}

// Main application flow
function runApp() {
  prompt.log("Welcome to our new social media platform!");

  // User signup
  let userInfo = getUserInfo();

  // Dummy data for potential friends
  let potentialFriends = [
    { name: "Alice Johnson", mutualFriends: 5 },
    { name: "Bob Smith", mutualFriends: 3 },
    { name: "Charlie Brown", mutualFriends: 7 },
    { name: "Diana Prince", mutualFriends: 2 },
    { name: "Ethan Hunt", mutualFriends: 4 },
  ];

  // Friend selection
  let selectedFriends = selectFriends(potentialFriends);

  // Summary
  prompt.log("\nSignup and Friend Connection Summary:");
  prompt.log(`Username: ${userInfo.username}`);
  prompt.log(`Email: ${userInfo.email}`);
  prompt.log(`Birthdate: ${userInfo.birthdate}`);
  prompt.log("\nSelected Friends:");
  selectedFriends.forEach((friend) => {
    prompt.log(`• ${friend.name}`);
  });
  prompt.log(`\nTotal friends selected: ${selectedFriends.length}`);
}

// Run the application
runApp();
