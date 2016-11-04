var Game = require('./libs/game');

// Game({
//     boardSize: 8
// }).solve().show();

let game = Game({
    boardSize: 8
});

game.solve() ? game.show(true) : void 0;







