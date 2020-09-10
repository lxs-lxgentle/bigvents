$(function () {
  $("#link-login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-reg").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  layui.form.verify({
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repassword: function (value) {
      // if ($("#reg-psw").val() !== value) {
      //   return "密码不一致";
      // }
      if ($("#reg-psd").val() !== value) {
        return "密码不一致";
      }
    },
  });

  $("#form-reg").on("submit", function (e) {
    e.preventDefault();
    var username = $("#reg-username").val();
    var password = $("#reg-psw").val();
    var formdata = {
      username: username,
      password: password,
    };
  });
  $.post("http://ajax.frontend.itheima.net/api/reguser", formdata, function (
    res
  ) {
    if (res.status === 0) {
      console.log(res, message);
    } else {
      console.log(res, message);
    }
  });
});
