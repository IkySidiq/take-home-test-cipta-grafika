//* Explanation
/*
The sumEven function calculates the sum of all even numbers in a given array.
It begins by initializing a variable total to zero, which will hold the cumulative sum.
The function then iterates over each element of the array using a for...of loop.
For every number, it checks whether the number is even by using the modulo operator
(num % 2 === 0). If the number is even, it is added to the total.
After all elements have been processed, the function returns the value of total,
representing the sum of all even numbers in the array. This implementation has a time
complexity of O(n) because each element is examined once, and a space complexity of O(1)
since only a single accumulator variable is used.
*/

export function sumEven(arr) {
  let total = 0;
  for (let num of arr) {
    if (num % 2 === 0) { 
      total += num;
    }
  }
  return total;
}