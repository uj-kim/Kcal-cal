const express = require("express");
const app = express();
const PORT = 9000;
const axios = require("axios");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//crawler
const cheerio = require("cheerio");
const cors = require("cors");
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // req.cookies 가능해짐
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    name: "Kcal-cal",
  })
);

const multer = require("multer");
// const { userInfo } = require("os");
const path = require("path");
const upload = multer({
  dest: "uploads/",
});
const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // req: 요청에 대한 정보
      // file: 파일에 대한 정보
      // done(에러, 저장경로): 함수
      done(null, "uploads/"); // 경로설정
    },
    filename(req, file, done) {
      // req: 요청에 대한 정보
      // file: 파일에 대한 정보
      // done(에러, 저장경로): 함수
      const ext = path.extname(file.originalname); // file.originalname에서 '확장자' 추출

      console.log(file.originalname); // fruits1.jpg
      console.log(ext); // .jpg
      console.log(path.basename(file.originalname, ext)); // path.basename('fruits1.jpg', '.jpg') => 'fruits1'

      done(null, req.body.id + Date.now() + ext);
      // [파일명+현재시간.확장자] 이름으로 바꿔서 파일 업로드
      // 현재시간: 파일명이 겹치는 것을 막기 위함
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const indexRouter = require("./routes");
// const { post } = require("request");
app.use("/", indexRouter);

app.post("/main", async (req, res) => {
  let result = await crawler(req.body.search);
  res.send({ data: result });
});

app.use(cors("")); //모든 서버에서 보내는 요청 수락
// Crawler;
async function crawler(search) {
  // ❶ HTML 로드하기
  try {
    const resp = await axios.post(
      `https://www.myfitnesspal.com/ko/nutrition-facts-calories/${encodeURIComponent(
        search
      )}`
    );
    const $ = cheerio.load(resp.data); // ❷ HTML을 파싱하고 DOM 생성하기
    const titleArray = $(".css-qumjp8"); // ❸ CSS 셀렉터로 원하는 요소 찾기
    const kcalArray = $(".css-w1kjmb");

    const brandAmountArray = $(".css-j7qwjs > .css-w1kjmb");

    // const brandAmountArray = $(".smallText greyText greyLink");
    // const amountArray = $(".css-w1kjmb");
    // ➍ 찾은 요소를 순회하면서 요소가 가진 텍스트를 출력하기
    titleArray.each((idx, el) => {
      return $(el).text();
    });
    brandAmountArray.each((idx, el) => {
      return $(el).text();
    });
    kcalArray.each((idx, el) => {
      return $(el).text();
    });
    const foods = [];

    for (let i = 0; i < titleArray.length; i++) {
      let title = titleArray[i].children[0].data;
      let brand = brandAmountArray[i].children[0].data;
      let amount;

      if (brandAmountArray[i].children.length < 7) {
        brand = "브랜드 정보없음";
        amount =
          brandAmountArray[i].children[0].data +
          brandAmountArray[i].children[4].data;
      } else {
        amount =
          brandAmountArray[i].children[2].data +
          brandAmountArray[i].children[6].data;
      }

      let kcalText = kcalArray.text();
      kcalRegex = kcalText.match(/칼로리\s:\s\d{1,3}탄수화물+./g);
      kcal = String(kcalRegex[i]).replace(/[^0-9]/g, "");

      let carbsRegex = kcalText.match(/탄수화물:\s\d{1,3}g+./g);
      carbs = String(carbsRegex[i]).replace(/[^0-9]/g, "");

      let fatRegex = kcalText.match(/지방\s:\s\d{1,3}g+./g);
      fat = String(fatRegex[i]).replace(/[^0-9]/g, "");

      let proteinRegex = kcalText.match(/단백질\s:\s\d{1,3}./g);
      protein = String(proteinRegex[i]).replace(/[^0-9]/g, "");

      let array = { title, brand, kcal, amount, carbs, fat, protein };
      foods.push(array);
    }

    return foods;
  } catch (err) {
    console.log(err);
  }
}

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
