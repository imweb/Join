(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define([
	        'jquery',
            'jsRoot/db.main' ,
            // 'jsRoot/template/modules',
            'common/html',
            'common/xss',
            'common/strEllipsis',
            'jsRoot/mod/zoompic.mod'
        ], factory);
    } else {}
}(this, function ($, DB, html, xss, strEllipsis,ZoomPic) {

    var backgrounds = ["http://9.url.cn/edu/activity/lectureroom/img/post_1.jpg",
                    "http://9.url.cn/edu/activity/lectureroom/img/post_2.jpg",
                    "http://9.url.cn/edu/activity/lectureroom/img/post_3.jpg",
                    "http://9.url.cn/edu/activity/lectureroom/img/post_4.jpg",
                    "http://9.url.cn/edu/activity/lectureroom/img/post_5.jpg",
                    "http://9.url.cn/edu/activity/lectureroom/img/post_6.jpg",
                    "http://9.url.cn/edu/activity/lectureroom/img/post_7.jpg"],
        colors = ["#831e34","#3a6d10","#001520","#143b6a","#640c63","#ecd4a6","#e8cfa3"],
        positions = ["-177px -294px","-11px -294px","-689px -294px","-689px -294px","-514px -294px","-344px -294px","-344px -294px"],

        $navImage = $("#mod-nav"),
        $todayWraper = $("#mod-main__today"),
        $recWraper = $("#recommend-wraper"),
        $celebrityWraper = $("#celebrity-wraper"),
        $menuElem = $('.mod-nav__menu ul');

    function isIE6(){
        return !!window.ActiveXObject&&!window.XMLHttpRequest;
    }

    function bindNav(options){
        var $container = options.$elem;
        if(isIE6()){
            $container.on("mouseenter","li a",function(e){
                e.preventDefault();
                $(this).css({
                    "color":"#188eee",
                    "cursor":"pointer",
                    "background":"url(../img/banner_bg.png) top left no-repeat"
                });
            });

            $container.on("mouseleave","li a",function(e){
                e.preventDefault();
                if(!$(this).hasClass("active"))
                $(this).css({
                        "color":"#333",
                        "background":"none"
                    });
                });
            }

        $container.on("click","li a",function(e){
            var index = parseInt($(this).attr("data"),10);
            e.preventDefault();
            slideToMenu(index);
        });
    }

    function bindFloat(options){
        var $container = options.$elem;
        $container.on("mouseenter",".share-normal",function(){
            $(this).hide();
            $container.find(".share-hover").show();
        });
        $container.on("mouseleave",".share-hover",function(){
            $(this).hide();
            $container.find(".share-normal").show();
        });
    }

    function toggleHtml(json,index){
        var data = json.bannerList||{};
        data.strEllipsis=strEllipsis
        data.index = index;

        // $todayWraper.html(TmplInline_modules.today_wraper({data:data}));
        // $recWraper.html(TmplInline_modules.rec_wraper({data:data}));
        // $celebrityWraper.html(TmplInline_modules.celebrity_wraper({data:data}));
    }

    function renderPage(cb) {

        _this.bindNav(_this.id);
        _this.initSlide(_this.id);
        _this.bindFloat();

        slideToMenu(1);
    }

    //切换到排序目录
    function slideToMenu(index){
        var $container = $('.mod-nav__menu ul'),
            $curElem = $container.find("[data="+index+"]"),
            $modNav = $curElem.closest("#mod-nav"),
            $figName = $modNav.find(".fig-name");

        if(isIE6()){
            $curElem.closest("ul").find(".active").css({
                "color":"#333",
                "background":"none"
            });
            $curElem.css({
                "color":"#188eee",
                "cursor":"pointer",
                "background":"url(../img/banner_bg.png) top left no-repeat"
            });
        };

        //切换banner背景
        $modNav.css({
            "background":"url("+backgrounds[index]+") center no-repeat",
            "background-color":colors[index]},1000);


        $container.find("li a").removeClass("active");
        $curElem.addClass("active");

        _this.slide.imageChange(index);
        toggleHtml(_this.jsonData,index);
    }

    function renderError(){

    }

    function filter(obj){
        return typeof(obj) == "undefined"||obj.length == 0?{}.toString():obj;
    }

    var _this={
        jsonData:{},
        slide:null,
        id:null,
        init: function(id){
            _this.id=id;
            renderPage();
        },

        initSlide:function(id){
            _this.slide = ZoomPic.init(id);
        },

        bindNav:function(){
            var options = {
                $elem: $('.mod-nav__menu ul')
            };
            bindNav(options);
        },
        bindFloat:function(){
            var options = {
                $elem: $('#share-menu')
            };
            bindFloat(options);
        }
    }
    
    return {
        init:function(id){
            _this.init(id);
        }
    };
}));
