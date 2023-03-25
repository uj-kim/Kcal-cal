function fileUpload() {
  const formData = new FormData();
  const file = document.getElementById("profileUpload");
  const userid = document.getElementById("userid").value;
  // console.log(file.files[0]);
  // console.log(file.files[0].name);
  // console.log(userid);
  formData.append("profileUpload", file.files[0]);
  formData.append("userid", userid);
  // console.log(formData);
  const uploadInput = document.querySelector(".upload-name").value;
  console.log(uploadInput);

  if (uploadInput === "첨부파일") {
    alert("선택된 사진이 없습니다! 사진을 선택해 주세요!");
    return;
  } else {
    axios({
      method: "POST",
      url: "/profileUpload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      // Swal.fire({
      //   icon: "success",
      //   title: "사진 수정되었습니다.",
      //   showConfirmButton: false,
      // });
      if (res) {
        alert("회원님의 프로필사진이 수정되었습니다!");
        window.location.href = "/mypage";
        return;
      } else {
        alert("회원님의 프로필사진 수정에 실패했습니다. 다시 시도해주세요!");
        window.location.href = "/mypage";
      }
      // setTimeout(function () {
      //   location.reload();
      // }, 800);
    });
  }
}

$("#profileUpload").on("change", function () {
  var fileName = $("#profileUpload").val();
  $(".upload-name").val(fileName);
});

$.fn.setPreview = function (opt) {
  "use strict";
  var defaultOpt = {
    inputFile: $(this),
    img: null,
    w: 200,
    h: 200,
  };
  $.extend(defaultOpt, opt);

  var previewImage = function () {
    if (!defaultOpt.inputFile || !defaultOpt.img) return;

    var inputFile = defaultOpt.inputFile.get(0);
    var img = defaultOpt.img.get(0);

    // FileReader
    if (window.FileReader) {
      // image 파일만
      if (!inputFile.files[0].type.match(/image\//)) return;

      // preview
      try {
        var reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
          img.style.width = defaultOpt.w + "px";
          img.style.height = defaultOpt.h + "px";
          img.style.display = "";
        };
        reader.readAsDataURL(inputFile.files[0]);
      } catch (e) {
        // exception...
      }
      // img.filters (MSIE)
    } else if (img.filters) {
      inputFile.select();
      inputFile.blur();
      var imgSrc = document.selection.createRange().text;

      img.style.width = defaultOpt.w + "px";
      img.style.height = defaultOpt.h + "px";
      img.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\"" +
        imgSrc +
        '")';
      img.style.display = "";
      // no support
    } else {
      // Safari5, ...
    }
  };

  // onchange
  $(this).change(function () {
    previewImage();
  });
};

$(document).ready(function () {
  var opt = {
    img: $("#img_preview"),
    w: 200,
    h: 200,
  };

  $("#input_file").setPreview(opt);
});

const form = document.forms["form_mypage"];
//닉네임글자수제한(16byte)
function fnChkByte(obj, maxByte) {
  var str = obj.value;
  var str_len = str.length;

  console.log(str);
  var rbyte = 0;
  var rlen = 0;
  var one_char = "";
  var str2 = "";

  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글 2byte
    } else {
      rbyte++; // 나머지 1byte
    }

    if (rbyte <= maxByte) {
      rlen = i + 1; // return 할 문자열 갯수
    }
  }
  if (rbyte > maxByte) {
    alert("닉네임은 영문, 숫자 16자(한글 8자)를 초과할 수 없습니다.");
    str2 = str.substr(0, rlen);
    obj.value = str2;
    fnChkByte(obj, maxByte);
  } else {
    return;
  }
}

//회원수정
function editInfo() {
  //비밀번호정규식
  let regPw =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  console.dir(form);

  if (form.nickname.value == "") {
    alert("닉네임을 입력해주세요.");
    document.querySelector("#nickname").focus();
    return;
  }
  if (form.age.value == "") {
    alert("나이를 입력해주세요.");
    document.querySelector("#age").focus();
    return;
  } else if (form.age.value < 14 || form.age.value > 99) {
    alert("나이는 14세 이상 99세 이하로 입력가능합니다.");
    document.querySelector("#age").focus();
    return;
  }
  if (form.height.value == "") {
    alert("키를 입력해주세요.");
    document.querySelector("#height").focus();
    return;
  } else if (form.height.value < 100 || form.height.value > 230) {
    alert("키는 100cm 이상 230cm 이하로 입력 가능합니다");
    document.querySelector("#height").focus();
    return;
  }

  if (form.userpw.value == "") {
    alert("비밀번호를 입력해주세요.");
    userpw.focus();
    return false;
  } else if (!regPw.test(form.userpw.value)) {
    alert(
      "비밀번호는 공백을 제외한 최소 8자 최대 16자 이내 숫자, 영문, 특수문자를 모두 포함하여 작성해주세요."
    );
    userpw.focus();
    return false;
  }

  if (form.checkpw.value == "") {
    alert("비밀번호 확인이 필요합니다.");
    checkpw.focus();
    return false;
  }

  if (form.userpw.value !== form.checkpw.value) {
    alert("비밀번호가 일치하지 않습니다.");
    checkpw.focus();
    return false;
  }

  axios({
    method: "POST",
    url: "/mypage/edit",
    data: {
      userid: form.userid.value,
      userpw: form.userpw.value,
      useremail: form.useremail.value,
      nickname: form.nickname.value,
      gender: form.gender.value,
      age: form.age.value,
      height: form.height.value,
      userprofile: form.profileUpload.path,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        console.log(data);
        alert(`${data.nickname}님의 회원정보가 성공적으로 변경되었습니다!`);
        document.location.href = "/main";
        return;
      } else {
        return false;
      }
    });
}

function delInfo() {
  if (form.checkpw.value == "") {
    alert("비밀번호 확인이 필요합니다.");
    checkpw.focus();
    return false;
  }

  if (!confirm("정말 탈퇴하시겠습니까?")) {
    return;
  } else {
    axios({
      method: "DELETE",
      url: "/mypage/delete",
      data: {
        userid: form.userid.value,
        userpw: form.userpw.value,
      },
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        alert(data);
        window.location.href = "/";
      });
  }
}
