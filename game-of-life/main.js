var game = require('./game.js');

game({
    worldWidth: 200,
    worldHeight: 200,
    speed: 2 
}).start();

console.log('Game of Life');