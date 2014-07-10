/* Example of http server with simple routing */
var fs = require("fs"),
    http = require("http");

var host = "127.0.0.1",
    port = "92",
    routingConf = "../data/simple-routing.json";

var config = JSON.parse(fs.readFileSync(routingConf));

var server = http.createServer(function( request, response ){
    console.log("Recieved request: " + request.url);

    var err = true,
        status = 404,
        contentType = "text/html",
        content = fs.readFileSync("../public/http-simple-404.html");

    fs.readFile("../public/" + config[request.url], function(error, data){
        if(!error){
            content = data;
            status = 200;
        }
        response.writeHead(status, {"Content-type":contentType});
        response.write(content);
        response.end();
    });
});

server.listen( port, host, function(){
    console.log("Listening " + host + ":" + port);
});