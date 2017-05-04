/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: "JSON"
    });
  },

  unfollowUser: id => {
      return $.ajax({
      url: `/users/${id}/follow`,
      method: 'DELETE',
      dataType: "JSON"
    });
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
      url: '/users/search',
      method: 'GET',
      dataType: "JSON",
      data: {
        query: queryVal
      },
      success: success
    });
  }
}

module.exports = APIUtil;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.attr("data-user-id");
    this.followState = this.$el.attr("data-initial-follow-state");
    this.render();
    this.handleClick = this.handleClick.bind(this);
    this.$el.on("click", this.handleClick);
  }

  render() {
    if (this.followState === "false") {
      this.$el.text("Follow!");
    } else {
      this.$el.text("Unfollow!");
    }
  }

  toggleFollowState() {
    if (this.followState === 'true') {
      this.followState = 'false';
    } else {
      this.followState = 'true';
    }
  }

  ajaxSuccess() {
    this.toggleFollowState();
    this.render();
    this.enableButton();
  }

  enableButton(){
    this.$el.prop("disabled", false);
  }

  disableButton(){
    this.$el.prop("disabled", true);
  }

  handleClick(e) {
    e.preventDefault();
    this.disableButton();
    if (this.followState === "false") {
      APIUtil.followUser(this.userId).then(this.ajaxSuccess.bind(this));
    } else {
      APIUtil.unfollowUser(this.userId).then(this.ajaxSuccess.bind(this));
    }
  }
}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(".users-search input");
    this.$ul = $(".users-search ul");

    this.handleInput = this.handleInput.bind(this);
    this.$input.on("input", this.handleInput);
    this.displayUsers = this.displayUsers.bind(this);
  }

  handleInput() {
    let search = this.$input.val();

    APIUtil.searchUsers(search, this.displayUsers);
  }

  displayUsers(users) {
    this.$ul.empty();
    users.forEach( (el) =>{
      const $user = $("<li>");
      $user.text(el.username);
      this.$ul.append($user);
    });
  }
}

module.exports = UsersSearch;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(2);
const APIUtil = __webpack_require__(0);

$(() => {
  const $followButtons = $(".follow-toggle");
  $followButtons.each( (idx, el) => {
    const followToggle = new FollowToggle(el);
  });

  const $usersSearch = $(".users-search");
  $usersSearch.each( (idx, el) => {
    const usersSearch = new UsersSearch(el);
  })
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map