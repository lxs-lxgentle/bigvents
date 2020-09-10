$(function () {
  $("#link-login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-reg").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // layui.form.verify({
  //   password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  //   repassword: function (value) {
  //     // if ($("#reg-psw").val() !== value) {
  //     //   return "密码不一致";
  //     // }
  //     if ($("#reg-psd").val() !== value) {
  //       return "密码不一致";
  //     }
  //   },
  // });
  layui.form.verify({
    //LayUI的验证写法有二
    // 1. 也支持下述数组的形式
    // 2. 既支持上述函数式的方式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

    // login的form的rule
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // reg的form的rule
    repassword: function (value) {
      //value：表单的值
      if ($("#reg-psd").val() !== value) {
        return "密码不一致";
      }
    },
  });

  $("#btn-reg").on("submit", function (e) {
    e.preventDefault();
    var username = $("#reg-username").val();
    var password = $("#reg-psd").val();
    var formdata = {
      username: username,
      password: password,
    };
    $.post("/api/reguser", formdata, function (res) {
      // if (res.status === 0) {
      //   $("#link-reg").click();
      // }

      // layui.layer.msg(res.message);
      // // console.log("res", res.message);
      layui.layer.msg(res.message);
      res.status === 0 && $("#link-reg").click();
    });
  });

  $("#btn-login").on("submit", function (e) {
    e.preventDefault();

    var formdata = $(this).serialize();
    $.post("/api/login", formdata, function (res) {
      if (res.status === 0) {
        window.location.href = "/index.html";
        res.token.length !== 0 &&
          window.localStorage.setItem("token", res.token);
      }
      layui.layer.msg(res.message);
    });
  });
});
