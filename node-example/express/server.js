/* Example of node server using Express */
var fs = require("fs"),
    utils = require("./my_modules/utils.js"),
    https = require("https"),
    express = require("express"),
    todo = JSON.parse(fs.readFileSync("data/todo.json")),
    questions = JSON.parse(fs.readFileSync("data/questions.json")),
    config = JSON.parse(fs.readFileSync("configs/app.json"));

console.log("Starting Express app...");

// encrypt correct answers before sending
questions.questions.forEach(function (q) {
    if (q.correct) {
        q.correct = utils.encrypt(q.correct);
    }
});

var posts = {
    "fck-mng" : {
        "title" : "Uuu yeah!",
        "descr" : "Twice per day!"
    },
    "fck-tmr" : {
        "title" : "Ouu yeah!",
        "descr" : "All night long!"
    },
    "fck-tmr-mng" : {
        "title" : "Score! oouuu yeah!",
        "descr" : "All night long!!!"
    },
};

var gets = {
    "todo" : todo,
    "qgc" : questions
}

var app = express();

app.use(express.static(__dirname + "/" + config.paths.static));

app.get("/", function(req, res){
    res.send("Welcome to Express nodeJS!");
});
app.get("/post/:post_alias", function(req, res){
    var post = posts[req.params.post_alias];
    if(post){
        res.send("<article><h1>" + post.title + "</h1><p>" + post.descr + "</p></article>" );
} else {
        res.send(404, "<p>Not yet :(</p>");
    }
});

app.get("/get/:get_alias", function( req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var get = gets[req.params.get_alias];
    if(get){
        res.json(get);
    }
    else{
        res.send(404, "BAD REQUEST!");
    }
});

app.listen(config.server.port, config.server.host, function(){
    console.log("Listening " + config.server.host + ":" + config.server.port);
});