let arra = [1,2,[3,[4]],5,[6],7];

let flatArr = (function () {
  let finalArr = [];
  return function (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
        flatArr(arr[i]);
      } else {
        finalArr.push(arr[i]);
      }
    }
    return finalArr;
  }
})();

let arr = flatArr(arra);

console.log(arr);