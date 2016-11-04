var Game = require('./libs/game');

let game = Game({
    boardSize: 8
});

game.solve() ? game.show() : void 0;



