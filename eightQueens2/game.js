module.exports = function (options) {
    options = Object.assign({}, options);

    var boardSize = 8;
    var solved = true;
    var board = [];
    var boards = [];
    var maxSolutions = 92;
    var found = 0;

    if (!options || !options.startPosition || (typeof options.startPosition.row === void 0 && typeof options.startPosition.column === void 0)) {
        // get Random queen position
        options.startPosition = getRandomQueenPosition(boardSize);
    }

    function getRandomQueenPosition (size) {
        var position = {};

        position.row = Math.floor(Math.random() * size);
        position.column = Math.floor(Math.random() * size);

        return position;
    }

    var generateBoard = function (size) {
        var board = [];
        for (var row = 0; row < size; row++) {
            board.push(Array.of.apply(null, Array(8)).fill(0));
        }

        return board;
    };
    var putQueen = function (row, col) {
        board[row][col] = 1;
    };
    var removeQueen = function (row, col) {
        board[row][col] = 0;
    };
    board = generateBoard(boardSize);

    var startRow = options.startPosition.row;
    var startCol = options.startPosition.column;

    putQueen(startRow, startCol);

    var isSafe = function (row, col) {
        // check row
        if (board[row].indexOf(1) !== -1) {
            return false;
        }

        // left upper
        for (var r = row, c = col; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c]) {
                return false;
            }
        }

        // left bottom
        for (var r = row, c = col; r < boardSize && c >= 0; r++, c--) {
            if (board[r][c]) {
                return false;
            }
        }

        // right upper
        for (var r = row, c = col; r >= 0 && c < boardSize; r--, c++) {
            if (board[r][c]) {
                return false;
            }
        }

        // right bottom
        for (var r = row, c = col; r < boardSize && c < boardSize; r++, c++) {
            if (board[r][c]) {
                return false;
            }
        }

        return true;
    };

    var isUnique = function (newBoard) {
        boards.forEach(function (board) {
            for (var i = 0, j = 0; i < boardSize && j < boardSize; i++, j++) {
                if (board[i][j] !== newBoard[i][j]) {
                    return true;
                }
            }
        });
        return false;
    };

    var search = function (column) {
        if (column >= boardSize) {
            return true;
        }

        if (column === startCol) {
            if (search(column + 1)) {
                return true;
            }
        }

        for (var row = 0; row < boardSize; row++) {
            if (isSafe(row, column)) {
                putQueen(row, column);
                if (search(column + 1)) {
                    return true;
                }

                removeQueen(row, column);
            }
        }

        return false;
    };

    var searchAll = function () {
        board = generateBoard(boardSize);
        options.startPosition = getRandomQueenPosition(boardSize);
        startRow = options.startPosition.row;
        startCol = options.startPosition.column;
        putQueen(startRow, startCol);

        if (found >= maxSolutions) {
            return true;
        } else {
            if (search()) {
                if (isUnique(board)) {
                    var newBoard = [];
                    board.forEach(function (row) {
                        newBoard.push(Array.of(row));
                    });
                    boards.push(newBoard);

                    board = generateBoard(boardSize);
                }
            }
            searchAll();
        }

        return false;
    };

    var solve = function () {
        if (options.searchAll) {
            if (searchAll()) {
                solved = true;
            }
        } else {
            if (search(0)) {
                solved = true;
            }
        }

        return solved;
    };

    var drawBoard = function () {
        if (options.searchAll) {
            console.log('***********************************');
            console.log(boards, found);
            boards.forEach(function (board) {
                for (var row = 0; row < boardSize; row++) {
                    console.log(board[row].join('   '));
                }
            })
        } else {
            for (var row = 0; row < boardSize; row++) {
                console.log(board[row].join('   '));
            }
        }
    };

    return {
        solve: solve,
        drawBoard: drawBoard
    }
};
