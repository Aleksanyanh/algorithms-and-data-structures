# Quick Sort Implementation (JavaScript)

This project contains a fully documented implementation of the **Quick Sort** algorithm in JavaScript.

Quick Sort is a **Divide and Conquer** sorting algorithm that is widely used because of its strong average performance and in-place memory efficiency.

---

## 📌 What is Quick Sort?

Quick Sort works in three main steps:

1. Choose a **pivot** element.
2. Partition the array so that:
   - Elements smaller than the pivot go to the left.
   - Elements greater than the pivot go to the right.
3. Recursively apply the same process to the left and right subarrays.

---

## 🧠 Algorithm Strategy

Quick Sort follows the **Divide and Conquer** paradigm:

- **Divide** → Partition the array around a pivot.
- **Conquer** → Recursively sort left and right parts.
- **Combine** → No extra work needed (sorting happens in-place).

---

## ⏱ Time Complexity

| Case        | Complexity |
|-------------|------------|
| Best Case   | O(n log n) |
| Average     | O(n log n) |
| Worst Case  | O(n²)      |

### Why worst case O(n²)?

If the pivot is always the smallest or largest element (for example, already sorted array and bad pivot selection), partitions become unbalanced.

---

## 💾 Space Complexity

- Average: **O(log n)** (due to recursion stack)
- Worst: **O(n)** (completely unbalanced recursion)

Quick Sort is **in-place**, meaning it does not require extra arrays.

---

## 🔎 How Partitioning Works (Lomuto Scheme)

1. Choose last element as pivot.
2. Keep a pointer `i` for smaller elements.
3. Traverse the array with pointer `j`.
4. Swap when element is smaller than pivot.
5. Place pivot in its correct sorted position.

After partition:
- Left side → smaller elements
- Right side → larger elements
- Pivot → correct final index

---

## 🚀 Example

Input:
```
[8, 3, 1, 7, 0, 10, 2]
```

After first partition (pivot = 2):
```
[1, 0, 2, 7, 3, 10, 8]
```

Then recursively sort left and right subarrays.

Final Output:
```
[0, 1, 2, 3, 7, 8, 10]
```

---

## ⚠️ Important Notes

- Quick Sort is **not stable**
  - Equal elements may change relative order.
- Pivot selection significantly affects performance.
- Better pivot strategies:
  - Random pivot
  - Median-of-three

---

## 🏆 Why Quick Sort is Popular

- Excellent average performance
- In-place sorting
- Cache-friendly
- Small constant factors
- Common in real-world engines

---

## 📦 Implementation Overview

Main Functions:

- `quickSort(arr, left, right)`
- `partition(arr, left, right)`

Base Case:
```
if (left >= right) return;
```

Recursive Calls:
```
quickSort(arr, left, pivotIndex - 1);
quickSort(arr, pivotIndex + 1, right);
```

---

## 📘 When To Use Quick Sort

Use Quick Sort when:

- You need fast average performance.
- Memory usage must be minimal.
- Stability is not required.

Avoid Quick Sort when:

- Worst-case guarantees are required (use Merge Sort instead).
- Stable sorting is necessary.

---

## 🎯 Interview Tips

Common questions:

- Why is Quick Sort not stable?
- Why is average complexity O(n log n)?
- How to avoid worst-case performance?
- Difference between Hoare and Lomuto partition?
- How would you implement iterative Quick Sort?

Be prepared to:
- Explain partition logic clearly.
- Write the algorithm from memory.
- Discuss pivot optimization strategies.

---

## 📚 Summary

Quick Sort is one of the most important sorting algorithms to master for interviews and real-world development.

Understanding:
- Recursion
- Partitioning
- Time complexity behavior
- Pivot optimization

will give you a strong algorithmic foundation.

