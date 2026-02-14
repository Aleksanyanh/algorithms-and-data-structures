/* ============================================================
   DOUBLY LINKED LIST IMPLEMENTATION (JavaScript)
   ============================================================ */

/* ============================================================
   NODE CLASS
   Represents a node in a doubly linked list
   ============================================================ */
class DNode {
    #value;
    #next = null;
    #prev = null;

    constructor(val = 0) {
        // Store the value in a private field
        this.#value = val;
        // Next and prev pointers default to null
        this.#next = null;
        this.#prev = null;
    }

    // Getter for value
    get value() {
        return this.#value;
    }

    // Setter for value
    set value(val) {
        this.#value = val;
    }

    // Getter for next pointer
    get next() {
        return this.#next;
    }

    // Setter for next pointer
    set next(node) {
        if (node !== null && !(node instanceof DNode)) {
            throw new TypeError("next must be a DNode or null");
        }
        this.#next = node;
    }

    // Getter for previous pointer
    get prev() {
        return this.#prev;
    }

    // Setter for previous pointer
    set prev(node) {
        if (node !== null && !(node instanceof DNode)) {
            throw new TypeError("prev must be a DNode or null");
        }
        this.#prev = node;
    }
}


/* ============================================================
   DOUBLY LINKED LIST CLASS
   ============================================================ */
class DoublyLinkedList {
    #head = null;
    #tail = null;
    #size = 0;

    constructor(iterable) {
        // If no input, create empty list
        if (!iterable) return;

        // If input is iterable (array, set, etc.)
        if (typeof iterable[Symbol.iterator] === "function") {
            for (const item of iterable) {
                this.push_back(item);
            }
        } else {
            // Single value → push_back once
            this.push_back(iterable);
        }
    }

    /* ================= Size & State ================= */

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        // Break all links to help garbage collection
        let current = this.#head;
        while (current) {
            const next = current.next;
            current.next = null;
            current.prev = null;
            current = next;
        }
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    /* ================= Front & Back Access ================= */

    front() {
        return this.#head ? this.#head.value : undefined;
    }

    back() {
        return this.#tail ? this.#tail.value : undefined;
    }

    /* ================= Push Operations ================= */

    push_front(val) {
        const newNode = new DNode(val);

        // Link new node to current head
        newNode.next = this.#head;

        // Update previous head's prev pointer
        if (this.#head) {
            this.#head.prev = newNode;
        }

        // Update head pointer
        this.#head = newNode;

        // If list was empty, tail also points to new node
        if (!this.#tail) this.#tail = newNode;

        this.#size++;
    }

    push_back(val) {
        const newNode = new DNode(val);

        // If list empty, new node is both head and tail
        if (!this.#tail) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            // Link current tail to new node
            this.#tail.next = newNode;
            newNode.prev = this.#tail;

            // Update tail pointer
            this.#tail = newNode;
        }

        this.#size++;
    }

    /* ================= Pop Operations ================= */

    pop_front() {
        if (!this.#head) return undefined;

        const value = this.#head.value;

        // Move head to next node
        this.#head = this.#head.next;

        // If head exists, remove its prev pointer
        if (this.#head) {
            this.#head.prev = null;
        } else {
            // List became empty → tail = null
            this.#tail = null;
        }

        this.#size--;
        return value;
    }

    pop_back() {
        if (!this.#tail) return undefined;

        const value = this.#tail.value;

        // Move tail to previous node
        this.#tail = this.#tail.prev;

        // If tail exists, remove its next pointer
        if (this.#tail) {
            this.#tail.next = null;
        } else {
            // List became empty → head = null
            this.#head = null;
        }

        this.#size--;
        return value;
    }

    /* ================= Random Access & Insert ================= */

    at(index) {
        if (index < 0 || index >= this.#size) return undefined;

        let current;
        let i;

        // Optimize traversal: start from head or tail depending on index
        if (index < this.#size / 2) {
            current = this.#head;
            i = 0;
            while (i < index) {
                current = current.next;
                i++;
            }
        } else {
            current = this.#tail;
            i = this.#size - 1;
            while (i > index) {
                current = current.prev;
                i--;
            }
        }

        return current.value;
    }

    insert(index, val) {
        if (index < 0 || index > this.#size) return;

        if (index === 0) return this.push_front(val);
        if (index === this.#size) return this.push_back(val);

        const newNode = new DNode(val);
        let current;

        // Find node currently at `index`
        if (index < this.#size / 2) {
            current = this.#head;
            let i = 0;
            while (i < index) {
                current = current.next;
                i++;
            }
        } else {
            current = this.#tail;
            let i = this.#size - 1;
            while (i > index) {
                current = current.prev;
                i--;
            }
        }

        // Insert newNode before current
        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;

        this.#size++;
    }

    erase(index) {
        if (index < 0 || index >= this.#size) return;

        if (index === 0) return this.pop_front();
        if (index === this.#size - 1) return this.pop_back();

        let current;

        // Optimize traversal
        if (index < this.#size / 2) {
            current = this.#head;
            let i = 0;
            while (i < index) {
                current = current.next;
                i++;
            }
        } else {
            current = this.#tail;
            let i = this.#size - 1;
            while (i > index) {
                current = current.prev;
                i--;
            }
        }

        // Remove current node by skipping it
        current.prev.next = current.next;
        current.next.prev = current.prev;

        this.#size--;
    }

    remove(value, equals) {
        const cmp = equals || ((a, b) => a === b);
        let current = this.#head;
        let count = 0;

        while (current) {
            if (cmp(current.value, value)) {
                const prevNode = current.prev;
                const nextNode = current.next;

                if (prevNode) prevNode.next = nextNode;
                else this.#head = nextNode;

                if (nextNode) nextNode.prev = prevNode;
                else this.#tail = prevNode;

                this.#size--;
                count++;
            }
            current = current.next;
        }

        return count;
    }

    /* ================= Reverse ================= */

    reverse() {
        let current = this.#head;
        let temp = null;

        // Swap next and prev for every node
        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev; // move to next node (original next)
        }

        // Swap head and tail
        if (temp) {
            this.#tail = this.#head;
            this.#head = temp.prev;
        }
    }

    /* ================= Utilities ================= */

    toArray() {
        const result = [];
        let current = this.#head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    static fromArray(arr) {
        return new DoublyLinkedList(arr);
    }

    /* ================= Iteration ================= */

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
}


/* ================== Example Usage ================== */

const dll = new DoublyLinkedList([1, 2, 3]);
dll.push_front(0);       // 0,1,2,3
dll.push_back(4);        // 0,1,2,3,4
dll.insert(2, 99);       // 0,1,99,2,3,4
console.log(dll.toArray()); // [0,1,99,2,3,4]

dll.erase(2);            // Remove 99
console.log(dll.toArray()); // [0,1,2,3,4]

dll.reverse();
console.log(dll.toArray()); // [4,3,2,1,0]

for (const val of dll) {
    console.log(val);       // 4 3 2 1 0
}
