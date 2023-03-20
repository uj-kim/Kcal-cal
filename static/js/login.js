function postLogin() {
  const form_login = document.forms["form_login"];
  // const idValue = document.querySelector("#id");
  // const pwValue = document.querySelector("#pw");

  axios({
    method: "POST",
    url: "/login",
    data: {
      userid: form_login.id.value,
      userpw: form_login.pw.value,
    },
  }).then((res) => {
    console.log(res.data);
    if (!res.data) {
      alert("로그인 실패!");
      window.location.href = "/login";
      return;
    } else {
      window.location.href = "/main";
    }
  });
  // .then((data) => {
  //   if (data) {
  //     alert("로그인 실패!");
  //     window.location.href = "/login";
  //     return;
  //   } else {
  //     window.location.href = "/main";
  //   }
  // });
}

function lookup() {
  const form_findId = document.forms["form_findId"];
  // findUseremail 인풋박스 id
  //console.log(form.findUseremail.value);
  //   if (!form.checkValidity()) {
  //     form.reportValidity();
  //     return;
  //   }

  axios({
    method: "POST",
    url: "/login/findId",
    data: {
      useremail: form_findId.findUseremailID.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      document.querySelector("#showId").textContent = `${data}`;
      //document.getElementById("findUseremail").value = "";
    });
}

//비밀번호 찾기

function sendEmail() {
  const form_findPw = document.forms["form_findPw"];

  //   if (!form.checkValidity()) {
  //     form.reportValidity();
  //     return;
  //   }

  axios({
    method: "POST",
    url: "/login/mail",
    data: {
      useremail: form_findPw.findUseremailPW.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        document.querySelector("#showResult").textContent =
          "인증번호가 발송되었습니다";
        return;
      } else {
        document.querySelector("#showResult").textContent =
          "해당하는 이메일을 찾을 수 없습니다.";
        return;
      }
    });
}

//모달창 닫았을 때 input값 초기화
$(".modal").on("hidden.bs.modal", function (e) {
  console.log("modal close");
  $(this).find("form")[0].reset();
});

function pressEnter(e) {
  if (e.key === "Enter") {
    postLogin();
  }
}
