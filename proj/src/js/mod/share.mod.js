(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define([
            'jquery'
            // 'jsRoot/common/share'
        ], factory);
    } else {}
}(this, function ($) {
    var W=window,
        Share={
            x: W.screen.width,
            y: W.screen.height,
            qzone: function(title, pic, url, summary) {
                var siteUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                summary = summary || "";
                site = siteUrl + "?to=qzone&url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title) + "&pics=" + encodeURIComponent(pic) + "?r="+Math.random()+ "&summary=" + encodeURIComponent(summary);
                W.open(site, "qzone", "height=540, width=780, top="+(this.y-540)/2 + ", left=" + (this.x-580)/2 + ", toolbar=yes, menubar=yes, resizable=yes, location=yes,status=no" );
            },
            qq: function(title, pic, url,summary){
                var siteUrl = "http://connect.qq.com/widget/shareqq/index.html";
                summary = summary || "";
                site = siteUrl + "?url=" + encodeURIComponent(url) + "&showcount=0&desc=" + encodeURIComponent(title) +"&pics=" + encodeURIComponent(pic)+ "?r="+Math.random()+ "&summary=" + encodeURIComponent(summary)+"&charset=GB2312";
                W.open(site, "qq", "height=600, width=780, top="+(this.y-600)/2 + ", left=" + (this.x-780)/2 + ", toolbar=no, menubar=no, resizable=yes, location=yes,status=no" );
            }
        };

    var $shareBox = $('#share-menu');
    function bindEvent() {
        $shareBox.on('click', '.share-icon', function(e) {
            e.preventDefault();
            var $this = $(this),
                data = {
                    name: $this.data('name'),
                    title: $this.data('title'),
                    pic: $this.data('pic'),
                    url: $this.data('url'),
                    summary: $this.data('summary')
                };
            conf.decData && (data = conf.decData(data));
            Share[data.name](data.title, data.pic, data.url, data.summary);
        });
    }

    var conf;
    function init(c) {
        conf = c || {};
        bindEvent();
    }

    return {
        init: init
    }
}));
