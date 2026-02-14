/**
 * @param {number} num
 * @return {number}
 */
var countDigits = function (num) {
    let count = 0;
    let copyNum = num;


    while (copyNum > 0) {
        const remainder = copyNum % 10;

        if (num % remainder === 0) {
            count++;
        }

        copyNum = Math.floor(copyNum / 10);
    }

    return count;
};



console.log(countDigits(121));
