/**
 * @param {number[]} hours
 * @param {number} target
 * @return {number}
 */
var numberOfEmployeesWhoMetTarget = function (hours, target) {

    let count = 0;
    for (let i = 0; i < hours.length; i++) {
        if (hours[i] >= target) {
            count++;
        }

    }

    return count;

};

console.log(numberOfEmployeesWhoMetTarget([5,1,4,2,2], 6));
