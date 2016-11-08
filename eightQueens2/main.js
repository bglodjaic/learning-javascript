var Game = require('./game.js');

var game = Game({
    searchAll: true,
    startPosition: {
        row: 5,
        column: 5
    }
});

game.solve() ? game.drawBoard() : void 0;

