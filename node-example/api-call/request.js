var https = require('https');

var getRepos = function(username, callback){
    var options = {
        hostname: 'api.github.com',
        path: '/users/' + username + '/repos',
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };

    var request = https.request(options, function(response){
            var content = '';
            response.setEncoding('utf8');
            // console.log("statusCode: ", response.statusCode);
            // console.log("headers: ", response.headers);

            response.on('data', function(chunk){
                content += chunk.toString('utf8');
            });
            response.on('end', function(){
                var repos = [],
                    json = JSON.parse(content);

                json.forEach(function(repo){
                    repos.push({
                        name: repo.name,
                        desc: repo.description
                    });
                });
                // console.log("Github user: " + username + "\n");
                // repos.forEach(function(repo){
                //     console.log("Repo name: " + repo.name);
                //     console.log("Repo desc: " + repo.desc + "\n");
                // });
                // console.log('Total number of repos: ', repos.length);
                
                callback(username, repos);
            });
    });

    request.end();

    request.on('error', function(e) {
      console.error(e);
    });
}
getRepos('bglodjaic', function(username, repos){
    console.log('Repos of ' + username + '(' + repos.length + '):\n', repos);
});
getRepos('radovan-svedic', function(username, repos){
    console.log('Repos of ' + username + '(' + repos.length + '):\n', repos);
});