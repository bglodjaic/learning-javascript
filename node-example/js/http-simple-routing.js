/* Example of http server with simple routing */
var fs = require("fs"),
    http = require("http");

var serverConf = "../data/simple-http-config.json",
    routingConf = "../data/simple-routing.json";

var routing = JSON.parse(fs.readFileSync(routingConf)),
    config = JSON.parse(fs.readFileSync(serverConf));

var server = http.createServer(function( request, response ){
    console.log("Recieved request: " + request.url);

    var err = true,
        status = 404,
        contentType = "text/html",
        content = fs.readFileSync("../public/http-simple-404.html");

    fs.readFile("../public/" + routing[request.url], function(error, data){
        if(!error){
            content = data;
            status = 200;
        }
        response.writeHead(status, {"Content-type":contentType});
        response.write(content);
        response.end();
    });
});

server.listen( config.port, config.host, function(){
    console.log("Listening " + config.host + ":" + config.port);
});