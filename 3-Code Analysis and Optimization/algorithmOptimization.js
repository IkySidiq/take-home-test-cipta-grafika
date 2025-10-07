//* Explanation
/*
The findDuplicates function identifies all duplicate elements in an array efficiently. 
It uses two Set objects: seen to keep track of unique items encountered during iteration, 
and duplicates to store items that appear more than once. As it loops through each element 
in the array, the function checks whether the element already exists in the seen set. 
If it does, the element is added to the duplicates set; otherwise, it is added to seen. 
After processing all elements, the function converts the duplicates set into an array and 
returns it. This approach ensures that each duplicate is listed only once and achieves linear 
time complexity, O(n), while using extra space proportional to the number of unique elements.
*/

const findDuplicates = (arr) => {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  return Array.from(duplicates);
};