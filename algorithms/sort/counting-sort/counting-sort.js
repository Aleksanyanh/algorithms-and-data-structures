function countingSort(arr) {
    // No sort needed
    if (arr.length <= 1) {
        return arr; 
    }

    let min = arr[0];
    let max = arr[0];

    // Step 1: Find min and max with first element
    for (let i = 1; i < arr.length; i++) {
        const val = arr[i]; // <-- fix: define val

        // Validate: Counting Sort works only with integers
        if (!Number.isInteger(val)) {
            throw new Error("Counting Sort supports integers only");
        }

        if (val < min) min = val;
        if (val > max) max = val;
    }

    // Step 2: Calculate range of values
    // This is the size of counting array
    const range = max - min + 1;

    // Optimisation / safety guard:
    // If range is too large compared to input size,
    // counting sort becomes memory-inefficient 
    if (range > 10 * arr.length) {
        throw new Error(
            "Counting Sort is inefficient: range is too large compared to array length"
        );
    }

    // Step 3: Create counting array and initialize with 0
    // Index 0 represents value = min
    const count = new Array(range).fill(0);

    // Step 4: Count frequency of each value
    for (let i = 0; i < arr.length; i++) {
        // Shift value by min to fit into count array
        count[arr[i] - min]++;
    }

    // Step 5: Rebuild the original array in sorted order
    let sortedIndex = 0; // index in the original array where we place sorted values

    for (let i = 0; i < count.length; i++) {
        // While current value still exists
        while (count[i] > 0) {
            // convert index back to original value
            arr[sortedIndex] = i + min;

            // move to the next position in result
            sortedIndex++;

            // decrease count
            count[i]--;
        }
    }

    // Step 6: Return sorted array
    return arr;
}
