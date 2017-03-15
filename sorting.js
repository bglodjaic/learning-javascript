// bubble
let arr = [7,3,4,1,8,5];

let idx = 0;
let ii = 0;

while(idx < arr.length - 2) {
    let i = arr.length - 1;
    let j = arr.length - 2;
    while (j >= 0) {
        if (arr[i] < arr[j]) {
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp; 
        }
        i--;
        j--;
        
        if (j === idx) {
            idx++;
        }
    }
}
// mergesort
let arrb = [7,3,4,1,8,5,9,2];
let arrc = [3,5,4,1];

let mergeSort = function mergeSort (arr) {
    let arrLen = arr.length;
    if (arrLen > 1) {
        let lArr = mergeSort(arr.slice(0, arrLen/2)); 
        let rArr = mergeSort(arr.slice(arrLen/2));

        // sorting & mergeing
        if (lArr[0] > rArr[0]) {
            return rArr.concat(lArr);
        } else {
            return lArr.concat(rArr);
        }
    }
    return arr;
}
// console.log(arrc);
var a = mergeSort(arrc);
console.log(a);