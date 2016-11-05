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

        return mazeMap;
    };

    function init () {
        let mazeAscii = {
            0: '   ',
            1: ' . ',
            5: ' # ',
            7: ' s ',
            8: ' f '
        };

        let positions = {
            start: [1, 0],
            finish: [9, 20]
        };

        let mazeMap = buildMazeMap();

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
                        insert = 8;
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
