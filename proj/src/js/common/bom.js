/**
 * @fileoverview bom处理的工具函数
 * 
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root['Bom'] = factory();
    }
}(this, function () {

    var exports = {
        /**
         * @description 读取location.search
         *
         * @param {String} n 名称
         * @return {String} search值
         * @example
         *      $.bom.query('mod');
         */
        query:function(n){
            var m = window.location.search.match(new RegExp( "(\\?|&)"+n+"=([^&]*)(&|$)"));
            return !m ? "":decodeURIComponent(m[2]);
        },
        /**
         *@description 读取location.hash值
         *
         *@param {String} n 名称
         *@return {String} hash值
         *@example
         *      $.bom.hash('mod');
         */
        getHash:function(n){
            var m = window.location.hash.match(new RegExp( "(#|&)"+n+"=([^&]*)(&|$)"));
            return !m ? "":decodeURIComponent(m[2]);
        }
    }

    return exports;
}));