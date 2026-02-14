# Doubly Linked List (JavaScript)

This project implements a **Doubly Linked List** from scratch in JavaScript, designed for learning and interview preparation.  
It supports bidirectional traversal, insertion, deletion, iteration, and other standard linked-list operations.

---

## 📌 Features

- Node encapsulation with private fields (`value`, `next`, `prev`)
- Push and pop from front and back
- Insert and erase nodes at any index
- Remove nodes by value with optional equality function
- Reverse the list in-place
- Conversion to/from arrays
- Manual iterator implementation (no generators)
- Optimized traversal from head or tail

---

## 🔹 Node Class (`DNode`)

Represents a single node in the list:

```js
class DNode {
    #value;
    #next;
    #prev;
    constructor(val = 0) { ... }
    get value() { ... }
    set value(val) { ... }
    get next() { ... }
    set next(node) { ... }
    get prev() { ... }
    set prev(node) { ... }
}
```

- `value` stores the node’s data (private)
- `next` points to the next node or `null`
- `prev` points to the previous node or `null`
- Getters and setters ensure type safety

---

## 🔹 DoublyLinkedList Class

```js
class DoublyLinkedList {
    #head;
    #tail;
    #size;
    constructor(iterable) { ... }
}
```

- `head`: first node
- `tail`: last node
- `size`: number of nodes
- Supports initialization from arrays or iterable objects

---

## 🔹 Core Methods

| Method | Description |
|--------|------------|
| `size()` | Returns number of nodes |
| `isEmpty()` | Checks if list is empty |
| `clear()` | Removes all nodes, breaks links for GC |
| `front()` | Returns value at head |
| `back()` | Returns value at tail |
| `push_front(val)` | Insert value at the head |
| `push_back(val)` | Insert value at the tail |
| `pop_front()` | Remove and return head value |
| `pop_back()` | Remove and return tail value |
| `at(index)` | Access node value by index |
| `insert(index, val)` | Insert node at index |
| `erase(index)` | Remove node at index |
| `remove(value, equals)` | Remove all nodes with given value |
| `reverse()` | Reverse the list in-place |
| `toArray()` | Convert list to JS array |
| `static fromArray(arr)` | Create list from array |
| `[Symbol.iterator]()` | Manual iterator for `for...of` loops |

---

## 🔹 Example Usage

```js
const dll = new DoublyLinkedList([1,2,3]);
dll.push_front(0);       // 0,1,2,3
dll.push_back(4);        // 0,1,2,3,4
dll.insert(2, 99);       // 0,1,99,2,3,4

console.log(dll.toArray()); // [0,1,99,2,3,4]

dll.erase(2);            // Remove 99
console.log(dll.toArray()); // [0,1,2,3,4]

dll.reverse();
console.log(dll.toArray()); // [4,3,2,1,0]

// Iterate
for (const val of dll) {
    console.log(val);       // 4 3 2 1 0
}
```

---

## 🔹 Iteration Protocol

Manual iterator implementation:

```js
[Symbol.iterator]() {
    let current = this.#head;
    return {
        next() {
            if (!current) return { value: undefined, done: true };
            const value = current.value;
            current = current.next;
            return { value, done: false };
        }
    };
}
```

- Allows `for...of` iteration
- Independent iterator objects
- Follows JavaScript iteration protocol

---

## 🔹 Complexity Overview

| Operation | Complexity |
|-----------|------------|
| push_front | O(1) |
| push_back | O(1) |
| pop_front | O(1) |
| pop_back | O(1) |
| at(index) | O(n) |
| insert | O(n) |
| erase | O(n) |
| remove | O(n) |
| reverse | O(n) |

> Note: `at`, `insert`, and `erase` are optimized by starting traversal from nearest end (head or tail).

---

## 🔹 Notes & Best Practices

- **Bidirectional traversal** makes random access faster than singly linked list for large indices
- **Tail pointer** allows O(1) push_back and pop_back
- **Reverse in-place** does not create new nodes
- **Remove with equality function** supports custom object comparison
- **Clear** method properly breaks all links to help garbage collection

---

## 🔹 Use Cases

- Learning data structures
- Interview preparation
- Base for stacks, queues, or more advanced structures
- Demonstrating iteration protocols and memory management in JS

---

Happy Coding 🚀
