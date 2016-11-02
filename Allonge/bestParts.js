const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const identify = function (a) {
    return function () {
        return a;
    }
};

var adf = function (x) {
    return function (y) {
        return x + y;
    }
};

var applyf = function (fn) {
    return function (x) {
        return function (y) {
            return fn(x, y);
        }
    }
};

var curry = function (fn, x) {
    return applyf(fn)(x);
};

var inc = adf(1);
var inc2 = applyf(add)(1);
var inc3 = curry(add, 1);

var methodize = function (fn) {
    return function (x) {
        return fn(this, x);
    }
};

var demethodize = function (fn) {
    return function (x, y) {
        return fn.call(x, y);
    }
};

Number.prototype.add = methodize(add);
Number.prototype.mul = methodize(mul);

var twice = function (fn) {
    return function (x) {
        return fn(x, x);
    }
};

var double = twice(add);
var square = twice(mul);

var composeu = function (fna, fnb) {
    return function (x) {
        return fnb(fna(x));
    };
};

var composeb = function (fna, fnb) {
    return function (a, b, c) {
        return fnb(fna(a, b), c);
    }
};

var once = function (fn) {
    let done = false;

    return function () {
        // if (done) {
        //     void 0;
        // } else {
        //     done = true;
        //     return fn(x, y);
        // }
        return done ? void 0 : (done = true, fn.apply(this, arguments));
    }
};

addOnce = once(add);

var counterf = function (x) {
    return {
        inc: () => ++x,
        dec: () => --x
    }
};

var counter = counterf(10);

var revocable = function (fn) {
    return {
        invoke: function () {
            return fn ? fn.apply(this, arguments) : void 0;
        },
        revoke: () => {
            fn = null;
        }
    }
};

var tmp = revocable(add);


