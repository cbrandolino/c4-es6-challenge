/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _board = __webpack_require__(2);
	
	var Board = _interopRequireWildcard(_board);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = app;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board() {
	    _classCallCheck(this, Board);
	
	    this.initializeEmptyBoard();
	    this._currentPlayer = 1;
	  }
	
	  _createClass(Board, [{
	    key: "initializeEmptyBoard",
	    value: function initializeEmptyBoard() {
	      var cols = Array.from({ length: 7 }, function () {
	        return Array(6).fill(0);
	      });
	      this.state = cols;
	    }
	  }, {
	    key: "changePlayer",
	    value: function changePlayer() {
	      this._currentPlayer = this.nextPlayer;
	      return this._currentPlayer;
	    }
	  }, {
	    key: "play",
	    value: function play(col) {
	      var column = this.state[col];
	      var row = column.findIndex(function (cell) {
	        return cell === 0;
	      });
	      return row !== undefined ? this.swap(col, row) : { col: col, row: row, value: 0 };
	    }
	  }, {
	    key: "swap",
	    value: function swap(col, row) {
	      var player = arguments.length <= 2 || arguments[2] === undefined ? this.currentPlayer : arguments[2];
	
	      var oldState = this.state;
	      oldState[col][row] = player;
	      this.state = oldState;
	      return { col: col, row: row, player: player };
	    }
	  }, {
	    key: "state",
	    set: function set(val) {
	      this._state = val;
	      return this._state;
	    },
	    get: function get() {
	      return this._state;
	    }
	  }, {
	    key: "currentPlayer",
	    get: function get() {
	      return this._currentPlayer;
	    }
	  }, {
	    key: "nextPlayer",
	    get: function get() {
	      return -this.currentPlayer;
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map