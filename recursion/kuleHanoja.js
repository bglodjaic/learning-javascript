// n-1: 1 -> 3 (2)
// 1: 1 -> 2 (3*)
// n-1: 3 -> 1 (2)

let stickA = [4,3,2,1];
stickA.name = 'fromStick';
let stickB = [];
stickB.name = 'toStick';
let stickC = [];
stickC.name = 'auxStick';
let all = stickA.length;

let move = function move (from, to, aux, howMany) {
    if (howMany > 0) {
        move(from, aux, to, howMany-1);
        console.log('move ' + from[from.length-1] + ' from ' + from.name + ' to ' + to.name);
        to.push(from.pop());
        move(aux, to, from, howMany-1);
    }
};

move(stickA, stickB, stickC, all);

console.log('********************** END ************************');
console.log(stickB.toString());

