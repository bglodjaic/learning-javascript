let f = ((n) => {
    const even = (x) => {
        if (x === 0) {
            return true;
        }
        else {
            return !even(x - 1);
        }
    };

    return even(n);
});

// console.log(f(13));

let ff = ((diameter_fn) =>
    ((PI) => {
        return diameter_fn(2)
    })(3))(
    ((PI) =>
        (diameter) => {
            return diameter * PI;
        })(3.14159265)
);

// console.log(ff);

let wtf = ((diameter_fn) => {
    const PI = 3;

    return diameter_fn(2)
})(
    (() => {
        const PI = 3.14159265;

        return (diameter) => diameter * PI
    })()
)

// console.log('wtf:', wtf);

let csf = ((diameter) => {
    const PI = 3.14159265;

    if (true) {
        const PI = 3;
    }
    return diameter * PI;
})(2);

// console.log(csf);

const isEven = (n) => {
    'use strict';
    if (n === 0) {
        return true;
    } else if (n === 1) {
        return false;
    } else {
        return isEven(n - 2);
    }
};

// console.log(isEven(253));

const myFn = function myFnActualName (x) {
    return x * 2;
};

// console.log(myFn.name);
// console.log(myFnActualName); // => ERROR

const repeat = (n, fn) => {
    (n > 0) ? (repeat(n - 1, fn), fn(n)) : void 0;
}

repeat(3, (n) => console.log(`Step ${n}`));

