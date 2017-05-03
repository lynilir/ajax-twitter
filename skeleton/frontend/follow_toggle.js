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
    // debugger
    if (this.followState === 'true') {
      this.followState = 'false';
    } else {
      this.followState = 'true';
    }
  }

  handleClick() {
    // this.$el.preventDefault();
    // debugger
    let httpMethod;
    if (this.followState === "false") {
      httpMethod = 'POST';
    } else {
      httpMethod = 'DELETE';
    }

    $.ajax({
      url: `/users/${this.userId}/follow`,
      method: httpMethod,
      dataType: "JSON",
      success: () => {
        this.toggleFollowState();
        this.render();
      }
    });
  }
}

module.exports = FollowToggle;
