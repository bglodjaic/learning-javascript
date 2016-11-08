module.exports = function (options) {
    options = Object.assign({
        rows: 10,
        columns: 10,
        start: 'top',
        finish: 'bottom',
        cellState: {
            unvisited: 0,
            up: 1,
            down: 2,
            left: 4,
            right: 8
        },
        asciiMap: {
            hSide: 'a',
            vSide: '8',
            space: '   '
        }
    }, options);

    function generatePlaneMazeMap (rows, cols) {
        let base = [];
        for (let row = 0; row < rows; row++) {
            base.push(Array(cols).fill(0));
        }

        return base;
    };

    function allCellsVisited (maze) {
        let allVisited = true;
        maze.forEach(function (mazeRow) {
            allVisited = mazeRow.some(function (el) {
                return el !== 0;
            });
        });

        return allVisited;
    };

    function init() {
        let mazeMap = generatePlaneMazeMap(options.rows, options.columns);
        let startCell = [0, 2]; // TODO: get random cell based on options 'start' & 'finish' positions

        function getNeighbors (row, col) {
            let neighbors = [];
            // check up
            let newRow = row - 1;
            if (newRow >= 0 && mazeMap[newRow][col] === options.cellState.unvisited) {
                neighbors.push({
                    row: newRow,
                    col: col
                });
            }

            // check down
            newRow = row + 1;
            if (newRow < options.rows && mazeMap[newRow][col] === options.cellState.unvisited) {
                neighbors.push({
                    row: newRow,
                    col: col
                });
            }

            // check left
            let newCol = col - 1;
            if (newCol >= 0 && mazeMap[row][newCol] === options.cellState.unvisited) {
                neighbors.push({
                    row: row,
                    col: newCol
                });
            }

            // check right
            newCol = col + 1;
            if (newCol < options.columns && mazeMap[row][newCol] === options.cellState.unvisited) {
                neighbors.push({
                    row: row,
                    col: newCol
                });
            }

            return neighbors;
        };

        function getNextCell (row, col) {
            let neighbors = getNeighbors(row, col);
            if (neighbors.length) {
                let idx = Math.floor(Math.random() * neighbors.length);

                return [neighbors[idx].row, neighbors[idx].col];
            } else {
                return false;
            }
        };

        function firstUnvisitedNeigbor (row, col) {
            let cellStatus = mazeMap[row][col];
            switch (cellStatus) {
                case 1:
            }
        }

        function generateMaze (cell) {
            if (allCellsVisited(mazeMap)) {
                return true;
            }

            let row = cell[0];
            let col = cell[1];
            let nextCell = getNextCell(row, col);
            console.log('nextCell:',nextCell);
            if (nextCell) {
                // cells in same row
                if (nextCell[0] === cell[0]) {
                    // next cell is left
                    if (nextCell[1] < cell[1]) {
                        mazeMap[cell[0]][cell[1]] += options.cellState.left;
                        mazeMap[nextCell[0]][nextCell[1]] += options.cellState.right;
                    } else {
                        mazeMap[cell[0]][cell[1]] += options.cellState.right;
                        mazeMap[nextCell[0]][nextCell[1]] += options.cellState.left;
                    }
                }
                // next cell is in same column
                if (nextCell[1] === cell[1]) {
                    if (nextCell[0] < cell[0]) {
                        // next is up
                        mazeMap[cell[0]][cell[1]] += options.cellState.up;
                        mazeMap[nextCell[0]][nextCell[1]] += options.cellState.down;
                    } else {
                        // next is below
                        mazeMap[cell[0]][cell[1]] += options.cellState.down;
                        mazeMap[nextCell[0]][nextCell[1]] += options.cellState.up;
                    }
                }
            } else {
                nextCell = firstUnvisitedNeigbor(row, col);
            }

            if (generateMaze(nextCell)) {
                return true;
            }


            return false;
        };

        function getMazeAscii () {
            let hS = options.asciiMap.hSide;
            let vS = options.asciiMap.vSide;
            let space = options.asciiMap.space;
            let asciiMaze = '';
            let hsRepeat = '';
            mazeMap.forEach(function (row) {
                let rowText = '';
                row.forEach(function (cell, idx) {
                    if (!(cell & options.cellState.left)) {
                        rowText += vS + space;
                    }
                    if (idx === row.length - 1 && !(cell & options.cellState.right)) {
                        rowText += vS;
                    }
                });
                hsRepeat = hS.repeat(rowText.length);
                rowText = hsRepeat + '\n' + rowText;
                asciiMaze += rowText + '\n';
            });
            asciiMaze += hsRepeat + '\n';

            return asciiMaze;
        }

        if (generateMaze(startCell)) {
            getMazeAscii();
        }

        console.log('*********MAZE MAP**************************');
        console.log(mazeMap);

        return {
            getMazeAscii: getMazeAscii
        }
    };

    return {
        init: init
    }
};
