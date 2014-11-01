;(function(root, factory){

})(this, function(){
		var W = window;
        alert();
		return {
			x: W.screen.width,
            y: W.screen.height,
            qzone: function(title, pic, url, summary) {
                var siteUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                summary = summary || "";
                site = siteUrl + "?to=qzone&url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title) + "&pics=" + encodeURIComponent(pic) + "&summary=" + encodeURIComponent(summary);
                W.open(site, "qzone", "height=540, width=580, top="+(this.y-540)/2 + ", left=" + (this.x-580)/2 + ", toolbar=no, menubar=no, resizable=yes, location=yes,status=no" );
            },
            qq: function(title, pic, url){
                var siteUrl = "http://connect.qq.com/widget/shareqq/index.html";
                site = siteUrl + "?url=" + encodeURIComponent(url) + "&showcount=0&desc=" + encodeURIComponent(title) +"&pics=" + encodeURIComponent(pic)+ "&charset=GB2312";
                W.open(site, "qq", "height=600, width=780, top="+(this.y-600)/2 + ", left=" + (this.x-780)/2 + ", toolbar=no, menubar=no, resizable=yes, location=yes,status=no" );
            }
		};
})