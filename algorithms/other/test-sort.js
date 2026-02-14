const arr = [29, 110, 102, 107, 102, 107, 105, 109, 100];

let countingCount = 0;
let mergeCount = 0;


function countingSort(arr) {

    if (arr.length <= 1) {
        return arr;
    }

    let min = arr[0];
    let max = arr[0];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] < min) {
            min = arr[i]

        }

        if (arr[i] > max) {
            max = arr[i];
        }

        countingCount++;

    }
    const range = max - min + 1;

    if (range > 10 * arr.length) {
        throw new Error("Range too large for counting sort");
    }

    const rangeArr = new Array(range).fill(0);

    for (let i = 0; i < arr.length; i++) {
        countingCount++;
        rangeArr[arr[i] - min]++;
    }

    let sortedIndex = 0

    for (let i = 0; i < rangeArr.length; i++) {
        countingCount++;

        while (rangeArr[i] > 0) {
            countingCount++;
            arr[sortedIndex] = i + min;
            rangeArr[i]--;
            sortedIndex++;
        }
    }


    return arr;
}

console.log(countingSort(arr));


Array.prototype.mySlice = function (start, end = this.length) {
    const res = [];

    for (let i = start; i < end; i++) {
        mergeCount++;

        res.push(this[i]);
    }

    return res;
}


function merge(left, right) {

    const res = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        mergeCount++;


        if (left[i] <= right[j]) {
            res.push(left[i]);
            i++;
        } else {
            res.push(right[j])
            j++;
        }
    }

    while (i < left.length) {
        mergeCount++;

        res.push(left[i]);
        i++;
    }

    while (j < right.length) {
        mergeCount++;

        res.push(right[j]);
        j++;
    }


    return res;

}




function mergeSort(arr) {

    if (arr.length <= 1) {
        return arr;
    }

    const n = arr.length;
    const mid = Math.floor(n / 2);
    mergeCount++;

    const left = arr.mySlice(0, mid);
    const right = arr.mySlice(mid);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight);
}

console.log(mergeSort(arr));

console.log("counting count", countingCount);
console.log("merge count", mergeCount);



