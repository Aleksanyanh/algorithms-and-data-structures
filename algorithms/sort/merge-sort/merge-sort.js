// Merge function: merges two sorted arrays into one sorted array
function merge(left, right) {
    let result = [];
    let i = 0; // pointer for left array
    let j = 0; // pointer for right array

    // Compare elements of left and right arrays
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {   // maintain stability
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add any remaining elements from left
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // Add any remaining elements from right
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

// Merge Sort function: recursively splits and merges
function mergeSort(array) {
    // Base case: array of 1 or 0 elements is already sorted
    if (array.length <= 1) {
        return array;
    }

    // Find the middle index
    const mid = Math.floor(array.length / 2);

    // Divide array into left and right halves
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    // Recursively sort both halves
    const sortedLeft = mergeSort(left)
    const sortedRight = mergeSort(right)

    // Merge left and right sorted arrays
    return merge(sortedLeft, sortedRight);
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Original Array:", arr);
console.log("Sorted Array:", mergeSort(arr));
