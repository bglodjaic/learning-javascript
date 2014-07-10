/* Example of writing to file */
// Write sync way
var fs = require("fs");
console.log("Starting fs-write sync");
fs.writeFileSync("../data/write_sync.txt", "This text has been written from a node sync way!");
console.log("End fs-write sync\n");

// Write async way
console.log("Starting fs-write async");
fs.writeFile("../data/write_async.txt", "This text has been written from a node async way!", function(error){
    if(error){
       console.log(error); 
    }
    else{
        console.log("Written file");
    }
});
console.log("End fs-write async\n");
