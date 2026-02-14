
function addDigits(num) {

    let res = 0;

    while (num > 0) {
        let remainder = num % 10;
        res += remainder;

        num -= remainder;
        num /= 10;
    }

    if (res > 9) {
        return addDigits(res);

    }

    return res;

};


console.log(addDigits(0));
