/* Example of watching file */
var fs = require("fs");
console.log("Watching started");
var config = JSON.parse(fs.readFileSync("../data/sample.json"));
console.log("Initial config: ", config);

fs.watchFile("../data/sample.json", function(current, previous){
    console.log("Config changed!");
    config = JSON.parse(fs.readFileSync("../data/sample.json"));
    console.log("New config: ", config);
});
console.log("Watching end");