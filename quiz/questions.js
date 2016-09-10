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
