var express = require("express");
var router = express.Router();

var sql = require("../database/sql");
// 데이터베이스 파일과 이어지게 해주는 코드

/* GET home page. */
const sectionIcons = ["🍚", "🍿", "🍜", "🍣", "🥩", "☕", "🍰"];

router.get("/", async function (req, res, next) {
  const sections = await sql.getSections();
  sections.map((item) => {
    item.icon = sectionIcons[item.section_id - 1];
  });

  res.render("sections", {
    title: "섹션 목록",
    sections,
  });
});
// index.hbs의 값을 layout.hbs안의 {{{body}}}안에 넣어주게 된다.
// title을 바꾸면 바뀐다.

module.exports = router;
