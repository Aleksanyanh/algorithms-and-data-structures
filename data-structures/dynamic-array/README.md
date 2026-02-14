# DynamicArray (Integer-only)

This project implements a **Dynamic Array** data structure in **JavaScript**, similar in behavior to `std::vector` in C++.

The array:
- Grows dynamically when capacity is exceeded
- Manages its own internal buffer
- Accepts **only integer values**
- Does **not** rely on JavaScript built-in `Array` methods like `sort`

This implementation is designed for **learning data structures**, **interview preparation**, and understanding **memory-like behavior** in JavaScript.


## Key Characteristics

- ✅ Stores **only integer numbers** (`Number.isInteger`)
- ✅ Automatic resizing with growth factor
- ✅ Manual memory management (capacity vs size)
- ✅ Supports iteration (`for...of`)
- ✅ Implements high-order functions (`map`, `filter`, `reduce`, etc.)
- ❌ Does NOT use `Array.sort()`


## Internal Structure

The dynamic array is built using these private fields:

| Field       | Description |
|------------ |------------ |
| `#arr`      | Internal buffer where elements are stored |
| `#size`     | Number of valid elements |
| `#capacity` | Allocated buffer size |
| `#GROWTH`   | Growth factor when resizing (default = 2) |

**Important concept:**
- `size` ≤ `capacity`
- Capacity grows automatically when needed
- Unused capacity is allowed for performance reasons


## Constructor
new DynamicArray(capacity = 0, fill = 0)

Behavior:
- Allocates internal buffer of size capacity
- Fills it with fill value
- Throws error if:
   - capacity < 0
   - fill is not an integer

# Capacity Methods

| Method          | Description                             |
| --------------- | --------------------------------------- |
| `size()`        | Returns number of stored elements       |
| `capacity()`    | Returns allocated buffer size           |
| `empty()`       | Returns `true` if size is 0             |
| `reserve(n)`    | Ensures capacity is at least `n`        |
| `shrinkToFit()` | Shrinks capacity to match size          |
| `clear()`       | Removes all elements but keeps capacity |

# Element Access

| Method          | Description                                   |
| --------------- | --------------------------------------------- |
| `at(i)`         | Returns element at index `i` (bounds checked) |
| `set(i, value)` | Overwrites element at index `i`               |
| `front()`       | Returns first element                         |
| `back()`        | Returns last element                          |
| `toArray()`     | Returns a normal JS array (no extra capacity) |


# Modifiers

| Method               | Description                      |
| -------------------- | -------------------------------- |
| `pushBack(value)`    | Adds element to the end          |
| `popBack()`          | Removes and returns last element |
| `insert(pos, value)` | Inserts element at position      |
| `erase(pos)`         | Removes element at position      |
| `swap(i, j)`         | Swaps two elements               |


# Resizing rule:
When size === capacity, capacity grows by:
capacity = capacity * 


# Iteration Support
The class implements the iterator protocol.
You can do:

for (const value of arr) {
    console.log(value);
}

Additional iterators:
values() → values
keys() → indices
entries() → [index, value]

# High Order Functions

| Method                | Description                  |
| --------------------- | ---------------------------- |
| `forEach(fn)`         | Calls fn for each element    |
| `map(fn)`             | Returns new DynamicArray     |
| `filter(fn)`          | Returns new DynamicArray     |
| `reduce(fn, initial)` | Reduces to single value      |
| `some(fn)`            | Returns true if any match    |
| `every(fn)`           | Returns true if all match    |
| `find(fn)`            | Returns first matching value |
| `findIndex(fn)`       | Returns index or -1          |
| `includes(value)`     | Checks existence             |

⚠️ map() requires the returned value to be an integer.


# Extensions
 reverse()
    - Reverses array in-place
    - No extra memory allocation

 sort(compareFn)
    - Sorts array in-place
    - Custom QuickSort implementation
    - Does NOT use Array.sort

 clone()
    - Creates a deep copy of the DynamicArray

 equals(other)
    - Returns true if:
        - Same size
        - All elements are equal

# Example Usage

const arr = new DynamicArray(3, 0); // [0, 0, 0]

arr.pushBack(5);      // [0, 0, 0, 5]
arr.insert(1, 10);    // [0, 10, 0, 0, 5]
arr.erase(2);         // [0, 10, 0, 5]
arr.reverse();        // [5, 0, 10, 0]

console.log(arr.toArray());


# Why Quick Sort was used in DynamicArray.sort()

1️⃣ In-place sorting (no extra memory)

Quick Sort can be implemented in-place, meaning:
- No additional arrays are created
- Memory usage is O(1) (ignoring recursion stack)
- Fits perfectly with a dynamic array philosophy

DynamicArray goal:
control memory + avoid extra allocations

Merge Sort, for example, requires extra arrays, which goes against that goal.



2️⃣ Very good average performance

| Algorithm  | Average    | Worst      | Space |
| ---------- | ---------- | ---------- | ----- |
| Quick Sort | O(n log n) | O(n²)      | O(1)  |
| Merge Sort | O(n log n) | O(n log n) | O(n)  |
| Heap Sort  | O(n log n) | O(n log n) | O(1)  |


In practice:
- Quick Sort is faster than Merge Sort
- Better cache locality
- Fewer swaps and comparisons on average

That’s why JS engines themselves often use Quick Sort–like hybrids internally.



3️⃣ Simple to explain in interviews

Quick Sort is:
- Well-known
- Easy to visualize
- Easy to reason about with pivots

Interviewers often expect:

“Implement your own sort — don’t use Array.sort()”

Quick Sort is usually the cleanest answer.



4️⃣ We avoided the worst-case pitfall

Classic Quick Sort worst case happens when:
- Array is already sorted
- Pivot is chosen badly (first or last element)

We avoided that by choosing:

pivot = arr[Math.floor((left + right) / 2)];


This:
- Reduces chance of O(n²)
- Makes worst-case rare in practice

# Why NOT other algorithms?

❌ Bubble / Selection / Insertion Sort
- O(n²) even on average
- Only good for teaching, not real use


❌ Merge Sort
- Needs extra arrays
- Not in-place
- Higher memory cost


❌ Heap Sort
- Harder to implement correctly
- Worse cache locality
- Less readable in interviews


# When would I NOT use Quick Sort?

Be honest — Quick Sort is not perfect.

Use something else if:

| Case                       | Better choice  |
| -------------------------- | -------------- |
| Need guaranteed O(n log n) | Merge Sort     |
| Need stability             | Merge Sort     |
| Very small arrays          | Insertion Sort |
| Memory must be predictable | Heap Sort      |


Interview-ready answer (short & strong)

“I used Quick Sort because it is in-place, has O(n log n) average time complexity, excellent cache performance, and fits the memory-management philosophy of a dynamic array. I avoided worst-case behavior by choosing the middle element as pivot.”

---------------------------------------------------------------------------

1️⃣ Why does Symbol.iterator return { next(), done }?
Short idea

Because that is exactly how the JavaScript iteration protocol works.

JavaScript defines a contract called the Iterator Protocol.

# The Iterator Protocol (rulebook)

An object is iterable if:

obj[Symbol.iterator] === function

That function must return an iterator object.

An iterator object must have:

{
  next(): { value: any, done: boolean }
}

That’s not a style choice — it’s mandatory.

# Why next()?

Iteration happens step-by-step.

Every time JavaScript wants the next value, it calls:

iterator.next()

This lets JS:
- Pause
- Resume
- Stop

Unlike a normal loop, iteration is pull-based:

“Give me the next value when I ask.”


# Why { value, done }?

Because JS needs two pieces of information:

1️⃣ value

The current element.

2️⃣ done

A signal saying:

done === true  → iteration is finished

Example:
{ value: 10, done: false }
{ value: 20, done: false }
{ value: undefined, done: true }

Without done, JS would never know when to stop.

# What happens in for...of?

This loop:

for (const x of arr) {
  console.log(x);
}

Is internally equivalent to:

const iterator = arr[Symbol.iterator]();

while (true) {
  const { value, done } = iterator.next();
  if (done) break;
  console.log(value);
}


💡 That’s why next() + done must exist.

# Why not just return an array?

Because:
- Arrays are eager (all values at once)
- Iterators are lazy (one value at a time)
- Iterators allow infinite sequences

Example impossible with arrays:

function* infinite() {
  let i = 0;
  while (true) yield i++;
}


2️⃣ Why *keys(), *values(), *entries() use * (generator functions)?

Because generators automatically create iterators for you.


# What is a generator function?

A function with * : function* gen() {}
Or method: *keys() {}

This function:
- Does NOT run immediately
- Returns an iterator
- Pauses at each yield

# Why generators are perfect here
Compare both approaches.

❌ Manual iterator (Symbol.iterator)

[Symbol.iterator]() {
  let index = 0;
  const size = this.#size;
  const arr = this.#arr;

  return {
    next() {
      if (index < size) {
        return { value: arr[index++], done: false };
      }
      return { done: true };
    }
  };
}


✔ Works
❌ Verbose
❌ Easy to make mistakes

✅ Generator version

*keys() {
  for (let i = 0; i < this.#size; i++) {
    yield i;
  }
}


✔ Cleaner
✔ Less code
✔ Impossible to forget done
✔ JS handles iterator protocol automatically

# What does yield really do?

Each yield:
- Returns { value, done: false }
- Pauses execution
- Resumes on next next() call

 When function ends: { value: undefined, done: true }

You never write this manually — JS does it.

# Why not use generators for Symbol.iterator too?
We actually could:

*[Symbol.iterator]() {
  for (let i = 0; i < this.#size; i++) {
    yield this.#arr[i];
  }
}

Both are valid.

# So why did we mix styles?

Because:
- Symbol.iterator explanation is clearer when written manually
- keys/values/entries are classic generator use-cases
- Shows you understand both approaches (great in interviews)

# Interview-level summary (memorize this)
Q: Why does Symbol.iterator return { next, done }?

Because JavaScript iteration follows the Iterator Protocol, which requires an iterator object with a next() method that returns { value, done }. This allows lazy, controlled, step-by-step iteration and tells the engine when to stop.

Q: Why are keys(), values(), entries() generator functions?

Because generators automatically implement the iterator protocol, making the code shorter, safer, and easier to reason about. Each yield produces the next iteration value and JavaScript handles next() and done internally.