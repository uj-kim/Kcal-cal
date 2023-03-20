const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();
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
      done(null, "static/img/"); // 경로설정
    },
    filename(req, file, done) {
      // req: 요청에 대한 정보
      // file: 파일에 대한 정보
      // done(에러, 저장경로): 함수
      const ext = path.extname(file.originalname); // file.originalname에서 '확장자' 추출

      console.log(file.originalname); // fruits1.jpg
      console.log(ext); // .jpg
      console.log(path.basename(file.originalname, ext)); // path.basename('fruits1.jpg', '.jpg') => 'fruits1'

      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // [파일명+현재시간.확장자] 이름으로 바꿔서 파일 업로드
      // 현재시간: 파일명이 겹치는 것을 막기 위함
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
});

// 기본주소: localhost:PORT

// GET / => localhost:PORT/
router.get("/", controller.index); // intro => index

router.get("/main", controller.main);

router.get("/header", controller.header);

router.get("/sub1", controller.sub1);

router.get("/sub2", controller.sub2);

router.get("/sub3", controller.sub3);

router.get("/signup", controller.getsignup);

router.post("/signup", controller.postsignup);

router.post("/signup/firstValidation", controller.signupCheckId);

router.post("/signup/secondValidation", controller.signupCheckEmail);

router.get("/login", controller.getlogin);

router.post("/login", controller.postlogin);

router.post("/signup/checkid", controller.checkid);

router.post("/login/findId", controller.findId); //ID찾기

router.post("/login/mail", controller.findPw);

router.get("/mypage", controller.mypage);

router.post("/mypage/edit", controller.mypageEdit); // 개인정보 수정

router.post(
  "/profileUpload",
  uploadDetail.single("profileUpload"),
  controller.profileUploads
); // 프로필사진 등록

router.delete("/mypage/delete", controller.mypageDelete); // 회원탈퇴

router.post("/sub3/weight", controller.myweightEdit); // 몸무게 추가

router.get("/logout", controller.logout);

module.exports = router;
