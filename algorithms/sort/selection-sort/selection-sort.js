function selectionSort(arr) {
    const n = arr.length;

    // Outer loop:
    // Moves the boundary of the sorted part one step to the right
    for (let i = 0; i < n - 1; i++) {

        // minIndex stores the INDEX of the smallest element
        // Assume the first element of the unsorted part is the smallest
        let minIndex = i;

        // Inner loop:
        // Find the index of the smallest element in the unsorted part
        for (let j = i + 1; j < n; j++) {

            // Update minIndex if a smaller element is found
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap only if the smallest element is not already in place
        if (minIndex !== i) { // opt-1
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

console.log(selectionSort([1, 4, 3, 2, 5]));

