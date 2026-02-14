class DynamicArray {
    // === Private properties ===
    #arr;       // Internal buffer to store elements
    #size;      // Actual number of elements
    #capacity;  // Allocated capacity of the buffer
    #GROWTH = 2; // Factor by which capacity grows when full

    /**
     * Constructor
     * @param {number} cap - initial capacity
     * @param {number} fill - value to fill initial elements with
     */
    constructor(cap = 0, fill = 0) {
        if (cap < 0) throw new Error("Capacity cannot be negative");

        // Allocate the internal array with given capacity
        this.#arr = new Array(cap);

        // Fill the array with initial value
        for (let i = 0; i < cap; i++) {
            if (!Number.isInteger(fill)) {
                throw new Error("Initial fill value must be an integer");
            }
            this.#arr[i] = fill;
        }

        // Set initial size and capacity
        this.#size = cap;
        this.#capacity = cap;
    }

    /* ================= Capacity ================= */

    // Returns current number of elements
    size() {
        return this.#size;
    }

    // Returns allocated buffer size
    capacity() {
        return this.#capacity;
    }

    // Returns true if array is empty
    empty() {
        return this.#size === 0;
    }

    // Reserve space for at least n elements
    reserve(n) {
        if (n > this.#capacity) {
            this.#resize(n); // Grow buffer if needed
        }
    }

    // Shrinks buffer to fit current size
    shrinkToFit() {
        if (this.#capacity !== this.#size) {
            this.#resize(this.#size);
        }
    }

    // Clears all elements but keeps capacity
    clear() {
        this.#size = 0;
    }

    /* ================= Element Access ================= */

    // Returns element at index i with bounds check
    at(i) {
        if (i < 0 || i >= this.#size) throw new Error("Index out of bounds");
        return this.#arr[i];
    }

    // Overwrites element at index i with new integer value
    set(i, value) {
        if (i < 0 || i >= this.#size) throw new Error("Index out of bounds");
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");
        this.#arr[i] = value;
    }

    // Returns first element
    front() {
        if (this.empty()) throw new Error("Array is empty");
        return this.at(0);
    }

    // Returns last element
    back() {
        if (this.empty()) throw new Error("Array is empty");
        return this.at(this.#size - 1);
    }

    // Returns a normal JS array of valid elements
    toArray() {
        return this.#arr.slice(0, this.#size);
    }

    /* ================= Modifiers ================= */

    // Appends integer value to the end
    pushBack(value) {
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");

        // Resize buffer if full
        if (this.#size === this.#capacity) {
            const newCapacity = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.#resize(newCapacity);
        }

        // Insert value at the end
        this.#arr[this.#size++] = value;
    }

    // Removes last element and returns it
    popBack() {
        if (this.empty()) throw new Error("Array is empty");
        const value = this.#arr[this.#size - 1];
        this.#size--;
        return value;
    }

    // Inserts integer value at given position
    insert(pos, value) {
        if (pos < 0 || pos > this.#size) throw new Error("Index out of bounds");
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");

        // Resize if full
        if (this.#size === this.#capacity) {
            const newCapacity = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.#resize(newCapacity);
        }

        // Shift elements to the right
        for (let i = this.#size; i > pos; i--) {
            this.#arr[i] = this.#arr[i - 1];
        }

        // Insert new value
        this.#arr[pos] = value;
        this.#size++;
    }

    // Removes element at position pos
    erase(pos) {
        if (pos < 0 || pos >= this.#size) throw new Error("Index out of bounds");

        // Shift elements to the left
        for (let i = pos; i < this.#size - 1; i++) {
            this.#arr[i] = this.#arr[i + 1];
        }

        this.#size--;
    }

    // Private method to resize buffer
    #resize(n) {
        const newArr = new Array(n);
        const count = Math.min(this.#size, n);

        // Copy elements to new buffer
        for (let i = 0; i < count; i++) {
            newArr[i] = this.#arr[i];
        }

        this.#arr = newArr;
        this.#capacity = n;

        // Truncate size if new capacity smaller
        if (n < this.#size) this.#size = n;
    }

    // Swap elements at indices i and j
    swap(i, j) {
        if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) throw new Error("Index out of bounds");
        const temp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = temp;
    }

    /* ================= Iteration ================= */

    // Allows for-of iteration
    [Symbol.iterator]() {
        let index = 0;
        const size = this.#size;
        const arr = this.#arr;
        return {
            next() {
                if (index < size) {
                    return { value: arr[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    // Returns iterator over values
    values() {
        return this[Symbol.iterator]();
    }

    // Iterator over indices
    *keys() {
        for (let i = 0; i < this.#size; i++) yield i;
    }

    // Iterator over [index, value] pairs
    *entries() {
        for (let i = 0; i < this.#size; i++) yield [i, this.#arr[i]];
    }

    /* ================= High Order ================= */

    // Calls fn(value, index, array) for each element
    forEach(fn) {
        for (let i = 0; i < this.#size; i++) {
            fn(this.#arr[i], i, this);
        }
    }

    // Returns a new DynamicArray mapped by fn
    map(fn) {
        const result = new DynamicArray(this.#size);
        for (let i = 0; i < this.#size; i++) {
            const val = fn(this.#arr[i], i, this);
            if (!Number.isInteger(val)) throw new Error("Mapped value must be an integer");
            result.set(i, val);
        }
        return result;
    }

    // Returns a new DynamicArray filtered by fn
    filter(fn) {
        const result = new DynamicArray();
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                result.pushBack(this.#arr[i]);
            }
        }
        return result;
    }

    // Reduces array to single value
    reduce(fn, initial) {
        if (this.empty() && initial === undefined) throw new Error("Reduce of empty array with no initial value");

        let acc, startIndex;
        if (initial !== undefined) {
            acc = initial;
            startIndex = 0;
        } else {
            acc = this.#arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < this.#size; i++) {
            acc = fn(acc, this.#arr[i], i, this);
        }
        return acc;
    }

    // Returns true if any element satisfies fn
    some(fn) {
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) return true;
        }
        return false;
    }

    // Returns true only if all elements satisfy fn
    every(fn) {
        for (let i = 0; i < this.#size; i++) {
            if (!fn(this.#arr[i], i, this)) return false;
        }
        return true;
    }

    // Finds first element satisfying fn
    find(fn) {
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) return this.#arr[i];
        }
        return undefined;
    }

    // Finds index of first element satisfying fn
    findIndex(fn) {
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) return i;
        }
        return -1;
    }

    // Returns true if value exists
    includes(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.#arr[i] === value) return true;
        }
        return false;
    }

    /* ================= Extensions ================= */

    // Reverse elements in-place
    reverse() {
        let left = 0;
        let right = this.#size - 1;
        while (left < right) {
            this.swap(left, right);
            left++;
            right--;
        }
    }

    // Sort array in-place using quicksort
    sort(compareFn = (a, b) => a - b) {
        const quickSort = (arr, left, right) => {
            if (left >= right) return;

            const pivot = arr[Math.floor((left + right) / 2)];
            let i = left;
            let j = right;

            while (i <= j) {
                while (compareFn(arr[i], pivot) < 0) i++;
                while (compareFn(arr[j], pivot) > 0) j--;
                if (i <= j) {
                    const temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    i++;
                    j--;
                }
            }

            quickSort(arr, left, j);
            quickSort(arr, i, right);
        };

        quickSort(this.#arr, 0, this.#size - 1);
    }

    // Deep copy
    clone() {
        const copy = new DynamicArray(this.#size);
        for (let i = 0; i < this.#size; i++) {
            copy.set(i, this.#arr[i]);
        }
        return copy;
    }

    // Compares with another DynamicArray
    equals(other) {
        if (!(other instanceof DynamicArray)) return false;
        if (this.#size !== other.size()) return false;

        for (let i = 0; i < this.#size; i++) {
            if (this.#arr[i] !== other.at(i)) return false;
        }

        return true;
    }
}

// === Example usage ===
const arr = new DynamicArray(3, 0); // [0,0,0]
arr.pushBack(5);                     // [0,0,0,5]
arr.insert(1, 10);                   // [0,10,0,0,5]
arr.erase(2);                        // [0,10,0,5]
arr.reverse();                        // [5,0,10,0]
console.log(arr.toArray());
