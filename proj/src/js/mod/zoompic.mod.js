(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define([
            'jquery'
            // 'campusJsRoot/db.main' ,
            // 'campusJsRoot/template/modules',
            // 'common/html',
            // 'common/xss',
            // 'common/strEllipsis'
        ], factory);
    } else {}
}(this, function ($, DB, TmplInline_modules, html, xss, strEllipsis) {

    function ZoomPic() {
        this.initialize.apply(this, arguments)
    }
    function menuClick(id){
        var $elem = $('.mod-nav__menu ul');
        $elem.find("[data="+id+"]").click();
    }

    ZoomPic.prototype = {
        initialize: function(id) {
            this.wrap = typeof id === "string" ? document.getElementById(id) : id;
            this.oUl = this.wrap.getElementsByTagName("ul")[0];
            this.aLi = this.wrap.getElementsByTagName("li");
            this.prev = this.wrap.getElementsByTagName("pre")[0];
            this.next = this.wrap.getElementsByTagName("pre")[1];
            this.timer = null;
            this.aSort = [];
            this.iCenter = 3;

            this._doPrev = function() {
                return _this.doPrev.apply(_this)
            };
            this._doNext = function() {
                return _this.doNext.apply(_this)
            };
            this.options = [{
                height: 210,
                width: 240,
                left: -80,
                zIndex: 1
            }, {
                height: 245,
                width: 280,
                left: 30,
                zIndex: 2
            }, {
                height: 262,
                width: 300,
                left: 170,
                zIndex: 3
            }, {
                height: 298,
                width: 340,
                left: 330,
                zIndex: 4
            }, {
                height: 262,
                width: 300,
                left: 530,
                zIndex: 3
            }, {
                height: 245,
                width: 280,
                left: 700,
                zIndex: 2
            }, {
                height: 210,
                width: 240,
                left: 850,
                zIndex: 1
            }];
            for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
            this.aSort.unshift(this.aSort.pop());
            this.setUp();
            this.addEvent(this.prev, "click", this._doPrev);
            this.addEvent(this.next, "click", this._doNext);
            this.doImgClick();

        },
        doPrev: function() {
            this.aSort.unshift(this.aSort.pop());
            this.setUp();
        },
        doNext: function() {
            this.aSort.push(this.aSort.shift());
            this.setUp();
        },
        doImgClick: function() {
            var _this = this;
            for (var i = 0; i < this.aSort.length; i++) {
                this.aSort[i].onclick = function() {
                    menuClick($(this).attr("data"));
                }
            }
        },
        imageChange: function(index){
            var _this = this;
            if (index > _this.iCenter) {
                for (var i = 0; i < index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
                _this.setUp();
                _this.iCenter =index;
            } else if (index < _this.iCenter) {
                for (var i = 0; i < _this.iCenter - index; i++) _this.aSort.unshift(_this.aSort.pop());
                _this.setUp();
                _this.iCenter =index;
            }
        },
        
        setUp: function() {
            var _this = this;
            var i = 0;
            for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
            for (i = 0; i < this.aSort.length; i++) {
                this.aSort[i].index = i;
                if (i < 7) {
                    this.doMove(this.aSort[i], this.options[i], function() {
                        _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("span")[0], {
                            opacity: 100
                        }, function() {
                            _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("span")[0], {
                                opacity: 100
                            })
                        })
                    });
                }

                if (i < this.iCenter || i > this.iCenter) {
                    this.css(this.aSort[i].getElementsByTagName("span")[0], "opacity", 30)
                    this.aSort[i].onmouseover = function() {
                        _this.doMove(this.getElementsByTagName("span")[0], {
                            opacity: 100
                        })
                    };
                    this.aSort[i].onmouseout = function() {
                        _this.doMove(this.getElementsByTagName("span")[0], {
                            opacity: 35
                        })
                    };
                    this.aSort[i].onmouseout();
                } else {
                    this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
                }
            }
        },

        addEvent: function(oElement, sEventType, fnHandler) {
            return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
        },

        css: function(oElement, attr, value) {
            if (arguments.length == 2) {
                return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
            } else if (arguments.length == 3) {
                switch (attr) {
                    case "width":
                    case "height":
                    case "left":
                    case "bottom":
                        oElement.style[attr] = value + "px";
                        break;
                    default:
                        oElement.style[attr] = value;
                        break
                }
            }
        },
        doMove: function(oElement, oAttr, fnCallBack) {
            var _this = this;
            clearInterval(oElement.timer);
            oElement.timer = setInterval(function() {
                var bStop = true;
                for (var property in oAttr) {
                    var iCur = parseFloat(_this.css(oElement, property));
                    property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
                    var iSpeed = (oAttr[property] - iCur) / 5;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    if (iCur != oAttr[property]) {
                        bStop = false;
                        _this.css(oElement, property, iCur + iSpeed)
                    }
                }
                if (bStop) {
                    clearInterval(oElement.timer);
                    fnCallBack && fnCallBack.apply(_this, arguments)
                }
            }, 30);
        }
    };

    return {
        init:function(id){
            return new ZoomPic(id);
        },
        imageChang: ZoomPic.imageChange
    };
}));

