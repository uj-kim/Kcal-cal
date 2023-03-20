$(document).off("keypress");
$(document).on("keypress", function (event) {
  if (event.keyCode === 13) {
    $("#Btn").click();
  }
});
