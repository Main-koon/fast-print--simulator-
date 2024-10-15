!function(e) {
    var n = {};
    function t(r) {
        if (n[r])
            return n[r].exports;
        var a = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, t),
        a.l = !0,
        a.exports
    }
    t.m = e,
    t.c = n,
    t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: r
        })
    }
    ,
    t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    t.t = function(e, n) {
        if (1 & n && (e = t(e)),
        8 & n)
            return e;
        if (4 & n && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (t.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & n && "string" != typeof e)
            for (var a in e)
                t.d(r, a, function(n) {
                    return e[n]
                }
                .bind(null, a));
        return r
    }
    ,
    t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(n, "a", n),
        n
    }
    ,
    t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    t.p = "",
    t(t.s = 0)
}([function(e, n, t) {
    "use strict";
    t.r(n);
    var r = {
        update: null,
        begin: null,
        loopBegin: null,
        changeBegin: null,
        change: null,
        changeComplete: null,
        loopComplete: null,
        complete: null,
        loop: 1,
        direction: "normal",
        autoplay: !0,
        timelineOffset: 0
    }
      , a = {
        duration: 1e3,
        delay: 0,
        endDelay: 0,
        easing: "easeOutElastic(1, .5)",
        round: 0
    }
      , o = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective"]
      , u = {
        CSS: {},
        springs: {}
    };
    function i(e, n, t) {
        return Math.min(Math.max(e, n), t)
    }
    function c(e, n) {
        return e.indexOf(n) > -1
    }
    function s(e, n) {
        return e.apply(null, n)
    }
    var l = {
        arr: function(e) {
            return Array.isArray(e)
        },
        obj: function(e) {
            return c(Object.prototype.toString.call(e), "Object")
        },
        pth: function(e) {
            return l.obj(e) && e.hasOwnProperty("totalLength")
        },
        svg: function(e) {
            return e instanceof SVGElement
        },
        inp: function(e) {
            return e instanceof HTMLInputElement
        },
        dom: function(e) {
            return e.nodeType || l.svg(e)
        },
        str: function(e) {
            return "string" == typeof e
        },
        fnc: function(e) {
            return "function" == typeof e
        },
        und: function(e) {
            return void 0 === e
        },
        hex: function(e) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)
        },
        rgb: function(e) {
            return /^rgb/.test(e)
        },
        hsl: function(e) {
            return /^hsl/.test(e)
        },
        col: function(e) {
            return l.hex(e) || l.rgb(e) || l.hsl(e)
        },
        key: function(e) {
            return !r.hasOwnProperty(e) && !a.hasOwnProperty(e) && "targets" !== e && "keyframes" !== e
        }
    };
    function f(e) {
        var n = /\(([^)]+)\)/.exec(e);
        return n ? n[1].split(",").map((function(e) {
            return parseFloat(e)
        }
        )) : []
    }
    function d(e, n) {
        var t = f(e)
          , r = i(l.und(t[0]) ? 1 : t[0], .1, 100)
          , a = i(l.und(t[1]) ? 100 : t[1], .1, 100)
          , o = i(l.und(t[2]) ? 10 : t[2], .1, 100)
          , c = i(l.und(t[3]) ? 0 : t[3], .1, 100)
          , s = Math.sqrt(a / r)
          , d = o / (2 * Math.sqrt(a * r))
          , p = d < 1 ? s * Math.sqrt(1 - d * d) : 0
          , v = 1
          , g = d < 1 ? (d * s - c) / p : -c + s;
        function h(e) {
            var t = n ? n * e / 1e3 : e;
            return t = d < 1 ? Math.exp(-t * d * s) * (v * Math.cos(p * t) + g * Math.sin(p * t)) : (v + g * t) * Math.exp(-t * s),
            0 === e || 1 === e ? e : 1 - t
        }
        return n ? h : function() {
            var n = u.springs[e];
            if (n)
                return n;
            for (var t = 0, r = 0; ; )
                if (1 === h(t += 1 / 6)) {
                    if (++r >= 16)
                        break
                } else
                    r = 0;
            var a = t * (1 / 6) * 1e3;
            return u.springs[e] = a,
            a
        }
    }
    function p(e) {
        return void 0 === e && (e = 10),
        function(n) {
            return Math.round(n * e) * (1 / e)
        }
    }
    var v, g, h = function() {
        var e = 11
          , n = 1 / (e - 1);
        function t(e, n) {
            return 1 - 3 * n + 3 * e
        }
        function r(e, n) {
            return 3 * n - 6 * e
        }
        function a(e) {
            return 3 * e
        }
        function o(e, n, o) {
            return ((t(n, o) * e + r(n, o)) * e + a(n)) * e
        }
        function u(e, n, o) {
            return 3 * t(n, o) * e * e + 2 * r(n, o) * e + a(n)
        }
        return function(t, r, a, i) {
            if (0 <= t && t <= 1 && 0 <= a && a <= 1) {
                var c = new Float32Array(e);
                if (t !== r || a !== i)
                    for (var s = 0; s < e; ++s)
                        c[s] = o(s * n, t, a);
                return function(e) {
                    return t === r && a === i ? e : 0 === e || 1 === e ? e : o(l(e), r, i)
                }
            }
            function l(r) {
                for (var i = 0, s = 1, l = e - 1; s !== l && c[s] <= r; ++s)
                    i += n;
                --s;
                var f = i + (r - c[s]) / (c[s + 1] - c[s]) * n
                  , d = u(f, t, a);
                return d >= .001 ? function(e, n, t, r) {
                    for (var a = 0; a < 4; ++a) {
                        var i = u(n, t, r);
                        if (0 === i)
                            return n;
                        n -= (o(n, t, r) - e) / i
                    }
                    return n
                }(r, f, t, a) : 0 === d ? f : function(e, n, t, r, a) {
                    var u, i, c = 0;
                    do {
                        (u = o(i = n + (t - n) / 2, r, a) - e) > 0 ? t = i : n = i
                    } while (Math.abs(u) > 1e-7 && ++c < 10);
                    return i
                }(r, i, i + n, t, a)
            }
        }
    }(), m = (v = {
        linear: function() {
            return function(e) {
                return e
            }
        }
    },
    g = {
        Sine: function() {
            return function(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            }
        },
        Circ: function() {
            return function(e) {
                return 1 - Math.sqrt(1 - e * e)
            }
        },
        Back: function() {
            return function(e) {
                return e * e * (3 * e - 2)
            }
        },
        Bounce: function() {
            return function(e) {
                for (var n, t = 4; e < ((n = Math.pow(2, --t)) - 1) / 11; )
                    ;
                return 1 / Math.pow(4, 3 - t) - 7.5625 * Math.pow((3 * n - 2) / 22 - e, 2)
            }
        },
        Elastic: function(e, n) {
            void 0 === e && (e = 1),
            void 0 === n && (n = .5);
            var t = i(e, 1, 10)
              , r = i(n, .1, 2);
            return function(e) {
                return 0 === e || 1 === e ? e : -t * Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1 - r / (2 * Math.PI) * Math.asin(1 / t)) * (2 * Math.PI) / r)
            }
        }
    },
    ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach((function(e, n) {
        g[e] = function() {
            return function(e) {
                return Math.pow(e, n + 2)
            }
        }
    }
    )),
    Object.keys(g).forEach((function(e) {
        var n = g[e];
        v["easeIn" + e] = n,
        v["easeOut" + e] = function(e, t) {
            return function(r) {
                return 1 - n(e, t)(1 - r)
            }
        }
        ,
        v["easeInOut" + e] = function(e, t) {
            return function(r) {
                return r < .5 ? n(e, t)(2 * r) / 2 : 1 - n(e, t)(-2 * r + 2) / 2
            }
        }
    }
    )),
    v);
    function y(e, n) {
        if (l.fnc(e))
            return e;
        var t = e.split("(")[0]
          , r = m[t]
          , a = f(e);
        switch (t) {
        case "spring":
            return d(e, n);
        case "cubicBezier":
            return s(h, a);
        case "steps":
            return s(p, a);
        default:
            return s(r, a)
        }
    }
    function b(e) {
        try {
            return document.querySelectorAll(e)
        } catch (e) {
            return
        }
    }
    function w(e, n) {
        for (var t = e.length, r = arguments.length >= 2 ? arguments[1] : void 0, a = [], o = 0; o < t; o++)
            if (o in e) {
                var u = e[o];
                n.call(r, u, o, e) && a.push(u)
            }
        return a
    }
    function M(e) {
        return e.reduce((function(e, n) {
            return e.concat(l.arr(n) ? M(n) : n)
        }
        ), [])
    }
    function x(e) {
        return l.arr(e) ? e : (l.str(e) && (e = b(e) || e),
        e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e])
    }
    function k(e, n) {
        return e.some((function(e) {
            return e === n
        }
        ))
    }
    function O(e) {
        var n = {};
        for (var t in e)
            n[t] = e[t];
        return n
    }
    function S(e, n) {
        var t = O(e);
        for (var r in e)
            t[r] = n.hasOwnProperty(r) ? n[r] : e[r];
        return t
    }
    function P(e, n) {
        var t = O(e);
        for (var r in n)
            t[r] = l.und(e[r]) ? n[r] : e[r];
        return t
    }
    function T(e) {
        return l.rgb(e) ? (t = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n = e)) ? "rgba(" + t[1] + ",1)" : n : l.hex(e) ? function(e) {
            var n = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function(e, n, t, r) {
                return n + n + t + t + r + r
            }
            ))
              , t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
            return "rgba(" + parseInt(t[1], 16) + "," + parseInt(t[2], 16) + "," + parseInt(t[3], 16) + ",1)"
        }(e) : l.hsl(e) ? function(e) {
            var n, t, r, a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e), o = parseInt(a[1], 10) / 360, u = parseInt(a[2], 10) / 100, i = parseInt(a[3], 10) / 100, c = a[4] || 1;
            function s(e, n, t) {
                return t < 0 && (t += 1),
                t > 1 && (t -= 1),
                t < 1 / 6 ? e + 6 * (n - e) * t : t < .5 ? n : t < 2 / 3 ? e + (n - e) * (2 / 3 - t) * 6 : e
            }
            if (0 == u)
                n = t = r = i;
            else {
                var l = i < .5 ? i * (1 + u) : i + u - i * u
                  , f = 2 * i - l;
                n = s(f, l, o + 1 / 3),
                t = s(f, l, o),
                r = s(f, l, o - 1 / 3)
            }
            return "rgba(" + 255 * n + "," + 255 * t + "," + 255 * r + "," + c + ")"
        }(e) : void 0;
        var n, t
    }
    function C(e) {
        var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
        if (n)
            return n[1]
    }
    function I(e, n) {
        return l.fnc(e) ? e(n.target, n.id, n.total) : e
    }
    function j(e, n) {
        return e.getAttribute(n)
    }
    function B(e, n, t) {
        if (k([t, "deg", "rad", "turn"], C(n)))
            return n;
        var r = u.CSS[n + t];
        if (!l.und(r))
            return r;
        var a = document.createElement(e.tagName)
          , o = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
        o.appendChild(a),
        a.style.position = "absolute",
        a.style.width = 100 + t;
        var i = 100 / a.offsetWidth;
        o.removeChild(a);
        var c = i * parseFloat(n);
        return u.CSS[n + t] = c,
        c
    }
    function L(e, n, t) {
        if (n in e.style) {
            var r = n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
              , a = e.style[n] || getComputedStyle(e).getPropertyValue(r) || "0";
            return t ? B(e, a, t) : a
        }
    }
    function A(e, n) {
        return l.dom(e) && !l.inp(e) && (j(e, n) || l.svg(e) && e[n]) ? "attribute" : l.dom(e) && k(o, n) ? "transform" : l.dom(e) && "transform" !== n && L(e, n) ? "css" : null != e[n] ? "object" : void 0
    }
    function E(e) {
        if (l.dom(e)) {
            for (var n, t = e.style.transform || "", r = /(\w+)\(([^)]*)\)/g, a = new Map; n = r.exec(t); )
                a.set(n[1], n[2]);
            return a
        }
    }
    function D(e, n, t, r) {
        var a = c(n, "scale") ? 1 : 0 + function(e) {
            return c(e, "translate") || "perspective" === e ? "px" : c(e, "rotate") || c(e, "skew") ? "deg" : void 0
        }(n)
          , o = E(e).get(n) || a;
        return t && (t.transforms.list.set(n, o),
        t.transforms.last = n),
        r ? B(e, o, r) : o
    }
    function q(e, n, t, r) {
        switch (A(e, n)) {
        case "transform":
            return D(e, n, r, t);
        case "css":
            return L(e, n, t);
        case "attribute":
            return j(e, n);
        default:
            return e[n] || 0
        }
    }
    function $(e, n) {
        var t = /^(\*=|\+=|-=)/.exec(e);
        if (!t)
            return e;
        var r = C(e) || 0
          , a = parseFloat(n)
          , o = parseFloat(e.replace(t[0], ""));
        switch (t[0][0]) {
        case "+":
            return a + o + r;
        case "-":
            return a - o + r;
        case "*":
            return a * o + r
        }
    }
    function _(e, n) {
        if (l.col(e))
            return T(e);
        if (/\s/g.test(e))
            return e;
        var t = C(e)
          , r = t ? e.substr(0, e.length - t.length) : e;
        return n ? r + n : r
    }
    function F(e, n) {
        return Math.sqrt(Math.pow(n.x - e.x, 2) + Math.pow(n.y - e.y, 2))
    }
    function N(e) {
        for (var n, t = e.points, r = 0, a = 0; a < t.numberOfItems; a++) {
            var o = t.getItem(a);
            a > 0 && (r += F(n, o)),
            n = o
        }
        return r
    }
    function H(e) {
        if (e.getTotalLength)
            return e.getTotalLength();
        switch (e.tagName.toLowerCase()) {
        case "circle":
            return function(e) {
                return 2 * Math.PI * j(e, "r")
            }(e);
        case "rect":
            return function(e) {
                return 2 * j(e, "width") + 2 * j(e, "height")
            }(e);
        case "line":
            return function(e) {
                return F({
                    x: j(e, "x1"),
                    y: j(e, "y1")
                }, {
                    x: j(e, "x2"),
                    y: j(e, "y2")
                })
            }(e);
        case "polyline":
            return N(e);
        case "polygon":
            return function(e) {
                var n = e.points;
                return N(e) + F(n.getItem(n.numberOfItems - 1), n.getItem(0))
            }(e)
        }
    }
    function X(e, n) {
        var t = n || {}
          , r = t.el || function(e) {
            for (var n = e.parentNode; l.svg(n) && l.svg(n.parentNode); )
                n = n.parentNode;
            return n
        }(e)
          , a = r.getBoundingClientRect()
          , o = j(r, "viewBox")
          , u = a.width
          , i = a.height
          , c = t.viewBox || (o ? o.split(" ") : [0, 0, u, i]);
        return {
            el: r,
            viewBox: c,
            x: c[0] / 1,
            y: c[1] / 1,
            w: u / c[2],
            h: i / c[3]
        }
    }
    function Y(e, n) {
        function t(t) {
            void 0 === t && (t = 0);
            var r = n + t >= 1 ? n + t : 0;
            return e.el.getPointAtLength(r)
        }
        var r = X(e.el, e.svg)
          , a = t()
          , o = t(-1)
          , u = t(1);
        switch (e.property) {
        case "x":
            return (a.x - r.x) * r.w;
        case "y":
            return (a.y - r.y) * r.h;
        case "angle":
            return 180 * Math.atan2(u.y - o.y, u.x - o.x) / Math.PI
        }
    }
    function Z(e, n) {
        var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g
          , r = _(l.pth(e) ? e.totalLength : e, n) + "";
        return {
            original: r,
            numbers: r.match(t) ? r.match(t).map(Number) : [0],
            strings: l.str(e) || n ? r.split(t) : []
        }
    }
    function Q(e) {
        return w(e ? M(l.arr(e) ? e.map(x) : x(e)) : [], (function(e, n, t) {
            return t.indexOf(e) === n
        }
        ))
    }
    function V(e) {
        var n = Q(e);
        return n.map((function(e, t) {
            return {
                target: e,
                id: t,
                total: n.length,
                transforms: {
                    list: E(e)
                }
            }
        }
        ))
    }
    function z(e, n) {
        var t = O(n);
        if (/^spring/.test(t.easing) && (t.duration = d(t.easing)),
        l.arr(e)) {
            var r = e.length;
            2 === r && !l.obj(e[0]) ? e = {
                value: e
            } : l.fnc(n.duration) || (t.duration = n.duration / r)
        }
        var a = l.arr(e) ? e : [e];
        return a.map((function(e, t) {
            var r = l.obj(e) && !l.pth(e) ? e : {
                value: e
            };
            return l.und(r.delay) && (r.delay = t ? 0 : n.delay),
            l.und(r.endDelay) && (r.endDelay = t === a.length - 1 ? n.endDelay : 0),
            r
        }
        )).map((function(e) {
            return P(e, t)
        }
        ))
    }
    function G(e, n) {
        var t = []
          , r = n.keyframes;
        for (var a in r && (n = P(function(e) {
            for (var n = w(M(e.map((function(e) {
                return Object.keys(e)
            }
            ))), (function(e) {
                return l.key(e)
            }
            )).reduce((function(e, n) {
                return e.indexOf(n) < 0 && e.push(n),
                e
            }
            ), []), t = {}, r = function(r) {
                var a = n[r];
                t[a] = e.map((function(e) {
                    var n = {};
                    for (var t in e)
                        l.key(t) ? t == a && (n.value = e[t]) : n[t] = e[t];
                    return n
                }
                ))
            }, a = 0; a < n.length; a++)
                r(a);
            return t
        }(r), n)),
        n)
            l.key(a) && t.push({
                name: a,
                tweens: z(n[a], e)
            });
        return t
    }
    function R(e, n) {
        var t;
        return e.tweens.map((function(r) {
            var a = function(e, n) {
                var t = {};
                for (var r in e) {
                    var a = I(e[r], n);
                    l.arr(a) && 1 === (a = a.map((function(e) {
                        return I(e, n)
                    }
                    ))).length && (a = a[0]),
                    t[r] = a
                }
                return t.duration = parseFloat(t.duration),
                t.delay = parseFloat(t.delay),
                t
            }(r, n)
              , o = a.value
              , u = l.arr(o) ? o[1] : o
              , i = C(u)
              , c = q(n.target, e.name, i, n)
              , s = t ? t.to.original : c
              , f = l.arr(o) ? o[0] : s
              , d = C(f) || C(c)
              , p = i || d;
            return l.und(u) && (u = s),
            a.from = Z(f, p),
            a.to = Z($(u, f), p),
            a.start = t ? t.end : 0,
            a.end = a.start + a.delay + a.duration + a.endDelay,
            a.easing = y(a.easing, a.duration),
            a.isPath = l.pth(o),
            a.isColor = l.col(a.from.original),
            a.isColor && (a.round = 1),
            t = a,
            a
        }
        ))
    }
    var W = {
        css: function(e, n, t) {
            return e.style[n] = t
        },
        attribute: function(e, n, t) {
            return e.setAttribute(n, t)
        },
        object: function(e, n, t) {
            return e[n] = t
        },
        transform: function(e, n, t, r, a) {
            if (r.list.set(n, t),
            n === r.last || a) {
                var o = "";
                r.list.forEach((function(e, n) {
                    o += n + "(" + e + ") "
                }
                )),
                e.style.transform = o
            }
        }
    };
    function J(e, n) {
        V(e).forEach((function(e) {
            for (var t in n) {
                var r = I(n[t], e)
                  , a = e.target
                  , o = C(r)
                  , u = q(a, t, o, e)
                  , i = $(_(r, o || C(u)), u)
                  , c = A(a, t);
                W[c](a, t, i, e.transforms, !0)
            }
        }
        ))
    }
    function K(e, n) {
        return w(M(e.map((function(e) {
            return n.map((function(n) {
                return function(e, n) {
                    var t = A(e.target, n.name);
                    if (t) {
                        var r = R(n, e)
                          , a = r[r.length - 1];
                        return {
                            type: t,
                            property: n.name,
                            animatable: e,
                            tweens: r,
                            duration: a.end,
                            delay: r[0].delay,
                            endDelay: a.endDelay
                        }
                    }
                }(e, n)
            }
            ))
        }
        ))), (function(e) {
            return !l.und(e)
        }
        ))
    }
    function U(e, n) {
        var t = e.length
          , r = function(e) {
            return e.timelineOffset ? e.timelineOffset : 0
        }
          , a = {};
        return a.duration = t ? Math.max.apply(Math, e.map((function(e) {
            return r(e) + e.duration
        }
        ))) : n.duration,
        a.delay = t ? Math.min.apply(Math, e.map((function(e) {
            return r(e) + e.delay
        }
        ))) : n.delay,
        a.endDelay = t ? a.duration - Math.max.apply(Math, e.map((function(e) {
            return r(e) + e.duration - e.endDelay
        }
        ))) : n.endDelay,
        a
    }
    var ee = 0;
    var ne, te = [], re = [], ae = function() {
        function e() {
            ne = requestAnimationFrame(n)
        }
        function n(n) {
            var t = te.length;
            if (t) {
                for (var r = 0; r < t; ) {
                    var a = te[r];
                    if (a.paused) {
                        var o = te.indexOf(a);
                        o > -1 && (te.splice(o, 1),
                        t = te.length)
                    } else
                        a.tick(n);
                    r++
                }
                e()
            } else
                ne = cancelAnimationFrame(ne)
        }
        return e
    }();
    function oe(e) {
        void 0 === e && (e = {});
        var n, t = 0, o = 0, u = 0, c = 0, s = null;
        function l(e) {
            var n = window.Promise && new Promise((function(e) {
                return s = e
            }
            ));
            return e.finished = n,
            n
        }
        var f = function(e) {
            var n = S(r, e)
              , t = S(a, e)
              , o = G(t, e)
              , u = V(e.targets)
              , i = K(u, o)
              , c = U(i, t)
              , s = ee;
            return ee++,
            P(n, {
                id: s,
                children: [],
                animatables: u,
                animations: i,
                duration: c.duration,
                delay: c.delay,
                endDelay: c.endDelay
            })
        }(e);
        l(f);
        function d() {
            var e = f.direction;
            "alternate" !== e && (f.direction = "normal" !== e ? "normal" : "reverse"),
            f.reversed = !f.reversed,
            n.forEach((function(e) {
                return e.reversed = f.reversed
            }
            ))
        }
        function p(e) {
            return f.reversed ? f.duration - e : e
        }
        function v() {
            t = 0,
            o = p(f.currentTime) * (1 / oe.speed)
        }
        function g(e, n) {
            n && n.seek(e - n.timelineOffset)
        }
        function h(e) {
            for (var n = 0, t = f.animations, r = t.length; n < r; ) {
                var a = t[n]
                  , o = a.animatable
                  , u = a.tweens
                  , c = u.length - 1
                  , s = u[c];
                c && (s = w(u, (function(n) {
                    return e < n.end
                }
                ))[0] || s);
                for (var l = i(e - s.start - s.delay, 0, s.duration) / s.duration, d = isNaN(l) ? 1 : s.easing(l), p = s.to.strings, v = s.round, g = [], h = s.to.numbers.length, m = void 0, y = 0; y < h; y++) {
                    var b = void 0
                      , M = s.to.numbers[y]
                      , x = s.from.numbers[y] || 0;
                    b = s.isPath ? Y(s.value, d * M) : x + d * (M - x),
                    v && (s.isColor && y > 2 || (b = Math.round(b * v) / v)),
                    g.push(b)
                }
                var k = p.length;
                if (k) {
                    m = p[0];
                    for (var O = 0; O < k; O++) {
                        p[O];
                        var S = p[O + 1]
                          , P = g[O];
                        isNaN(P) || (m += S ? P + S : P + " ")
                    }
                } else
                    m = g[0];
                W[a.type](o.target, a.property, m, o.transforms),
                a.currentValue = m,
                n++
            }
        }
        function m(e) {
            f[e] && !f.passThrough && f[e](f)
        }
        function y(e) {
            var r = f.duration
              , a = f.delay
              , v = r - f.endDelay
              , y = p(e);
            f.progress = i(y / r * 100, 0, 100),
            f.reversePlayback = y < f.currentTime,
            n && function(e) {
                if (f.reversePlayback)
                    for (var t = c; t--; )
                        g(e, n[t]);
                else
                    for (var r = 0; r < c; r++)
                        g(e, n[r])
            }(y),
            !f.began && f.currentTime > 0 && (f.began = !0,
            m("begin")),
            !f.loopBegan && f.currentTime > 0 && (f.loopBegan = !0,
            m("loopBegin")),
            y <= a && 0 !== f.currentTime && h(0),
            (y >= v && f.currentTime !== r || !r) && h(r),
            y > a && y < v ? (f.changeBegan || (f.changeBegan = !0,
            f.changeCompleted = !1,
            m("changeBegin")),
            m("change"),
            h(y)) : f.changeBegan && (f.changeCompleted = !0,
            f.changeBegan = !1,
            m("changeComplete")),
            f.currentTime = i(y, 0, r),
            f.began && m("update"),
            e >= r && (o = 0,
            f.remaining && !0 !== f.remaining && f.remaining--,
            f.remaining ? (t = u,
            m("loopComplete"),
            f.loopBegan = !1,
            "alternate" === f.direction && d()) : (f.paused = !0,
            f.completed || (f.completed = !0,
            m("loopComplete"),
            m("complete"),
            !f.passThrough && "Promise"in window && (s(),
            l(f)))))
        }
        return f.reset = function() {
            var e = f.direction;
            f.passThrough = !1,
            f.currentTime = 0,
            f.progress = 0,
            f.paused = !0,
            f.began = !1,
            f.loopBegan = !1,
            f.changeBegan = !1,
            f.completed = !1,
            f.changeCompleted = !1,
            f.reversePlayback = !1,
            f.reversed = "reverse" === e,
            f.remaining = f.loop,
            n = f.children;
            for (var t = c = n.length; t--; )
                f.children[t].reset();
            (f.reversed && !0 !== f.loop || "alternate" === e && 1 === f.loop) && f.remaining++,
            h(f.reversed ? f.duration : 0)
        }
        ,
        f.set = function(e, n) {
            return J(e, n),
            f
        }
        ,
        f.tick = function(e) {
            u = e,
            t || (t = u),
            y((u + (o - t)) * oe.speed)
        }
        ,
        f.seek = function(e) {
            y(p(e))
        }
        ,
        f.pause = function() {
            f.paused = !0,
            v()
        }
        ,
        f.play = function() {
            f.paused && (f.completed && f.reset(),
            f.paused = !1,
            te.push(f),
            v(),
            ne || ae())
        }
        ,
        f.reverse = function() {
            d(),
            v()
        }
        ,
        f.restart = function() {
            f.reset(),
            f.play()
        }
        ,
        f.reset(),
        f.autoplay && f.play(),
        f
    }
    function ue(e, n) {
        for (var t = n.length; t--; )
            k(e, n[t].animatable.target) && n.splice(t, 1)
    }
    "undefined" != typeof document && document.addEventListener("visibilitychange", (function() {
        document.hidden ? (te.forEach((function(e) {
            return e.pause()
        }
        )),
        re = te.slice(0),
        oe.running = te = []) : re.forEach((function(e) {
            return e.play()
        }
        ))
    }
    )),
    oe.version = "3.1.0",
    oe.speed = 1,
    oe.running = te,
    oe.remove = function(e) {
        for (var n = Q(e), t = te.length; t--; ) {
            var r = te[t]
              , a = r.animations
              , o = r.children;
            ue(n, a);
            for (var u = o.length; u--; ) {
                var i = o[u]
                  , c = i.animations;
                ue(n, c),
                c.length || i.children.length || o.splice(u, 1)
            }
            a.length || o.length || r.pause()
        }
    }
    ,
    oe.get = q,
    oe.set = J,
    oe.convertPx = B,
    oe.path = function(e, n) {
        var t = l.str(e) ? b(e)[0] : e
          , r = n || 100;
        return function(e) {
            return {
                property: e,
                el: t,
                svg: X(t),
                totalLength: H(t) * (r / 100)
            }
        }
    }
    ,
    oe.setDashoffset = function(e) {
        var n = H(e);
        return e.setAttribute("stroke-dasharray", n),
        n
    }
    ,
    oe.stagger = function(e, n) {
        void 0 === n && (n = {});
        var t = n.direction || "normal"
          , r = n.easing ? y(n.easing) : null
          , a = n.grid
          , o = n.axis
          , u = n.from || 0
          , i = "first" === u
          , c = "center" === u
          , s = "last" === u
          , f = l.arr(e)
          , d = f ? parseFloat(e[0]) : parseFloat(e)
          , p = f ? parseFloat(e[1]) : 0
          , v = C(f ? e[1] : e) || 0
          , g = n.start || 0 + (f ? d : 0)
          , h = []
          , m = 0;
        return function(e, n, l) {
            if (i && (u = 0),
            c && (u = (l - 1) / 2),
            s && (u = l - 1),
            !h.length) {
                for (var y = 0; y < l; y++) {
                    if (a) {
                        var b = c ? (a[0] - 1) / 2 : u % a[0]
                          , w = c ? (a[1] - 1) / 2 : Math.floor(u / a[0])
                          , M = b - y % a[0]
                          , x = w - Math.floor(y / a[0])
                          , k = Math.sqrt(M * M + x * x);
                        "x" === o && (k = -M),
                        "y" === o && (k = -x),
                        h.push(k)
                    } else
                        h.push(Math.abs(u - y));
                    m = Math.max.apply(Math, h)
                }
                r && (h = h.map((function(e) {
                    return r(e / m) * m
                }
                ))),
                "reverse" === t && (h = h.map((function(e) {
                    return o ? e < 0 ? -1 * e : -e : Math.abs(m - e)
                }
                )))
            }
            return g + (f ? (p - d) / m : d) * (Math.round(100 * h[n]) / 100) + v
        }
    }
    ,
    oe.timeline = function(e) {
        void 0 === e && (e = {});
        var n = oe(e);
        return n.duration = 0,
        n.add = function(t, r) {
            var o = te.indexOf(n)
              , u = n.children;
            function i(e) {
                e.passThrough = !0
            }
            o > -1 && te.splice(o, 1);
            for (var c = 0; c < u.length; c++)
                i(u[c]);
            var s = P(t, S(a, e));
            s.targets = s.targets || e.targets;
            var f = n.duration;
            s.autoplay = !1,
            s.direction = n.direction,
            s.timelineOffset = l.und(r) ? f : $(r, f),
            i(n),
            n.seek(s.timelineOffset);
            var d = oe(s);
            i(d),
            u.push(d);
            var p = U(u, e);
            return n.delay = p.delay,
            n.endDelay = p.endDelay,
            n.duration = p.duration,
            n.seek(0),
            n.reset(),
            n.autoplay && n.play(),
            n
        }
        ,
        n
    }
    ,
    oe.easing = y,
    oe.penner = m,
    oe.random = function(e, n) {
        return Math.floor(Math.random() * (n - e + 1)) + e
    }
    ,
    oe({
        targets: ".anim-elem",
        translateX: [-50, 50],
        easing: "linear",
        direction: "alternate",
        duration: 1e3,
        loop: !0
    }),
    fetch("https://gist.githubusercontent.com/isakura313/b705fd423e996a56b35b18b876458f18/raw/48023a7ffa598585f80303557e68b2011f776849/main.json").then(e => e.json()).then(e => {
        !async function(e) {
            console.table(e);
            var n = 0
              , t = new Audio("sounds/error_sound.wav")
              , r = new Audio("sounds/fail_sound.wav")
              , a = new Audio("sounds/press_sound.wav")
              , o = new Audio("sounds/success_sound.wav");
            let u = document.querySelector(".modal");
            var i = document.querySelector(".target-error");
            let c = document.querySelector(".error-panel")
              , s = document.querySelector(".begin")
              , l = document.getElementById("prog")
              , f = document.querySelector(".buttons")
              , d = document.querySelector(".name-level")
              , p = document.querySelector(".modal-close");
            function v() {
                !function(e) {
                    let t = e.level_info[n].symbols;
                    d.innerHTML = e.level_info[n].name_level;
                    let r = e.symbol_colors;
                    for (let e = 0; e < 20; e++) {
                        let e = (a = t.length,
                        Math.floor(Math.random() * Math.floor(a)));
                        f.insertAdjacentHTML("afterbegin", `<button class='game-button button \n                    is-large ${r[e]}' id='${t[e]}'>\n                        ${t[e]}</button>`)
                    }
                    var a
                }(e),
                document.addEventListener("keydown", m)
            }
            document.addEventListener("keydown", (function(e) {
                "Enter" == e.key && (c.classList.remove("is-hidden"),
                a.play(),
                s.remove(),
                v())
            }
            ), {
                once: !0
            });
            var g = 0
              , h = 0;
            function m(e) {
                let c = document.querySelectorAll(".game-button");
                var s, f;
                e.key == c[0].id ? (c[0].remove(),
                h++,
                a.play()) : (g++,
                t.play(),
                l.value = g,
                g > 20 && (r.play(),
                d.innerHTML = "Ты проиграл!",
                setTimeout( () => {
                    window.location.reload()
                }
                , 2500))),
                20 == h && (h = 0,
                3 == ++n && (u.classList.add("is-active"),
                s = i,
                f = g,
                localStorage.setItem(+new Date, f),
                function() {
                    let e = [];s
                    for (let n = 0; n < localStorage.length; n++)
                        e.push(+localStorage.key(n));
                    e.sort();
                    for (let n = 0; n < e.length; n++) {
                        let t = new Date(e[n]);
                        s.insertAdjacentHTML("afterend", `<th>${t.getDate()} / ${t.getMonth()}  ${t.getHours()} : ${t.getMinutes()} </th>\n            <th> ${localStorage.getItem(String(e[n]))}</th>\n            `)
                    }
                }(),
                p.onclick = async function() {
                    u.classList.remove("is-active"),
                    window.location.reload()
                }
                ),
                o.play(),
                v())
            }
        }(e)
    }
    ).catch(e => {
        console.warn("произошла ошибка"),
        console.warn(e.name)
    }
    )
}
]);
