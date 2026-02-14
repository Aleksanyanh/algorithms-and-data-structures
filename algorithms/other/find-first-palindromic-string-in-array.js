/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {

    for (let i = 0; i < words.length; i++) {

        const word = words[i];
        let left = 0;
        let right = word.length - 1;

        while (left < right && word[left] === word[right]) {
            left++;
            right--;
        }

        if (left >= right) {
            return word;
        }
    }

    return '';

};

console.log(firstPalindrome(["abc", "car", "ada", "racecar", "cool"]));
