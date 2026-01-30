# Counting Sort

⚠️ Counting Sort is different from comparison-based sorts like Bubble, Selection, or Insertion:

- Works only for **integers**  
- Tracks **frequencies** of elements, not comparisons  
- Reconstructs the array from the counts → stable if implemented carefully  

---

🔍 What optimizations are used?

1) **Single-pass min/max & validation**  
```js
for (let i = 0; i < arr.length; i++) { ... }
```
- Finds minimum and maximum values  
- Validates that all elements are integers  
- Reduces extra traversals → more efficient  

2) **Range check for memory efficiency**  
```js
if (range > 10 * arr.length) throw Error(...)
```
- Ensures the counting array doesn’t waste memory  
- Prevents inefficiency for sparse or huge numbers  

3) **Counting & reconstruction**  
```js
count[arr[i] - min]++;
```
- Shifts values by `min` to handle negative numbers  
- Uses the count array to rebuild the sorted array efficiently  

---

⏱ Time & Space Complexity

| Case                   | Complexity          |
| ---------------------- | ------------------- |
| Best                   | **O(n + range)** ✅ | (all identical or range small) 
| Average                | **O(n + range)**    |
| Worst (range >> n)     | **O(n + range)**    |
| Space                  | **O(range)**        |

- **n** = number of elements in the array  
- **range** = `max - min + 1`  

---

Interview Notes (high-value)

1) Why Counting Sort is better than comparison-based sorts?  
- Linear time for small ranges → faster than O(n²) sorts  
- Stable if duplicates are handled correctly  
- Fewer writes than repeatedly swapping  

2) When is it actually used?  
- Sorting **integers with small range**  
- Arrays with **many duplicates**  
- As a subroutine in **Radix Sort**  

---

⚠️ Common Mistakes (Interview Traps)

❌ **Non-integer values**  
```js
if (!Number.isInteger(val)) throw Error(...)
```  
- Counting Sort cannot sort floats  

❌ **Range too large**  
- Memory inefficient if `max - min >> n`  
- Always check range before creating the count array  

---

🧪 When to choose Counting Sort?

✔ Small integer ranges  
✔ Arrays with many duplicates  
✔ Need for stable sort  
✔ Linear time requirement  

---

🔑 One-Line Takeaway

Counting Sort builds a frequency array for integer values and reconstructs the sorted array, making it linear-time **if the range is small**, stable, and memory-efficient.
