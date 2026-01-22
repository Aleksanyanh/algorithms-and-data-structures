# selection sort

🔍 What optimizations are used?

1) if (minIndex !== i) "Avoid unnecessary swaps (IMPORTANT)"
 - Without this, we would swap every pass
 - Reduces write operations
 - Useful when swapping is expensive (e.g., memory writes, flash storage)

⚠️ Note: This does NOT change time complexity, only practical performance.

2) j = i + 1 → n "Shrinking unsorted range"
 - Left side [0 ... i-1] is already sorted
 - We only search the remaining unsorted part


⏱ Time & Space Complexity

| Case    | Complexity          |
| ------- | ------------------- |
| Best    | **O(n²)**           |
| Average | **O(n²)**           |
| Worst   | **O(n²)**           |
| Space   | **O(1)** (in-place) |


🔴 Important difference from Bubble Sort
Selection Sort does NOT get faster on sorted arrays.

Interview Notes:

Why Selection Sort is used?
 - Very simple
 - Minimum number of swaps (at most n - 1)
 - Predictable behavior

Why it’s slow?
 - Always compares every element
 - No early-exit optimization like Bubble Sort

🧪 When to choose Selection Sort?
  ✔ Memory is extremely limited
  ✔ Swaps are expensive
  ✔ Teaching / interviews
  ❌ Large datasets

🔥 Key Interview Takeaway
 - Selection Sort = find index → swap values
 - Bubble Sort = swap values while comparing