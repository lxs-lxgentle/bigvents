$(function () {
  $.ajax({
    url: "/my/userinfo",
    success: function (res) {
      var resname = res.data.nickname || res.data.username;
      $("#welcome").html(resname);
      if (res.data.use_pic) {
        $(".layui-nav-img").attr("src", res.data.use_pic).show();
        $(".text-avatar").hide();
      } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").html(resname[0].toUppercase());
      }
    },
  });

  $("#btn-logout").click(function (e) {
    e.preventDefault();
    layui.layer.confirm("确定退出?", { icon: 3, title: "提示" }, function (
      index
    ) {
      window.localStorage.removeItem("token");
      window.location.href = "/login.html";
      layer.close(index);
    });
  });
});
