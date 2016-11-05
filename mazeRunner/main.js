const Maze = require('./libs/maze');
const Runner = require('./libs/runner');

let maze = Maze.init();
let runner = Runner.init(maze);

runner.start(maze) ? runner.showPathInMaze() : void 0;

