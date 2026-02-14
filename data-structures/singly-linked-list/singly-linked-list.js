/* ============================================================
   NODE CLASS
   Represents a single element in the linked list
   ============================================================ */

class Node {
    #value;      // Private field to store node value
    #next = null; // Private field to store reference to next node (null if none)

    constructor(val = 0) {
        // Initialize node value
        this.#value = val;

        // next is already initialized to null (no need to set)
    }

    // Getter for value
    get value() {
        // Return the stored value
        return this.#value;
    }

    // Setter for value
    set value(val) {
        // Update stored value
        this.#value = val;
    }

    // Getter for next pointer
    get next() {
        // Return reference to next node or null
        return this.#next;
    }

    // Setter for next pointer
    set next(new_node) {
        // Ensure only a Node instance or null is assigned
        if (new_node !== null && !(new_node instanceof Node)) {
            throw new TypeError("next must be a Node or null");
        }
        this.#next = new_node;
    }
}


/* ============================================================
   SINGLY LINKED LIST
   ============================================================ */

class SinglyLinkedList {
    #head = null; // Reference to the first node
    #size = 0;    // Tracks number of nodes in list

    constructor(iterable) {
        if (iterable === undefined) return;

        // Check if input is iterable (array, set, etc.)
        if (typeof iterable[Symbol.iterator] === "function") {
            // Add each element in order
            for (const item of iterable) {
                this.push_back(item);
            }
        } else {
            // Single value → push once
            this.push_back(iterable);
        }
    }

    /* ================= Size & State ================= */

    size() {
        // Return the number of nodes
        return this.#size;
    }

    isEmpty() {
        // Return true if list has no nodes
        return this.#size === 0;
    }

    clear() {
        // Remove all nodes
        this.#head = null;
        this.#size = 0;
        // Note: in JS, garbage collection cleans up unreferenced nodes
    }

    /* ================= Front Access ================= */

    front() {
        // Return value of head node or undefined if empty
        if (this.isEmpty()) return undefined;
        return this.#head.value;
    }

    /* ================= Push & Pop ================= */

    push_front(val) {
        // Create a new node
        const newNode = new Node(val);

        // Link it to current head
        newNode.next = this.#head;

        // Update head to new node
        this.#head = newNode;

        // Increment size
        this.#size++;
    }

    push_back(val) {
        const newNode = new Node(val);

        if (this.isEmpty()) {
            // Empty list → new node becomes head
            this.#head = newNode;
        } else {
            // Traverse to last node
            let current = this.#head;
            while (current.next !== null) {
                current = current.next;
            }
            // Append new node at the end
            current.next = newNode;
        }

        this.#size++;
    }

    pop_front() {
        if (this.isEmpty()) return undefined;

        // Save value to return
        const removedValue = this.#head.value;

        // Move head to next node
        this.#head = this.#head.next;

        // Decrease size
        this.#size--;

        return removedValue;
    }

    pop_back() {
        if (this.isEmpty()) return undefined;

        if (this.#size === 1) {
            // Only one node → clear head
            const value = this.#head.value;
            this.#head = null;
            this.#size--;
            return value;
        }

        // Traverse to node before last
        let current = this.#head;
        while (current.next.next !== null) {
            current = current.next;
        }

        // Save value of last node
        const value = current.next.value;

        // Remove last node
        current.next = null;

        this.#size--;
        return value;
    }

    /* ================= Random-like Access ================= */

    at(index) {
        // Return undefined if index is out of bounds
        if (index < 0 || index >= this.#size) return undefined;

        let current = this.#head;
        let i = 0;

        // Traverse to the index
        while (i < index) {
            current = current.next;
            i++;
        }

        return current.value;
    }

    insert(index, val) {
        if (index < 0 || index > this.#size) return;

        // Insert at front
        if (index === 0) {
            this.push_front(val);
            return;
        }

        // Insert at back
        if (index === this.#size) {
            this.push_back(val);
            return;
        }

        // Traverse to node before insertion point
        let current = this.#head;
        let i = 0;
        while (i < index - 1) {
            current = current.next;
            i++;
        }

        // Create new node
        const newNode = new Node(val);

        // Insert new node
        newNode.next = current.next;
        current.next = newNode;

        this.#size++;
    }

    erase(index) {
        if (index < 0 || index >= this.#size) return;

        // Remove front
        if (index === 0) {
            this.pop_front();
            return;
        }

        // Remove back
        if (index === this.#size - 1) {
            this.pop_back();
            return;
        }

        // Traverse to node before the one to remove
        let current = this.#head;
        let i = 0;
        while (i < index - 1) {
            current = current.next;
            i++;
        }

        // Skip over the node to remove
        current.next = current.next.next;

        this.#size--;
    }

    remove(value, equals) {
        // Remove all nodes matching value
        let count = 0;

        // Custom equality function or default strict equality
        const cmp = equals || ((a, b) => a === b);

        // Remove matching nodes at head
        while (this.#head && cmp(this.#head.value, value)) {
            this.#head = this.#head.next;
            this.#size--;
            count++;
        }

        // Traverse remaining nodes
        let current = this.#head;
        while (current && current.next) {
            if (cmp(current.next.value, value)) {
                current.next = current.next.next;
                this.#size--;
                count++;
            } else {
                current = current.next;
            }
        }

        return count;
    }

    /* ================= Algorithms ================= */

    reverse() {
        // Reverse the list in-place
        let prev = null;
        let current = this.#head;

        while (current) {
            const nextTemp = current.next; // Save next node
            current.next = prev;           // Reverse pointer
            prev = current;                // Move prev forward
            current = nextTemp;            // Move current forward
        }

        // Update head to new first node
        this.#head = prev;
    }

    /* ================= Merge Sort ================= */

    sort(cmp = (a, b) => a - b) {
        if (this.#size < 2) return;

        // Recursive merge sort
        const mergeSort = (head) => {
            if (!head || !head.next) return head;

            const middle = getMiddle(head);
            const nextToMiddle = middle.next;
            middle.next = null;

            const left = mergeSort(head);
            const right = mergeSort(nextToMiddle);

            return sortedMerge(left, right);
        };

        const sortedMerge = (a, b) => {
            if (!a) return b;
            if (!b) return a;

            if (cmp(a.value, b.value) <= 0) {
                a.next = sortedMerge(a.next, b);
                return a;
            } else {
                b.next = sortedMerge(a, b.next);
                return b;
            }
        };

        const getMiddle = (head) => {
            let slow = head;
            let fast = head;

            while (fast.next && fast.next.next) {
                slow = slow.next;
                fast = fast.next.next;
            }

            return slow;
        };

        this.#head = mergeSort(this.#head);
    }

    merge(list, cmp = (a, b) => a - b) {
        if (!(list instanceof SinglyLinkedList)) {
            throw new TypeError("Argument must be SinglyLinkedList");
        }

        const dummy = new Node();
        let tail = dummy;

        let a = this.#head;
        let b = list.#head;

        while (a && b) {
            if (cmp(a.value, b.value) <= 0) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }

        tail.next = a || b;

        this.#head = dummy.next;
        this.#size += list.#size;

        list.clear();
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
        return new SinglyLinkedList(arr);
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        // Manual iterator (no generator)
        let current = this.#head;

        return {
            next() {
                if (current === null) {
                    // Iteration finished
                    return { value: undefined, done: true };
                }

                const value = current.value;
                current = current.next;
                return { value, done: false };
            }
        };
    }
}
