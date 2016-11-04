module.exports = function () {
    var board =
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];

    let len = board.length;

    let isSafe = function (row, col) {
        // to the left
        for (let y = col-1; y >= 0; y--) {
            if (board[row][y]) {
                return false;
            }
        }

        // left upper diagonal
        for (let x = row, y = col; x >= 0 && y >=0; x--, y--) {
            if (board[x][y]) {
                return false;
            }
        }

        // left lower diagonal
        for (let x = row, y = col; x < len && y >= 0; x++, y--) {
            if (board[x][y]){
                return false;
            }
        }

        return true;
    };

    let findUntil = function (col) {
        if (col >= len) {
            return true;
        }
        // start from random row
        let row = col === 0 ? Math.floor(Math.random() * (len - 1) + 1) : 0;

        for (let i = row; i < len; i++) {
            if (isSafe(i, col)) {
                board[i][col] = 1;

                if (findUntil(col + 1)) {
                    return true;
                }

                board[i][col] = 0;
            }
        }

        return false;
    };

    let show = function () {
        for(let x = 0; x < len; x++) {
            var row = '';
            for (let y = 0; y < len; y++) {
                row += '  ' + board[x][y];
            }
            console.log(row);
        }
    };


    return {
        solve: function () {
            if (findUntil(0)) {
                show();
            } else {
                console.log('impossible');
            }
        }
    }
};
