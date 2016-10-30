const addOne = (n) => n + 1;
const doubling = (n) => n * 2;
const pow2 = (n) => {
    return n * n;
};
const hello = () => 'Hello bluebird';

// console.log(addOne(1), doubling(2));

const compose = (fna, fnb) => (x) => fnb(fna(x));

let addOneAndDouble = compose(addOne, doubling);

// console.log(addOneAndDouble(1));

const not = (fn) => (x) => !fn(x);

// console.log(not(doubling)(0));

// once

let once = (fn) => {
    let done = false;

    return () => {
        'use strict';

        return done ? void 0 : ((done = true), fn.apply(arguments))
    }
};

let helloOnce = once(hello);

console.log(helloOnce());
console.log(helloOnce());

const maybe = (fn) => (...args) => {
    if (args.length) {
        for (let arg of args) {
            if (!arg) {
                return arg;
            }
        }
        return fn.apply(this, args);
    }
};

// partial application

const mapWith = (fn) => {
    return (array) => {
        let newArray = [];

        for (let i=0; i < array.length; i++) {
            newArray.push(fn(array[i]));
        }
        return newArray;
    }
};

const halveAll = mapWith(maybe((x) => (x / 2)));

let halved = halveAll([1,void 0,3,null,4,5]); // => [ 0.5, undefined, 1.5, null, 2, 2.5 ]

const row = function () {
    return mapWith(
        (column) => column * arguments[0],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    )
}

console.log('******row****************');
console.log(row(2)([1,2,3,4,5]));

// Unary

const unary = (fn) => (fn.length > 1) ? (p) => fn.call(this, p) : fn;

['1','2','3'].map(parseInt); //=> [1, NaN, NaN]
let mapped = ['1','2','3'].map(unary(parseInt));
console.log('******mapped****************');
console.log(mapped);
