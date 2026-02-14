/**
 * Quick Sort Implementation (In-Place)
 *
 * Time Complexity:
 *  - Best Case:    O(n log n)
 *  - Average Case: O(n log n)
 *  - Worst Case:   O(n^2)  (when pivot is always smallest or largest)
 *
 * Space Complexity:
 *  - O(log n) due to recursion stack (average)
 *
 * Quick Sort is a Divide and Conquer algorithm:
 * 1. Choose a pivot element
 * 2. Partition array around pivot
 * 3. Recursively sort left and right parts
 */

function quickSort(arr, left = 0, right = arr.length - 1) {

    // Base case:
    // If left index crosses right index,
    // it means we have 0 or 1 element -> already sorted
    if (left >= right) {
        return;
    }

    // Step 1: Partition the array
    // partition() will:
    //  - place pivot in correct position
    //  - move smaller elements to left
    //  - move larger elements to right
    const pivotIndex = partition(arr, left, right);

    // Step 2: Recursively sort left side of pivot
    quickSort(arr, left, pivotIndex - 1);

    // Step 3: Recursively sort right side of pivot
    quickSort(arr, pivotIndex + 1, right);
}


/**
 * Partition function
 *
 * This function:
 * 1. Selects last element as pivot
 * 2. Rearranges array so that:
 *      - elements smaller than pivot are on left
 *      - elements larger than pivot are on right
 * 3. Returns the final index of pivot
 */
function partition(arr, left, right) {

    // Choosing the last element as pivot
    const pivot = arr[right];

    // i will track the "smaller elements" boundary
    // Everything <= i will be smaller than pivot
    let i = left - 1;

    // Iterate from left to right-1
    for (let j = left; j < right; j++) {

        // If current element is smaller than pivot
        if (arr[j] < pivot) {

            // Move boundary forward
            i++;

            // Swap arr[i] and arr[j]
            // This puts smaller element into correct region
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Finally place pivot in correct position
    // Everything left of (i+1) is smaller
    // Everything right is larger
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

    // Return pivot index
    return i + 1;
}


// Example usage
const arr = [8, 3, 1, 7, 0, 10, 2];
quickSort(arr);
console.log(arr);
