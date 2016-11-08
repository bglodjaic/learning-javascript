function Runner () {

    var init = function init (maze) {
        let position = maze.getStart();
        let path = [];
        let possiblePath = [];
        let prevPosition = position;
        // save good step
        path.push(position);

        let isFinish = function (currPosition) {
            let endPosition = maze.getFinish();
            if (currPosition[0] === endPosition[0] && currPosition[1] === endPosition[1]) {
                return true;
            }
            return false;
        };

        let getPossibleDirections = function (position) {
            let mazeMap = maze.getMap();
            let currRow = position[0];
            let currCol = position[1];
            let directions = [];
            let lastValidPosition = path.length ? path[path.length - 1] : void 0;

            // don't add visited positions
            if (!beenThere(position)) {
                // check up
                if (currRow > 0 && maze.isWalkable([currRow - 1, currCol])) {
                    if (prevPosition.length && (prevPosition[0] !== currRow - 1 || prevPosition[1] !== currCol)) {
                        directions.push([currRow - 1, currCol]);
                    }
                }
                // check down
                if (currRow < mazeMap.length - 1 && maze.isWalkable([currRow + 1, currCol])) {
                    if (prevPosition.length && (prevPosition[0] !== currRow + 1 || prevPosition[1] !== currCol)) {
                        directions.push([currRow + 1, currCol]);
                    }
                }

                // check left
                if (currCol > 0 && maze.isWalkable([currRow, currCol - 1])) {
                    if (prevPosition.length && (prevPosition[0] !== currRow || prevPosition[1] !== currCol - 1)) {
                        directions.push([currRow, currCol - 1]);
                    }
                }

                // check right
                if (currCol < mazeMap[currRow].length - 1 && maze.isWalkable([currRow, currCol + 1])) {
                    if (prevPosition.length && (prevPosition[0] !== currRow || prevPosition[1] !== currCol + 1)) {
                        directions.push([currRow, currCol + 1]);
                    }
                }
            }

            return directions;
        };

        let beenThere = function (position) {
            for (let i=0; i< possiblePath.length; i++) {
                if (position[0] === possiblePath[i][0] && position[1] === possiblePath[i][1]) {
                    return true;
                }
            }
            return false;
        };

        let search = function (position) {

            if (isFinish(position)) {
                return true;
            }

            let directions = getPossibleDirections(position);

            for (let i = 0; i < directions.length; i++) {
                possiblePath.push(position);
                prevPosition = position;

                if (search(directions[i])) {
                    path.push(directions[i]);
                    return true;
                }

                possiblePath = [];
            }

            return false;
        };

        var runnerProto = {
            start: function () {
                if (maze.getMap().length && search(position)) {
                    return path;
                }
            },
            getPath: function () {
                return path;
            },
            showPathInMaze: function () {
                console.log(maze.showPath(path));
            }
        };

        var runner = Object.create(runnerProto);

        return runner;
    }

    return {
        init: init
    }
};

module.exports = Runner();
