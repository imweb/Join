(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('jsRoot/base', [
        	'require',
        	'jquery',
            'common/util.cookie',
            'common/util.bom',
        	 'common/jquery.spin',
            'common/html',
            'login',
            'db',
            'common/render',
            'common/jquery.lazyload',
            'report',
            'common/report.attr',
            'common/dialog',
            'common/jquery.dropdown',
            'common/jquery.lazyload',
            'common/jquery.share',
            'common/strEllipsis'
        	], factory);
    } else {
        factory(root['jQuery']);
    }
}(this, function (require) {

	var $ = require('jquery');
	$.extend({
		cookie: require('common/util.cookie'),
		bom: require('common/util.bom'),
		loadScript: function (url, callback) {
			$.ajax({
				type: 'GET',
				url: url,
				success: callback,
				dataType: 'script',
				cache: true

			});
		}
	});

    var report = require('report');
    function initReport(param){
        var uin = $.cookie.uin();
        var option = {
            uin: uin,  // 必填
            ts: '',  // 必填，留空就行
            opername: 'Edu',
            module: 'V-VJT',  // 首页为index模块
            obj2: uin  // 统一填用户QQ
        }

        var gdt = $.bom.query('qz_gdt');
        var adposition = $.bom.query('adposition');
        var from = parseInt($.bom.query('from'));
        if(gdt){
            from = 17;
            option.ver5 = "gdt="+gdt+";adposition="+adposition;
        }else{
            from = isNaN(from) ? 4 : from;
        }
        option.ver4 = from;
        report.config($.extend(param, option));

    }
    initReport({});
    // report.tdw({action: 'exposure'});
    // report.tdw({action: 'From'});
}));