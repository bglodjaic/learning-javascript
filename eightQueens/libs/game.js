'use strict';

module.exports = function (options) {

    let gameOptions = {
        boardSize: 4,
        asciiArtBoard: true,
        asciiArt: {
            0: '…',
            1: '♕'
        }
    };

    Object.assign(gameOptions, options);

    let solved = false;
    let board = makeBoard(gameOptions.boardSize);

    function makeBoard (size) {
        return Array.from(Array(size)).map(() => Array.from(Array(size).fill(0)));
    };

    let isCorrect = (row, col) => {
        // check left row
        for (let j = col - 1; j >=0; j--) {
            if (board[row][j]) {
                return false;
            }
        }

        // check upper left diagonal
        for (let i = row, j = col; i >= 0 && j >=0; i--, j--) {
            if (board[i][j]) {
                return false;
            }
        }

        // check lower left diagonal
        for (let i = row, j = col; i < gameOptions.boardSize && j >= 0; i++, j--) {
            if (board[i][j]) {
                return false;
            }
        }

        return true;
    };

    let find = (col) => {
        let size = gameOptions.boardSize;

        if (col >= size) {
            return true;
        }

        // start from random row
        let row = !col ? Math.floor((Math.random() * (size - 1))) : 0;

        for (let i = row; i < size; i++) {
            if (isCorrect(i, col)) {
                board[i][col] = 1;

                if (find(col + 1)) {
                    return true;
                }

                board[i][col] = 0;
            }
        }

        return false;
    };

    let drawBoard = (asciiArt) => {
        let asciiBoard = '';
        board.forEach((arr, idx) => {
            let rowArr = asciiArt ? [Math.abs(idx - gameOptions.boardSize) + ' ║'].concat(arr.map((f, i) => gameOptions.asciiArt[f])) : arr;
            asciiBoard += rowArr.join('  ') + '\n';
        });
        asciiBoard = asciiArt ?
            asciiBoard + '  ╚' + '═'.repeat(gameOptions.boardSize * 3) + '\n     ' + 'abcdefgh'.slice(0, gameOptions.boardSize).split('').join('  ')
            : asciiBoard;

        console.log(asciiBoard);
    };

    return {
        solve: () => {
            if (find(0)) {
                solved = true;
            }

            return solved;
        },
        show: (asciiArt) => {
            if (solved) {
                drawBoard(gameOptions.asciiArtBoard);
            }
        }
    }
};