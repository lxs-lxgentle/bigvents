$(function () {
  layui.form.verify({
    len: [/^\S{6,12}$/, "长度必须6到12位，不能有空格"],
    diff: function (value) {
      var oldPwd = $('[name = "oldPwd"]').val();
      if (value === oldPwd) {
        return "新密码不能和原密码相同";
      }
    },
    same: function (value) {
      var newPwd = $('[name = "newPwd"]').val();
      if (value !== newPwd) {
        return "第二个和第三个必须一样";
      }
    },
  });
  $("#changePwd").click(function (e) {
    e.preventDefault();
    $.post("/my/updatepwd", $("#formInfo").serialize(), function (res) {
      if (res.status === 0) {
        //   提示框
        // 重置按钮触发
        $('button[type="reset"]').click();
      } else {
        // 失败
      }
    });
  });
});
//
// 需求： 获取input的最新value值
// 监听输入框的动态变化>边打字边执行
// $('input').on('change',function(e){e.target.value})
