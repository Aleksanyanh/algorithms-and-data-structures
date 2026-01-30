
function addDigits(num) {

    let res = 0;

    while (num > 0) {
        let reminder = num % 10;
        res += reminder;

        num -= reminder;
        num /= 10;
    }

    if (res > 9) {
        return addDigits(res);

    }

    return res;

};


console.log(addDigits(0));
