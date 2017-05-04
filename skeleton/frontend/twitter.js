const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const APIUtil = require('./api_util.js');

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
