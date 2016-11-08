const Maze = require('./libs/maze');
const Runner = require('./libs/runner');

let maze = Maze.init({
    rows: 10,
    columns: 10,
    start: 'top',
    finish: 'bottom'
});
let runner = Runner.init(maze);

runner.start(maze) ? runner.showPathInMaze() : void 0;

