$(function () {
  // link-login
  $("#link-login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  //link-reg-box
  $("#link-reg").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});
