$(function () {
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在一到六个字符串之间";
      }
    },
  });

  initUserInfo();
  // 获取登录用户信息
  function initUserInfo() {
    $.get("/my/userinfo", function (res) {
      if (res.status === 0) {
        layui.form.val("formInfo", res.data);
      } else {
      }
    });
  }

  // 重置按钮
  $("#btn-reset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });

  $(".layui-btn").submit(function (e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize(), function () {
      if (res.status === 0) {
        window.parent.getUserinfor();
      }
    });
  });
});
