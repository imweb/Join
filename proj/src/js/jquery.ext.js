(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'common/cookie', 'common/bom'], factory);
    } else {
        factory(root['jQuery'], root['Cookie'], root['Bom']);
    }
}(this, function ($, Cookie, Bom) {
	
	$.extend({cookie: Cookie, bom: Bom});
}));