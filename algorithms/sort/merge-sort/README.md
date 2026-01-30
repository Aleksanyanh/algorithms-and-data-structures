# Merge Sort

⚠️ Merge Sort is a **divide-and-conquer sorting algorithm**:

* Divides the array into halves
* Recursively sorts each half
* Merges the sorted halves → **stable sort**
* Always **O(n log n)** time complexity


🔍 How Merge Sort Works

1. **Divide**

const mid = Math.floor(array.length / 2);
const left = array.slice(0, mid);
const right = array.slice(mid);

* Split the array into two halves
* Continue splitting until subarrays have 0 or 1 element

2. **Conquer (Sort Subarrays)**

return mergeSort(left), mergeSort(right);

* Recursively sort left and right halves

3. **Combine (Merge)**

* Compare elements from both halves
* Push the smaller element to the result array
* Append remaining elements after one half is exhausted

// Merge two sorted arrays
function merge(left, right) {
    let result = [], i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]){
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    // Add remaining elements
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(j++);

    return result;
}

// Merge Sort function
function mergeSort(array) {
    if (array.length <= 1) return array; // Base case

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Original Array:", arr);
console.log("Sorted Array:", mergeSort(arr));


⏱ Time & Space Complexity

| Case    | Complexity     |                            |
| ------- | -------------- | -------------------------- |
| Best    | **O(n log n)** |                            |
| Average | **O(n log n)** |                            |
| Worst   | **O(n log n)** |                            |
| Space   | **O(n)**       | (extra arrays for merging) |

* **n** = number of elements in the array

Visual Step-by-Step Example

Original Array: [38, 27, 43, 3, 9, 82, 10]

Step 1: Divide
[38, 27, 43]       [3, 9, 82, 10]
[38] [27, 43]      [3, 9] [82, 10]
[27] [43]          [3] [9] [82] [10]

Step 2: Merge
[27, 38, 43]       [3, 9, 10, 82]

Step 3: Merge final
[3, 9, 10, 27, 38, 43, 82]


Interview Notes (high-value)

1. Why Merge Sort is useful:

* Stable → maintains relative order of duplicates
* Always O(n log n) → reliable worst-case performance
* Works well for **linked lists** (no extra array needed)

2. When to use Merge Sort:

* Large arrays where **stability matters**
* **Guaranteed performance** is required
* When sorting **linked lists** or data streams


⚠️ Common Mistakes (Interview Traps)

❌ Forgetting base case

if (array.length <= 1) return array;

* Leads to infinite recursion

❌ Merging incorrectly

* Not handling remaining elements → lost data
* Always append remaining left/right after main loop

❌ Assuming in-place sort

* Merge Sort uses extra memory for merging → not in-place

🧪 When to choose Merge Sort?

✔ Large arrays
✔ Need for **stable sorting**
✔ When worst-case O(n log n) is important
✔ Sorting **linked lists**

🔑 One-Line Takeaway

Merge Sort splits the array recursively, sorts each half, and merges them, providing a **stable, reliable O(n log n) sort** that is ideal for large datasets and linked lists.
