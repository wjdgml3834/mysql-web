var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("sections", {
    title: "섹션 목록",
  });
});
// index.hbs의 값을 layout.hbs안의 {{{body}}}안에 넣어주게 된다.
// title을 바꾸면 바뀐다.

module.exports = router;
