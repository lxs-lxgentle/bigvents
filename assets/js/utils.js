// 公共的js代码（工具函数）

var token = window.localStorage.getItem("token") || "";

// 1. 提取公共的baseUrl
// 请求拦截器
//  1.1 login请求一进来  携带者请求的选项 success、url等
$.ajaxPrefilter(function (options) {
  //  一、baseUrl
  //  设置选项  url
  // 当login请求发起时，传入/api/login  =====>  options.url
  // 项目的请求根路径为 http://ajax.frontend.itheima.net
  // options.url  ->  /api/login
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // options.url  = 'http://ajax.frontend.itheima.net' +  /api/login

  // 二、统一设置请求头
  if (!options.url.includes("/api/")) {
    options.headers = {
      Authorization: token,
    };
  }
  // console.log(options.headers);
  // var token = window.localStorage.getItem("token") || '';
  // $.ajaxPrefilter(function (options) {
  //   options.url = "http://ajax.frontend.itheima.net" + options.url;
  //   options.hearders = {
  //     Authorization: token,
  //   };
  // });]
  //判断token 有无
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      window.localStorage.removeItem("token");
      window.location.href = "./login.html";
    } else {
    }
  };
});
