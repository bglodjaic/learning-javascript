/* Example of http module */
var http = require("http");
console.log("Starting http");
var host = "127.0.0.1",
    port = 8888;
var server = http.createServer(function( request, response ){
    /* this callback will get fired every time the page is request */
    console.log("Recieved request: " + request.url);
    response.writeHead(200, {"Content-type":"text/plain"});
    response.write("Hello from nodeJS server!");
    response.end();
});
server.listen(port, host, function(){
    console.log("Listening on " + host + ":" + port);
});