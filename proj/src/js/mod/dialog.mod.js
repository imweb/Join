(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define([
	        'jquery',
            'jsRoot/db.main' ,
            'jsRoot/template/modules',
            'common/html',
            'common/xss',
            'common/strEllipsis',
            'jsRoot/dialog'
        ], factory);
    } else {}
}(this, function ($, DB, TmplInline_modules, html, xss, strEllipsis) {

    function initEditor(options){
        var $container = options.$elem;

        function renderError(error){
            var msg = error||"您的网络不给力哦!";
            setTimeout(function(error){
                $.Dialog.show({
                    title:"<div>提示</div>",
                    submit:'确定',
                    content:'<div id="g-dialog">'+msg+'</div>',
                    onAccept: function(){
                        $(this).remove();
                    }
                });
            },100);
        }
        function renderSucc(succ){
            var msg = succ||"提交成功!";
            $.Dialog.show({
                title:"<div>提示</div>",
                submit:'确定',
                content:'<div id="g-dialog">'+msg+'</div>',
                onAccept: function(){
                    $(this).remove();
                }
            });
        }

        //邀请名人事件
        $container.on("click","#invite-menu",function(){
            $.Dialog.show({
                title: "<div>邀请名人</div>",
                submit: "提交",
                isDisabled: true,
                content: TmplInline_modules.dialog_invite(),
                onCancel: function(){
                    $(this).remove();
                },
                onAccept: function(){
                    $(this).remove();
                    var param = {
                        "name":$("#invite-name").val(),
                        "info":$("#invite-info").val()
                    };
                    if(param.name.length == 0 || param.info.length == 0 ){
                        renderError("请输入要邀请的名人和邀请理由!");
                    }else{
                        DB.post_invite({
                            param:param,
                            succ: function (ret) {
                                if (ret.retcode != 0) {
                                    renderError(ret.msg);
                                    return;
                                }else if(ret.retcode != 1){
                                    renderSucc(ret.msg);
                                }
                            },
                            err: function (result) {
                                renderError();
                            }
                        });
                    }
                }
            });
        });

        //申请加入事件
        $container.on("click","#join-menu",function(){
            $.Dialog.show({
                title: "<div>申请加V</div>",
                submit: "提交",
                isDisabled: true,
                content: TmplInline_modules.dialog_join(),
                onCancel: function(){
                    $(this).remove();
                },
                onAccept: function(){
                    var param = {
                        "name": $("#join-name").val(),
                        "contact": $("#join-contact").val(),
                        "info": $("#join-desc").val()
                    };
                    if(param.name.length == 0 || param.contact.length == 0 || param.info.length == 0){
                        renderError("请输入您的姓名、联系方式和简介!");
                    }else{
                        DB.post_join({
                            param:param,
                            succ: function (ret) {
                                if (ret.retcode != 0) {
                                    renderError(ret.msg);
                                    return;
                                }else if(ret.retcode != 1){
                                    renderSucc(ret.msg);
                                }
                            },
                            err: function (result) {
                                renderError();
                            }
                        });
                    }
                }
            });
        });
    }

    function filter(obj){
        return typeof(obj) == "undefined"||obj.length == 0?{}.toString():obj;
    }

    var _this={
        init: function(id){
            _this.initEditor();
        },

        initEditor:function(){
            var options = {
                $elem: $("#mod-float__nav")
            };
            initEditor(options);
        }
    };

    return {
        init:_this.init
    };
}));
