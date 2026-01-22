function bubbleSort(arr) {
    const n = arr.length;

    // Outer loop controls how many passes we make
    for (let i = 0; i < n - 1; i++) {

        // If no swaps happen in a full pass, the array is already sorted
        let isSwapped = false;

        // Inner loop:
        // - After each pass, the largest element is already at the end
        // - So we can reduce comparisons by `i`
        for (let j = 0; j < n - 1 - i; j++) { // opt-1:

            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {

                // Swap using destructuring (in-place)
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // Mark that a swap happened
                isSwapped = true;
            }
        }

        // If no swaps happened, array is already sorted → stop early
        if (!isSwapped) {  // opt-2
            break;
        }
    }

    return arr;
}


console.log(bubbleSort([5, 4, 3, 2, 1]));
