var Game = require('./libs/game');

let game = Game({
    boardSize: 8
});

game.solve() ? game.show(1) : void 0;
