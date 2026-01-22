
📊 Sorting Algorithms – Feature Comparison Table

| Algorithm          | Best Time  | Average Time | Worst Time | Space (Extra) | In-Place  | Stable  | Adaptive  | Notes                           |
| ------------------ | ---------- | ------------ | ---------- | ------------- | --------  | ------  | --------  | ------------------------------- |
| **Bubble Sort**    | O(n)       | O(n²)        | O(n²)      | O(1)          | ✅        | ✅      | ✅        | Simple, early exit optimization |
| **Selection Sort** | O(n²)      | O(n²)        | O(n²)      | O(1)          | ✅        | ❌      | ❌        | Fewest swaps                    |
| **Insertion Sort** | O(n)       | O(n²)        | O(n²)      | O(1)          | ✅        | ✅      | ✅        | Great for nearly sorted data    |
| **Merge Sort**     | O(n log n) | O(n log n)   | O(n log n) | O(n)          | ❌        | ✅      | ❌        | Divide & conquer, predictable   |
| **Quick Sort**     | O(n log n) | O(n log n)   | O(n²)      | O(log n)*     | ⚠️        | ❌      | ❌        | Fast in practice                |
| **Heap Sort**      | O(n log n) | O(n log n)   | O(n log n) | O(1)          | ✅        | ❌      | ❌        | Good worst-case guarantee       |
| **Counting Sort**  | O(n + k)   | O(n + k)     | O(n + k)   | O(k)          | ❌        | ✅      | ❌        | Non-comparison based            |
| **Radix Sort**     | O(nk)      | O(nk)        | O(nk)      | O(n + k)      | ❌        | ✅      | ❌        | Uses counting sort internally   |
| **Bucket Sort**    | O(n)       | O(n + k)     | O(n²)      | O(n)          | ❌        | ⚠️      | ❌        | Depends on distribution         |
| **Timsort**        | O(n)       | O(n log n)   | O(n log n) | O(n)          | ❌        | ✅      | ✅        | Used in JS, Python              |



🔍 Feature Definitions (Quick Reminder)

| Feature         | Meaning                                |
| --------------- | -------------------------------------- |
| **Stable**      | Keeps relative order of equal elements |
| **In-Place**    | Modifies input array directly          |
| **Adaptive**    | Faster on nearly sorted data           |
| **Extra Space** | Memory beyond input array              |


# -------------------------------------------------------------------------------------------------------------------------------------------------

What does stable mean in sorting?
A stable sorting algorithm preserves the relative order of elements that have equal keys (values).
If two elements compare as equal, a stable sort keeps them in the same order as in the original array.

Simple Example
Original array (notice the labels):
[
  { value: 3, id: "A" },
  { value: 1, id: "B" },
  { value: 3, id: "C" }
]

After a stable sort by value:

[
  { value: 1, id: "B" },
  { value: 3, id: "A" }, // A stays before C
  { value: 3, id: "C" }
]

✔ The two elements with value = 3 keep their original order: A → C

After an unstable sort:

[
  { value: 1, id: "B" },
  { value: 3, id: "C" }, // order changed ❌
  { value: 3, id: "A" }
]

❌ The relative order of equal elements changed.


Why stability matters (real-world reason)

Imagine sorting users:

1️⃣ First by registration date
2️⃣ Then by age

If the second sort is stable, users with the same age will remain ordered by registration date.

This is extremely common in:
 - Tables (UI sorting)
 - Databases
 - Multi-level sorting
 - Frontend lists (React / Angular tables)


| Property                      | Stable Sort | Unstable Sort |
| ----------------------------- | ----------- | ------------- |
| Keeps order of equal elements | ✅ Yes      | ❌ No         |
| Good for multi-step sorting   | ✅ Yes      | ❌ No         |
| Extra care needed             | Sometimes   | No            |



Which common algorithms are stable?
✅ Stable
 - Insertion Sort
 - Bubble Sort
 - Merge Sort
 - Timsort (used in JS .sort() in most engines)

❌ Not Stable (by default)
 - Selection Sort
 - Quick Sort
 - Heap Sort

⚠️ Note: Some unstable algorithms can be made stable, but usually with extra memory or cost.

# -------------------------------------------------------------------------------------------------------------------------------------------------


In-place (practical meaning)
Meaning: The algorithm modifies the input data directly instead of creating a new array.
- Usually (but not always) uses O(1) extra space
- Focuses on where the result is stored, not how much memory is used
[arr[i], arr[j]] = [arr[j], arr[i]]; // modifies input array
✔ Sorting happens inside the same array
✔ No separate output array


# -------------------------------------------------------------------------------------------------------------------------------------------------


What does O(n + k) mean?

O(n + k) is a time (or space) complexity that depends on two independent inputs.

 - n → number of elements to process
 - k → size of an additional range or domain (not derived from n)

So the algorithm’s cost grows with both.

Classic Example: Counting Sort

// n = arr.length
// k = maxValue + 1
for (let i = 0; i < n; i++) {
  count[arr[i]]++;
}

for (let i = 0; i < k; i++) {
  while (count[i]-- > 0) {
    output.push(i);
  }
}


 - First loop → O(n)
 - Second loop → O(k)

Total: O(n) + O(k) = O(n + k)

Why it’s NOT O(n)

Example:
 - n = 10 elements
 - k = 1,000,000 possible values

Even with few elements, the algorithm must still loop over the entire range.

➡️ Cost dominated by k, not n.

When O(n + k) is GOOD

✔ k is small or bounded
✔ Values are integers in a limited range
✔ Non-comparison sorts

Examples:
- Counting Sort
- Radix Sort (internally)
- Bucket Sort (depending on buckets)


When O(n + k) is BAD

❌ k ≫ n
❌ Large value ranges (e.g. IDs up to billions)

In such cases, O(n log n) comparison sorts are better.

Interview Trick Question 🚨

Q: Is O(n + k) better than O(n log n)?
A: It depends.
- If k is small → YES
- If k is large → NO


Comparison Summary

| Complexity     | Meaning                        |
| -------------- | ------------------------------ |
| **O(n)**       | Depends only on input size     |
| **O(n log n)** | Comparison-based lower bound   |
| **O(n + k)**   | Depends on input + value range |
| **O(nk)**      | Multiple passes over digits    |
