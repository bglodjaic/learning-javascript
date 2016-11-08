const Maze = require('../libs/mazeb.js');

let maze = Maze({
    rows: 4,
    columns: 4,
    start: 'top',
    finish: 'bottom'
}).init();

console.log('********* MAZE **************************');
console.log(maze.getMazeAscii());
