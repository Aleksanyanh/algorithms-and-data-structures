var checkIfPangram = function (sentence) {
    const alphabet = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
    const uniqueSentence = new Set();


    for (let i = 0; i < sentence.length; i++) {
        if(sentence[i].trim()) {
            uniqueSentence.add(sentence[i]);
        }
    }

    return alphabet.size === uniqueSentence.size;

};

console.log(checkIfPangram('thequickbrownfoxjumpsoverthelazydog'));
