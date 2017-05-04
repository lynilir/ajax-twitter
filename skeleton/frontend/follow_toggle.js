const APIUtil = require('./api_util.js');

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
