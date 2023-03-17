$(document).ready(function () {
  var op = false; // 네비가 열려있으면(true), 닫혀있으면(false)

  $(".menu_ham").click(function (e) {
    e.preventDefault();

    if (op == false) {
      $("#headerArea").addClass("mn_open");
      $("#gnb").addClass("gnb_open");
      op = true;
    } else {
      $("#headerArea").removeClass("mn_open");
      $("#gnb").removeClass("gnb_open");
      op = false;
    }
  });
});
