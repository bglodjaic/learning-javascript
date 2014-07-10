var url = require('url'),
    http = require('http'),
    server = http.createServer( function( request, response ){
        console.log("Requested: " + request.url);
        var urlParts = url.parse( request.url, true );
        console.log( urlParts.query.message );

        response.writeHead(200);
        response.end();
    });

server.listen(8080, "127.0.0.1", function(){
    console.log("Listening 127.0.0.1:8080");
});