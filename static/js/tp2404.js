$(function () {
  var jDownload = $('.J_downloadUrlAll');
  var keyID = Infoc.queryString('keyID') || 90759;
  var sfrom = Infoc.queryString('sfrom') || 166;
  var commonDown = $('.J_commonDown');
  var pathnameArr = window.location.pathname.split('/');
  var pageID = pathnameArr[pathnameArr.length - 1].split('.')[0].substring(1).toString();

  var infocFun = {
    infoc: Infoc.b('daohang'),
    infoConfigShow: {
      business_index: 188, // dhsite_sem_db
      stat: 0, //网页状态：0访问 ，1点击
      source: 19, // 专题类型， 19为 软件定制模板
      clickbutton: 0, //点击网页的按钮上报
      shichang: 0, // 时长
      feedback: '', // 反馈
      contactqq: '', // 联系qq
      channel: pageID, // 渠道
      reserve: parseInt(keyID) || 0, //保留字段1
      reserve2: sfrom || '' //保留字段2
    },
    init: function () {
      //埋点
      infocFun.infoc.report(infocFun.infoConfigShow);

      $('body').on('click', '.J_downloadUrlAll, .J_commonDown', function () {
        infocFun.infoConfigShow.stat = 1;
        var status = $(this).attr('status')
        infocFun.infoConfigShow.clickbutton = status;
        infocFun.infoc.report(infocFun.infoConfigShow);
      });
    }
  }
  infocFun.init()
  // 
  $(window).on('load', function () {
    setTimeout(function () { // 延时确保 loadEventEnd 已更新
      var loadTime;

      // 检查是否支持 performance.timing API
      if (window.performance && window.performance.timing) {
        // 使用 performance.timing API 获取更精确的结果
        var timing = window.performance.timing;
        loadTime = (timing.loadEventEnd - timing.navigationStart);
      } else {
        // 备用方案：使用 Date 获取大致的加载时长
        var endTime = new Date().getTime();
        loadTime = (endTime - globalStartTime);
      }
      // 输出页面加载时长
      console.log(loadTime);
      infocFun.infoConfigShow.stat = 78;
      infocFun.infoConfigShow.feedback = loadTime.toString() || '';
      infocFun.infoc.report(infocFun.infoConfigShow);
    }, 0);
  });
  /* 
   DTS=1(隐藏双按钮)
   DTS=0或者别的值或者不填(显示双按钮) */
  var downTypeShow = Infoc.queryString('DTS') || ''
  if (downTypeShow == 9) {
    $('#J_downType').hide()
  } else {
    $('#J_downType').show()
  }
  // 弹窗
  $('body').on('click', '#J_commonBtn', function () {
    $('#J_alertBox').show();
  })
  $('body').on('click', '#J_alertClose', function () {
    $('#J_alertBox').hide();
  })
  //  确认
  var checkTypeShow = Infoc.queryString('check') || ''
  if (checkTypeShow === '1') {
    $('.J_check').show()
    $('.J_checkD').hide()
  } else {
    $('.J_check').hide()
    $('.J_checkD').show()
  }
  // 确认弹窗
  $('body').on('click', '.J_check', function () {
    $('#J_checkBox').show();
  })
  $('body').on('click', '#J_checkClose, .J_checkDown', function () {
    $('#J_checkBox').hide();
  })

  // 安全提示
  var sfromS = Infoc.queryString('sfrom') || '166';
  var sfromST = Infoc.queryString('sfromT') || '0';
  if (sfromS == '216' && sfromST == '1') {
    $('#J_tips').show()
    $('body').on('click', '#J_tipsClose', function () {
      $('#J_tips').hide()
    })
  }
  // 轮播 
  var swiper1 = new Swiper(".swiper-container2", {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper1,
    },
  });
  var mySwiper3 = new Swiper('.swiper-container3', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    autoplay: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        var index = this.activeIndex;
        var navItem;
        $('.keyword-item').removeClass('active');

        if (index === 5) {
          navItem = $('.keyword-item').eq(0);
        } else {
          navItem = $('.keyword-item').eq(index - 1);
        }
        navItem.addClass('active');
      }
    }
  });
  $('.keyword-item').mouseenter(function () {
    var index = $('.keyword-list ul').find(this).index();
    mySwiper3.slideToLoop(index, 1000, false);
    mySwiper3.autoplay.stop();
  });
  $('.keyword-item').mouseleave(function () {
    mySwiper3.autoplay.start();
  });
  // 懒加载
  $(".lazyload").lazyload();
})