var firstUniqChar = function (s) {

    const uniqueChars = [];
    const charStorage = {};

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const charStorageIndex = charStorage[char];

        if (charStorageIndex || charStorageIndex === 0) {
            // set to null in the unique array list if character is repeated
            uniqueChars[charStorageIndex] = null;
        } else {
            // if character appears first time add it both in list and storage
            uniqueChars[i] = char;
            charStorage[char] = i;
        }

    }

    for (let i = 0; i < uniqueChars.length; i++) {
        // if next element in the unique character list is not null or empty
        // that means it is the first unique character in a string
        if (uniqueChars[i]) {
            console.log(uniqueChars, charStorage, i);
            
            return i;
        }
    }

    return -1;

};


console.log(firstUniqChar('loveleetcodev'));
