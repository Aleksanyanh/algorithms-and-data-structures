# bubble sort

🔍 What optimizations are used?

1) if (!isSwapped) break; "Early exit (IMPORTANT)"

 - Best case becomes O(n) (already sorted array)
 - Without this, Bubble Sort is always O(n²) 

2) j < n - 1 - i "Reduced inner loop range"

- After each pass, the largest element is fixed at the end
- No need to re-check it

⏱ Time & Space Complexity

| Case                   | Complexity          |
| ---------------------- | ------------------- |
| Best (already sorted)  | **O(n)** ✅         |
| Average                | **O(n²)**           |
| Worst (reverse sorted) | **O(n²)**           |
| Space                  | **O(1)** (in-place) |


Interview Notes:

Why Bubble Sort is still asked?
 - Easy to understand
 - Demonstrates optimization thinking
 - Shows early-exit logic

When NOT to use it?
 - Large datasets
 - Performance-critical code