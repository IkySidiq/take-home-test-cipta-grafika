//* Explanation
/*
The isPalindrome function determines if a string reads the same forwards and backwards.
It first ensures the input is a string. Then, it removes all spaces and converts it to lowercase
for uniform comparison. Using two pointers—one starting at the beginning and the other at the end—the
function compares characters pairwise. If any mismatch occurs, it returns false immediately.
If all pairs match until the pointers meet or cross, it returns true. This method runs in O(n)
time and uses O(1) extra space.
*/

export function isPalindrome(s) {
  if (typeof s !== 'string') return false;

  const cleaned = s.replace(/\s+/g, '').toLowerCase();

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}