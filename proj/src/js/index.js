require([
    'header',
	'jsRoot/mod/main.mod',
	// 'jsRoot/mod/totop.mod',
	// 'jsRoot/mod/share.mod',
	// 'jsRoot/base',
	// 'jsRoot/mod/dialog.mod',
	'jsRoot/mod/zoompic.mod'
], function(Header, Main,/* Totop, Share, Base, modDialog,*/ ZoomPic){
	// var TRecord = window['TRecord'];
	// TRecord.push("page_main_start");

    // Header.init();
	Main.init("slide-box");
	// Totop.init("#totop");
	// Share.init();
	// modDialog.init();

	// TRecord.push("page_main_end");
	// TRecord.report([
	// 	'page_start',
	// 	'page_css_ready',
	// 	'page_js_ready',
	// 	'page_main_start',
	// 	'page_main_end'
	// ],{delay:1000});
});
