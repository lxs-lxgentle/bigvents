$(function () {
  var state = "已发布";
  $("#caogao").click(function () {
    state = "草稿";
  });
  // 初始化富文本编辑器
  initEditor();
  // 获取分类
  $.get("/my/article/cates", function (res) {
    if (res.status === 0) {
      var strHtml = template("cate", res);
      $("[name=cate_id]").html(strHtml);
      layui.form.render();
    }
  });
  // 1. 初始化图片裁剪器
  var $image = $("#image");
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };
  // 3. 初始化裁剪区域
  $image.cropper(options);
  //   伪造按钮
  $("#chooseImage").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    var fd = e.target.file[0];
    var newImgURL = URL.createObjectURL(fd);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $("#formPub").submit(function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    fd.append("state", state);

    $image
      .cropper("getCroppedCanvas", {
        width: 400,
        height: 200,
      })
      .toBlob(function (blob) {
        fd.append("cover_img", blob);
        $.ajax({
          method: "POST",
          data: fd,
          contentType: false,
          processData: false,
          url: "/my/article/add",
          success: function (res) {
            if (res.status === 0) {
              console.log(res, 2323);
              window.location.href = "/artical/art_list.html";
            }
          },
        });
      });
  });
});
