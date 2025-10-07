//* Explanation
/*
Opinion on If vs Switch:
- Use `if/else` when evaluating conditions that are complex, range-based, or involve boolean expressions.
- Use `switch` when checking a single variable against multiple discrete values, which makes the code
  cleaner, more readable, and easier to maintain.
This implementation uses switch to handle the discrete set of arithmetic operations clearly.
*/

export function calc(op, a, b) {
  switch (op) {
    case 'add':
      return a + b;

    case 'sub':
      return a - b;

    case 'mul':
      return a * b;

    case 'div':
      if (b === 0) {
        return 'Error: Cannot divide by zero';
      }
      return a / b;

    default:
      return 'Error: Invalid operation';
  }
}
