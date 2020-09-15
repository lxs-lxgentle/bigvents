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
  template.defaults.imports.formDate = function (oddate) {
    var timenew = moment(oddate).format("MMMM Do YYYY, h:mm:ss a");
    return timenew;
  };
  //   template.defaults.imports.formDate = function (str) {

  //     return str+'$';
  //   };
  initList();
  function initList() {
    $.get("/my/article/list", q, function (res) {
      if (res.state === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      }
    });
  }
});
