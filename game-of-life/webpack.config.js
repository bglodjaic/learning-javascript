const path = require('path');

module.exports = {
    entry: "./main.js",
    output: {
        path: path.join(__dirname, './client/js'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // { 
            //     test: /\.css$/, 
            //     loader: 'postcss-loader'
            // }
            {
                test: /\.css/,
                loaders: ['style', 'css'],
                include: __dirname + '/client'
            }
        ]
    },
    postcss: function (webpack) {
        console.log('*************** webpack webpack *******************************');
        
    }
};