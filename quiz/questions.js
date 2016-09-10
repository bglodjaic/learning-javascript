// Q1

function Example() {
  this.base = 10;
  function isEven() {
    return this.base % 2 === 0;
  }
  this.calculate = function() {
    if (isEven()) {
      console.log("even");
    }
    else {
      console.log("odd");
    }
  }
}
e = new Example();
e.calculate(); // ???

// Q2

var arr = [];

for(var i = 1; i <= 3; i++) {
  arr.push(function (i) {
    return i;
  });
}

arr.forEach(function (fn) {
  console.log(fn()); // output ???
});
