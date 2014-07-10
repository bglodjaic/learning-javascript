var fs = require("fs"),
    configFilePath = "../data/sample.json",
    filePath = "G:/tmp/sample.txt";

// Reading file sync, example: config file
console.log("Starting fs sync");
var content = fs.readFileSync(configFilePath);
var config = JSON.parse(content);
console.log(config);
console.log("Username: " + config.username);
console.log("Ending fs sync\n");


// Reading file async
console.log("Starting fs async");
fs.readFile(filePath, function(error, data){
    console.log("File content: " + data);
});
console.log("Ending fs async");
