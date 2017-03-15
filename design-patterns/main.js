let singleton = require('./singleton.js');

console.log(singleton);
let singlea = singleton.getInstance();
let singleb = singleton.getInstance();

console.dir(singlea.getId());
singlea.setId(3);
console.dir(singleb.getId());
console.dir(singleb.addOne());
console.log(singlea === singleb);


