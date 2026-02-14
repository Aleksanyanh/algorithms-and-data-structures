# Deque (Double-Ended Queue) – JavaScript Implementation

This project implements a **Deque** (double-ended queue) using a **circular buffer** in JavaScript.  
It supports fast O(1) insertion/removal at both ends, rotations, functional methods, and full iteration.

---

## 📌 Features

- O(1) push and pop at front and back
- Circular buffer with dynamic resizing
- Rotate left/right efficiently
- Swap, find, includes, toArray, clone, equals
- Fully iterable (keys, values, entries)
- Functional style: forEach, map, filter, reduce
- Safe handling of edge cases (empty, full, out-of-bounds)

---

## 🔹 Constructor

```js
const deque = new Deque(capacity = 8);
```

- `capacity`: initial buffer size (must be ≥ 2)
- Internally allocates a circular buffer
- `front` starts at 0, `size` starts at 0

---

## 🔹 Core State Methods

| Method      | Description |
|------------|------------|
| `size()`   | Returns number of elements |
| `capacity()` | Returns internal buffer capacity |
| `empty()`  | Returns true if deque is empty |
| `full()`   | Returns true if deque is full |

---

## 🔹 Element Access

| Method  | Description |
|---------|------------|
| `front()` | Return first element (throws if empty) |
| `back()`  | Return last element (throws if empty) |
| `at(i)`  | Return element at logical index i (throws if invalid) |

---

## 🔹 Modifiers

| Method        | Description |
|---------------|------------|
| `push_front(value)` | Insert value at front |
| `push_back(value)`  | Insert value at back |
| `pop_front()`       | Remove and return front element |
| `pop_back()`        | Remove and return back element |
| `clear()`           | Reset deque (keeps capacity) |

---

## 🔹 Extended Methods

| Method               | Description |
|----------------------|------------|
| `reserve(newCapacity)` | Expand buffer if needed |
| `shrinkToFit()`        | Reduce buffer to current size |
| `rotateLeft(k)`        | Logical front shifts forward k steps |
| `rotateRight(k)`       | Logical front shifts backward k steps |
| `swap(i, j)`           | Swap elements at logical indices i and j |

---

## 🔹 Search & Utilities

| Method        | Description |
|---------------|------------|
| `find(value)` | Return first logical index of value, -1 if not found |
| `includes(value)` | True if value exists |
| `toArray()`   | Return JS array of elements in order |
| `clone()`     | Return deep copy of deque |
| `equals(otherDeque)` | True if same size and same logical values |

---

## 🔹 Iteration

- Fully iterable using:

```js
for (const val of deque) { ... }
```

- Additional iterators:

```js
deque.values()   // value iterator
deque.keys()     // logical indices iterator
deque.entries()  // [index, value] iterator
```

---

## 🔹 Functional Methods

| Method          | Description |
|-----------------|------------|
| `forEach(fn)`   | Calls fn(value, index, deque) for each element |
| `map(fn)`       | Returns new deque with mapped values |
| `filter(fn)`    | Returns new deque with filtered values |
| `reduce(fn, initial)` | Reduces values like Array.reduce |

---

## 🔹 Example Usage

```js
const dq = new Deque(4);

// Push elements
dq.push_back(10);
dq.push_front(5);
dq.push_back(20);

console.log(dq.toArray()); // [5,10,20]

// Pop elements
console.log(dq.pop_front()); // 5
console.log(dq.pop_back());  // 20

// Functional
const mapped = dq.map(x => x * 2);
console.log(mapped.toArray()); // [20]

// Rotate
dq.push_back(30);
dq.push_back(40);
dq.rotateLeft(1);
console.log(dq.toArray()); // [10,30,40]

// Iterate
for (const val of dq) console.log(val);
```

---

## 🔹 Complexity Overview

| Operation        | Time Complexity |
|------------------|----------------|
| push_front/back   | O(1) amortized |
| pop_front/back    | O(1) |
| at(i)             | O(1) |
| rotateLeft/Right  | O(1) |
| swap              | O(1) |
| find/includes     | O(n) |
| map/filter/reduce | O(n) |
| toArray/clone     | O(n) |

---

## 🔹 Notes & Best Practices

1. Circular buffer avoids shifting elements on push/pop.
2. Automatic resizing ensures safe growth.
3. Rotations simply adjust `front` pointer—no data moves.
4. Fully iterable and compatible with `for...of`.
5. Clone creates independent copy; modifications do not affect original.


