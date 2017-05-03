const FollowToggle = require("./follow_toggle.js");

$(() => {
  const $followButtons = $(".follow-toggle");
  $followButtons.each( (idx, el) => {
    const follow_toggle = new FollowToggle(el);
  });
});
