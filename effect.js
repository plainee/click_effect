// ==UserScript==
// @name         Brandy 点击特效
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let i = 0; //定义获取词语下标
    let body = document.getElementsByTagName("body")[0];
    let dark_mode=1; // 当前背景是否是深色，避免对比度不够看不清，取值范围：[0,1]
    let start=0;
    if (dark_mode>0) {
        start=55; //深色模式的RGB颜色下线
    }

    function s() {
        console.log("rgb(" + ~~ (Math.round(Math.random() * (255 - 55)) + start) + "," + ~~ (Math.round(Math.random() * (255 - 55)) + start) + "," + ~~ (Math.round(Math.random() * (255 - 55)) + start) + ")");
        return "rgb(" + ~~ (Math.round(Math.random() * (255 - 55)) + start) + "," + ~~ (Math.round(Math.random() * (255 - 55)) + start) + "," + ~~ (Math.round(Math.random() * (255 - 55)) + start) + ")"
    }
    body.onclick = function(e) { //点击body时触发事件
        const a = "Injection Security Deserialization".trim().split(/\s+/);
        let span = document.createElement("span"); //创建span标签
        span.innerText = a[(i++) % a.length]; //设置词语给span标签
        let x = e.pageX; //获取x指针坐标
        let y = e.pageY; //获取y指针坐标
        span.style.cssText = "z-index:999999999999999999999999;top:" + (y - 20) + "px;left:" + x + "px;position:absolute;font-weight:bold;color:" + s(); //在鼠标的指针的位置给span标签添加css样式
        body.appendChild(span); //在body添加这个span标签
        animate(span, {
            "top": y - 120,
            'left': x + 120,
            "font-size": "16",
            "opacity": 0
        },
        10, 0.01,
        function() {
            body.removeChild(span); //时间到了自动删除
        })
    }

    //animate函数执行 CSS 属性集的自定义动画。
    function animate(obj, json, interval, sp, fn) {
        clearInterval(obj.timer);
        function getStyle(obj, arr) {
            if (obj.currentStyle) {
                return obj.currentStyle[arr]; //针对ie
            } else {
                return document.defaultView.getComputedStyle(obj, null)[arr].replace(/px/g, "");
            }
        }

        obj.timer = setInterval(function() {
            var flag = true;
            for (var arr in json) {
                var icur = 0;

                if (arr == "opacity") {
                    icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
                } else {
                    icur = parseInt(getStyle(obj, arr));
                }

                var speed = (json[arr] - icur) * sp;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (icur != json[arr]) {
                    flag = false;
                }

                if (arr == "opacity") {
                    obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                    obj.style.opacity = (icur + speed) / 100;
                } else {
                    obj.style[arr] = icur + speed + "px";
                }
            }

            if (flag) {
                clearInterval(obj.timer);

                if (fn) {
                    fn();
                }
            }
        },
        interval);
    }
})();
