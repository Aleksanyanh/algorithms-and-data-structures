# Singly Linked List (JavaScript)

This project implements a **Singly Linked List** in JavaScript from scratch, including full node encapsulation, iterator support, and common linked-list operations.  
It is designed for both learning and interview preparation.

---

## 📌 Features

- Node encapsulation with private fields
- Push and pop from front and back
- Insert, erase, remove by value
- Access by index
- Reverse and sort (merge sort)
- Merge two sorted lists
- Conversion to/from array
- Manual iterator (no generator)
- Full iteration support with `for...of`

---

## 🔹 Node Class

Represents a single element in the linked list:

```js
class Node {
    #value;
    #next = null;

    constructor(val = 0) { ... }
    get value() { ... }
    set value(val) { ... }
    get next() { ... }
    set next(new_node) { ... }
}
```

- Stores value privately
- `next` points to the next node or `null`
- Provides getters and setters

---

## 🔹 SinglyLinkedList Class

```js
class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable) { ... }
}
```

### Core Methods

| Method | Description |
|--------|------------|
| `size()` | Returns number of nodes |
| `isEmpty()` | Checks if list is empty |
| `clear()` | Removes all nodes |
| `front()` | Returns value of head node |
| `push_front(val)` | Insert at head |
| `push_back(val)` | Insert at tail |
| `pop_front()` | Remove head |
| `pop_back()` | Remove tail |
| `at(index)` | Access node value by index |
| `insert(index, val)` | Insert at index |
| `erase(index)` | Remove node at index |
| `remove(value, equals)` | Remove all nodes with value |
| `reverse()` | Reverse the list in-place |
| `sort(cmp)` | Merge sort linked list |
| `merge(list, cmp)` | Merge another sorted list |
| `toArray()` | Convert list to JS array |
| `static fromArray(arr)` | Create list from array |

---

## 🔹 Iteration Protocol

Manual iterator implementation (no generator):

```js
[Symbol.iterator]() {
    let current = this.#head;
    return {
        next() {
            if (current === null) return { value: undefined, done: true };
            const value = current.value;
            current = current.next;
            return { value, done: false };
        }
    };
}
```

- Implements standard JS iteration protocol
- Works with `for...of`
- Independent iterator objects for each call

---

## 🔹 Example Usage

```js
const list = new SinglyLinkedList([1,2,3]);

list.push_front(0);      // 0,1,2,3
list.push_back(4);       // 0,1,2,3,4
list.insert(2, 99);      // 0,1,99,2,3,4

console.log(list.at(2)); // 99
list.remove(99);
list.reverse();
console.log([...list]);  // [4,3,2,1,0]

list.sort();              // Sorted
console.log(list.toArray());
```

---

## 🔹 Complexity Overview

| Operation      | Complexity |
|----------------|------------|
| push_front     | O(1) |
| push_back      | O(n) |
| pop_front      | O(1) |
| pop_back       | O(n) |
| at             | O(n) |
| insert         | O(n) |
| erase          | O(n) |
| remove         | O(n) |
| reverse        | O(n) |
| sort           | O(n log n) |
| merge          | O(n) |

---

## 🔹 Why Manual Iterator?

- Implements full JS **iteration protocol** (`next() → { value, done }`)
- Mimics generator behavior without using `*` or `yield`
- Allows `for...of` loops and destructuring
- `done: true` signals iteration end; `value` can be `undefined`

Example:

```js
for (const val of list) {
    console.log(val);
}
```

---

## 🔹 Senior-Level Notes

- **`pop_back` and `push_back`** can be optimized with a tail pointer.
- **Merge sort** reorders nodes, not just values.
- **`remove(value)`** supports custom equality functions.
- **Iterators** are fail-safe and independent.
- Conforms to **iteration protocol** spec.

---

## 🔹 Use Cases

- Learning linked list mechanics
- Interview preparation
- Algorithms practice
- Base for more complex data structures (doubly linked list, stacks, queues)


