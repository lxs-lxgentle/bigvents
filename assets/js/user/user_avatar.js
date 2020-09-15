$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  $("#btn-upload").on("click", function () {
    $("#file").click();
  });
  $("#file").click(function (e) {
    // e.target获取当前的input：file这个DOM=>

    //1.获取图片对象
    var file = e.target.files[0];
    // 2. 根据选择的文件，创建一个对应的 URL 地址：
    // URL:统一资源定位符->资源路径
    var newImgUrl = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $("#sure").on("click", function (e) {
    e.preventDefault();
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        height: 100,
        width: 100,
      })
      .toDataURL("image/png");
    $.post("/my/update/avatar", { avatar: dataURL }, function (res) {
      if (res.status === 0) {
        window.parent.getUserinfor();
      }
    });
  });
});
