'use strict';

module.exports = (function () {
    let _instance;

    let conf = {}; // game configuration

    let defaults = {
        worldWidth: 100,
        worldHeight: 100,
        speed: 2,
        startConfiguration: '10-cell-row'
    }

    let world = [];

    let putInhabitant = function putInhabitant (row, col) {
        let inhabitant = {
            row: row,
            col: col,
            life: 10,
        };

        world.push(inhabitant);
    };

    let cleaner = function cleaner () {
        // remove dead ones
        return world.reduce((acc, curr) => {
            if (curr.life > 0) {
                acc.push(curr);
            }
            return acc;
        }, []);
    };

    let lifeReducer = function lifeReducer () {
        return world.map((curr) => {
            curr.life -= conf.speed;
            return curr; 
        });
    };

    let checkRules = function checkRules () {
        
    };

    let setupWorld = function setupWorld () {
        // put starters on the world
        switch (conf.startConfiguration) {
            case '10-cell-row': 
            default:
                let row = Math.round(conf.worldWidth / 2);
                let col = Math.round(conf.worldHeight / 2);

                for (let i = 0; i < 10; i++) {
                    putInhabitant(row, col + i);
                }
        }
    };

    let game = {
        start: function () {
            console.log('**********************************************');
            console.log('START');
            console.log(world);
            while (world.length) {
                world = cleaner();
                world = lifeReducer();
            }
        }
    };

    var init = function init (options){
        conf = Object.assign(defaults, options);
        setupWorld();
        
        return Object.create(game);;
    };

    return function (options) {
            if (!_instance) {
                _instance = init(options); 
                return _instance;
            }
            return _instance;
        }
})();