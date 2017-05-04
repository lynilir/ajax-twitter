const APIUtil = require('./api_util');

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
