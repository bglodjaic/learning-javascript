'use strict';

function Game (options) {
    let gameOptions = {
        boardSize: 4
    };

    let gameProto = {
        find: function (col) {
            let size = this.options.boardSize;
            if (col >= size) {
                return true;
            }

            // start from random row
            let row = !col ? Math.floor((Math.random() * (size - 1))) : 0;

            for (let i = row; i < size; i++) {
                if (this.isCorrect(i, col)) {
                    this.putQueen(i, col);

                    if (this.find(col + 1)) {
                        return true;
                    }

                    this.removeQueen(i, col);
                }
            }

            return false;
        },

        isCorrect: function (row, col) {
            // check left row
            for (let j = col - 1; j >=0; j--) {
                if (this.fieldValue(row, j)) {
                    return false;
                }
            }

            // check upper left diagonal
            for (let i = row, j = col; i >= 0 && j >=0; i--, j--) {
                if (this.fieldValue(i, j)) {
                    return false;
                }
            }

            // check lower left diagonal
            for (let i = row, j = col; i < this.options.boardSize && j >= 0; i++, j--) {
                if (this.fieldValue(i, j)) {
                    return false;
                }
            }

            return true;
        },

        fieldValue: function (row, col) {
            return this.board[row][col];
        },

        putQueen: function (row, col) {
            this.board[row][col] = 1;
        },

        removeQueen: function (row, col) {
            this.board[row][col] = 0;
        },

        solve: function () {
            if (this.find(0)) {
                this.solved = true;
            }
            return this;
        },

        show: function () {
            if (this.solved) {
                this.board.forEach((arr) => {
                    console.log(arr.join('  '));
                });
            }
        }
    };

    // helper function
    let makeBoard = function (size) {
        return Array.from(Array(size)).map(() => Array.from(Array(size).fill(0)));
    };

    return function (options) {
        Object.assign(gameOptions, options);
        let game = Object.create(gameProto);
        gameOptions.solved = false;
        game.options = gameOptions;
        game.board = makeBoard(options.boardSize);

        return game;
    }(options)
};

module.exports = Game;
