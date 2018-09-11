/**
 * Created by 前端-张瑞康 on 2017/12/14.
 */
$(function () {
  
  //判断浏览器是否是微信登陆
  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  
  //参赛企业数据获取
  $.ajax({
    type: "get",
    url: "/index/index",
    dataType: "json",
    success: function (data) {
      console.log(data);
      var str = template("tpl", data);
      $(".list>ul").html(str);
      //投票列表前三标识颜色
      $(".list ul li i").eq(0).css({"background-color": "#df2132"});
      $(".list ul li i").eq(1).css({"background-color": "#f1583a"});
      $(".list ul li i").eq(2).css({"background-color": "#0774c1"});
    },
    error: function () {
      console.log("请求出错啦");
    }
  });
  
  //点击投票
  var isClicka = true;
  var flag = 0;
  $('.list ul').on('touchstart', 'li .icon', function (e) {
    isClicka = true;
  });
  $('.list ul').on('touchmove', 'li .icon', function (e) {
    isClicka = false;
  });
  $('.list ul').on('touchend', 'li .icon', function (e) {
    if (isClicka == true) {
      var $now = $(this).parent("li");
      var id = $now.attr("id");
      console.log($now);
      console.log(id);
      $.ajax({
        type: "get",
        url: "/index/vote",
        dataType: "json",
        data: {
          companyid: id
        },
        success: function (data) {
          console.log(data);
          // 弹出框
          if (data.status == 0) {
            $('.zhezhao,.cg_box').addClass('block');
            flag = 1;
            //监听滚动事件
            document.addEventListener('touchmove', function (event) {
              //判断是遮罩显示时执行，禁止滚屏
              if (flag == 1) {
                event.preventDefault();
              }
            });
            $('.gb_icn,.queding').click(function () {
              $('.cg_box,.zhezhao').removeClass('block');
              flag = 0;
            })
          } else if (data.status == 1) {
            $('.zhezhao1,.cg_box1').addClass('block');
            flag = 1;
            //监听滚动事件
            document.addEventListener('touchmove', function (event) {
              //判断是遮罩显示时执行，禁止滚屏
              if (flag == 1) {
                event.preventDefault();
              }
            });
            $('.gb_icn1,.queding1').click(function () {
              $('.cg_box1,.zhezhao1').removeClass('block');
              flag = 0;
            })
          }
          
          // 点击后参赛企业数据渲染
          var str = template("tpl", data);
          $(".list>ul").html(str);
          //投票列表前三标识颜色
          $(".list ul li i").eq(0).css({"background-color": "#df2132"});
          $(".list ul li i").eq(1).css({"background-color": "#f1583a"});
          $(".list ul li i").eq(2).css({"background-color": "#0774c1"});
          
        },
        error: function () {
          console.log("请求出错啦");
        }
      })
    }
  });
  
  //点击向下滑动箭头
  $('.ljcytp>a,.arrow>a').click(function () {
    var height = $(".banner").height();
    $('body,html').animate({'scrollTop': height}, 500)
  });
  
  //花瓣特效
  $(document).snowfall('clear');
  $(document).snowfall({
    image: "images/huaban.png",
    flakeCount: 30,
    minSize: 5,
    maxSize: 22
  });
  
  
});


