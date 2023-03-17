const { User } = require("../models");
const models = require("../models"); // ../models/index.js
const nodemailer = require("nodemailer");
// const ejs = require("ejs");
// const { callbackPromise } = require("nodemailer/lib/shared");
// const { renderFile } = require("ejs");

exports.index = (req, res) => {
  const userSession = req.session.user;
  console.log("Session 출력 >> ", userSession);

  if (userSession !== undefined) {
    res.render("index", {
      isLogin: true,
    });
  } else {
    res.render("index", { isLogin: false });
  }
};

exports.main = (req, res) => {
  const userSession = req.session.user;
  console.log("Session 출력 >> ", userSession);

  if (userSession !== undefined && userSession.height !== undefined) {
    const query = `SELECT user.userid as userid, user.nickname as nickname, user.age as age, user.gender as gender, user.height as height, user.userprofile as userprofile, userweight.weight as weight
  FROM user
      INNER JOIN userweight
      ON user.userid = userweight.userid
      WHERE user.userid = '${userSession.userid}' ORDER BY date DESC LIMIT 1;`;
    models.sequelize
      .query(query, { type: models.sequelize.QueryTypes.SELECT })
      .then((result) => {
        // * Chrome 브라우저의 경우, JSONVue 확장프로그램 설치시 데이터 출력 결과를 가독성있게 볼 수 있음
        // https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc
        console.log("로그인 데이터", result);
        console.log("로그인 유저 나이", result[0].age);
        console.log("로그인 유저 성별", result[0].gender);
        console.log("로그인 유저 키", result[0].height);
        console.log("로그인 유저 몸무게", result[0].weight);
        res.render("main", {
          activeMenu: "main",
          result: result[0],
          isLogin: true,
          userid: userSession.userid,
        });
        return;
      });
  } else if (userSession !== undefined && userSession.weight === undefined) {
    res.render("main", {
      activeMenu: "main",
      isLogin: true,
      userid: userSession.userid,
    });
    return;
  } else {
    res.render("main", { activeMenu: "main", isLogin: false });
  }
};

exports.header = (req, res) => {
  const userSession = req.session.user;
  console.log("header", userSession);
  if (userSession !== undefined) {
    res.render("header", {
      isLogin: true,
      result: userSession,
    });
  } else {
    res.render("header", { isLogin: false });
  }
};

exports.sub1 = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined) {
    console.log("sub1", userSession);
    res.render("sub1", {
      activeMenu: "sub1",
      isLogin: true,
      result: userSession,
    });
  } else {
    res.render("sub1", { activeMenu: "sub1", isLogin: false });
  }
};

exports.sub2 = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined) {
    console.log("sub2", userSession);
    res.render("sub2", {
      activeMenu: "sub2",
      isLogin: true,
      result: userSession,
    });
  } else {
    res.render("sub2", { activeMenu: "sub2", isLogin: false });
  }
  console.log("sub2", userSession);
};

exports.sub3 = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined && userSession.height !== undefined) {
    const query = `SELECT user.userid as userid, user.userprofile as userprofile, userweight.date as date, userweight.weight as weight
  FROM user
      INNER JOIN userweight
      ON user.userid = userweight.userid
      WHERE user.userid = '${userSession.userid}' ORDER BY date DESC LIMIT 10;`;
    models.sequelize
      .query(query, { type: models.sequelize.QueryTypes.SELECT })
      .then((result) => {
        // * Chrome 브라우저의 경우, JSONVue 확장프로그램 설치시 데이터 출력 결과를 가독성있게 볼 수 있음
        // https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc
        console.log("sub3", result);
        console.log("sub3 ID", result[0].userid);
        console.log("sub3 몸무게", result[0].weight);
        res.render("sub3", {
          activeMenu: "sub3",
          userweight: result,
          result: result[0],
          isLogin: true,
          userid: userSession.userid,
          nickname: userSession.nickname,
        });
        return;
      });
  } else {
    res.send(
      `<script>
      alert('회원 전용 페이지 입니다. 로그인 후 이용해 주세요!')
      document.location.href = '/'
      </script>`
    );
  }
};

exports.getlogin = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined) {
    res.send(
      `<script>
      alert('이미 로그인 중 입니다!')
      document.location.href = '/main'
      </script>`
    );
  } else {
    res.render("login");
  }
};

exports.postlogin = (req, res) => {
  // const userSession = req.session.user;
  console.log(req.body);
  models.User.findOne({
    where: {
      userid: req.body.userid,
      userpw: req.body.userpw,
    },
  }).then((result) => {
    console.log("login 결과 >>", result); // [{}]
    if (result === null) {
      res.send(false); // 로그인 실패
      console.log("false", result);
      return;
    } else {
      req.session.user = {
        isLogin: true,
        userid: req.body.userid,
        userpw: req.body.userpw,
        useremail: result.useremail,
        nickname: result.nickname,
        gender: result.gender,
        age: result.age,
        height: result.height,
        userprofile: result.userprofile,
      };
      console.log(req.session.user);
      res.send(true);
    }
  });
};

exports.findId = (req, res) => {
  models.User.findOne({
    where: {
      useremail: req.body.useremail,
    },
  }).then((result) => {
    // console.log("ID 찾기 >>", result.userid); // [{}]
    if (result === null) {
      res.send(false, `존재하지 않는 이메일입니다!`); // 해당 이메일에 대응하는 ID값 X
    } else {
      //res.send(true); // ID값 출력 or 다른 처리
      res.send(result.userid);
    }
  });
};

//ID 중복확인
exports.checkid = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.body.userid,
    },
  }).then((result) => {
    // console.log(req.body);
    console.log("checkid", result);
    if (result === null) {
      res.send(true);
    } else {
      return res.send(false);
    }
  });
};

//PW찾기

exports.findPw = (req, res) => {
  models.User.findOne({
    where: {
      useremail: req.body.useremail,
    },
  }).then((result) => {
    console.log("이메일", result);
    // console.log("받은이메일", req.body.useremail);
    // console.log("받은이메일2", result.dataValues.useremail);
    if (result === null) {
      return res.send(false);
    } else {
      const mailPoster = nodemailer.createTransport({
        service: "Naver",
        host: "smtp.naver.com",
        port: 587,
        auth: {
          user: "kcal-cal2@naver.com", // 우리 이메일 주소
          pass: "!qn2wjd#gus", // 우리 이메일 비밀번호
        },
      });
      // let authNum = Math.random().toString().slice(2, 8);
      // const content = ejs
      //   .renderFile("./views/authMail.ejs", { authcode: authNum })
      //   .toString();

      const mailOpt = {
        from: "kcal-cal2@naver.com",
        to: `${result.dataValues.useremail}`,
        subject: "[kcalcal] 이메일 인증을 통한 비밀번호 찾기",
        html:
          ' <p style="color: black"><b>안녕하세요, Kcal-cal 입니다.<br> 회원님의 비밀번호는</b></p><br>' +
          `<p style = "color: blue">${result.dataValues.userpw} </p>` +
          "<br> <b>입니다</b><br><br>" +
          '<hr> <button type="button"><a href="http://localhost:9000/login">로그인 하러 가기</a> </button>',
      };
      mailPoster.sendMail(mailOpt, (err, info) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      res.send(true);
    }
  });
};

exports.getsignup = (req, res) => {
  res.render("signup");
};

exports.postsignup = async (req, res) => {
  let result1 = await models.User.create({
    userid: req.body.userid,
    userpw: req.body.userpw,
    useremail: req.body.useremail,
    nickname: req.body.nickname,
    gender: req.body.gender,
    age: req.body.age,
    height: req.body.height,
  });
  let result2 = await models.Userweight.create({
    userid: req.body.userid,
    weight: req.body.weight,
  });
  console.log(result1);
  console.log(result2);

  res.send(true);
}; // axios요청 한버튼에 두개 -> 각기 다른 DB에 저장되게끔

exports.signupCheckId = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.body.userid,
    },
  }).then((result) => {
    // console.log(req.body);
    // console.log(result);
    if (result === null) {
      res.send(true);
    } else {
      return res.send(false);
    }
  });
};

exports.signupCheckEmail = (req, res) => {
  models.User.findOne({
    where: {
      useremail: req.body.useremail,
    },
  }).then((result) => {
    // console.log(req.body);
    // console.log(result);
    if (result === null) {
      res.send(true);
    } else {
      return res.send(false);
    }
  });
};

exports.mypage = (req, res) => {
  const userSession = req.session.user;
  console.log("MyPage Session >> ", userSession);

  if (userSession !== undefined) {
    res.render("mypage", {
      isLogin: true,
      userid: userSession.userid,
      userpw: userSession.userpw,
      useremail: userSession.useremail,
      nickname: userSession.nickname,
      gender: userSession.gender,
      age: userSession.age,
      height: userSession.height,
      userprofile: userSession.userprofile,
    });
  } else {
    res.send(
      `<script>
      alert('잘못된 접근입니다!!')
      document.location.href = '/'
      </script>`
    );
  }
};

exports.profileUploads = (req, res) => {
  const userSession = req.session.user;
  console.log("응", req.file);
  console.log("애", req.file.path);
  models.User.update(
    {
      userprofile: req.file.path,
    },
    {
      where: { userid: req.body.userid },
    }
  ).then((result) => {
    console.log("사진Edit 성공 >>", result);
    console.log("사진 전", req.session.user);
    if (result) {
      if (result === null) {
        res.send(false);
        return;
      } else {
        req.session.user = {
          isLogin: true,
          userid: userSession.userid,
          userpw: userSession.userpw,
          useremail: userSession.useremail,
          nickname: userSession.nickname,
          gender: userSession.gender,
          age: userSession.age,
          height: userSession.height,
          userprofile: req.file.path,
        };
      }
      console.log("사진 후", req.session.user);
      res.send(req.session.user);
    }
  });
};

exports.mypageEdit = (req, res) => {
  models.User.update(
    {
      userid: req.body.userid,
      userpw: req.body.userpw,
      useremail: req.body.useremail,
      nickname: req.body.nickname,
      gender: req.body.gender,
      age: req.body.age,
      height: req.body.height,
    },
    {
      where: {
        userid: req.body.userid,
      },
    }
  ).then((result) => {
    console.log("UserEdit 성공 >>", result);
    console.log("전", req.session.user);
    if (result) {
      if (result === null) {
        res.send(false);
        return;
      } else {
        req.session.user = {
          isLogin: true,
          userid: req.body.userid,
          userpw: req.body.userpw,
          useremail: req.body.useremail,
          nickname: req.body.nickname,
          gender: req.body.gender,
          age: req.body.age,
          height: req.body.height,
        };
      }
      console.log("후", req.session.user);
      res.send(req.session.user);
    }
  });
};

exports.myweightEdit = (req, res) => {
  // 세션 추가해야함
  models.Userweight.create(
    {
      userid: req.body.userid,
      weight: req.body.weight,
      // date: req.body.date, // 자동으로 찍히게 해서 빼도 될지 의문
    },
    {
      where: {
        userid: req.body.userid,
      },
    }
  ).then((result) => {
    console.log("UserweightEdit 성공 >>", result);

    res.send(true);
  });
};

exports.mypageDelete = async (req, res) => {
  let result1 = await models.User.destroy({
    where: {
      userid: req.body.userid,
      userpw: req.body.userpw,
    },
  });
  let result2 = await models.Userweight.destroy({
    where: {
      userid: req.body.userid,
    },
  });
  console.log("UserDelete 성공 >>", result1, result2);
  req.session.destroy((err) => {
    // 회원탈퇴 후 세션 종료시켜서 로그인 상태 풀기
    if (err) {
      throw err;
    }
    res.send("회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
  });
};
// , {
//   user: result1,
//   userweight: result2,
// }
// 삭제 후 초기화면 렌더링, 회원정보삭제 되었습니다 라는 알림은 프론트에서 작업

exports.logout = (req, res) => {
  if (req.session.user !== undefined) {
    // req.session.destroy(콜백)
    // 콜백안에서 로그아웃 -> /리다이렉트
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  } else {
    // 유저가 브라우저에서 /logout 경로로 직접 접근
    // res.send()
    // - alert('잘못된 접근입니다.)
    // - / 경로로 이동
    res.send(
      `<script>
      alert('잘못된 접근입니다!!')
      document.location.href = '/'
      </script>`
    );
  }
};
