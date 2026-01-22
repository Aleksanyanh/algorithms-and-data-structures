function insertionSort(arr) {
    const n = arr.length;

    // Outer loop:
    // Start from index 1 because the element at index 0
    // is already considered sorted
    for (let i = 1; i < n; i++) {

        // key is the ELEMENT to be inserted
        // into the already sorted left portion
        const key = arr[i];

        // j is an INDEX used to move through the sorted part
        let j = i - 1;

        // Shift elements of the sorted part that are
        // greater than key to one position to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; // shift, not swap
            j--;
        }

        // Insert key at its correct position
        arr[j + 1] = key;
    }

    return arr;
}


console.log(insertionSort([1, 4, 3, 2, 5]));

