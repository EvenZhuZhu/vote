/**
 * Created by 前端-张瑞康 on 2017/12/14.
 */
$(function () {
  //渲染详情页
  var companyid = Number(request("id"));
  $.ajax({
    type: "get",
    url: "/index/detail",
    dataType: "json",
    data: {
      id: companyid
    },
    success: function (data) {
      console.log(data);
      var str = template("tpl1", data);
      $(".list_xq").append(str);
    },
    error: function () {
      console.log("请求出错啦");
    }
  });
  
  //点击投票，投票数重新获取
  var isClicka = true;
  $('.list_xq').on('touchstart', '.list_xq_btn', function (e) {
    isClicka = true;
  });
  $('.list_xq').on('touchmove', '.list_xq_btn', function (e) {
    isClicka = false;
  });
  $('.list_xq').on('touchend', '.list_xq_btn', function (e) {
    if (isClicka == true) {
      console.log(companyid);
      $.ajax({
        type: "get",
        url: "/index/vote",
        dataType: "json",
        data: {
          companyid: companyid
        },
        success: function (data) {
          console.log(data);
          var str = template("tpl1", data);
          $(".list_xq").append(str);
        },
        error: function () {
          console.log("请求出错啦");
        }
      })
    }
  });
  
  //获取当前页url中参数值的方法
  function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
      return "";
    } else {
      return returnValue;
    }
  }
  
});
