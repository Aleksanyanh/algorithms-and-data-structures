# insertion sort

⚠️ Unlike Selection Sort:

 - We track the element, not an index of minimum
 - We shift, not swap repeatedly

 🔍 What optimizations are used?

 1) while (j >= 0 && arr[j] > currentValue or key) "Early stop inside inner loop (IMPORTANT)"
  - Stops immediately when correct position is found
  - Best case becomes O(n)
  - Makes insertion sort adaptive

  2) arr[j + 1] = arr[j]; "Shifting instead of swapping"
  - Fewer writes than swapping each time
  - Keeps relative order → stable sort

  ⏱ Time & Space Complexity

| Case                   | Complexity          |
| ---------------------- | ------------------- |
| Best (already sorted)  | **O(n)** ✅         |
| Average                | **O(n²)**           |
| Worst (reverse sorted) | **O(n²)**           |
| Space                  | **O(1)** (in-place) |


Interview Notes (high-value)

1) Why Insertion Sort is better than Bubble & Selection?
 - Faster on nearly sorted arrays
 - Stable
 - Fewer comparisons and writes in practice

2) When is it actually used?
 - Small datasets
 - Nearly sorted data
 - Hybrid algorithms (e.g. Timsort uses insertion sort for small runs)

 ⚠️ Common Mistakes (Interview Traps)
 ❌ Swapping instead of shifting

 // Wrong approach
 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

 Why wrong?
  - More writes
  - Loses stability benefits

  ❌ Starting from index 0
  for (let i = 0; i < n; i++) // ❌

 Correct:
 for (let i = 1; i < n; i++) // ✅


🧪 When to choose Insertion Sort?
✔ Nearly sorted data
✔ Small arrays
✔ Stability required
✔ Memory constraints

🔑 One-Line Takeaway
In insertion sort, key represents the element to be inserted, while indices are used only to locate its correct position.


