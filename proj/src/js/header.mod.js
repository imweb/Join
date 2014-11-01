/*Header.getInfo(function (data) {
    成功拉到信息(是否登录看is_login)：data ={retcode: 0, "nick_name":"fredwu","learning_sum":1000,"role_type":3,"is_login":1}
    其他错误码:  data = {retcode: 其他;}
});*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'login', 'db', 'report', 'common/html'], factory);
    } else {
        root['Header'] = factory(root['jQuery'], root['Login'], root['DB'], root['report'], root['html']);
    }
}(this, function ($, Login, DB, report, html) {
var Header = (function ($) {
    //var loginPanel = $('#js_login_panel'),
    var mainNav = $("#js_main_nav");

    var fromMe = false;

    var loading;

    var opSet = {
        login: function () {
            fromMe = true;

            Login.show({
                //closeIcon: true,
                proxyUrl: 'http://ke.qq.com/login_proxy.html',
                succUrl: 'http://ke.qq.com/login_proxy.html',
                succ: function () {
                    location.reload();
                },
                close: function () {
                    fromMe = false;
                }
            });
        },
        logout: function () {
            fromMe = true;
            Login.logout();
        }
    };

    function setLoginInfo(logined, nick) {
        var style = ['none', ''];
        $('#js_logout_outer')[0].style.display = style[+logined];
        $('#js_login')[0].style.display = style[1 - logined];
        logined && $('#js_nick').html(nick || '').attr("title", html.decode(nick||''));
    }

    function bindEvent() {
        $('.js-login-op').click(function (e) {
            var op = $(e.target).attr('data-hook');
            if (op) {
                opSet[op]();
            }
        });
        var btnSearch = $('#js_search');
        btnSearch.click(function (e) {
            var keyword = $.trim($('#js_keyword').val());
            if (keyword) {
                keyword = '?word=' + encodeURIComponent(keyword);
            }
            report.tdw({
                action: 'Search-clk',
                ver1: keyword
            });

            window.location = 'http://ke.qq.com/cgi-bin/courseList' + keyword + '&from=1001';
            e.preventDefault();
        });

        $('#js_keyword').keydown(function (event) {
            if(event.keyCode == 13) {
                btnSearch.click();
            }
        });


        $("#js_header_clear").on("click",function(evt){

            $('#js_keyword').val("").focus();
            $(this).hide();
        });
        $('#js_keyword').on("input",function(evt){

            var clear_btn =$("#js_header_clear");

            if(this.value == "")clear_btn.hide();
            else clear_btn.show();

        });
        $('#js_keyword').on("propertychange",function(evt){

            var clear_btn =$("#js_header_clear");

            if(this.value == "" || this.value == $(this).attr("placeholder"))clear_btn.hide();
            else clear_btn.show();
        });
    }
    var navConfig = {
        '/': 1,
        '/index.html': 1,
        '/cgi-bin/courseList': 1,
        '/myCourse.html': 1,
        '/agencyManage.html': 1,
        '/applyLecture.html': 1,
        '/faq.html':1
    };

    function setNavState() {

        var pageName = '/index.html';
        if (navConfig[pageName]) {
            pageName === '/' && (pageName = '/index.html');
            mainNav.find('[data-href="http://ke.qq.com' + pageName + '"]').addClass('focus');
        }
    }

    function convertToQueryString(obj) {
        obj.timestamp = new Date();
        var arr = [];
        for(var i in obj){
            arr.push(i + "=" + encodeURIComponent(obj[i]));
        }
        return arr.join('&');
    }

    function saveState(stateObj) {
        window.name = convertToQueryString(stateObj);

    }

    function getRichInfo() {
        loading = true;
        DB.cgiHttp({
            url: '/cgi-bin/login/userinfo',
            noNeedLogin: true,
            succ: function (data) {

                loading = false;
                data = data.result;
                if (mainNav.length) {

                    var stateObj;
                    if (data.is_login) {
                        var roleType = parseInt(data.role_type) || 0,
                            nick = data.nick_name;
                        //roleType = 1;
                        //角色 1=机构，2=老师，3普通用户，4 机构管理员
                        //打开机构管理
                        //window.name = 'role=' + roleType;
                        stateObj = {role: roleType, nick: nick, uin: $.cookie.uin()};

                        if (roleType === 1){
                            mainNav.attr('class', 'nav js-agency-role');
                        } else if (roleType === 3){
                            mainNav.attr('class', 'nav js-normal-role');
                            //打开机构入驻
                        }
                        else if(roleType === 2){
                            mainNav.attr('class', 'nav js-teacher-role');
                        }
                        //setLoginInfo(nick);
                        setLoginInfo(1, nick);

                    } else {
                        stateObj = {role: 0};
                        //打开机构入驻
                        mainNav.attr('class', 'nav js-unknown-role');
                        setLoginInfo(0);

                    }
                    saveState(stateObj);
                }
                data.retcode = 0;

                userInfo = data;
                doTask();


            },
            err: function (data) {
                loading = false;
                userInfo = data;
                doTask();
                if (!Login.isLogin()) {
                    saveState({role: 0});
                    setLoginInfo(0);

                }
                return true;
            }
        });
    }

    function setPlaceholder() {

        if (!$.fn.placeholder) {
            var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]',
                isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;

            !isInputSupported &&
            $.getScript('http://7.url.cn/edu/js/1.2.0/jquery.placeholder.js', function () {
                $.fn.placeholder && $('#js_keyword').placeholder();
            });

        } else {
            $('#js_keyword').placeholder();
        }
    }



    function init() {

        Login.init({
            onStatusChanged: function () {
                var logined = Login.isLogin();
                if (!logined) {
                    saveState({role: 0});
                }
                if (fromMe || !logined) return;
                getRichInfo();
            }
        });

        getRichInfo();


        if (!mainNav.length) return;

//        setNavState();
        bindEvent();

        var keyword = $.bom.query('word');
        if (keyword) $('#js_keyword').val(keyword);

        setPlaceholder();
        //openNewTab();
        //根据页面地址及角色展示导航栏
    }

    // init();

    var userInfo;

    var queue = [];

    function doTask() {
        var bk = queue;
        queue = [];
        $(bk).each(function (i, e) {
            typeof e === 'function' && e(userInfo);
        });
    }

    return {
        getInfo: function (cb) {
            //console.log('getInfo');

            setTimeout(function () {
                if (loading) {
                    queue.push(cb);
                } else {
                    cb(userInfo);
                }
            }, 0)


        },
        init: init
    };
}($));
    return Header;
}));
