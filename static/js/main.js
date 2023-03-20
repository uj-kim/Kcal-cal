// function crawler 크롤러 값 리스트에 작성
const form = document.forms["search"];
function inputInformation() {
  axios({
    method: "POST",
    url: "/",
    data: {
      search: form.search.value,
    },
  })
    .then((res) => {
      return (data = res.data);
    })
    .then((data) => {
      const keys = Object.keys(data);
      const value = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        value[i] = data[key];
      }
    });

  // 이것도 무슨 코드이지?
  //function kcal gage  칼로리 값 게이지에 적용
  // function addKcal(kcal) {
  //   console.log("kcal", kcal);
  //   const kcalTotal = 1700;
  //   let container1Wedge = document.querySelector(".container1 .wedge");
  //   let container2Wedge = document.querySelector(".container2 .wedge");
  //   let markerEnd = document.querySelector(".end");

  //   let kcalPercent = (kcal / kcalTotal) * 100;
  //   let anglePercent = kcalPercent;
  //   let angle = (anglePercent / 100) * 360;

  //   let caculate;
  //   let caculate2;

  //   if (container1Wedge.style.transform == "") {
  //     caculate = 0;
  //   } else {
  //     caculate = Number(
  //       String(container1Wedge.style.transform).replace(/[^0-9.]/g, "")
  //     );
  //   }

  //   if (container2Wedge.style.transform == "") {
  //     caculate2 = 0;
  //   } else {
  //     caculate2 = Number(
  //       String(container2Wedge.style.transform).replace(/[^0-9.]/g, "")
  //     );
  //   }

  //   if (caculate2 >= 180) {
  //     container2Wedge.style.transform = "rotateZ(180deg)";
  //     container1Wedge.style.transform = "rotateZ(180deg)";
  //   } else if (caculate >= 180) {
  //     container1Wedge.style.transform = "rotateZ(180deg)";
  //     container2Wedge.style.transform = `rotateZ(${angle + caculate2}deg)`;
  //     markerEnd.style.transform = `rotateZ(${angle + caculate + caculate2}deg)`;
  //   } else {
  //     container1Wedge.style.transform = `rotateZ(${angle + caculate}deg)`;
  //     markerEnd.style.transform = `rotateZ(${angle + caculate}deg)`;
  //   }

  //   console.log("caculate>>", caculate);
  //   console.log("caculate2>>", caculate2);
  // }

  function closeWin() {
    var chk = document.getElementById("Notice");
    if (chk.checked) {
      setCookie("Notice", "done", 1);
    }
  }
  if (getCookie("Notice") == "done") {
    hidebox();
  }
}

//높이 맞추기
// var boxHeight = $("article.search").outerHeight();
// $("article.eat").css("height", boxHeight);

// $(window).resize(function () {
//   $("article.search").css("height", "auto");
//   boxHeight = $("article.search").outerHeight();
//   $("article.eat").css("height", boxHeight);
// });
