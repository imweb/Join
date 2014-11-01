/*
	特性：点击返回顶部功能,支持IE6及主流浏览器,可以平滑返回顶部
	调用：
		var R=require("totop.js");
		R.init(id); //id表示点击触发返回顶部事件的页面元素
	示例：R.init("#totop")
	      <a id="totop"></a>
*/

(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define([
	        'jquery'
        ], factory);
    } else {}
}(this, function ($) {

	var _this = {
		//动画配置选项
		setting: {
			scrollto: 0, 		//返回位置距页面顶部距离
			scrollduration:200	//动画持续时间
		},
		controlattrs: {
			offsetx:50, offsety:50
		},
		scrollup:function(){
			var dest = isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto);
			if (typeof dest=="string" && jQuery('#'+dest).length==1)
				dest = jQuery('#'+dest).offset().top;
			else
				dest = 0;
			this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
		},

		keepfixed:function(){
			var $window = jQuery(window);
			var controlx = $window.scrollLeft() + $window.width() - this.$elem.width() - this.controlattrs.offsetx;
			var controly = $window.scrollTop() + $window.height() - this.$elem.height() - this.controlattrs.offsety;
			this.$elem.css({left:controlx+'px', top:controly+'px'});
		},

		togglecontrol:function(){
			var scrolltop = jQuery(window).scrollTop();
			//IE6修复
			if (!this.cssfixedsupport){
				this.keepfixed();
			}
		},
		
		init:function(id){
			var id = id||"#totop",
				object = _this,
				iebrws = document.all;
			//判断是否标准浏览器
			object.cssfixedsupport = !iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest;
			
			object.$body = (window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
			object.$elem = $(id);
			object.$elem.on("click",function(){
				object.scrollup();
			});
		}
	}
	return {
        init:function(id){
            _this.init(id)
        }
	}
}));

