/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function (nums) {

    let numSum = 0;
    let digitSum = 0;

    for (let i = 0; i < nums.length; i++) {

        numSum += nums[i];

        let digit = nums[i];

        while (digit > 0) {
            let remainder = digit % 10;

            digitSum += remainder;
            digit = Math.floor(digit / 10);
        }
    }

    return numSum - digitSum;

};

console.log(differenceOfSum([1, 35, 6, 3]));
