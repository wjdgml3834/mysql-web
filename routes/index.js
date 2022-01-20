var express = require("express");
var router = express.Router();

var sql = require("../database/sql");
// 데이터베이스 파일과 이어지게 해주는 코드

/* GET home page. */
const sectionIcons = ["🍚", "🍿", "🍜", "🍣", "🥩", "☕", "🍰"];

const statusKorMap = {
  OPN: "영업중",
  CLS: "폐업",
  VCT: "휴가중",
  RMD: "리모델링",
};

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

router.get("/biz-simple", async function (req, res, next) {
  const businesses = await sql.getBusinessesJoined(req.query);
  // 주소 url에서 뽑아온다.
  businesses.map((item) => {
    item.status_kor = statusKorMap[item.status];
    return item;
  });

  res.render("biz-simple", {
    title: "단순 식당 목록",
    businesses,
  });
});

router.get("/biz-adv", async function (req, res, next) {
  const businesses = await sql.getBusinessesJoined(req.query);
  businesses.map((item) => {
    item.status_kor = statusKorMap[item.status];
    return item;
  });

  res.render("biz-adv", {
    title: "고급 식당 목록",
    q: req.query,
    businesses,
  });
});

module.exports = router;
