/**
 * @param {string[]} sentences
 * @return {number}
 */

var mostWordsFound = function (sentences) {

    const n = sentences.length;

    if (n > 100) {
        return 0;
    }

    let maxWordCount = 1;


    for (let i = 0; i < n; i++) {
        if (sentences[i].length > 100) {
            return 0;
        }

        let currentWordCount = 1;

        for (let j = 0; j < sentences[i].length; j++) {
            if (sentences[i][j] === ' ') {
                currentWordCount++;
            }
        }

        if (currentWordCount > maxWordCount) {
            maxWordCount = currentWordCount;
        }
    }


    return maxWordCount;
};


console.log(mostWordsFound(["w jrpihe zsyqn l dxchifbxlasaehj",
    "nmmfrwyl jscqyxk a xfibiooix xolyqfdspkliyejsnksfewbjom",
    "xnleojowaxwpyogyrayfgyuzhgtdzrsyococuqexggigtberizdzlyrdsfvryiynhg",
    "krpwiazoulcixkkeyogizvicdkbrsiiuhizhkxdpssynfzuigvcbovm",
    "rgmz rgztiup wqnvbucfqcyjivvoeedyxvjsmtqwpqpxmzdupfyfeewxegrlbjtsjkusyektigr",
    "o lgsbechr lqcgfiat pkqdutzrq iveyv iqzgvyddyoqqmqerbmkxlbtmdtkinlk",
    "hrvh efqvjilibdqxjlpmanmogiossjyxepotezo",
    "qstd zui nbbohtuk", "qsdrerdzjvhxjqchvuewevyzlkyydpeeblpc"]));
