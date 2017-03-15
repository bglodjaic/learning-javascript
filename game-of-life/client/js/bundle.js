/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var game = __webpack_require__(1);

	game({
	    worldWidth: 200,
	    worldHeight: 200,
	    speed: 2 
	}).start();

	console.log('Game of Life');

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);