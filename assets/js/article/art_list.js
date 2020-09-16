$(function () {
  var q = {
    pagenum: 1,
    // pagenum	是	int	页码值
    pagesize: 2,
    // pagesize	是	int	每页显示多少条数据
    cate_id: "",
    // cate_id	否	string	文章分类的 Id
    state: "",
    // state	否	string	文章的状态，可选值有：已发布、草稿
  };
  template.defaults.imports.formatDate = function (oddate) {
    var timenew = moment(oddate).format("MMMM Do YYYY, h:mm:ss a");
    return timenew;
  };
  //   template.defaults.imports.formDate = function (str) {

  //     return str+'$';
  //   };
  initList();
  function initList() {
    $.get("/my/article/list", q, function (res) {
      if (res.status === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
        renderPage(res.total);
      }
    });
  }

  inicate();
  function inicate() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        var strHtml = template("tpl-cate", res);
        $("#sct-cate").html(strHtml);
        layui.form.render();
      }
    });
  }
  $("#form-search").submit(function (e) {
    e.preventDefault();
    q.cate_id = $("[name = cate_id]").val();
    q.state = $("[name = state]").val();
    initList();
  });

  function renderPage(total) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;
      laypage.render({
        elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        curr: q.pagenum, // 当前页码
        limit: q.pagesize, //  每页条数

        limits: [2, 3, 5, 10], // 切换每页条数pagesize
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        jump: function (obj, first) {
          if (!first) {
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            initList();
          } else {
          }
        },
      });
    });
  }

  // 删除分类
  // $("tbody").on("click", ".delete", function (e) {
  // e.preventDefault();
  // // 获取id
  // var Id = $(this).attr("data-id");
  // var len = $(".delete").length;

  // // 确认框
  // layer.confirm("Sure?", { icon: 3, title: "删除文章" }, function (index) {
  //   // ajax
  //   $.get(`/my/article/delete/${Id}`, function (res) {
  //     if (res.status === 0) {
  //       if (len === 1) {
  //         // 改变页码pagenum
  //         q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
  //       }
  //       layer.close(index);
  //       initList();
  //     }
  //   });
  // });

  $("tbody").on("click", ".delete", function (e) {
    e.preventDefault();
    var Id = $(this).attr("data-id");
    var len = $(".delete").length;

    layer.confirm("Sure?", { icon: 3, title: "删除文章" }, function (index) {
      $.get(`/my/article/delete/${Id}`, function (res) {
        if (res.status === 0) {
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          layer.close(index);
          initList();
        }
      });
    });
    // });
  });
});
