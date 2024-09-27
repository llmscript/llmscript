// Function to calculate the nth Fibonacci number using recursion
// Name: Fibonacci Statistics Calculator
/**  The Fibonacci Statistics Calculator is a program that computes the first ten
Fibonacci numbers using a recursive algorithm. It then calculates the statistical
mean and variance of these numbers.
*/

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Function to calculate the mean of an array
function mean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  let mean = sum / arr.length;
  return mean;
}

// Function to calculate the variance of an array
function variance(arr) {
  let avg = mean(arr);
  let squaredDiffs = [];
  for (let i = 0; i < arr.length; i++) {
    let diff = arr[i] - avg;
    let squaredDiff = diff * diff;
    squaredDiffs.push(squaredDiff);
  }
  return mean(squaredDiffs);
}

// Generate the first 10 Fibonacci numbers
let fibNumbers = [];
for (let i = 0; i < 10; i++) {
  fibNumbers.push(fibonacci(i));
}

// Calculate the mean and variance of the Fibonacci numbers
let fibMean = mean(fibNumbers);
let fibVariance = variance(fibNumbers);

// Output the results
log("Fibonacci Numbers: " + fibNumbers);
log("Mean: " + fibMean);
log("Variance: " + fibVariance);
