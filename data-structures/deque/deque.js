/* ============================================================
   DEQUE CLASS
   Double-ended queue using circular buffer
   ============================================================ */

class Deque {
  #arr;      // Internal array to store elements (circular buffer)
  #front;    // Index of the logical front element
  #size;     // Current number of elements

  constructor(capacity = 8) {
    if (capacity < 2) {
      throw new Error("Deque capacity must be >= 2");
    }

    // Initialize buffer with given capacity (placeholder undefined values)
    this.#arr = new Array(capacity);
    this.#front = 0; // Logical front starts at index 0
    this.#size = 0;  // No elements initially
  }

  /* ================= Basic State ================= */

  size() {
    // Return number of stored elements
    return this.#size;
  }

  capacity() {
    // Return internal buffer capacity
    return this.#arr.length;
  }

  empty() {
    // True if deque is empty
    return this.#size === 0;
  }

  full() {
    // True if deque is full
    return this.#size === this.capacity();
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    // Convert any integer i to valid circular index [0, capacity-1]
    const n = this.capacity();
    return ((i % n) + n) % n; // handles negative numbers
  }

  #index(i) {
    // Convert logical index → physical buffer index
    if (i < 0 || i >= this.#size) {
      throw new RangeError("Index out of bounds");
    }
    return this.#mod(this.#front + i);
  }

  #ensureCapacityForOneMore() {
    // Resize buffer if full
    if (this.#size < this.capacity()) return;

    const newCapacity = this.capacity() * 2;
    const newArr = new Array(newCapacity);

    // Copy elements in logical order
    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.at(i);
    }

    this.#arr = newArr;
    this.#front = 0; // Reset front to start of new buffer
  }

  /* ================= Element Access ================= */

  front() {
    if (this.empty()) throw new Error("Deque is empty");
    return this.#arr[this.#front];
  }

  back() {
    if (this.empty()) throw new Error("Deque is empty");
    return this.#arr[this.#mod(this.#front + this.#size - 1)];
  }

  at(i) {
    // Get element at logical index i
    if (i < 0 || i >= this.#size) throw new RangeError("Index out of bounds");
    return this.#arr[this.#index(i)];
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();

    // Insert at logical back
    const idx = this.#mod(this.#front + this.#size);
    this.#arr[idx] = value;
    this.#size++;
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();

    // Move front backward circularly
    this.#front = this.#mod(this.#front - 1);
    this.#arr[this.#front] = value;
    this.#size++;
  }

  pop_front() {
    if (this.empty()) throw new Error("Deque is empty");

    const value = this.#arr[this.#front];

    // Move front forward circularly
    this.#front = this.#mod(this.#front + 1);
    this.#size--;
    return value;
  }

  pop_back() {
    if (this.empty()) throw new Error("Deque is empty");

    const idx = this.#mod(this.#front + this.#size - 1);
    const value = this.#arr[idx];
    this.#size--;
    return value;
  }

  clear() {
    // Reset deque to empty state
    this.#front = 0;
    this.#size = 0;
    // Buffer keeps current capacity
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    // Resize buffer to at least newCapacity
    if (newCapacity <= this.capacity()) return;

    const newArr = new Array(newCapacity);
    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.at(i);
    }

    this.#arr = newArr;
    this.#front = 0;
  }

  shrinkToFit() {
    // Reduce capacity to current size
    const newArr = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.at(i);
    }

    this.#arr = newArr;
    this.#front = 0;
  }

  rotateLeft(k = 1) {
    // Move logical front forward by k steps
    if (this.empty()) return;
    this.#front = this.#mod(this.#front + k);
  }

  rotateRight(k = 1) {
    // Move logical front backward by k steps
    if (this.empty()) return;
    this.#front = this.#mod(this.#front - k);
  }

  swap(i, j) {
    if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) {
      throw new RangeError("Index out of bounds");
    }

    const idxI = this.#index(i);
    const idxJ = this.#index(j);

    const temp = this.#arr[idxI];
    this.#arr[idxI] = this.#arr[idxJ];
    this.#arr[idxJ] = temp;
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    // Return first logical index of value
    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) === value) return i;
    }
    return -1;
  }

  includes(value) {
    return this.find(value) !== -1;
  }

  toArray() {
    const result = [];
    for (let i = 0; i < this.#size; i++) {
      result.push(this.at(i));
    }
    return result;
  }

  clone() {
    const copy = new Deque(this.capacity());
    for (let i = 0; i < this.#size; i++) {
      copy.push_back(this.at(i));
    }
    return copy;
  }

  equals(otherDeque) {
    if (!(otherDeque instanceof Deque)) return false;
    if (this.size() !== otherDeque.size()) return false;

    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) !== otherDeque.at(i)) return false;
    }

    return true;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i >= this.#size) return { value: undefined, done: true };
        const value = this.at(i);
        i++;
        return { value, done: false };
      }
    };
  }

  values() {
    return this[Symbol.iterator]();
  }

  keys() {
    let i = 0;
    const size = this.#size;
    return {
      [Symbol.iterator]() {
        return {
          next: () => (i < size ? { value: i++, done: false } : { value: undefined, done: true })
        };
      }
    };
  }

  entries() {
    let i = 0;
    const size = this.#size;
    const self = this;
    return {
      [Symbol.iterator]() {
        return {
          next: () => (i < size ? { value: [i, self.at(i++)], done: false } : { value: undefined, done: true })
        };
      }
    };
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    for (let i = 0; i < this.#size; i++) {
      fn(this.at(i), i, this);
    }
  }

  map(fn) {
    const result = new Deque(this.capacity());
    for (let i = 0; i < this.#size; i++) {
      result.push_back(fn(this.at(i), i, this));
    }
    return result;
  }

  filter(fn) {
    const result = new Deque(this.capacity());
    for (let i = 0; i < this.#size; i++) {
      const val = this.at(i);
      if (fn(val, i, this)) result.push_back(val);
    }
    return result;
  }

  reduce(fn, initial) {
    if (this.empty() && initial === undefined) {
      throw new TypeError("Reduce of empty deque with no initial value");
    }

    let accumulator = initial;
    let start = 0;

    if (accumulator === undefined) {
      accumulator = this.at(0);
      start = 1;
    }

    for (let i = start; i < this.#size; i++) {
      accumulator = fn(accumulator, this.at(i), i, this);
    }

    return accumulator;
  }
}
