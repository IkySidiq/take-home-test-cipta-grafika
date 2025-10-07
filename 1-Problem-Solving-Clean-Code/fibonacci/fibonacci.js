//* Explanation
/*
These three functions calculate the nth Fibonacci number using different approaches:
fibIterative – Uses a loop with two variables to track the last two numbers. Time complexity: O(n), Space complexity: O(1). Efficient for large n.
fibRecursive – Uses plain recursion. Time complexity: O(2^n), Space complexity: O(n) due to call stack. Inefficient for large n because of repeated calculations.
fibRecursiveMemo – Uses recursion with memoization to store computed results. Time complexity: O(n), Space complexity: O(n). Combines recursion readability with efficiency.
All functions return null for negative input to indicate invalid requests.
*/

export function fibIterative(n) {
  if (n < 0) return null;
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

export function fibRecursive(n) {
  if (n < 0) return null;
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

export function fibRecursiveMemo(n, memo = {}) {
  if (n < 0) return null;
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];

  memo[n] = fibRecursiveMemo(n - 1, memo) + fibRecursiveMemo(n - 2, memo);
  return memo[n];
}
