$(function () {
  iniTable();
  function iniTable() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      }
    });
  }

  var addIndex = 0;
  var editIndex = 0;

  $("#addBtn").on("click", function (e) {
    e.preventDefault();
    var strAddHtml = $("#tpl-add").html();
    addIndex = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      // content的值是很多标签->手写没提示->tempalte
      // content: '<form class="form"><div><input/><input/></div></form>',
      content: strAddHtml,
    });
  });
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    $.post("/my/article/addcates", formdata, function (res) {
      if (res.status === 0) {
        layui.layer.close(addIndex);
      }
      iniTable();
    });
  });

  $("tbody").on("click", ".btn-edit", function (e) {
    e.preventDefault();
    var strEdiHtml = $("#tpl-edit").html();
    editIndex = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "编辑文章分类",
      content: strEdiHtml,
    });
    var Id = $(this).attr("data-id");
    $.get(`/my/article/cates/${Id}`, function (res) {
      if (res.status === 0) {
        layui.form.val("editForm", res.data);
      }
    });
  });

  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    $.post("/my/article/updatecate", formdata, function (res) {
      if (res.status === 0) {
        layui.layer.close(editIndex);
        iniTable();
      }
    });
  });
  $("tbody").on("click", ".btn-delete", function (e) {
    e.preventDefault();
    var Id = $(this).attr("data-id");
    layer.confirm("Sure?", { icon: 3, title: "真的要把我删除嘛？" }, function (
      index
    ) {
      $.get(`/my/article/deletecate/${Id}`, function (res) {
        if (res.status === 0) {
          iniTable();
          layer.close(index);
        }
      });
    });
  });
});
