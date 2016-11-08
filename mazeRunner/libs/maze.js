/*
    0 - empty
    1 - trail
    5 - wall
    7 - start
    8 - finish
 */

function Maze () {

    let buildMazeMap = function () {
        var mazeMap = [
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
            [5, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5],
            [5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 5],
            [5, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5],
            [5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5]
        ];

        mazeMap = [
            [ 8, 5, 0, 5, 8, 8, 8, 8 ],
            [ 0, 0, 0, 8, 8, 8, 8, 8 ],
            [ 0, 5, 5, 8, 8, 8, 8, 8 ],
            [ 0, 5, 8, 8, 8, 8, 8, 8 ],
            [ 0, 5, 8, 8, 8, 8, 8, 8 ],
            [ 0, 5, 8, 8, 8, 8, 8, 8 ],
            [ 0, 5, 8, 8, 8, 8, 8, 8 ],
            [ 0, 0, 0, 8, 8, 8, 8, 8 ]
        ]

        return mazeMap;
    };

    function init (options) {
        options = Object.assign({
            rows: 10,
            columns: 10,
            start: 'bottom',
            finish: 'top',
            fields: {
                'new': 8,
                'wall': 5,
                'open': 0
            }
        }, options);

        // console.log('************options***********************');
        // console.log(options);

        let mazeAscii = {
            0: ' . ',
            1: ' o ',
            5: ' # ',
            7: ' s ',
            8: ' # ',
            9: ' f '
        };

        let positions = {
            start: [0, 2],
            finish: [7, 2]
        };

        // let mazeMap = buildMazeMap();

        let generateBaseMap = function (rows, columns) {
            let base = [];
            for (let row = 0; row < rows; row++) {
                base.push(Array(columns).fill(options.fields.new));
            }

            return base;
        };

        let getRandomPosition = function (options) {
            // generate start / finish positions over the edges
            let coord = {
                row: 0,
                col: 0
            };

            switch (options.position) {
                case 'top':
                    coord.row = 0;
                    coord.col = Math.floor(Math.random() * options.columns);
                    break;
                case 'bottom':
                    coord.row = options.rows - 1;
                    coord.col = Math.floor(Math.random() * options.columns);
                    break;
                case 'left':
                    coord.row = Math.floor(Math.random() * options.rows);
                    coord.col = 0;
                    break;
                case 'right':
                    coord.row = Math.floor(Math.random() * options.rows);
                    coord.col = options.columns - 1;
            }

            return coord;
        };

        let setField = function (maze, row, col, val) {
            if (maze && maze[row] !== void 0 && maze[row][col] !== void 0) {
                return maze[row][col] = val;
            }
            return false;
        };

        let generateMaze = function (options) {
            let mazeMap = generateBaseMap(options.rows, options.columns);

            let start = getRandomPosition({
                rows: options.rows,
                columns: options.columns,
                position: options.start
            });
            let finish = getRandomPosition({
                rows: options.rows,
                columns: options.columns,
                position: options.finish
            });

            positions.start[0] = start.row;
            positions.start[1] = start.col;
            positions.finish[0] = finish.row;
            positions.finish[1] = finish.col;

            let done = function (row, col) {
                return row === finish.row && col === finish.col;
            };

            let getNeighbors = function (row, col) {
                let neighbors = [];
                // check up
                let newRow = row - 1;
                if (newRow >= 0 && mazeMap[newRow][col] !== options.fields.wall) {
                    neighbors.push({
                        row: newRow,
                        col: col
                    });
                }

                // check down
                newRow = row + 1;
                if (newRow < options.rows && mazeMap[newRow][col] !== options.fields.wall) {
                    neighbors.push({
                        row: newRow,
                        col: col
                    });
                }

                // check left
                let newCol = col - 1;
                if (newCol >= 0 && mazeMap[row][newCol] !== options.fields.wall) {
                    neighbors.push({
                        row: row,
                        col: newCol
                    });
                }

                // check right
                newCol = col + 1;
                if (newCol < options.columns && mazeMap[row][newCol] !== options.fields.wall) {
                    neighbors.push({
                        row: row,
                        col: newCol
                    });
                }

                let newCells = neighbors.filter(function (n) {
                    return mazeMap[n.row][n.col] === options.fields.new;
                })

                if (newCells.length) {
                    return newCells;
                }

                return neighbors;
            };

            let getNextCell = function (row, col) {
                let neighbors = getNeighbors(row, col);
                let idx = Math.floor(Math.random() * neighbors.length);
                let neighbor = {
                    row: neighbors[idx].row,
                    col: neighbors[idx].col
                };

                if (neighbor.row === row) {
                    neighbor.direction = 'x';
                } else {
                    neighbor.direction = 'y';
                }

                return neighbor;
            };

            let markWalls = function (row, col, dir) {
                if (dir === 'x') {
                    if (mazeMap[row + 1] !== void 0 && mazeMap[row + 1][col] === options.fields.new) {
                        mazeMap[row + 1][col] = options.fields.wall;
                    }
                    if (mazeMap[row - 1] !== void 0 && mazeMap[row - 1][col] === options.fields.new) {
                        mazeMap[row - 1][col] = options.fields.wall;
                    }
                };
                if (dir === 'y') {
                    if (mazeMap[row][col + 1] !== void 0 && mazeMap[row][col + 1] === options.fields.new) {
                        mazeMap[row][col + 1] = options.fields.wall;
                    }
                }
                if (dir === 'y') {
                    if (mazeMap[row][col - 1] !== void 0 && mazeMap[row][col - 1] === options.fields.new) {
                        mazeMap[row][col - 1] = options.fields.wall;
                    }
                }
            };

            let generator = function (row, col) {
                if (done(row, col)) {
                    return true;
                }

                let nextCell = getNextCell(row, col);

                markWalls(row, col, nextCell.direction);
                setField(mazeMap, nextCell.row, nextCell.col, options.fields.open);

                if (generator(nextCell.row, nextCell.col)) {
                    return true;
                }

                return false;
            };

            // console.log('************ START & FINISH ***********************');
            // console.log(start, finish);

            if (setField(mazeMap, start.row, start.col, options.fields.open) !== false && setField(mazeMap, finish.row, finish.col, options.fields.open) !== false) {
                if (generator(start.row, start.col)) {
                    return mazeMap;
                }
            }

            return false;
        };

        let mazeMap = generateMaze(options);

        console.log('******** MAZE ***************************');
        console.log(mazeMap);

        let cloneMaze = function cloneMaze (maze) {
            let clone = maze.map(function (row) {
                let newRow = row.map((e) => e);
                return newRow;
            });

            return clone;
        };

        let mazeProto = {
            isWalkable: function (pos) {
                let row = pos[0];
                let col = pos[1];

                if ((row >= 0 && row < mazeMap.length) && (col >= 0 && col < mazeMap[row].length)) {
                    if (mazeMap[row][col] === 0) {
                        return true;
                    }
                }

                return false;
            },
            getStart: function () {
                return positions.start;
            },
            getFinish: function () {
                return positions.finish;
            },
            getMap: function () {
                return mazeMap;
            },
            showPath: function (path) {
                let clone = cloneMaze(mazeMap);

                //insert path
                path.forEach((pos) => {
                    let insert = 1;
                    if (pos[0] === positions.start[0] && pos[1] === positions.start[1]) {
                        insert = 7;
                    }
                    if (pos[0] === positions.finish[0] && pos[1] === positions.finish[1]) {
                        insert = 9;
                    }
                    clone[pos[0]][pos[1]] = insert;
                });


                let row = clone.reduce(function (prev, curr) {
                    return prev + curr.reduce(function (prev, curr) {
                            return prev + (mazeAscii[curr]);
                        }, '') + '\n';
                },'');

                return row;
            }
        };

        var maze = Object.create(mazeProto);

        return maze;
    }

    return {
        init: init
    };
};

module.exports = Maze();
