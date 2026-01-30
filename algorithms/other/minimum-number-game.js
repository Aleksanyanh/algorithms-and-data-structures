var numberGame = function (nums) {

    const result = [];
    const len = nums.length;

    // filing from nums to result after all their length must become equal 
    while (result.length !== len) {

        let min = nums[0];
        let minIndex = 0;

        // in this loop we find the smallest integer that Alice always remove first
        for (let i = 1; i < len; i++) {
            if (nums[i] < min) {
                min = nums[i];
                minIndex = i;
            }
        }

        // here we fill the result the integers first Alice then Bob has removed from nums 
        result.push(min);
        nums.splice(minIndex, 1);
    }

    // here we fix the order of filled integers by swapping the result's all pairs 
    // because Bob must fill first and then Alice
    for (let i = 0; i <= result.length; i++) {
        if (i % 2 === 0 && i > 0) {
            [result[i - 2], result[i - 1]] = [result[i - 1], result[i - 2]]
        }
    }

    return result;
};

console.log(numberGame([5, 4, 2, 3]));
