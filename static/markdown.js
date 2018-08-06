! function (e) {
    function t(e) {
        return e = C ? e.replace("Ctrl", "Cmd") : e.replace("Cmd", "Ctrl")
    }

    function r(e, r) {
        r = r || {};
        var n = document.createElement("a"),
            i = r.shortcut || w[e];
        return i && (i = t(i), n.title = i, n.title = n.title.replace("Cmd", "⌘"), C && (n.title = n.title.replace("Alt", "⌥"))), n.className = r.className || "eicon-" + e, n
    }

    function n() {
        return el = document.createElement("i"), el.className = "separator", el.innerHTML = "|", el
    }

    function i(e, t) {
        t = t || e.getCursor("start");
        var r = e.getTokenAt(t);
        if (!r.type) return {};
        for (var n, i, o = r.type.split(" "), l = {}, a = 0; a < o.length; a++) n = o[a], "strong" === n ? l.bold = !0 : "variable-2" === n ? (i = e.getLine(t.line), /^\s*\d+\.\s/.test(i) ? l["ordered-list"] = !0 : l["unordered-list"] = !0) : "atom" === n ? l.quote = !0 : "em" === n && (l.italic = !0);
        return l
    }

    function o(e) {
        var t = e.codemirror.getWrapperElement(),
            r = document,
            n = r.fullScreen || r.mozFullScreen || r.webkitFullScreen,
            i = function () {
                r.cancelFullScreen ? r.cancelFullScreen() : r.mozCancelFullScreen ? r.mozCancelFullScreen() : r.webkitCancelFullScreen && r.webkitCancelFullScreen()
            };
        n ? i && i() : function () {
            t.requestFullScreen ? t.requestFullScreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullScreen && t.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        }()
    }

    function l(e) {
        var t, r = e.codemirror,
            n = i(r),
            o = "**",
            l = "**",
            a = r.getCursor("start"),
            s = r.getCursor("end");
        n.bold ? (t = r.getLine(a.line), o = t.slice(0, a.ch), l = t.slice(a.ch), o = o.replace(/^(.*)?(\*|\_){2}(\S+.*)?$/, "$1$3"), l = l.replace(/^(.*\S+)?(\*|\_){2}(\s+.*)?$/, "$1$3"), a.ch -= 2, s.ch -= 2, r.setLine(a.line, o + l)) : (t = r.getSelection(), r.replaceSelection(o + t + l), a.ch += 2, s.ch += 2), r.setSelection(a, s), r.focus()
    }

    function a(e) {
        var t, r = e.codemirror,
            n = i(r),
            o = "*",
            l = "*",
            a = r.getCursor("start"),
            s = r.getCursor("end");
        n.italic ? (t = r.getLine(a.line), o = t.slice(0, a.ch), l = t.slice(a.ch), o = o.replace(/^(.*)?(\*|\_)(\S+.*)?$/, "$1$3"), l = l.replace(/^(.*\S+)?(\*|\_)(\s+.*)?$/, "$1$3"), a.ch -= 1, s.ch -= 1, r.setLine(a.line, o + l)) : (t = r.getSelection(), r.replaceSelection(o + t + l), a.ch += 1, s.ch += 1), r.setSelection(a, s), r.focus()
    }

    function s(e) {
        v(e.codemirror, "quote")
    }

    function c(e) {
        v(e.codemirror, "unordered-list")
    }

    function u(e) {
        v(e.codemirror, "ordered-list")
    }

    function f(e) {
        var t = e.codemirror;
        g(t, i(t).link, "[", "](http://)")
    }

    function h(e) {
        var t = e.codemirror;
        g(t, i(t).image, "![", "](http://)")
    }

    function d(e) {
        var t = e.codemirror;
        t.undo(), t.focus()
    }

    function p(e) {
        var t = e.codemirror;
        t.redo(), t.focus()
    }

    function m(e) {
        var t = e.toolbar.preview,
            r = e.constructor.markdown,
            n = e.codemirror,
            i = n.getWrapperElement(),
            o = i.lastChild;
        /editor-preview/.test(o.className) || (o = document.createElement("div"), o.className = "editor-preview", i.appendChild(o)), /editor-preview-active/.test(o.className) ? (o.className = o.className.replace(/\s*editor-preview-active\s*/g, ""), t.className = t.className.replace(/\s*active\s*/g, "")) : (setTimeout(function () {
            o.className += " editor-preview-active"
        }, 1), t.className += " active");
        var l = n.getValue();
        o.innerHTML = r(l)
    }

    function g(e, t, r, n) {
        var i, o = e.getCursor("start"),
            l = e.getCursor("end");
        t ? (i = e.getLine(o.line), r = i.slice(0, o.ch), n = i.slice(o.ch), e.setLine(o.line, r + n)) : (i = e.getSelection(), e.replaceSelection(r + i + n), o.ch += r.length, l.ch += r.length), e.setSelection(o, l), e.focus()
    }

    function v(e, t) {
        for (var r = i(e), n = e.getCursor("start"), o = e.getCursor("end"), l = {
                quote: /^(\s*)\>\s+/,
                "unordered-list": /^(\s*)(\*|\-|\+)\s+/,
                "ordered-list": /^(\s*)\d+\.\s+/
            }, a = {
                quote: "> ",
                "unordered-list": "* ",
                "ordered-list": "1. "
            }, s = n.line; s <= o.line; s++) ! function (n) {
            var i = e.getLine(n);
            i = r[t] ? i.replace(l[t], "$1") : a[t] + i, e.setLine(n, i)
        }(s);
        e.focus()
    }

    function y(e) {
        var t = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,
            r = e.match(t),
            n = 0;
        if (null === r) return n;
        for (var i = 0; i < r.length; i++) r[i].charCodeAt(0) >= 19968 ? n += r[i].length : n += 1;
        return n
    }

    function b(e) {
        e = e || {}, e.element && (this.element = e.element), e.toolbar = e.toolbar || b.toolbar, e.hasOwnProperty("status") || (e.status = ["lines", "words", "cursor"]), this.options = e, this.element && this.render()
    }
    var x = function () {
        "use strict";

        function e(r, n) {
            if (!(this instanceof e)) return new e(r, n);
            this.options = n = n || {};
            for (var i in ni) !n.hasOwnProperty(i) && ni.hasOwnProperty(i) && (n[i] = ni[i]);
            h(n);
            var o = "string" == typeof n.value ? 0 : n.value.first,
                l = this.display = t(r, o);
            l.wrapper.CodeMirror = this, c(this), n.autofocus && !Fn && de(this), this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: !1,
                draggingText: !1,
                highlight: new Kr
            }, a(this), n.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
            var s = n.value;
            "string" == typeof s && (s = new vi(n.value, n.mode)), oe(this, cr)(this, s), kn && setTimeout(Qr(he, this, !0), 20), me(this);
            var u;
            try {
                u = document.activeElement == l.input
            } catch (e) {}
            u || n.autofocus && !Fn ? setTimeout(Qr(We, this), 20) : De(this), oe(this, function () {
                for (var e in ri) ri.propertyIsEnumerable(e) && ri[e](this, n[e], ii);
                for (var t = 0; t < si.length; ++t) si[t](this)
            })()
        }

        function t(e, t) {
            var r = {},
                n = r.input = rn("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
            return Tn ? n.style.width = "1000px" : n.setAttribute("wrap", "off"), In && (n.style.border = "1px solid black"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), n.setAttribute("spellcheck", "false"), r.inputDiv = rn("div", [n], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), r.scrollbarH = rn("div", [rn("div", null, null, "height: 1px")], "CodeMirror-hscrollbar"), r.scrollbarV = rn("div", [rn("div", null, null, "width: 1px")], "CodeMirror-vscrollbar"), r.scrollbarFiller = rn("div", null, "CodeMirror-scrollbar-filler"), r.gutterFiller = rn("div", null, "CodeMirror-gutter-filler"), r.lineDiv = rn("div", null, "CodeMirror-code"), r.selectionDiv = rn("div", null, null, "position: relative; z-index: 1"), r.cursor = rn("div", " ", "CodeMirror-cursor"), r.otherCursor = rn("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"), r.measure = rn("div", null, "CodeMirror-measure"), r.lineSpace = rn("div", [r.measure, r.selectionDiv, r.lineDiv, r.cursor, r.otherCursor], null, "position: relative; outline: none"), r.mover = rn("div", [rn("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = rn("div", [r.mover], "CodeMirror-sizer"), r.heightForcer = rn("div", null, null, "position: absolute; height: " + wi + "px; width: 1px;"), r.gutters = rn("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = rn("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = rn("div", [r.inputDiv, r.scrollbarH, r.scrollbarV, r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), Sn && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper), In && (n.style.width = "0px"), Tn || (r.scroller.draggable = !0), Dn ? (r.inputDiv.style.height = "1px", r.inputDiv.style.position = "absolute") : Sn && (r.scrollbarH.style.minWidth = r.scrollbarV.style.minWidth = "18px"), r.viewOffset = r.lastSizeC = 0, r.showingFrom = r.showingTo = t, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.prevInput = "", r.alignWidgets = !1, r.pollingFast = !1, r.poll = new Kr, r.cachedCharWidth = r.cachedTextHeight = null, r.measureLineCache = [], r.measureLineCachePos = 0, r.inaccurateSelection = !1, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r
        }

        function r(t) {
            t.doc.mode = e.getMode(t.options, t.doc.modeOption), t.doc.iter(function (e) {
                e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
            }), t.doc.frontier = t.doc.first, D(t, 100), t.state.modeGen++, t.curOp && se(t)
        }

        function n(e) {
            e.options.lineWrapping ? (e.display.wrapper.className += " CodeMirror-wrap", e.display.sizer.style.minWidth = "") : (e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-wrap", ""), f(e)), o(e), se(e), U(e), setTimeout(function () {
                d(e)
            }, 100)
        }

        function i(e) {
            var t = te(e.display),
                r = e.options.lineWrapping,
                n = r && Math.max(5, e.display.scroller.clientWidth / re(e.display) - 3);
            return function (i) {
                return Bt(e.doc, i) ? 0 : r ? (Math.ceil(i.text.length / n) || 1) * t : t
            }
        }

        function o(e) {
            var t = e.doc,
                r = i(e);
            t.iter(function (e) {
                var t = r(e);
                t != e.height && dr(e, t)
            })
        }

        function l(e) {
            var t = fi[e.options.keyMap],
                r = t.style;
            e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (r ? " cm-keymap-" + r : ""), e.state.disableInput = t.disableInput
        }

        function a(e) {
            e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), U(e)
        }

        function s(e) {
            c(e), se(e), setTimeout(function () {
                m(e)
            }, 20)
        }

        function c(e) {
            var t = e.display.gutters,
                r = e.options.gutters;
            nn(t);
            for (var n = 0; n < r.length; ++n) {
                var i = r[n],
                    o = t.appendChild(rn("div", null, "CodeMirror-gutter " + i));
                "CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
            }
            t.style.display = n ? "" : "none"
        }

        function u(e, t) {
            if (0 == t.height) return 0;
            for (var r, n = t.text.length, i = t; r = It(i);) {
                var o = r.find();
                i = ur(e, o.from.line), n += o.from.ch - o.to.ch
            }
            for (i = t; r = Ft(i);) {
                var o = r.find();
                n -= i.text.length - o.from.ch, i = ur(e, o.to.line), n += i.text.length - o.to.ch
            }
            return n
        }

        function f(e) {
            var t = e.display,
                r = e.doc;
            t.maxLine = ur(r, r.first), t.maxLineLength = u(r, t.maxLine), t.maxLineChanged = !0, r.iter(function (e) {
                var n = u(r, e);
                n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
            })
        }

        function h(e) {
            for (var t = !1, r = 0; r < e.gutters.length; ++r) "CodeMirror-linenumbers" == e.gutters[r] && (e.lineNumbers ? t = !0 : e.gutters.splice(r--, 1));
            !t && e.lineNumbers && e.gutters.push("CodeMirror-linenumbers")
        }

        function d(e) {
            var t = e.display,
                r = e.doc.height,
                n = r + F(t);
            t.sizer.style.minHeight = t.heightForcer.style.top = n + "px", t.gutters.style.height = Math.max(n, t.scroller.clientHeight - wi) + "px";
            var i = Math.max(n, t.scroller.scrollHeight),
                o = t.scroller.scrollWidth > t.scroller.clientWidth + 1,
                l = i > t.scroller.clientHeight + 1;
            l ? (t.scrollbarV.style.display = "block", t.scrollbarV.style.bottom = o ? cn(t.measure) + "px" : "0", t.scrollbarV.firstChild.style.height = i - t.scroller.clientHeight + t.scrollbarV.clientHeight + "px") : t.scrollbarV.style.display = "", o ? (t.scrollbarH.style.display = "block", t.scrollbarH.style.right = l ? cn(t.measure) + "px" : "0", t.scrollbarH.firstChild.style.width = t.scroller.scrollWidth - t.scroller.clientWidth + t.scrollbarH.clientWidth + "px") : t.scrollbarH.style.display = "", o && l ? (t.scrollbarFiller.style.display = "block", t.scrollbarFiller.style.height = t.scrollbarFiller.style.width = cn(t.measure) + "px") : t.scrollbarFiller.style.display = "", o && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (t.gutterFiller.style.display = "block", t.gutterFiller.style.height = cn(t.measure) + "px", t.gutterFiller.style.width = t.gutters.offsetWidth + "px") : t.gutterFiller.style.display = "", On && 0 === cn(t.measure) && (t.scrollbarV.style.minWidth = t.scrollbarH.style.minHeight = En ? "18px" : "12px")
        }

        function p(e, t, r) {
            var n = e.scroller.scrollTop,
                i = e.wrapper.clientHeight;
            "number" == typeof r ? n = r : r && (n = r.top, i = r.bottom - r.top), n = Math.floor(n - I(e));
            var o = Math.ceil(n + i);
            return {
                from: mr(t, n),
                to: mr(t, o)
            }
        }

        function m(e) {
            var t = e.display;
            if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                for (var r = y(t) - t.scroller.scrollLeft + e.doc.scrollLeft, n = t.gutters.offsetWidth, i = r + "px", o = t.lineDiv.firstChild; o; o = o.nextSibling)
                    if (o.alignable)
                        for (var l = 0, a = o.alignable; l < a.length; ++l) a[l].style.left = i;
                e.options.fixedGutter && (t.gutters.style.left = r + n + "px")
            }
        }

        function g(e) {
            if (!e.options.lineNumbers) return !1;
            var t = e.doc,
                r = v(e.options, t.first + t.size - 1),
                n = e.display;
            if (r.length != n.lineNumChars) {
                var i = n.measure.appendChild(rn("div", [rn("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                    o = i.firstChild.offsetWidth,
                    l = i.offsetWidth - o;
                return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l), n.lineNumWidth = n.lineNumInnerWidth + l, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", !0
            }
            return !1
        }

        function v(e, t) {
            return String(e.lineNumberFormatter(t + e.firstLineNumber))
        }

        function y(e) {
            return an(e.scroller).left - an(e.sizer).left
        }

        function b(e, t, r, n) {
            for (var i, o = e.display.showingFrom, l = e.display.showingTo, a = p(e.display, e.doc, r); x(e, t, a, n) && (n = !1, i = !0, N(e), d(e), r && (r = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, "number" == typeof r ? r : r.top)), a = p(e.display, e.doc, r), !(a.from >= e.display.showingFrom && a.to <= e.display.showingTo));) t = [];
            return i && (Br(e, "update", e), e.display.showingFrom == o && e.display.showingTo == l || Br(e, "viewportChange", e, e.display.showingFrom, e.display.showingTo)), i
        }

        function x(e, t, r, n) {
            var i = e.display,
                o = e.doc;
            if (!i.wrapper.clientWidth) return i.showingFrom = i.showingTo = o.first, void(i.viewOffset = 0);
            if (!(!n && 0 == t.length && r.from > i.showingFrom && r.to < i.showingTo)) {
                g(e) && (t = [{
                    from: o.first,
                    to: o.first + o.size
                }]);
                var l = i.sizer.style.marginLeft = i.gutters.offsetWidth + "px";
                i.scrollbarH.style.left = e.options.fixedGutter ? l : "0";
                var a = 1 / 0;
                if (e.options.lineNumbers)
                    for (var s = 0; s < t.length; ++s)
                        if (t[s].diff) {
                            a = t[s].from;
                            break
                        }
                var c = o.first + o.size,
                    u = Math.max(r.from - e.options.viewportMargin, o.first),
                    f = Math.min(c, r.to + e.options.viewportMargin);
                if (i.showingFrom < u && u - i.showingFrom < 20 && (u = Math.max(o.first, i.showingFrom)), i.showingTo > f && i.showingTo - f < 20 && (f = Math.min(c, i.showingTo)), $n)
                    for (u = pr(Pt(o, ur(o, u))); f < c && Bt(o, ur(o, f));) ++f;
                var h = [{
                    from: Math.max(i.showingFrom, o.first),
                    to: Math.min(i.showingTo, c)
                }];
                if (h = h[0].from >= h[0].to ? [] : L(h, t), $n)
                    for (var s = 0; s < h.length; ++s)
                        for (var d, p = h[s]; d = Ft(ur(o, p.to - 1));) {
                            var m = d.find().from.line;
                            if (!(m > p.from)) {
                                h.splice(s--, 1);
                                break
                            }
                            p.to = m
                        }
                for (var v = 0, s = 0; s < h.length; ++s) {
                    var p = h[s];
                    p.from < u && (p.from = u), p.to > f && (p.to = f), p.from >= p.to ? h.splice(s--, 1) : v += p.to - p.from
                }
                if (!n && v == f - u && u == i.showingFrom && f == i.showingTo) return void w(e);
                h.sort(function (e, t) {
                    return e.from - t.from
                });
                try {
                    var y = document.activeElement
                } catch (e) {}
                v < .7 * (f - u) && (i.lineDiv.style.display = "none"), S(e, u, f, h, a), i.lineDiv.style.display = "", y && document.activeElement != y && y.offsetHeight && y.focus();
                return (u != i.showingFrom || f != i.showingTo || i.lastSizeC != i.wrapper.clientHeight) && (i.lastSizeC = i.wrapper.clientHeight, D(e, 400)), i.showingFrom = u, i.showingTo = f, C(e), w(e), !0
            }
        }

        function C(e) {
            for (var t, r = e.display, n = r.lineDiv.offsetTop, i = r.lineDiv.firstChild; i; i = i.nextSibling)
                if (i.lineObj) {
                    if (Sn) {
                        var o = i.offsetTop + i.offsetHeight;
                        t = o - n, n = o
                    } else {
                        var l = an(i);
                        t = l.bottom - l.top
                    }
                    var a = i.lineObj.height - t;
                    if (t < 2 && (t = te(r)), a > .001 || a < -.001) {
                        dr(i.lineObj, t);
                        var s = i.lineObj.widgets;
                        if (s)
                            for (var c = 0; c < s.length; ++c) s[c].height = s[c].node.offsetHeight
                    }
                }
        }

        function w(e) {
            var t = e.display.viewOffset = gr(e, ur(e.doc, e.display.showingFrom));
            e.display.mover.style.top = t + "px"
        }

        function L(e, t) {
            for (var r = 0, n = t.length || 0; r < n; ++r) {
                for (var i = t[r], o = [], l = i.diff || 0, a = 0, s = e.length; a < s; ++a) {
                    var c = e[a];
                    i.to <= c.from && i.diff ? o.push({
                        from: c.from + l,
                        to: c.to + l
                    }) : i.to <= c.from || i.from >= c.to ? o.push(c) : (i.from > c.from && o.push({
                        from: c.from,
                        to: i.from
                    }), i.to < c.to && o.push({
                        from: i.to + l,
                        to: c.to + l
                    }))
                }
                e = o
            }
            return e
        }

        function k(e) {
            for (var t = e.display, r = {}, n = {}, i = t.gutters.firstChild, o = 0; i; i = i.nextSibling, ++o) r[e.options.gutters[o]] = i.offsetLeft, n[e.options.gutters[o]] = i.offsetWidth;
            return {
                fixedPos: y(t),
                gutterTotalWidth: t.gutters.offsetWidth,
                gutterLeft: r,
                gutterWidth: n,
                wrapperWidth: t.wrapper.clientWidth
            }
        }

        function S(e, t, r, n, i) {
            function o(t) {
                var r = t.nextSibling;
                return Tn && Pn && e.display.currentWheelTarget == t ? (t.style.display = "none", t.lineObj = null) : t.parentNode.removeChild(t), r
            }
            var l = k(e),
                a = e.display,
                s = e.options.lineNumbers;
            n.length || Tn && e.display.currentWheelTarget || nn(a.lineDiv);
            var c = a.lineDiv,
                u = c.firstChild,
                f = n.shift(),
                h = t;
            for (e.doc.iter(t, r, function (t) {
                    if (f && f.to == h && (f = n.shift()), Bt(e.doc, t)) {
                        if (0 != t.height && dr(t, 0), t.widgets && u.previousSibling)
                            for (var r = 0; r < t.widgets.length; ++r) {
                                var a = t.widgets[r];
                                if (a.showIfHidden) {
                                    var d = u.previousSibling;
                                    if (/pre/i.test(d.nodeName)) {
                                        var p = rn("div", null, null, "position: relative");
                                        d.parentNode.replaceChild(p, d), p.appendChild(d), d = p
                                    }
                                    var m = d.appendChild(rn("div", [a.node], "CodeMirror-linewidget"));
                                    a.handleMouseEvents || (m.ignoreEvents = !0), T(a, m, d, l)
                                }
                            }
                    } else if (f && f.from <= h && f.to > h) {
                        for (; u.lineObj != t;) u = o(u);
                        s && i <= h && u.lineNumber && ln(u.lineNumber, v(e.options, h)), u = u.nextSibling
                    } else {
                        if (t.widgets)
                            for (var g, y = 0, b = u; b && y < 20; ++y, b = b.nextSibling)
                                if (b.lineObj == t && /div/i.test(b.nodeName)) {
                                    g = b;
                                    break
                                }
                        var x = M(e, t, h, l, g);
                        if (x != g) c.insertBefore(x, u);
                        else {
                            for (; u != g;) u = o(u);
                            u = u.nextSibling
                        }
                        x.lineObj = t
                    }++h
                }); u;) u = o(u)
        }

        function M(e, t, r, n, i) {
            var o, l = Qt(e, t),
                a = t.gutterMarkers,
                s = e.display;
            if (!(e.options.lineNumbers || a || t.bgClass || t.wrapClass || t.widgets)) return l;
            if (i) {
                i.alignable = null;
                for (var c, u = !0, f = 0, h = null, d = i.firstChild; d; d = c)
                    if (c = d.nextSibling, /\bCodeMirror-linewidget\b/.test(d.className)) {
                        for (var p = 0; p < t.widgets.length; ++p) {
                            var m = t.widgets[p];
                            if (m.node == d.firstChild) {
                                m.above || h || (h = d), T(m, d, i, n), ++f;
                                break
                            }
                        }
                        if (p == t.widgets.length) {
                            u = !1;
                            break
                        }
                    } else i.removeChild(d);
                i.insertBefore(l, h), u && f == t.widgets.length && (o = i, i.className = t.wrapClass || "")
            }
            if (o || (o = rn("div", null, t.wrapClass, "position: relative"), o.appendChild(l)), t.bgClass && o.insertBefore(rn("div", null, t.bgClass + " CodeMirror-linebackground"), o.firstChild), e.options.lineNumbers || a) {
                var g = o.insertBefore(rn("div", null, null, "position: absolute; left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px"), o.firstChild);
                if (e.options.fixedGutter && (o.alignable || (o.alignable = [])).push(g), !e.options.lineNumbers || a && a["CodeMirror-linenumbers"] || (o.lineNumber = g.appendChild(rn("div", v(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + s.lineNumInnerWidth + "px"))), a)
                    for (var y = 0; y < e.options.gutters.length; ++y) {
                        var b = e.options.gutters[y],
                            x = a.hasOwnProperty(b) && a[b];
                        x && g.appendChild(rn("div", [x], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[b] + "px; width: " + n.gutterWidth[b] + "px"))
                    }
            }
            if (Sn && (o.style.zIndex = 2), t.widgets && o != i)
                for (var p = 0, C = t.widgets; p < C.length; ++p) {
                    var m = C[p],
                        w = rn("div", [m.node], "CodeMirror-linewidget");
                    m.handleMouseEvents || (w.ignoreEvents = !0), T(m, w, o, n), m.above ? o.insertBefore(w, e.options.lineNumbers && 0 != t.height ? g : l) : o.appendChild(w), Br(m, "redraw")
                }
            return o
        }

        function T(e, t, r, n) {
            if (e.noHScroll) {
                (r.alignable || (r.alignable = [])).push(t);
                var i = n.wrapperWidth;
                t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px"
            }
            e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"))
        }

        function N(e) {
            var t = e.display,
                r = Ue(e.doc.sel.from, e.doc.sel.to);
            if (r || e.options.showCursorWhenSelecting ? A(e) : t.cursor.style.display = t.otherCursor.style.display = "none", r ? t.selectionDiv.style.display = "none" : H(e), e.options.moveInputWithCursor) {
                var n = Z(e, e.doc.sel.head, "div"),
                    i = an(t.wrapper),
                    o = an(t.lineDiv);
                t.inputDiv.style.top = Math.max(0, Math.min(t.wrapper.clientHeight - 10, n.top + o.top - i.top)) + "px", t.inputDiv.style.left = Math.max(0, Math.min(t.wrapper.clientWidth - 10, n.left + o.left - i.left)) + "px"
            }
        }

        function A(e) {
            var t = e.display,
                r = Z(e, e.doc.sel.head, "div");
            t.cursor.style.left = r.left + "px", t.cursor.style.top = r.top + "px", t.cursor.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", t.cursor.style.display = "", r.other ? (t.otherCursor.style.display = "", t.otherCursor.style.left = r.other.left + "px", t.otherCursor.style.top = r.other.top + "px", t.otherCursor.style.height = .85 * (r.other.bottom - r.other.top) + "px") : t.otherCursor.style.display = "none"
        }

        function H(e) {
            function t(e, t, r, n) {
                t < 0 && (t = 0), l.appendChild(rn("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == r ? a - e : r) + "px; height: " + (n - t) + "px"))
            }

            function r(r, n, o) {
                function l(t, n) {
                    return Y(e, Ke(r, t), "div", f, n)
                }
                var c, u, f = ur(i, r),
                    h = f.text.length;
                return fn(vr(f), n || 0, null == o ? h : o, function (e, r, i) {
                    var f, d, p, m = l(e, "left");
                    if (e == r) f = m, d = p = m.left;
                    else {
                        if (f = l(r - 1, "right"), "rtl" == i) {
                            var g = m;
                            m = f, f = g
                        }
                        d = m.left, p = f.right
                    }
                    null == n && 0 == e && (d = s), f.top - m.top > 3 && (t(d, m.top, null, m.bottom), d = s, m.bottom < f.top && t(d, m.bottom, null, f.top)), null == o && r == h && (p = a), (!c || m.top < c.top || m.top == c.top && m.left < c.left) && (c = m), (!u || f.bottom > u.bottom || f.bottom == u.bottom && f.right > u.right) && (u = f), d < s + 1 && (d = s), t(d, f.top, p - d, f.bottom)
                }), {
                    start: c,
                    end: u
                }
            }
            var n = e.display,
                i = e.doc,
                o = e.doc.sel,
                l = document.createDocumentFragment(),
                a = n.lineSpace.offsetWidth,
                s = P(e.display);
            if (o.from.line == o.to.line) r(o.from.line, o.from.ch, o.to.ch);
            else {
                var c = ur(i, o.from.line),
                    u = ur(i, o.to.line),
                    f = Pt(i, c) == Pt(i, u),
                    h = r(o.from.line, o.from.ch, f ? c.text.length : null).end,
                    d = r(o.to.line, f ? 0 : null, o.to.ch).start;
                f && (h.top < d.top - 2 ? (t(h.right, h.top, null, h.bottom), t(s, d.top, d.left, d.bottom)) : t(h.right, h.top, d.left - h.right, h.bottom)), h.bottom < d.top && t(s, h.bottom, null, d.top)
            }
            on(n.selectionDiv, l), n.selectionDiv.style.display = ""
        }

        function W(e) {
            if (e.state.focused) {
                var t = e.display;
                clearInterval(t.blinker);
                var r = !0;
                t.cursor.style.visibility = t.otherCursor.style.visibility = "", t.blinker = setInterval(function () {
                    t.cursor.style.visibility = t.otherCursor.style.visibility = (r = !r) ? "" : "hidden"
                }, e.options.cursorBlinkRate)
            }
        }

        function D(e, t) {
            e.doc.mode.startState && e.doc.frontier < e.display.showingTo && e.state.highlight.set(t, Qr(O, e))
        }

        function O(e) {
            var t = e.doc;
            if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.showingTo)) {
                var r, n = +new Date + e.options.workTime,
                    i = gt(t.mode, z(e, t.frontier)),
                    o = [];
                t.iter(t.frontier, Math.min(t.first + t.size, e.display.showingTo + 500), function (l) {
                    if (t.frontier >= e.display.showingFrom) {
                        var a = l.styles;
                        l.styles = Xt(e, l, i);
                        for (var s = !a || a.length != l.styles.length, c = 0; !s && c < a.length; ++c) s = a[c] != l.styles[c];
                        s && (r && r.end == t.frontier ? r.end++ : o.push(r = {
                            start: t.frontier,
                            end: t.frontier + 1
                        })), l.stateAfter = gt(t.mode, i)
                    } else Zt(e, l, i), l.stateAfter = t.frontier % 5 == 0 ? gt(t.mode, i) : null;
                    if (++t.frontier, +new Date > n) return D(e, e.options.workDelay), !0
                }), o.length && oe(e, function () {
                    for (var e = 0; e < o.length; ++e) se(this, o[e].start, o[e].end)
                })()
            }
        }

        function E(e, t, r) {
            for (var n, i, o = e.doc, l = t, a = t - 100; l > a; --l) {
                if (l <= o.first) return o.first;
                var s = ur(o, l - 1);
                if (s.stateAfter && (!r || l <= o.frontier)) return l;
                var c = Ur(s.text, null, e.options.tabSize);
                (null == i || n > c) && (i = l - 1, n = c)
            }
            return i
        }

        function z(e, t, r) {
            var n = e.doc,
                i = e.display;
            if (!n.mode.startState) return !0;
            var o = E(e, t, r),
                l = o > n.first && ur(n, o - 1).stateAfter;
            return l = l ? gt(n.mode, l) : vt(n.mode), n.iter(o, t, function (r) {
                Zt(e, r, l);
                var a = o == t - 1 || o % 5 == 0 || o >= i.showingFrom && o < i.showingTo;
                r.stateAfter = a ? gt(n.mode, l) : null, ++o
            }), l
        }

        function I(e) {
            return e.lineSpace.offsetTop
        }

        function F(e) {
            return e.mover.offsetHeight - e.lineSpace.offsetHeight
        }

        function P(e) {
            return on(e.measure, rn("pre", null, null, "text-align: left")).appendChild(rn("span", "x")).offsetLeft
        }

        function B(e, t, r, n, i) {
            var o = -1;
            n = n || V(e, t);
            for (var l = r;; l += o) {
                var a = n[l];
                if (a) break;
                o < 0 && 0 == l && (o = 1)
            }
            return i = l > r ? "left" : l < r ? "right" : i, "left" == i && a.leftSide ? a = a.leftSide : "right" == i && a.rightSide && (a = a.rightSide), {
                left: l < r ? a.right : a.left,
                right: l > r ? a.left : a.right,
                top: a.top,
                bottom: a.bottom
            }
        }

        function R(e, t) {
            for (var r = e.display.measureLineCache, n = 0; n < r.length; ++n) {
                var i = r[n];
                if (i.text == t.text && i.markedSpans == t.markedSpans && e.display.scroller.clientWidth == i.width && i.classes == t.textClass + "|" + t.bgClass + "|" + t.wrapClass) return i
            }
        }

        function G(e, t) {
            var r = R(e, t);
            r && (r.text = r.measure = r.markedSpans = null)
        }

        function V(e, t) {
            var r = R(e, t);
            if (r) return r.measure;
            var n = _(e, t),
                i = e.display.measureLineCache,
                o = {
                    text: t.text,
                    width: e.display.scroller.clientWidth,
                    markedSpans: t.markedSpans,
                    measure: n,
                    classes: t.textClass + "|" + t.bgClass + "|" + t.wrapClass
                };
            return 16 == i.length ? i[++e.display.measureLineCachePos % 16] = o : i.push(o), n
        }

        function _(e, t) {
            function r(e) {
                var t = e.top - d.top,
                    r = e.bottom - d.top;
                r > g && (r = g), t < 0 && (t = 0);
                for (var n = p.length - 2; n >= 0; n -= 2) {
                    var i = p[n],
                        o = p[n + 1];
                    if (!(i > r || o < t) && (i <= t && o >= r || t <= i && r >= o || Math.min(r, o) - Math.max(t, i) >= r - t >> 1)) {
                        p[n] = Math.min(t, i), p[n + 1] = Math.max(r, o);
                        break
                    }
                }
                return n < 0 && (n = p.length, p.push(t, r)), {
                    left: e.left - d.left,
                    right: e.right - d.left,
                    top: n,
                    bottom: null
                }
            }

            function n(e) {
                e.bottom = p[e.top + 1], e.top = p[e.top]
            }
            var i = e.display,
                o = Jr(t.text.length),
                l = Qt(e, t, o, !0);
            if (kn && !Sn && !e.options.lineWrapping && l.childNodes.length > 100) {
                for (var a = document.createDocumentFragment(), s = l.childNodes.length, c = 0, u = Math.ceil(s / 10); c < u; ++c) {
                    for (var f = rn("div", null, null, "display: inline-block"), h = 0; h < 10 && s; ++h) f.appendChild(l.firstChild), --s;
                    a.appendChild(f)
                }
                l.appendChild(a)
            }
            on(i.measure, l);
            var d = an(i.lineDiv),
                p = [],
                m = Jr(t.text.length),
                g = l.offsetHeight;
            Mn && i.measure.first != l && on(i.measure, l);
            for (var v, c = 0; c < o.length; ++c)
                if (v = o[c]) {
                    var y = v,
                        b = null;
                    if (/\bCodeMirror-widget\b/.test(v.className) && v.getClientRects) {
                        1 == v.firstChild.nodeType && (y = v.firstChild);
                        var x = y.getClientRects();
                        x.length > 1 && (b = m[c] = r(x[0]), b.rightSide = r(x[x.length - 1]))
                    }
                    b || (b = m[c] = r(an(y))), v.measureRight && (b.right = an(v.measureRight).left), v.leftSide && (b.leftSide = r(an(v.leftSide)))
                }
            for (var v, c = 0; c < m.length; ++c)(v = m[c]) && (n(v), v.leftSide && n(v.leftSide), v.rightSide && n(v.rightSide));
            return m
        }

        function K(e, t) {
            var r = !1;
            if (t.markedSpans)
                for (var n = 0; n < t.markedSpans; ++n) {
                    var i = t.markedSpans[n];
                    !i.collapsed || null != i.to && i.to != t.text.length || (r = !0)
                }
            var o = !r && R(e, t);
            if (o) return B(e, t, t.text.length, o.measure, "right").right;
            var l = Qt(e, t, null, !0),
                a = l.appendChild(un(e.display.measure));
            return on(e.display.measure, l), an(a).right - an(e.display.lineDiv).left
        }

        function U(e) {
            e.display.measureLineCache.length = e.display.measureLineCachePos = 0, e.display.cachedCharWidth = e.display.cachedTextHeight = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
        }

        function q() {
            return window.pageXOffset || (document.documentElement || document.body).scrollLeft
        }

        function $() {
            return window.pageYOffset || (document.documentElement || document.body).scrollTop
        }

        function j(e, t, r, n) {
            if (t.widgets)
                for (var i = 0; i < t.widgets.length; ++i)
                    if (t.widgets[i].above) {
                        var o = Kt(t.widgets[i]);
                        r.top += o, r.bottom += o
                    }
            if ("line" == n) return r;
            n || (n = "local");
            var l = gr(e, t);
            if ("local" == n ? l += I(e.display) : l -= e.display.viewOffset, "page" == n || "window" == n) {
                var a = an(e.display.lineSpace);
                l += a.top + ("window" == n ? 0 : $());
                var s = a.left + ("window" == n ? 0 : q());
                r.left += s, r.right += s
            }
            return r.top += l, r.bottom += l, r
        }

        function X(e, t, r) {
            if ("div" == r) return t;
            var n = t.left,
                i = t.top;
            if ("page" == r) n -= q(), i -= $();
            else if ("local" == r || !r) {
                var o = an(e.display.sizer);
                n += o.left, i += o.top
            }
            var l = an(e.display.lineSpace);
            return {
                left: n - l.left,
                top: i - l.top
            }
        }

        function Y(e, t, r, n, i) {
            return n || (n = ur(e.doc, t.line)), j(e, n, B(e, n, t.ch, null, i), r)
        }

        function Z(e, t, r, n, i) {
            function o(t, o) {
                var l = B(e, n, t, i, o ? "right" : "left");
                return o ? l.left = l.right : l.right = l.left, j(e, n, l, r)
            }

            function l(e, t) {
                var r = a[t],
                    n = r.level % 2;
                return e == hn(r) && t && r.level < a[t - 1].level ? (r = a[--t], e = dn(r) - (r.level % 2 ? 0 : 1), n = !0) : e == dn(r) && t < a.length - 1 && r.level < a[t + 1].level && (r = a[++t], e = hn(r) - r.level % 2, n = !1), n && e == r.to && e > r.from ? o(e - 1) : o(e, n)
            }
            n = n || ur(e.doc, t.line), i || (i = V(e, n));
            var a = vr(n),
                s = t.ch;
            if (!a) return o(s);
            var c = bn(a, s),
                u = l(s, c);
            return null != Ei && (u.other = l(s, Ei)), u
        }

        function J(e, t, r, n) {
            var i = new Ke(e, t);
            return i.xRel = n, r && (i.outside = !0), i
        }

        function Q(e, t, r) {
            var n = e.doc;
            if ((r += e.display.viewOffset) < 0) return J(n.first, 0, !0, -1);
            var i = mr(n, r),
                o = n.first + n.size - 1;
            if (i > o) return J(n.first + n.size - 1, ur(n, o).text.length, !0, 1);
            for (t < 0 && (t = 0);;) {
                var l = ur(n, i),
                    a = ee(e, l, i, t, r),
                    s = Ft(l),
                    c = s && s.find();
                if (!s || !(a.ch > c.from.ch || a.ch == c.from.ch && a.xRel > 0)) return a;
                i = c.to.line
            }
        }

        function ee(e, t, r, n, i) {
            function o(n) {
                var i = Z(e, Ke(r, n), "line", t, c);
                return a = !0, l > i.bottom ? i.left - s : l < i.top ? i.left + s : (a = !1, i.left)
            }
            var l = i - gr(e, t),
                a = !1,
                s = 2 * e.display.wrapper.clientWidth,
                c = V(e, t),
                u = vr(t),
                f = t.text.length,
                h = pn(t),
                d = mn(t),
                p = o(h),
                m = a,
                g = o(d),
                v = a;
            if (n > g) return J(r, d, v, 1);
            for (;;) {
                if (u ? d == h || d == Cn(t, h, 1) : d - h <= 1) {
                    for (var y = n < p || n - p <= g - n ? h : d, b = n - (y == h ? p : g); Mi.test(t.text.charAt(y));) ++y;
                    return J(r, y, y == h ? m : v, b < 0 ? -1 : b ? 1 : 0)
                }
                var x = Math.ceil(f / 2),
                    C = h + x;
                if (u) {
                    C = h;
                    for (var w = 0; w < x; ++w) C = Cn(t, C, 1)
                }
                var L = o(C);
                L > n ? (d = C, g = L, (v = a) && (g += 1e3), f = x) : (h = C, p = L, m = a, f -= x)
            }
        }

        function te(e) {
            if (null != e.cachedTextHeight) return e.cachedTextHeight;
            if (null == Gn) {
                Gn = rn("pre");
                for (var t = 0; t < 49; ++t) Gn.appendChild(document.createTextNode("x")), Gn.appendChild(rn("br"));
                Gn.appendChild(document.createTextNode("x"))
            }
            on(e.measure, Gn);
            var r = Gn.offsetHeight / 50;
            return r > 3 && (e.cachedTextHeight = r), nn(e.measure), r || 1
        }

        function re(e) {
            if (null != e.cachedCharWidth) return e.cachedCharWidth;
            var t = rn("span", "x"),
                r = rn("pre", [t]);
            on(e.measure, r);
            var n = t.offsetWidth;
            return n > 2 && (e.cachedCharWidth = n), n || 10
        }

        function ne(e) {
            e.curOp = {
                changes: [],
                forceUpdate: !1,
                updateInput: null,
                userSelChange: null,
                textChanged: null,
                selectionChanged: !1,
                cursorActivity: !1,
                updateMaxLine: !1,
                updateScrollPos: !1,
                id: ++jn
            }, Ci++ || (xi = [])
        }

        function ie(e) {
            var t = e.curOp,
                r = e.doc,
                n = e.display;
            if (e.curOp = null, t.updateMaxLine && f(e), n.maxLineChanged && !e.options.lineWrapping && n.maxLine) {
                var i = K(e, n.maxLine);
                n.sizer.style.minWidth = Math.max(0, i + 3 + wi) + "px", n.maxLineChanged = !1;
                var o = Math.max(0, n.sizer.offsetLeft + n.sizer.offsetWidth - n.scroller.clientWidth);
                o < r.scrollLeft && !t.updateScrollPos && Le(e, Math.min(n.scroller.scrollLeft, o), !0)
            }
            var l, a;
            if (t.updateScrollPos) l = t.updateScrollPos;
            else if (t.selectionChanged && n.scroller.clientHeight) {
                var s = Z(e, r.sel.head);
                l = lt(e, s.left, s.top, s.left, s.bottom)
            }(t.changes.length || t.forceUpdate || l && null != l.scrollTop) && (a = b(e, t.changes, l && l.scrollTop, t.forceUpdate), e.display.scroller.offsetHeight && (e.doc.scrollTop = e.display.scroller.scrollTop)), !a && t.selectionChanged && N(e), t.updateScrollPos ? (n.scroller.scrollTop = n.scrollbarV.scrollTop = r.scrollTop = l.scrollTop, n.scroller.scrollLeft = n.scrollbarH.scrollLeft = r.scrollLeft = l.scrollLeft, m(e), t.scrollToPos && it(e, Xe(e.doc, t.scrollToPos), t.scrollToPosMargin)) : l && nt(e), t.selectionChanged && W(e), e.state.focused && t.updateInput && he(e, t.userSelChange);
            var c = t.maybeHiddenMarkers,
                u = t.maybeUnhiddenMarkers;
            if (c)
                for (var h = 0; h < c.length; ++h) c[h].lines.length || Pr(c[h], "hide");
            if (u)
                for (var h = 0; h < u.length; ++h) u[h].lines.length && Pr(u[h], "unhide");
            var d;
            if (--Ci || (d = xi, xi = null), t.textChanged && Pr(e, "change", e, t.textChanged), t.cursorActivity && Pr(e, "cursorActivity", e), d)
                for (var h = 0; h < d.length; ++h) d[h]()
        }

        function oe(e, t) {
            return function () {
                var r = e || this,
                    n = !r.curOp;
                n && ne(r);
                try {
                    var i = t.apply(r, arguments)
                } finally {
                    n && ie(r)
                }
                return i
            }
        }

        function le(e) {
            return function () {
                var t, r = this.cm && !this.cm.curOp;
                r && ne(this.cm);
                try {
                    t = e.apply(this, arguments)
                } finally {
                    r && ie(this.cm)
                }
                return t
            }
        }

        function ae(e, t) {
            var r, n = !e.curOp;
            n && ne(e);
            try {
                r = t()
            } finally {
                n && ie(e)
            }
            return r
        }

        function se(e, t, r, n) {
            null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), e.curOp.changes.push({
                from: t,
                to: r,
                diff: n
            })
        }

        function ce(e) {
            e.display.pollingFast || e.display.poll.set(e.options.pollInterval, function () {
                fe(e), e.state.focused && ce(e)
            })
        }

        function ue(e) {
            function t() {
                fe(e) || r ? (e.display.pollingFast = !1, ce(e)) : (r = !0, e.display.poll.set(60, t))
            }
            var r = !1;
            e.display.pollingFast = !0, e.display.poll.set(20, t)
        }

        function fe(e) {
            var t = e.display.input,
                r = e.display.prevInput,
                n = e.doc,
                i = n.sel;
            if (!e.state.focused || Wi(t) || pe(e) || e.state.disableInput) return !1;
            var o = t.value;
            if (o == r && Ue(i.from, i.to)) return !1;
            if (kn && !Mn && e.display.inputHasSelection === o) return he(e, !0), !1;
            var l = !e.curOp;
            l && ne(e), i.shift = !1;
            for (var a = 0, s = Math.min(r.length, o.length); a < s && r.charCodeAt(a) == o.charCodeAt(a);) ++a;
            var c = i.from,
                u = i.to;
            a < r.length ? c = Ke(c.line, c.ch - (r.length - a)) : e.state.overwrite && Ue(c, u) && !e.state.pasteIncoming && (u = Ke(u.line, Math.min(ur(n, u.line).text.length, u.ch + (o.length - a))));
            var f = e.curOp.updateInput,
                h = {
                    from: c,
                    to: u,
                    text: Hi(o.slice(a)),
                    origin: e.state.pasteIncoming ? "paste" : "+input"
                };
            return Fe(e.doc, h, "end"), e.curOp.updateInput = f, Br(e, "inputRead", e, h), o.length > 1e3 || o.indexOf("\n") > -1 ? t.value = e.display.prevInput = "" : e.display.prevInput = o, l && ie(e), e.state.pasteIncoming = !1, !0
        }

        function he(e, t) {
            var r, n, i = e.doc;
            if (Ue(i.sel.from, i.sel.to)) t && (e.display.prevInput = e.display.input.value = "", kn && !Mn && (e.display.inputHasSelection = null));
            else {
                e.display.prevInput = "", r = Di && (i.sel.to.line - i.sel.from.line > 100 || (n = e.getSelection()).length > 1e3);
                var o = r ? "-" : n || e.getSelection();
                e.display.input.value = o, e.state.focused && jr(e.display.input), kn && !Mn && (e.display.inputHasSelection = o)
            }
            e.display.inaccurateSelection = r
        }

        function de(e) {
            "nocursor" == e.options.readOnly || Fn && document.activeElement == e.display.input || e.display.input.focus()
        }

        function pe(e) {
            return e.options.readOnly || e.doc.cantEdit
        }

        function me(e) {
            function t() {
                e.state.focused && setTimeout(Qr(de, e), 0)
            }

            function r() {
                null == a && (a = setTimeout(function () {
                    a = null, l.cachedCharWidth = l.cachedTextHeight = Ni = null, U(e), ae(e, Qr(se, e))
                }, 100))
            }

            function n() {
                for (var e = l.wrapper.parentNode; e && e != document.body; e = e.parentNode);
                e ? setTimeout(n, 5e3) : Fr(window, "resize", r)
            }

            function i(t) {
                Rr(e, t) || e.options.onDragEvent && e.options.onDragEvent(e, Ar(t)) || Or(t)
            }

            function o() {
                l.inaccurateSelection && (l.prevInput = "", l.inaccurateSelection = !1, l.input.value = e.getSelection(), jr(l.input))
            }
            var l = e.display;
            Ir(l.scroller, "mousedown", oe(e, ye)), kn ? Ir(l.scroller, "dblclick", oe(e, function (t) {
                if (!Rr(e, t)) {
                    var r = ve(e, t);
                    if (r && !be(e, t) && !ge(e.display, t)) {
                        Hr(t);
                        var n = dt(ur(e.doc, r.line).text, r);
                        Je(e.doc, n.from, n.to)
                    }
                }
            })) : Ir(l.scroller, "dblclick", function (t) {
                Rr(e, t) || Hr(t)
            }), Ir(l.lineSpace, "selectstart", function (e) {
                ge(l, e) || Hr(e)
            }), Un || Ir(l.scroller, "contextmenu", function (t) {
                Oe(e, t)
            }), Ir(l.scroller, "scroll", function () {
                l.scroller.clientHeight && (we(e, l.scroller.scrollTop), Le(e, l.scroller.scrollLeft, !0), Pr(e, "scroll", e))
            }), Ir(l.scrollbarV, "scroll", function () {
                l.scroller.clientHeight && we(e, l.scrollbarV.scrollTop)
            }), Ir(l.scrollbarH, "scroll", function () {
                l.scroller.clientHeight && Le(e, l.scrollbarH.scrollLeft)
            }), Ir(l.scroller, "mousewheel", function (t) {
                ke(e, t)
            }), Ir(l.scroller, "DOMMouseScroll", function (t) {
                ke(e, t)
            }), Ir(l.scrollbarH, "mousedown", t), Ir(l.scrollbarV, "mousedown", t), Ir(l.wrapper, "scroll", function () {
                l.wrapper.scrollTop = l.wrapper.scrollLeft = 0
            });
            var a;
            Ir(window, "resize", r), setTimeout(n, 5e3), Ir(l.input, "keyup", oe(e, function (t) {
                Rr(e, t) || e.options.onKeyEvent && e.options.onKeyEvent(e, Ar(t)) || 16 == t.keyCode && (e.doc.sel.shift = !1)
            })), Ir(l.input, "input", Qr(ue, e)), Ir(l.input, "keydown", oe(e, Ae)), Ir(l.input, "keypress", oe(e, He)), Ir(l.input, "focus", Qr(We, e)), Ir(l.input, "blur", Qr(De, e)), e.options.dragDrop && (Ir(l.scroller, "dragstart", function (t) {
                Ce(e, t)
            }), Ir(l.scroller, "dragenter", i), Ir(l.scroller, "dragover", i), Ir(l.scroller, "drop", oe(e, xe))), Ir(l.scroller, "paste", function (t) {
                ge(l, t) || (de(e), ue(e))
            }), Ir(l.input, "paste", function () {
                e.state.pasteIncoming = !0, ue(e)
            }), Ir(l.input, "cut", o), Ir(l.input, "copy", o), Dn && Ir(l.sizer, "mouseup", function () {
                document.activeElement == l.input && l.input.blur(), de(e)
            })
        }

        function ge(e, t) {
            for (var r = Er(t); r != e.wrapper; r = r.parentNode)
                if (!r || r.ignoreEvents || r.parentNode == e.sizer && r != e.mover) return !0
        }

        function ve(e, t, r) {
            var n = e.display;
            if (!r) {
                var i = Er(t);
                if (i == n.scrollbarH || i == n.scrollbarH.firstChild || i == n.scrollbarV || i == n.scrollbarV.firstChild || i == n.scrollbarFiller || i == n.gutterFiller) return null
            }
            var o, l, a = an(n.lineSpace);
            try {
                o = t.clientX, l = t.clientY
            } catch (t) {
                return null
            }
            return Q(e, o - a.left, l - a.top)
        }

        function ye(e) {
            function t(e) {
                if (!Ue(v, e)) {
                    if (v = e, "single" == u) return void Je(i.doc, Xe(l, s), e);
                    if (m = Xe(l, m), g = Xe(l, g), "double" == u) {
                        var t = dt(ur(l, e.line).text, e);
                        qe(e, m) ? Je(i.doc, t.from, g) : Je(i.doc, m, t.to)
                    } else "triple" == u && (qe(e, m) ? Je(i.doc, g, Xe(l, Ke(e.line, 0))) : Je(i.doc, m, Xe(l, Ke(e.line + 1, 0))))
                }
            }

            function r(e) {
                var n = ++b,
                    a = ve(i, e, !0);
                if (a)
                    if (Ue(a, h)) {
                        var s = e.clientY < y.top ? -20 : e.clientY > y.bottom ? 20 : 0;
                        s && setTimeout(oe(i, function () {
                            b == n && (o.scroller.scrollTop += s, r(e))
                        }), 50)
                    } else {
                        i.state.focused || We(i), h = a, t(a);
                        var c = p(o, l);
                        (a.line >= c.to || a.line < c.from) && setTimeout(oe(i, function () {
                            b == n && r(e)
                        }), 150)
                    }
            }

            function n(e) {
                b = 1 / 0, Hr(e), de(i), Fr(document, "mousemove", x), Fr(document, "mouseup", C)
            }
            if (!Rr(this, e)) {
                var i = this,
                    o = i.display,
                    l = i.doc,
                    a = l.sel;
                if (a.shift = e.shiftKey, ge(o, e)) return void(Tn || (o.scroller.draggable = !1, setTimeout(function () {
                    o.scroller.draggable = !0
                }, 100)));
                if (!be(i, e)) {
                    var s = ve(i, e);
                    switch (zr(e)) {
                        case 3:
                            return void(Un && Oe.call(i, i, e));
                        case 2:
                            return s && Je(i.doc, s), setTimeout(Qr(de, i), 20), void Hr(e)
                    }
                    if (!s) return void(Er(e) == o.scroller && Hr(e));
                    i.state.focused || We(i);
                    var c = +new Date,
                        u = "single";
                    if (_n && _n.time > c - 400 && Ue(_n.pos, s)) u = "triple", Hr(e), setTimeout(Qr(de, i), 20), pt(i, s.line);
                    else if (Vn && Vn.time > c - 400 && Ue(Vn.pos, s)) {
                        u = "double", _n = {
                            time: c,
                            pos: s
                        }, Hr(e);
                        var f = dt(ur(l, s.line).text, s);
                        Je(i.doc, f.from, f.to)
                    } else Vn = {
                        time: c,
                        pos: s
                    };
                    var h = s;
                    if (i.options.dragDrop && Ti && !pe(i) && !Ue(a.from, a.to) && !qe(s, a.from) && !qe(a.to, s) && "single" == u) {
                        var d = oe(i, function (t) {
                            Tn && (o.scroller.draggable = !1), i.state.draggingText = !1, Fr(document, "mouseup", d), Fr(o.scroller, "drop", d), Math.abs(e.clientX - t.clientX) + Math.abs(e.clientY - t.clientY) < 10 && (Hr(t), Je(i.doc, s), de(i))
                        });
                        return Tn && (o.scroller.draggable = !0), i.state.draggingText = d, o.scroller.dragDrop && o.scroller.dragDrop(), Ir(document, "mouseup", d), void Ir(o.scroller, "drop", d)
                    }
                    Hr(e), "single" == u && Je(i.doc, Xe(l, s));
                    var m = a.from,
                        g = a.to,
                        v = s,
                        y = an(o.wrapper),
                        b = 0,
                        x = oe(i, function (e) {
                            kn || zr(e) ? r(e) : n(e)
                        }),
                        C = oe(i, n);
                    Ir(document, "mousemove", x), Ir(document, "mouseup", C)
                }
            }
        }

        function be(e, t) {
            var r = e.display;
            try {
                var n = t.clientX,
                    i = t.clientY
            } catch (t) {
                return !1
            }
            if (n >= Math.floor(an(r.gutters).right)) return !1;
            if (Hr(t), !Vr(e, "gutterClick")) return !0;
            var o = an(r.lineDiv);
            if (i > o.bottom) return !0;
            i -= o.top - r.viewOffset;
            for (var l = 0; l < e.options.gutters.length; ++l) {
                var a = r.gutters.childNodes[l];
                if (a && an(a).right >= n) {
                    Br(e, "gutterClick", e, mr(e.doc, i), e.options.gutters[l], t);
                    break
                }
            }
            return !0
        }

        function xe(e) {
            var t = this;
            if (!(Rr(t, e) || ge(t.display, e) || t.options.onDragEvent && t.options.onDragEvent(t, Ar(e)))) {
                Hr(e), kn && (Xn = +new Date);
                var r = ve(t, e, !0),
                    n = e.dataTransfer.files;
                if (r && !pe(t))
                    if (n && n.length && window.FileReader && window.File)
                        for (var i = n.length, o = Array(i), l = 0, a = 0; a < i; ++a) ! function (e, n) {
                            var a = new FileReader;
                            a.onload = function () {
                                o[n] = a.result, ++l == i && (r = Xe(t.doc, r), Fe(t.doc, {
                                    from: r,
                                    to: r,
                                    text: Hi(o.join("\n")),
                                    origin: "paste"
                                }, "around"))
                            }, a.readAsText(e)
                        }(n[a], a);
                    else {
                        if (t.state.draggingText && !qe(r, t.doc.sel.from) && !qe(t.doc.sel.to, r)) return t.state.draggingText(e), void setTimeout(Qr(de, t), 20);
                        try {
                            var o = e.dataTransfer.getData("Text");
                            if (o) {
                                var s = t.doc.sel.from,
                                    c = t.doc.sel.to;
                                et(t.doc, r, r), t.state.draggingText && _e(t.doc, "", s, c, "paste"), t.replaceSelection(o, null, "paste"), de(t), We(t)
                            }
                        } catch (e) {}
                    }
            }
        }

        function Ce(e, t) {
            if (kn && (!e.state.draggingText || +new Date - Xn < 100)) return void Or(t);
            if (!Rr(e, t) && !ge(e.display, t)) {
                var r = e.getSelection();
                if (t.dataTransfer.setData("Text", r), t.dataTransfer.setDragImage && !Wn) {
                    var n = rn("img", null, null, "position: fixed; left: 0; top: 0;");
                    Hn && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), Hn && n.parentNode.removeChild(n)
                }
            }
        }

        function we(e, t) {
            Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, Ln || b(e, [], t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbarV.scrollTop != t && (e.display.scrollbarV.scrollTop = t), Ln && b(e, []), D(e, 100))
        }

        function Le(e, t, r) {
            (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, m(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbarH.scrollLeft != t && (e.display.scrollbarH.scrollLeft = t))
        }

        function ke(e, t) {
            var r = t.wheelDeltaX,
                n = t.wheelDeltaY;
            null == r && t.detail && t.axis == t.HORIZONTAL_AXIS && (r = t.detail), null == n && t.detail && t.axis == t.VERTICAL_AXIS ? n = t.detail : null == n && (n = t.wheelDelta);
            var i = e.display,
                o = i.scroller;
            if (r && o.scrollWidth > o.clientWidth || n && o.scrollHeight > o.clientHeight) {
                if (n && Pn && Tn)
                    for (var l = t.target; l != o; l = l.parentNode)
                        if (l.lineObj) {
                            e.display.currentWheelTarget = l;
                            break
                        }
                if (r && !Ln && !Hn && null != Zn) return n && we(e, Math.max(0, Math.min(o.scrollTop + n * Zn, o.scrollHeight - o.clientHeight))), Le(e, Math.max(0, Math.min(o.scrollLeft + r * Zn, o.scrollWidth - o.clientWidth))), Hr(t), void(i.wheelStartX = null);
                if (n && null != Zn) {
                    var a = n * Zn,
                        s = e.doc.scrollTop,
                        c = s + i.wrapper.clientHeight;
                    a < 0 ? s = Math.max(0, s + a - 50) : c = Math.min(e.doc.height, c + a + 50), b(e, [], {
                        top: s,
                        bottom: c
                    })
                }
                Yn < 20 && (null == i.wheelStartX ? (i.wheelStartX = o.scrollLeft, i.wheelStartY = o.scrollTop, i.wheelDX = r, i.wheelDY = n, setTimeout(function () {
                    if (null != i.wheelStartX) {
                        var e = o.scrollLeft - i.wheelStartX,
                            t = o.scrollTop - i.wheelStartY,
                            r = t && i.wheelDY && t / i.wheelDY || e && i.wheelDX && e / i.wheelDX;
                        i.wheelStartX = i.wheelStartY = null, r && (Zn = (Zn * Yn + r) / (Yn + 1), ++Yn)
                    }
                }, 200)) : (i.wheelDX += r, i.wheelDY += n))
            }
        }

        function Se(e, t, r) {
            if ("string" == typeof t && !(t = ui[t])) return !1;
            e.display.pollingFast && fe(e) && (e.display.pollingFast = !1);
            var n = e.doc,
                i = n.sel.shift,
                o = !1;
            try {
                pe(e) && (e.state.suppressEdits = !0), r && (n.sel.shift = !1), o = t(e) != Li
            } finally {
                n.sel.shift = i, e.state.suppressEdits = !1
            }
            return o
        }

        function Me(e) {
            var t = e.state.keyMaps.slice(0);
            return e.options.extraKeys && t.push(e.options.extraKeys), t.push(e.options.keyMap), t
        }

        function Te(e, t) {
            var r = yt(e.options.keyMap),
                n = r.auto;
            clearTimeout(Jn), n && !xt(t) && (Jn = setTimeout(function () {
                yt(e.options.keyMap) == r && (e.options.keyMap = n.call ? n.call(null, e) : n, l(e))
            }, 50));
            var i = Ct(t, !0),
                o = !1;
            if (!i) return !1;
            var a = Me(e);
            return o = t.shiftKey ? bt("Shift-" + i, a, function (t) {
                return Se(e, t, !0)
            }) || bt(i, a, function (t) {
                if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return Se(e, t)
            }) : bt(i, a, function (t) {
                return Se(e, t)
            }), o && (Hr(t), W(e), Mn && (t.oldKeyCode = t.keyCode, t.keyCode = 0), Br(e, "keyHandled", e, i, t)), o
        }

        function Ne(e, t, r) {
            var n = bt("'" + r + "'", Me(e), function (t) {
                return Se(e, t, !0)
            });
            return n && (Hr(t), W(e), Br(e, "keyHandled", e, "'" + r + "'", t)), n
        }

        function Ae(e) {
            var t = this;
            if (t.state.focused || We(t), kn && 27 == e.keyCode && (e.returnValue = !1), !(Rr(t, e) || t.options.onKeyEvent && t.options.onKeyEvent(t, Ar(e)))) {
                var r = e.keyCode;
                t.doc.sel.shift = 16 == r || e.shiftKey;
                var n = Te(t, e);
                Hn && (ei = n ? r : null, !n && 88 == r && !Di && (Pn ? e.metaKey : e.ctrlKey) && t.replaceSelection(""))
            }
        }

        function He(e) {
            var t = this;
            if (!(Rr(t, e) || t.options.onKeyEvent && t.options.onKeyEvent(t, Ar(e)))) {
                var r = e.keyCode,
                    n = e.charCode;
                if (Hn && r == ei) return ei = null, void Hr(e);
                if (!(Hn && (!e.which || e.which < 10) || Dn) || !Te(t, e)) {
                    var i = String.fromCharCode(null == n ? r : n);
                    this.options.electricChars && this.doc.mode.electricChars && this.options.smartIndent && !pe(this) && this.doc.mode.electricChars.indexOf(i) > -1 && setTimeout(oe(t, function () {
                        ct(t, t.doc.sel.to.line, "smart")
                    }), 75), Ne(t, e, i) || (kn && !Mn && (t.display.inputHasSelection = null), ue(t))
                }
            }
        }

        function We(e) {
            "nocursor" != e.options.readOnly && (e.state.focused || (Pr(e, "focus", e), e.state.focused = !0, -1 == e.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (e.display.wrapper.className += " CodeMirror-focused"), he(e, !0)), ce(e), W(e))
        }

        function De(e) {
            e.state.focused && (Pr(e, "blur", e), e.state.focused = !1, e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(e.display.blinker), setTimeout(function () {
                e.state.focused || (e.doc.sel.shift = !1)
            }, 150)
        }

        function Oe(e, t) {
            function r() {
                if (null != i.input.selectionStart) {
                    var e = i.input.value = " " + (Ue(o.from, o.to) ? "" : i.input.value);
                    i.prevInput = " ", i.input.selectionStart = 1, i.input.selectionEnd = e.length
                }
            }

            function n() {
                if (i.inputDiv.style.position = "relative", i.input.style.cssText = s, Mn && (i.scrollbarV.scrollTop = i.scroller.scrollTop = a), ce(e), null != i.input.selectionStart) {
                    kn && !Mn || r(), clearTimeout(Qn);
                    var t = 0,
                        n = function () {
                            " " == i.prevInput && 0 == i.input.selectionStart ? oe(e, ui.selectAll)(e) : t++ < 10 ? Qn = setTimeout(n, 500) : he(e)
                        };
                    Qn = setTimeout(n, 200)
                }
            }
            if (!Rr(e, t, "contextmenu")) {
                var i = e.display,
                    o = e.doc.sel;
                if (!ge(i, t)) {
                    var l = ve(e, t),
                        a = i.scroller.scrollTop;
                    if (l && !Hn) {
                        (Ue(o.from, o.to) || qe(l, o.from) || !qe(l, o.to)) && oe(e, et)(e.doc, l, l);
                        var s = i.input.style.cssText;
                        if (i.inputDiv.style.position = "absolute", i.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (t.clientY - 5) + "px; left: " + (t.clientX - 5) + "px; z-index: 1000; background: white; outline: none;border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);", de(e), he(e, !0), Ue(o.from, o.to) && (i.input.value = i.prevInput = " "), kn && !Mn && r(), Un) {
                            Or(t);
                            var c = function () {
                                Fr(window, "mouseup", c), setTimeout(n, 20)
                            };
                            Ir(window, "mouseup", c)
                        } else setTimeout(n, 50)
                    }
                }
            }
        }

        function Ee(e, t, r) {
            if (!qe(t.from, r)) return Xe(e, r);
            var n = t.text.length - 1 - (t.to.line - t.from.line);
            if (r.line > t.to.line + n) {
                var i = r.line - n,
                    o = e.first + e.size - 1;
                return i > o ? Ke(o, ur(e, o).text.length) : Ye(r, ur(e, i).text.length)
            }
            if (r.line == t.to.line + n) return Ye(r, $r(t.text).length + (1 == t.text.length ? t.from.ch : 0) + ur(e, t.to.line).text.length - t.to.ch);
            var l = r.line - t.from.line;
            return Ye(r, t.text[l].length + (l ? 0 : t.from.ch))
        }

        function ze(e, t, r) {
            if (r && "object" == typeof r) return {
                anchor: Ee(e, t, r.anchor),
                head: Ee(e, t, r.head)
            };
            if ("start" == r) return {
                anchor: t.from,
                head: t.from
            };
            var n = ti(t);
            if ("around" == r) return {
                anchor: t.from,
                head: n
            };
            if ("end" == r) return {
                anchor: n,
                head: n
            };
            var i = function (e) {
                if (qe(e, t.from)) return e;
                if (!qe(t.to, e)) return n;
                var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                    i = e.ch;
                return e.line == t.to.line && (i += n.ch - t.to.ch), Ke(r, i)
            };
            return {
                anchor: i(e.sel.anchor),
                head: i(e.sel.head)
            }
        }

        function Ie(e, t, r) {
            var n = {
                canceled: !1,
                from: t.from,
                to: t.to,
                text: t.text,
                origin: t.origin,
                cancel: function () {
                    this.canceled = !0
                }
            };
            return r && (n.update = function (t, r, n, i) {
                t && (this.from = Xe(e, t)), r && (this.to = Xe(e, r)), n && (this.text = n), void 0 !== i && (this.origin = i)
            }), Pr(e, "beforeChange", e, n), e.cm && Pr(e.cm, "beforeChange", e.cm, n), n.canceled ? null : {
                from: n.from,
                to: n.to,
                text: n.text,
                origin: n.origin
            }
        }

        function Fe(e, t, r, n) {
            if (e.cm) {
                if (!e.cm.curOp) return oe(e.cm, Fe)(e, t, r, n);
                if (e.cm.state.suppressEdits) return
            }
            if (!(Vr(e, "beforeChange") || e.cm && Vr(e.cm, "beforeChange")) || (t = Ie(e, t, !0))) {
                var i = qn && !n && Et(e, t.from, t.to);
                if (i) {
                    for (var o = i.length - 1; o >= 1; --o) Pe(e, {
                        from: i[o].from,
                        to: i[o].to,
                        text: [""]
                    });
                    i.length && Pe(e, {
                        from: i[0].from,
                        to: i[0].to,
                        text: t.text
                    }, r)
                } else Pe(e, t, r)
            }
        }

        function Pe(e, t, r) {
            var n = ze(e, t, r);
            Cr(e, t, n, e.cm ? e.cm.curOp.id : NaN), Ge(e, t, n, Dt(e, t));
            var i = [];
            sr(e, function (e, r) {
                r || -1 != Xr(i, e.history) || (Tr(e.history, t), i.push(e.history)), Ge(e, t, null, Dt(e, t))
            })
        }

        function Be(e, t) {
            if (!e.cm || !e.cm.state.suppressEdits) {
                var r = e.history,
                    n = ("undo" == t ? r.done : r.undone).pop();
                if (n) {
                    var i = {
                        changes: [],
                        anchorBefore: n.anchorAfter,
                        headBefore: n.headAfter,
                        anchorAfter: n.anchorBefore,
                        headAfter: n.headBefore,
                        generation: r.generation
                    };
                    ("undo" == t ? r.undone : r.done).push(i), r.generation = n.generation || ++r.maxGeneration;
                    for (var o = Vr(e, "beforeChange") || e.cm && Vr(e.cm, "beforeChange"), l = n.changes.length - 1; l >= 0; --l) {
                        var a = n.changes[l];
                        if (a.origin = t, o && !Ie(e, a, !1)) return void(("undo" == t ? r.done : r.undone).length = 0);
                        i.changes.push(xr(e, a));
                        var s = l ? ze(e, a, null) : {
                            anchor: n.anchorBefore,
                            head: n.headBefore
                        };
                        Ge(e, a, s, Ot(e, a));
                        var c = [];
                        sr(e, function (e, t) {
                            t || -1 != Xr(c, e.history) || (Tr(e.history, a), c.push(e.history)), Ge(e, a, null, Ot(e, a))
                        })
                    }
                }
            }
        }

        function Re(e, t) {
            function r(e) {
                return Ke(e.line + t, e.ch)
            }
            e.first += t, e.cm && se(e.cm, e.first, e.first, t), e.sel.head = r(e.sel.head), e.sel.anchor = r(e.sel.anchor), e.sel.from = r(e.sel.from), e.sel.to = r(e.sel.to)
        }

        function Ge(e, t, r, n) {
            if (e.cm && !e.cm.curOp) return oe(e.cm, Ge)(e, t, r, n);
            if (t.to.line < e.first) return void Re(e, t.text.length - 1 - (t.to.line - t.from.line));
            if (!(t.from.line > e.lastLine())) {
                if (t.from.line < e.first) {
                    var i = t.text.length - 1 - (e.first - t.from.line);
                    Re(e, i), t = {
                        from: Ke(e.first, 0),
                        to: Ke(t.to.line + i, t.to.ch),
                        text: [$r(t.text)],
                        origin: t.origin
                    }
                }
                var o = e.lastLine();
                t.to.line > o && (t = {
                    from: t.from,
                    to: Ke(o, ur(e, o).text.length),
                    text: [t.text[0]],
                    origin: t.origin
                }), t.removed = fr(e, t.from, t.to), r || (r = ze(e, t, null)), e.cm ? Ve(e.cm, t, n, r) : or(e, t, n, r)
            }
        }

        function Ve(e, t, r, n) {
            var o = e.doc,
                l = e.display,
                a = t.from,
                s = t.to,
                c = !1,
                f = a.line;
            e.options.lineWrapping || (f = pr(Pt(o, ur(o, a.line))), o.iter(f, s.line + 1, function (e) {
                if (e == l.maxLine) return c = !0, !0
            })), qe(o.sel.head, t.from) || qe(t.to, o.sel.head) || (e.curOp.cursorActivity = !0), or(o, t, r, n, i(e)), e.options.lineWrapping || (o.iter(f, a.line + t.text.length, function (e) {
                var t = u(o, e);
                t > l.maxLineLength && (l.maxLine = e, l.maxLineLength = t, l.maxLineChanged = !0, c = !1)
            }), c && (e.curOp.updateMaxLine = !0)), o.frontier = Math.min(o.frontier, a.line), D(e, 400);
            var h = t.text.length - (s.line - a.line) - 1;
            if (se(e, a.line, s.line + 1, h), Vr(e, "change")) {
                var d = {
                    from: a,
                    to: s,
                    text: t.text,
                    removed: t.removed,
                    origin: t.origin
                };
                if (e.curOp.textChanged) {
                    for (var p = e.curOp.textChanged; p.next; p = p.next);
                    p.next = d
                } else e.curOp.textChanged = d
            }
        }

        function _e(e, t, r, n, i) {
            if (n || (n = r), qe(n, r)) {
                var o = n;
                n = r, r = o
            }
            "string" == typeof t && (t = Hi(t)), Fe(e, {
                from: r,
                to: n,
                text: t,
                origin: i
            }, null)
        }

        function Ke(e, t) {
            if (!(this instanceof Ke)) return new Ke(e, t);
            this.line = e, this.ch = t
        }

        function Ue(e, t) {
            return e.line == t.line && e.ch == t.ch
        }

        function qe(e, t) {
            return e.line < t.line || e.line == t.line && e.ch < t.ch
        }

        function $e(e) {
            return Ke(e.line, e.ch)
        }

        function je(e, t) {
            return Math.max(e.first, Math.min(t, e.first + e.size - 1))
        }

        function Xe(e, t) {
            if (t.line < e.first) return Ke(e.first, 0);
            var r = e.first + e.size - 1;
            return t.line > r ? Ke(r, ur(e, r).text.length) : Ye(t, ur(e, t.line).text.length)
        }

        function Ye(e, t) {
            var r = e.ch;
            return null == r || r > t ? Ke(e.line, t) : r < 0 ? Ke(e.line, 0) : e
        }

        function Ze(e, t) {
            return t >= e.first && t < e.first + e.size
        }

        function Je(e, t, r, n) {
            if (e.sel.shift || e.sel.extend) {
                var i = e.sel.anchor;
                if (r) {
                    var o = qe(t, i);
                    o != qe(r, i) ? (i = t, t = r) : o != qe(t, r) && (t = r)
                }
                et(e, i, t, n)
            } else et(e, t, r || t, n);
            e.cm && (e.cm.curOp.userSelChange = !0)
        }

        function Qe(e, t, r) {
            var n = {
                anchor: t,
                head: r
            };
            return Pr(e, "beforeSelectionChange", e, n), e.cm && Pr(e.cm, "beforeSelectionChange", e.cm, n), n.anchor = Xe(e, n.anchor), n.head = Xe(e, n.head), n
        }

        function et(e, t, r, n, i) {
            if (!i && Vr(e, "beforeSelectionChange") || e.cm && Vr(e.cm, "beforeSelectionChange")) {
                var o = Qe(e, t, r);
                r = o.head, t = o.anchor
            }
            var l = e.sel;
            if (l.goalColumn = null, !i && Ue(t, l.anchor) || (t = rt(e, t, n, "push" != i)), !i && Ue(r, l.head) || (r = rt(e, r, n, "push" != i)), !Ue(l.anchor, t) || !Ue(l.head, r)) {
                l.anchor = t, l.head = r;
                var a = qe(r, t);
                l.from = a ? r : t, l.to = a ? t : r, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = e.cm.curOp.cursorActivity = !0), Br(e, "cursorActivity", e)
            }
        }

        function tt(e) {
            et(e.doc, e.doc.sel.from, e.doc.sel.to, null, "push")
        }

        function rt(e, t, r, n) {
            var i = !1,
                o = t,
                l = r || 1;
            e.cantEdit = !1;
            e: for (;;) {
                var a = ur(e, o.line);
                if (a.markedSpans)
                    for (var s = 0; s < a.markedSpans.length; ++s) {
                        var c = a.markedSpans[s],
                            u = c.marker;
                        if ((null == c.from || (u.inclusiveLeft ? c.from <= o.ch : c.from < o.ch)) && (null == c.to || (u.inclusiveRight ? c.to >= o.ch : c.to > o.ch))) {
                            if (n && (Pr(u, "beforeCursorEnter"), u.explicitlyCleared)) {
                                if (a.markedSpans) {
                                    --s;
                                    continue
                                }
                                break
                            }
                            if (!u.atomic) continue;
                            var f = u.find()[l < 0 ? "from" : "to"];
                            if (Ue(f, o) && (f.ch += l, f.ch < 0 ? f = f.line > e.first ? Xe(e, Ke(f.line - 1)) : null : f.ch > a.text.length && (f = f.line < e.first + e.size - 1 ? Ke(f.line + 1, 0) : null), !f)) {
                                if (i) return n ? (e.cantEdit = !0, Ke(e.first, 0)) : rt(e, t, r, !0);
                                i = !0, f = t, l = -l
                            }
                            o = f;
                            continue e
                        }
                    }
                return o
            }
        }

        function nt(e) {
            var t = it(e, e.doc.sel.head, e.options.cursorScrollMargin);
            if (e.state.focused) {
                var r = e.display,
                    n = an(r.sizer),
                    i = null;
                if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !zn) {
                    var o = "none" == r.cursor.style.display;
                    o && (r.cursor.style.display = "", r.cursor.style.left = t.left + "px", r.cursor.style.top = t.top - r.viewOffset + "px"), r.cursor.scrollIntoView(i), o && (r.cursor.style.display = "none")
                }
            }
        }

        function it(e, t, r) {
            for (null == r && (r = 0);;) {
                var n = !1,
                    i = Z(e, t),
                    o = lt(e, i.left, i.top - r, i.left, i.bottom + r),
                    l = e.doc.scrollTop,
                    a = e.doc.scrollLeft;
                if (null != o.scrollTop && (we(e, o.scrollTop), Math.abs(e.doc.scrollTop - l) > 1 && (n = !0)), null != o.scrollLeft && (Le(e, o.scrollLeft), Math.abs(e.doc.scrollLeft - a) > 1 && (n = !0)), !n) return i
            }
        }

        function ot(e, t, r, n, i) {
            var o = lt(e, t, r, n, i);
            null != o.scrollTop && we(e, o.scrollTop), null != o.scrollLeft && Le(e, o.scrollLeft)
        }

        function lt(e, t, r, n, i) {
            var o = e.display,
                l = te(e.display);
            r < 0 && (r = 0);
            var a = o.scroller.clientHeight - wi,
                s = o.scroller.scrollTop,
                c = {},
                u = e.doc.height + F(o),
                f = r < l,
                h = i > u - l;
            if (r < s) c.scrollTop = f ? 0 : r;
            else if (i > s + a) {
                var d = Math.min(r, (h ? u : i) - a);
                d != s && (c.scrollTop = d)
            }
            var p = o.scroller.clientWidth - wi,
                m = o.scroller.scrollLeft;
            t += o.gutters.offsetWidth, n += o.gutters.offsetWidth;
            var g = o.gutters.offsetWidth,
                v = t < g + 10;
            return t < m + g || v ? (v && (t = 0), c.scrollLeft = Math.max(0, t - 10 - g)) : n > p + m - 3 && (c.scrollLeft = n + 10 - p), c
        }

        function at(e, t, r) {
            e.curOp.updateScrollPos = {
                scrollLeft: null == t ? e.doc.scrollLeft : t,
                scrollTop: null == r ? e.doc.scrollTop : r
            }
        }

        function st(e, t, r) {
            var n = e.curOp.updateScrollPos || (e.curOp.updateScrollPos = {
                    scrollLeft: e.doc.scrollLeft,
                    scrollTop: e.doc.scrollTop
                }),
                i = e.display.scroller;
            n.scrollTop = Math.max(0, Math.min(i.scrollHeight - i.clientHeight, n.scrollTop + r)), n.scrollLeft = Math.max(0, Math.min(i.scrollWidth - i.clientWidth, n.scrollLeft + t))
        }

        function ct(e, t, r, n) {
            var i = e.doc;
            if (null == r && (r = "add"), "smart" == r)
                if (e.doc.mode.indent) var o = z(e, t);
                else r = "prev";
            var l, a = e.options.tabSize,
                s = ur(i, t),
                c = Ur(s.text, null, a),
                u = s.text.match(/^\s*/)[0];
            if ("smart" == r && (l = e.doc.mode.indent(o, s.text.slice(u.length), s.text)) == Li) {
                if (!n) return;
                r = "prev"
            }
            "prev" == r ? l = t > i.first ? Ur(ur(i, t - 1).text, null, a) : 0 : "add" == r ? l = c + e.options.indentUnit : "subtract" == r ? l = c - e.options.indentUnit : "number" == typeof r && (l = c + r), l = Math.max(0, l);
            var f = "",
                h = 0;
            if (e.options.indentWithTabs)
                for (var d = Math.floor(l / a); d; --d) h += a, f += "\t";
            h < l && (f += qr(l - h)), f != u && _e(e.doc, f, Ke(t, 0), Ke(t, u.length), "+input"), s.stateAfter = null
        }

        function ut(e, t, r) {
            var n = t,
                i = t,
                o = e.doc;
            return "number" == typeof t ? i = ur(o, je(o, t)) : n = pr(t), null == n ? null : r(i, n) ? (se(e, n, n + 1), i) : null
        }

        function ft(e, t, r, n, i) {
            function o() {
                var t = a + r;
                return t < e.first || t >= e.first + e.size ? f = !1 : (a = t, u = ur(e, t))
            }

            function l(e) {
                var t = (i ? Cn : wn)(u, s, r, !0);
                if (null == t) {
                    if (e || !o()) return f = !1;
                    s = i ? (r < 0 ? mn : pn)(u) : r < 0 ? u.text.length : 0
                } else s = t;
                return !0
            }
            var a = t.line,
                s = t.ch,
                c = r,
                u = ur(e, a),
                f = !0;
            if ("char" == n) l();
            else if ("column" == n) l(!0);
            else if ("word" == n || "group" == n)
                for (var h = null, d = "group" == n, p = !0; !(r < 0) || l(!p); p = !1) {
                    var m = u.text.charAt(s) || "\n",
                        g = en(m) ? "w" : d ? /\s/.test(m) ? null : "p" : null;
                    if (h && h != g) {
                        r < 0 && (r = 1, l());
                        break
                    }
                    if (g && (h = g), r > 0 && !l(!p)) break
                }
            var v = rt(e, Ke(a, s), c, !0);
            return f || (v.hitSide = !0), v
        }

        function ht(e, t, r, n) {
            var i, o = e.doc,
                l = t.left;
            if ("page" == n) {
                var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                i = t.top + r * (a - (r < 0 ? 1.5 : .5) * te(e.display))
            } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
            for (;;) {
                var s = Q(e, l, i);
                if (!s.outside) break;
                if (r < 0 ? i <= 0 : i >= o.height) {
                    s.hitSide = !0;
                    break
                }
                i += 5 * r
            }
            return s
        }

        function dt(e, t) {
            var r = t.ch,
                n = t.ch;
            if (e) {
                (t.xRel < 0 || n == e.length) && r ? --r : ++n;
                for (var i = e.charAt(r), o = en(i) ? en : /\s/.test(i) ? function (e) {
                        return /\s/.test(e)
                    } : function (e) {
                        return !/\s/.test(e) && !en(e)
                    }; r > 0 && o(e.charAt(r - 1));) --r;
                for (; n < e.length && o(e.charAt(n));) ++n
            }
            return {
                from: Ke(t.line, r),
                to: Ke(t.line, n)
            }
        }

        function pt(e, t) {
            Je(e.doc, Ke(t, 0), Xe(e.doc, Ke(t + 1, 0)))
        }

        function mt(t, r, n, i) {
            e.defaults[t] = r, n && (ri[t] = i ? function (e, t, r) {
                r != ii && n(e, t, r)
            } : n)
        }

        function gt(e, t) {
            if (!0 === t) return t;
            if (e.copyState) return e.copyState(t);
            var r = {};
            for (var n in t) {
                var i = t[n];
                i instanceof Array && (i = i.concat([])), r[n] = i
            }
            return r
        }

        function vt(e, t, r) {
            return !e.startState || e.startState(t, r)
        }

        function yt(e) {
            return "string" == typeof e ? fi[e] : e
        }

        function bt(e, t, r) {
            function n(t) {
                t = yt(t);
                var i = t[e];
                if (!1 === i) return "stop";
                if (null != i && r(i)) return !0;
                if (t.nofallthrough) return "stop";
                var o = t.fallthrough;
                if (null == o) return !1;
                if ("[object Array]" != Object.prototype.toString.call(o)) return n(o);
                for (var l = 0, a = o.length; l < a; ++l) {
                    var s = n(o[l]);
                    if (s) return s
                }
                return !1
            }
            for (var i = 0; i < t.length; ++i) {
                var o = n(t[i]);
                if (o) return "stop" != o
            }
        }

        function xt(e) {
            var t = Oi[e.keyCode];
            return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
        }

        function Ct(e, t) {
            if (Hn && 34 == e.keyCode && e.char) return !1;
            var r = Oi[e.keyCode];
            return null != r && !e.altGraphKey && (e.altKey && (r = "Alt-" + r), (Kn ? e.metaKey : e.ctrlKey) && (r = "Ctrl-" + r), (Kn ? e.ctrlKey : e.metaKey) && (r = "Cmd-" + r), !t && e.shiftKey && (r = "Shift-" + r), r)
        }

        function wt(e, t) {
            this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0
        }

        function Lt(e, t) {
            this.lines = [], this.type = t, this.doc = e
        }

        function kt(e, t, r, n, i) {
            if (n && n.shared) return Mt(e, t, r, n, i);
            if (e.cm && !e.cm.curOp) return oe(e.cm, kt)(e, t, r, n, i);
            var o = new Lt(e, i);
            if ("range" == i && !qe(t, r)) return o;
            n && Zr(n, o), o.replacedWith && (o.collapsed = !0, o.replacedWith = rn("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || (o.replacedWith.ignoreEvents = !0)), o.collapsed && ($n = !0), o.addToHistory && Cr(e, {
                from: t,
                to: r,
                origin: "markText"
            }, {
                head: e.sel.head,
                anchor: e.sel.anchor
            }, NaN);
            var l, a, s, c = t.line,
                u = 0,
                f = e.cm;
            if (e.iter(c, r.line + 1, function (n) {
                    f && o.collapsed && !f.options.lineWrapping && Pt(e, n) == f.display.maxLine && (s = !0);
                    var i = {
                        from: null,
                        to: null,
                        marker: o
                    };
                    u += n.text.length, c == t.line && (i.from = t.ch, u -= t.ch), c == r.line && (i.to = r.ch, u -= n.text.length - r.ch), o.collapsed && (c == r.line && (a = zt(n, r.ch)), c == t.line ? l = zt(n, t.ch) : dr(n, 0)), At(n, i), ++c
                }), o.collapsed && e.iter(t.line, r.line + 1, function (t) {
                    Bt(e, t) && dr(t, 0)
                }), o.clearOnEnter && Ir(o, "beforeCursorEnter", function () {
                    o.clear()
                }), o.readOnly && (qn = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed) {
                if (l != a) throw new Error("Inserting collapsed marker overlapping an existing one");
                o.size = u, o.atomic = !0
            }
            return f && (s && (f.curOp.updateMaxLine = !0), (o.className || o.title || o.startStyle || o.endStyle || o.collapsed) && se(f, t.line, r.line + 1), o.atomic && tt(f)), o
        }

        function St(e, t) {
            this.markers = e, this.primary = t;
            for (var r = 0, n = this; r < e.length; ++r) e[r].parent = this, Ir(e[r], "clear", function () {
                n.clear()
            })
        }

        function Mt(e, t, r, n, i) {
            n = Zr(n), n.shared = !1;
            var o = [kt(e, t, r, n, i)],
                l = o[0],
                a = n.replacedWith;
            return sr(e, function (e) {
                a && (n.replacedWith = a.cloneNode(!0)), o.push(kt(e, Xe(e, t), Xe(e, r), n, i));
                for (var s = 0; s < e.linked.length; ++s)
                    if (e.linked[s].isParent) return;
                l = $r(o)
            }), new St(o, l)
        }

        function Tt(e, t) {
            if (e)
                for (var r = 0; r < e.length; ++r) {
                    var n = e[r];
                    if (n.marker == t) return n
                }
        }

        function Nt(e, t) {
            for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
            return r
        }

        function At(e, t) {
            e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
        }

        function Ht(e, t, r) {
            if (e)
                for (var n, i = 0; i < e.length; ++i) {
                    var o = e[i],
                        l = o.marker,
                        a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                    if (a || "bookmark" == l.type && o.from == t && (!r || !o.marker.insertLeft)) {
                        var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                        (n || (n = [])).push({
                            from: o.from,
                            to: s ? null : o.to,
                            marker: l
                        })
                    }
                }
            return n
        }

        function Wt(e, t, r) {
            if (e)
                for (var n, i = 0; i < e.length; ++i) {
                    var o = e[i],
                        l = o.marker,
                        a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                    if (a || "bookmark" == l.type && o.from == t && (!r || o.marker.insertLeft)) {
                        var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                        (n || (n = [])).push({
                            from: s ? null : o.from - t,
                            to: null == o.to ? null : o.to - t,
                            marker: l
                        })
                    }
                }
            return n
        }

        function Dt(e, t) {
            var r = Ze(e, t.from.line) && ur(e, t.from.line).markedSpans,
                n = Ze(e, t.to.line) && ur(e, t.to.line).markedSpans;
            if (!r && !n) return null;
            var i = t.from.ch,
                o = t.to.ch,
                l = Ue(t.from, t.to),
                a = Ht(r, i, l),
                s = Wt(n, o, l),
                c = 1 == t.text.length,
                u = $r(t.text).length + (c ? i : 0);
            if (a)
                for (var f = 0; f < a.length; ++f) {
                    var h = a[f];
                    if (null == h.to) {
                        var d = Tt(s, h.marker);
                        d ? c && (h.to = null == d.to ? null : d.to + u) : h.to = i
                    }
                }
            if (s)
                for (var f = 0; f < s.length; ++f) {
                    var h = s[f];
                    if (null != h.to && (h.to += u), null == h.from) {
                        var d = Tt(a, h.marker);
                        d || (h.from = u, c && (a || (a = [])).push(h))
                    } else h.from += u, c && (a || (a = [])).push(h)
                }
            if (c && a) {
                for (var f = 0; f < a.length; ++f) null != a[f].from && a[f].from == a[f].to && "bookmark" != a[f].marker.type && a.splice(f--, 1);
                a.length || (a = null)
            }
            var p = [a];
            if (!c) {
                var m, g = t.text.length - 2;
                if (g > 0 && a)
                    for (var f = 0; f < a.length; ++f) null == a[f].to && (m || (m = [])).push({
                        from: null,
                        to: null,
                        marker: a[f].marker
                    });
                for (var f = 0; f < g; ++f) p.push(m);
                p.push(s)
            }
            return p
        }

        function Ot(e, t) {
            var r = Lr(e, t),
                n = Dt(e, t);
            if (!r) return n;
            if (!n) return r;
            for (var i = 0; i < r.length; ++i) {
                var o = r[i],
                    l = n[i];
                if (o && l) e: for (var a = 0; a < l.length; ++a) {
                    for (var s = l[a], c = 0; c < o.length; ++c)
                        if (o[c].marker == s.marker) continue e;
                    o.push(s)
                } else l && (r[i] = l)
            }
            return r
        }

        function Et(e, t, r) {
            var n = null;
            if (e.iter(t.line, r.line + 1, function (e) {
                    if (e.markedSpans)
                        for (var t = 0; t < e.markedSpans.length; ++t) {
                            var r = e.markedSpans[t].marker;
                            !r.readOnly || n && -1 != Xr(n, r) || (n || (n = [])).push(r)
                        }
                }), !n) return null;
            for (var i = [{
                    from: t,
                    to: r
                }], o = 0; o < n.length; ++o)
                for (var l = n[o], a = l.find(), s = 0; s < i.length; ++s) {
                    var c = i[s];
                    if (!qe(c.to, a.from) && !qe(a.to, c.from)) {
                        var u = [s, 1];
                        (qe(c.from, a.from) || !l.inclusiveLeft && Ue(c.from, a.from)) && u.push({
                            from: c.from,
                            to: a.from
                        }), (qe(a.to, c.to) || !l.inclusiveRight && Ue(c.to, a.to)) && u.push({
                            from: a.to,
                            to: c.to
                        }), i.splice.apply(i, u), s += u.length - 1
                    }
                }
            return i
        }

        function zt(e, t) {
            var r, n = $n && e.markedSpans;
            if (n)
                for (var i, o = 0; o < n.length; ++o) i = n[o], i.marker.collapsed && (null == i.from || i.from < t) && (null == i.to || i.to > t) && (!r || r.width < i.marker.width) && (r = i.marker);
            return r
        }

        function It(e) {
            return zt(e, -1)
        }

        function Ft(e) {
            return zt(e, e.text.length + 1)
        }

        function Pt(e, t) {
            for (var r; r = It(t);) t = ur(e, r.find().from.line);
            return t
        }

        function Bt(e, t) {
            var r = $n && t.markedSpans;
            if (r)
                for (var n, i = 0; i < r.length; ++i)
                    if (n = r[i], n.marker.collapsed) {
                        if (null == n.from) return !0;
                        if (!n.marker.replacedWith && 0 == n.from && n.marker.inclusiveLeft && Rt(e, t, n)) return !0
                    }
        }

        function Rt(e, t, r) {
            if (null == r.to) {
                var n = r.marker.find().to,
                    i = ur(e, n.line);
                return Rt(e, i, Tt(i.markedSpans, r.marker))
            }
            if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
            for (var o, l = 0; l < t.markedSpans.length; ++l)
                if (o = t.markedSpans[l], o.marker.collapsed && !o.marker.replacedWith && o.from == r.to && (o.marker.inclusiveLeft || r.marker.inclusiveRight) && Rt(e, t, o)) return !0
        }

        function Gt(e) {
            var t = e.markedSpans;
            if (t) {
                for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
                e.markedSpans = null
            }
        }

        function Vt(e, t) {
            if (t) {
                for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
                e.markedSpans = t
            }
        }

        function _t(e) {
            return function () {
                var t = !this.cm.curOp;
                t && ne(this.cm);
                try {
                    var r = e.apply(this, arguments)
                } finally {
                    t && ie(this.cm)
                }
                return r
            }
        }

        function Kt(e) {
            return null != e.height ? e.height : (e.node.parentNode && 1 == e.node.parentNode.nodeType || on(e.cm.display.measure, rn("div", [e.node], null, "position: relative")), e.height = e.node.offsetHeight)
        }

        function Ut(e, t, r, n) {
            var i = new hi(e, r, n);
            return i.noHScroll && (e.display.alignWidgets = !0), ut(e, t, function (t) {
                var r = t.widgets || (t.widgets = []);
                if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, !Bt(e.doc, t) || i.showIfHidden) {
                    var n = gr(e, t) < e.doc.scrollTop;
                    dr(t, t.height + Kt(i)), n && st(e, 0, i.height)
                }
                return !0
            }), i
        }

        function qt(e, t, r, n) {
            e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), Gt(e), Vt(e, r);
            var i = n ? n(e) : 1;
            i != e.height && dr(e, i)
        }

        function $t(e) {
            e.parent = null, Gt(e)
        }

        function jt(e, t, r, n, i) {
            var o = r.flattenSpans;
            null == o && (o = e.options.flattenSpans);
            var l, a = 0,
                s = null,
                c = new wt(t, e.options.tabSize);
            for ("" == t && r.blankLine && r.blankLine(n); !c.eol();) c.pos > e.options.maxHighlightLength ? (o = !1, c.pos = Math.min(t.length, c.start + 5e4), l = null) : l = r.token(c, n), o && s == l || (a < c.start && i(c.start, s), a = c.start, s = l), c.start = c.pos;
            a < c.pos && i(c.pos, s)
        }

        function Xt(e, t, r) {
            var n = [e.state.modeGen];
            jt(e, t.text, e.doc.mode, r, function (e, t) {
                n.push(e, t)
            });
            for (var i = 0; i < e.state.overlays.length; ++i) {
                var o = e.state.overlays[i],
                    l = 1,
                    a = 0;
                jt(e, t.text, o.mode, !0, function (e, t) {
                    for (var r = l; a < e;) {
                        var i = n[l];
                        i > e && n.splice(l, 1, e, n[l + 1], i), l += 2, a = Math.min(e, i)
                    }
                    if (t)
                        if (o.opaque) n.splice(r, l - r, e, t), l = r + 2;
                        else
                            for (; r < l; r += 2) {
                                var s = n[r + 1];
                                n[r + 1] = s ? s + " " + t : t
                            }
                })
            }
            return n
        }

        function Yt(e, t) {
            return t.styles && t.styles[0] == e.state.modeGen || (t.styles = Xt(e, t, t.stateAfter = z(e, pr(t)))), t.styles
        }

        function Zt(e, t, r) {
            var n = e.doc.mode,
                i = new wt(t.text, e.options.tabSize);
            for ("" == t.text && n.blankLine && n.blankLine(r); !i.eol() && i.pos <= e.options.maxHighlightLength;) n.token(i, r), i.start = i.pos
        }

        function Jt(e) {
            return e ? pi[e] || (pi[e] = "cm-" + e.replace(/ +/g, " cm-")) : null
        }

        function Qt(e, t, r, n) {
            for (var i, o = t, l = !0; i = It(o);) o = ur(e.doc, i.find().from.line);
            var a = {
                pre: rn("pre"),
                col: 0,
                pos: 0,
                measure: null,
                measuredSomething: !1,
                cm: e,
                copyWidgets: n
            };
            o.textClass && (a.pre.className = o.textClass);
            do {
                o.text && (l = !1), a.measure = o == t && r, a.pos = 0, a.addToken = a.measure ? tr : er, (kn || Tn) && e.getOption("lineWrapping") && (a.addToken = rr(a.addToken));
                var s = ir(o, a, Yt(e, o));
                r && o == t && !a.measuredSomething && (r[0] = a.pre.appendChild(un(e.display.measure)), a.measuredSomething = !0), s && (o = ur(e.doc, s.to.line))
            } while (s);
            !r || a.measuredSomething || r[0] || (r[0] = a.pre.appendChild(l ? rn("span", " ") : un(e.display.measure))), a.pre.firstChild || Bt(e.doc, t) || a.pre.appendChild(document.createTextNode(" "));
            var c;
            if (r && kn && (c = vr(o))) {
                var u = c.length - 1;
                c[u].from == c[u].to && --u;
                var f = c[u],
                    h = c[u - 1];
                if (f.from + 1 == f.to && h && f.level < h.level) {
                    var d = r[a.pos - 1];
                    d && d.parentNode.insertBefore(d.measureRight = un(e.display.measure), d.nextSibling)
                }
            }
            return Pr(e, "renderLine", e, t, a.pre), a.pre
        }

        function er(e, t, r, n, i, o) {
            if (t) {
                if (mi.test(t))
                    for (var l = document.createDocumentFragment(), a = 0;;) {
                        mi.lastIndex = a;
                        var s = mi.exec(t),
                            c = s ? s.index - a : t.length - a;
                        if (c && (l.appendChild(document.createTextNode(t.slice(a, a + c))), e.col += c), !s) break;
                        if (a += c + 1, "\t" == s[0]) {
                            var u = e.cm.options.tabSize,
                                f = u - e.col % u;
                            l.appendChild(rn("span", qr(f), "cm-tab")), e.col += f
                        } else {
                            var h = rn("span", "•", "cm-invalidchar");
                            h.title = "\\u" + s[0].charCodeAt(0).toString(16), l.appendChild(h), e.col += 1
                        }
                    } else {
                        e.col += t.length;
                        var l = document.createTextNode(t)
                    }
                if (r || n || i || e.measure) {
                    var d = r || "";
                    n && (d += n), i && (d += i);
                    var h = rn("span", [l], d);
                    return o && (h.title = o), e.pre.appendChild(h)
                }
                e.pre.appendChild(l)
            }
        }

        function tr(e, t, r, n, i) {
            for (var o = e.cm.options.lineWrapping, l = 0; l < t.length; ++l) {
                var a = t.charAt(l),
                    s = 0 == l;
                a >= "�" && a < "�" && l < t.length - 1 ? (a = t.slice(l, l + 2),
                    ++l) : l && o && sn(t, l) && e.pre.appendChild(rn("wbr"));
                var c = e.measure[e.pos],
                    u = e.measure[e.pos] = er(e, a, r, s && n, l == t.length - 1 && i);
                c && (u.leftSide = c.leftSide || c), kn && o && " " == a && l && !/\s/.test(t.charAt(l - 1)) && l < t.length - 1 && !/\s/.test(t.charAt(l + 1)) && (u.style.whiteSpace = "normal"), e.pos += a.length
            }
            t.length && (e.measuredSomething = !0)
        }

        function rr(e) {
            function t(e) {
                for (var t = " ", r = 0; r < e.length - 2; ++r) t += r % 2 ? " " : " ";
                return t += " "
            }
            return function (r, n, i, o, l, a) {
                return e(r, n.replace(/ {3,}/, t), i, o, l, a)
            }
        }

        function nr(e, t, r, n) {
            var i = !n && r.replacedWith;
            if (i && (e.copyWidgets && (i = i.cloneNode(!0)), e.pre.appendChild(i), e.measure)) {
                if (t) e.measure[e.pos] = i;
                else {
                    var o = e.measure[e.pos] = un(e.cm.display.measure);
                    "bookmark" != r.type || r.insertLeft ? e.pre.insertBefore(o, i) : e.pre.appendChild(o)
                }
                e.measuredSomething = !0
            }
            e.pos += t
        }

        function ir(e, t, r) {
            var n = e.markedSpans,
                i = e.text,
                o = 0;
            if (n)
                for (var l, a, s, c, u, f, h = i.length, d = 0, p = 1, m = "", g = 0;;) {
                    if (g == d) {
                        a = s = c = u = "", f = null, g = 1 / 0;
                        for (var v = null, y = 0; y < n.length; ++y) {
                            var b = n[y],
                                x = b.marker;
                            b.from <= d && (null == b.to || b.to > d) ? (null != b.to && g > b.to && (g = b.to, s = ""), x.className && (a += " " + x.className), x.startStyle && b.from == d && (c += " " + x.startStyle), x.endStyle && b.to == g && (s += " " + x.endStyle), x.title && !u && (u = x.title), x.collapsed && (!f || f.marker.size < x.size) && (f = b)) : b.from > d && g > b.from && (g = b.from), "bookmark" == x.type && b.from == d && x.replacedWith && (v = x)
                        }
                        if (f && (f.from || 0) == d && (nr(t, (null == f.to ? h : f.to) - d, f.marker, null == f.from), null == f.to)) return f.marker.find();
                        v && !f && nr(t, 0, v)
                    }
                    if (d >= h) break;
                    for (var C = Math.min(h, g);;) {
                        if (m) {
                            var w = d + m.length;
                            if (!f) {
                                var L = w > C ? m.slice(0, C - d) : m;
                                t.addToken(t, L, l ? l + a : a, c, d + L.length == g ? s : "", u)
                            }
                            if (w >= C) {
                                m = m.slice(C - d), d = C;
                                break
                            }
                            d = w, c = ""
                        }
                        m = i.slice(o, o = r[p++]), l = Jt(r[p++])
                    }
                } else
                    for (var p = 1; p < r.length; p += 2) t.addToken(t, i.slice(o, o = r[p]), Jt(r[p + 1]))
        }

        function or(e, t, r, n, i) {
            function o(e) {
                return r ? r[e] : null
            }

            function l(e, r, n) {
                qt(e, r, n, i), Br(e, "change", e, t)
            }
            var a = t.from,
                s = t.to,
                c = t.text,
                u = ur(e, a.line),
                f = ur(e, s.line),
                h = $r(c),
                d = o(c.length - 1),
                p = s.line - a.line;
            if (0 == a.ch && 0 == s.ch && "" == h) {
                for (var m = 0, g = c.length - 1, v = []; m < g; ++m) v.push(new di(c[m], o(m), i));
                l(f, f.text, d), p && e.remove(a.line, p), v.length && e.insert(a.line, v)
            } else if (u == f)
                if (1 == c.length) l(u, u.text.slice(0, a.ch) + h + u.text.slice(s.ch), d);
                else {
                    for (var v = [], m = 1, g = c.length - 1; m < g; ++m) v.push(new di(c[m], o(m), i));
                    v.push(new di(h + u.text.slice(s.ch), d, i)), l(u, u.text.slice(0, a.ch) + c[0], o(0)), e.insert(a.line + 1, v)
                }
            else if (1 == c.length) l(u, u.text.slice(0, a.ch) + c[0] + f.text.slice(s.ch), o(0)), e.remove(a.line + 1, p);
            else {
                l(u, u.text.slice(0, a.ch) + c[0], o(0)), l(f, h + f.text.slice(s.ch), d);
                for (var m = 1, g = c.length - 1, v = []; m < g; ++m) v.push(new di(c[m], o(m), i));
                p > 1 && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, v)
            }
            Br(e, "change", e, t), et(e, n.anchor, n.head, null, !0)
        }

        function lr(e) {
            this.lines = e, this.parent = null;
            for (var t = 0, r = e.length, n = 0; t < r; ++t) e[t].parent = this, n += e[t].height;
            this.height = n
        }

        function ar(e) {
            this.children = e;
            for (var t = 0, r = 0, n = 0, i = e.length; n < i; ++n) {
                var o = e[n];
                t += o.chunkSize(), r += o.height, o.parent = this
            }
            this.size = t, this.height = r, this.parent = null
        }

        function sr(e, t, r) {
            function n(e, i, o) {
                if (e.linked)
                    for (var l = 0; l < e.linked.length; ++l) {
                        var a = e.linked[l];
                        if (a.doc != i) {
                            var s = o && a.sharedHist;
                            r && !s || (t(a.doc, s), n(a.doc, e, s))
                        }
                    }
            }
            n(e, null, !0)
        }

        function cr(e, t) {
            if (t.cm) throw new Error("This document is already in use.");
            e.doc = t, t.cm = e, o(e), r(e), e.options.lineWrapping || f(e), e.options.mode = t.modeOption, se(e)
        }

        function ur(e, t) {
            for (t -= e.first; !e.lines;)
                for (var r = 0;; ++r) {
                    var n = e.children[r],
                        i = n.chunkSize();
                    if (t < i) {
                        e = n;
                        break
                    }
                    t -= i
                }
            return e.lines[t]
        }

        function fr(e, t, r) {
            var n = [],
                i = t.line;
            return e.iter(t.line, r.line + 1, function (e) {
                var o = e.text;
                i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i
            }), n
        }

        function hr(e, t, r) {
            var n = [];
            return e.iter(t, r, function (e) {
                n.push(e.text)
            }), n
        }

        function dr(e, t) {
            for (var r = t - e.height, n = e; n; n = n.parent) n.height += r
        }

        function pr(e) {
            if (null == e.parent) return null;
            for (var t = e.parent, r = Xr(t.lines, e), n = t.parent; n; t = n, n = n.parent)
                for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
            return r + t.first
        }

        function mr(e, t) {
            var r = e.first;
            e: do {
                for (var n = 0, i = e.children.length; n < i; ++n) {
                    var o = e.children[n],
                        l = o.height;
                    if (t < l) {
                        e = o;
                        continue e
                    }
                    t -= l, r += o.chunkSize()
                }
                return r
            } while (!e.lines);
            for (var n = 0, i = e.lines.length; n < i; ++n) {
                var a = e.lines[n],
                    s = a.height;
                if (t < s) break;
                t -= s
            }
            return r + n
        }

        function gr(e, t) {
            t = Pt(e.doc, t);
            for (var r = 0, n = t.parent, i = 0; i < n.lines.length; ++i) {
                var o = n.lines[i];
                if (o == t) break;
                r += o.height
            }
            for (var l = n.parent; l; n = l, l = n.parent)
                for (var i = 0; i < l.children.length; ++i) {
                    var a = l.children[i];
                    if (a == n) break;
                    r += a.height
                }
            return r
        }

        function vr(e) {
            var t = e.order;
            return null == t && (t = e.order = zi(e.text)), t
        }

        function yr(e) {
            return {
                done: [],
                undone: [],
                undoDepth: 1 / 0,
                lastTime: 0,
                lastOp: null,
                lastOrigin: null,
                generation: e || 1,
                maxGeneration: e || 1
            }
        }

        function br(e, t, r, n) {
            var i = t["spans_" + e.id],
                o = 0;
            e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function (r) {
                r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o
            })
        }

        function xr(e, t) {
            var r = {
                    line: t.from.line,
                    ch: t.from.ch
                },
                n = {
                    from: r,
                    to: ti(t),
                    text: fr(e, t.from, t.to)
                };
            return br(e, n, t.from.line, t.to.line + 1), sr(e, function (e) {
                br(e, n, t.from.line, t.to.line + 1)
            }, !0), n
        }

        function Cr(e, t, r, n) {
            var i = e.history;
            i.undone.length = 0;
            var o = +new Date,
                l = $r(i.done);
            if (l && (i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastTime > o - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0)))) {
                var a = $r(l.changes);
                Ue(t.from, t.to) && Ue(t.from, a.to) ? a.to = ti(t) : l.changes.push(xr(e, t)), l.anchorAfter = r.anchor, l.headAfter = r.head
            } else
                for (l = {
                        changes: [xr(e, t)],
                        generation: i.generation,
                        anchorBefore: e.sel.anchor,
                        headBefore: e.sel.head,
                        anchorAfter: r.anchor,
                        headAfter: r.head
                    }, i.done.push(l), i.generation = ++i.maxGeneration; i.done.length > i.undoDepth;) i.done.shift();
            i.lastTime = o, i.lastOp = n, i.lastOrigin = t.origin
        }

        function wr(e) {
            if (!e) return null;
            for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
            return t ? t.length ? t : null : e
        }

        function Lr(e, t) {
            var r = t["spans_" + e.id];
            if (!r) return null;
            for (var n = 0, i = []; n < t.text.length; ++n) i.push(wr(r[n]));
            return i
        }

        function kr(e, t) {
            for (var r = 0, n = []; r < e.length; ++r) {
                var i = e[r],
                    o = i.changes,
                    l = [];
                n.push({
                    changes: l,
                    anchorBefore: i.anchorBefore,
                    headBefore: i.headBefore,
                    anchorAfter: i.anchorAfter,
                    headAfter: i.headAfter
                });
                for (var a = 0; a < o.length; ++a) {
                    var s, c = o[a];
                    if (l.push({
                            from: c.from,
                            to: c.to,
                            text: c.text
                        }), t)
                        for (var u in c)(s = u.match(/^spans_(\d+)$/)) && Xr(t, Number(s[1])) > -1 && ($r(l)[u] = c[u], delete c[u])
                }
            }
            return n
        }

        function Sr(e, t, r, n) {
            r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0)
        }

        function Mr(e, t, r, n) {
            for (var i = 0; i < e.length; ++i) {
                for (var o = e[i], l = !0, a = 0; a < o.changes.length; ++a) {
                    var s = o.changes[a];
                    if (o.copied || (s.from = $e(s.from), s.to = $e(s.to)), r < s.from.line) s.from.line += n, s.to.line += n;
                    else if (t <= s.to.line) {
                        l = !1;
                        break
                    }
                }
                o.copied || (o.anchorBefore = $e(o.anchorBefore), o.headBefore = $e(o.headBefore), o.anchorAfter = $e(o.anchorAfter), o.readAfter = $e(o.headAfter), o.copied = !0), l ? (Sr(o.anchorBefore), Sr(o.headBefore), Sr(o.anchorAfter), Sr(o.headAfter)) : (e.splice(0, i + 1), i = 0)
            }
        }

        function Tr(e, t) {
            var r = t.from.line,
                n = t.to.line,
                i = t.text.length - (n - r) - 1;
            Mr(e.done, r, n, i), Mr(e.undone, r, n, i)
        }

        function Nr() {
            Or(this)
        }

        function Ar(e) {
            return e.stop || (e.stop = Nr), e
        }

        function Hr(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }

        function Wr(e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        }

        function Dr(e) {
            return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
        }

        function Or(e) {
            Hr(e), Wr(e)
        }

        function Er(e) {
            return e.target || e.srcElement
        }

        function zr(e) {
            var t = e.which;
            return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Pn && e.ctrlKey && 1 == t && (t = 3), t
        }

        function Ir(e, t, r) {
            if (e.addEventListener) e.addEventListener(t, r, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, r);
            else {
                var n = e._handlers || (e._handlers = {}),
                    i = n[t] || (n[t] = []);
                i.push(r)
            }
        }

        function Fr(e, t, r) {
            if (e.removeEventListener) e.removeEventListener(t, r, !1);
            else if (e.detachEvent) e.detachEvent("on" + t, r);
            else {
                var n = e._handlers && e._handlers[t];
                if (!n) return;
                for (var i = 0; i < n.length; ++i)
                    if (n[i] == r) {
                        n.splice(i, 1);
                        break
                    }
            }
        }

        function Pr(e, t) {
            var r = e._handlers && e._handlers[t];
            if (r)
                for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n)
        }

        function Br(e, t) {
            var r = e._handlers && e._handlers[t];
            if (r) {
                var n = Array.prototype.slice.call(arguments, 2);
                xi || (++Ci, xi = [], setTimeout(Gr, 0));
                for (var i = 0; i < r.length; ++i) xi.push(function (e) {
                    return function () {
                        e.apply(null, n)
                    }
                }(r[i]))
            }
        }

        function Rr(e, t, r) {
            return Pr(e, r || t.type, e, t), Dr(t) || t.codemirrorIgnore
        }

        function Gr() {
            --Ci;
            var e = xi;
            xi = null;
            for (var t = 0; t < e.length; ++t) e[t]()
        }

        function Vr(e, t) {
            var r = e._handlers && e._handlers[t];
            return r && r.length > 0
        }

        function _r(e) {
            e.prototype.on = function (e, t) {
                Ir(this, e, t)
            }, e.prototype.off = function (e, t) {
                Fr(this, e, t)
            }
        }

        function Kr() {
            this.id = null
        }

        function Ur(e, t, r, n, i) {
            null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
            for (var o = n || 0, l = i || 0; o < t; ++o) "\t" == e.charAt(o) ? l += r - l % r : ++l;
            return l
        }

        function qr(e) {
            for (; ki.length <= e;) ki.push($r(ki) + " ");
            return ki[e]
        }

        function $r(e) {
            return e[e.length - 1]
        }

        function jr(e) {
            if (In) e.selectionStart = 0, e.selectionEnd = e.value.length;
            else try {
                e.select()
            } catch (e) {}
        }

        function Xr(e, t) {
            if (e.indexOf) return e.indexOf(t);
            for (var r = 0, n = e.length; r < n; ++r)
                if (e[r] == t) return r;
            return -1
        }

        function Yr(e, t) {
            function r() {}
            r.prototype = e;
            var n = new r;
            return t && Zr(t, n), n
        }

        function Zr(e, t) {
            t || (t = {});
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            return t
        }

        function Jr(e) {
            for (var t = [], r = 0; r < e; ++r) t.push(void 0);
            return t
        }

        function Qr(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return function () {
                return e.apply(null, t)
            }
        }

        function en(e) {
            return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Si.test(e))
        }

        function tn(e) {
            for (var t in e)
                if (e.hasOwnProperty(t) && e[t]) return !1;
            return !0
        }

        function rn(e, t, r, n) {
            var i = document.createElement(e);
            if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) ln(i, t);
            else if (t)
                for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
            return i
        }

        function nn(e) {
            for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
            return e
        }

        function on(e, t) {
            return nn(e).appendChild(t)
        }

        function ln(e, t) {
            Mn ? (e.innerHTML = "", e.appendChild(document.createTextNode(t))) : e.textContent = t
        }

        function an(e) {
            return e.getBoundingClientRect()
        }

        function sn() {
            return !1
        }

        function cn(e) {
            if (null != Ni) return Ni;
            var t = rn("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
            return on(e, t), t.offsetWidth && (Ni = t.offsetHeight - t.clientHeight), Ni || 0
        }

        function un(e) {
            if (null == Ai) {
                var t = rn("span", "​");
                on(e, rn("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Ai = t.offsetWidth <= 1 && t.offsetHeight > 2 && !Sn)
            }
            return Ai ? rn("span", "​") : rn("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
        }

        function fn(e, t, r, n) {
            if (!e) return n(t, r, "ltr");
            for (var i = !1, o = 0; o < e.length; ++o) {
                var l = e[o];
                (l.from < r && l.to > t || t == r && l.to == t) && (n(Math.max(l.from, t), Math.min(l.to, r), 1 == l.level ? "rtl" : "ltr"), i = !0)
            }
            i || n(t, r, "ltr")
        }

        function hn(e) {
            return e.level % 2 ? e.to : e.from
        }

        function dn(e) {
            return e.level % 2 ? e.from : e.to
        }

        function pn(e) {
            var t = vr(e);
            return t ? hn(t[0]) : 0
        }

        function mn(e) {
            var t = vr(e);
            return t ? dn($r(t)) : e.text.length
        }

        function gn(e, t) {
            var r = ur(e.doc, t),
                n = Pt(e.doc, r);
            n != r && (t = pr(n));
            var i = vr(n);
            return Ke(t, i ? i[0].level % 2 ? mn(n) : pn(n) : 0)
        }

        function vn(e, t) {
            for (var r, n; r = Ft(n = ur(e.doc, t));) t = r.find().to.line;
            var i = vr(n);
            return Ke(t, i ? i[0].level % 2 ? pn(n) : mn(n) : n.text.length)
        }

        function yn(e, t, r) {
            var n = e[0].level;
            return t == n || r != n && t < r
        }

        function bn(e, t) {
            for (var r, n = 0; n < e.length; ++n) {
                var i = e[n];
                if (i.from < t && i.to > t) return Ei = null, n;
                if (i.from == t || i.to == t) {
                    if (null != r) return yn(e, i.level, e[r].level) ? (Ei = r, n) : (Ei = n, r);
                    r = n
                }
            }
            return Ei = null, r
        }

        function xn(e, t, r, n) {
            if (!n) return t + r;
            do {
                t += r
            } while (t > 0 && Mi.test(e.text.charAt(t)));
            return t
        }

        function Cn(e, t, r, n) {
            var i = vr(e);
            if (!i) return wn(e, t, r, n);
            for (var o = bn(i, t), l = i[o], a = xn(e, t, l.level % 2 ? -r : r, n);;) {
                if (a > l.from && a < l.to) return a;
                if (a == l.from || a == l.to) return bn(i, a) == o ? a : (l = i[o += r], r > 0 == l.level % 2 ? l.to : l.from);
                if (!(l = i[o += r])) return null;
                a = r > 0 == l.level % 2 ? xn(e, l.to, -1, n) : xn(e, l.from, 1, n)
            }
        }

        function wn(e, t, r, n) {
            var i = t + r;
            if (n)
                for (; i > 0 && Mi.test(e.text.charAt(i));) i += r;
            return i < 0 || i > e.text.length ? null : i
        }
        var Ln = /gecko\/\d/i.test(navigator.userAgent),
            kn = /MSIE \d/.test(navigator.userAgent),
            Sn = kn && (null == document.documentMode || document.documentMode < 8),
            Mn = kn && (null == document.documentMode || document.documentMode < 9),
            Tn = /WebKit\//.test(navigator.userAgent),
            Nn = Tn && /Qt\/\d+\.\d+/.test(navigator.userAgent),
            An = /Chrome\//.test(navigator.userAgent),
            Hn = /Opera\//.test(navigator.userAgent),
            Wn = /Apple Computer/.test(navigator.vendor),
            Dn = /KHTML\//.test(navigator.userAgent),
            On = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
            En = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
            zn = /PhantomJS/.test(navigator.userAgent),
            In = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
            Fn = In || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
            Pn = In || /Mac/.test(navigator.platform),
            Bn = /windows/i.test(navigator.platform),
            Rn = Hn && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
        Rn && (Rn = Number(Rn[1])), Rn && Rn >= 15 && (Hn = !1, Tn = !0);
        var Gn, Vn, _n, Kn = Pn && (Nn || Hn && (null == Rn || Rn < 12.11)),
            Un = Ln || kn && !Mn,
            qn = !1,
            $n = !1,
            jn = 0,
            Xn = 0,
            Yn = 0,
            Zn = null;
        kn ? Zn = -.53 : Ln ? Zn = 15 : An ? Zn = -.7 : Wn && (Zn = -1 / 3);
        var Jn, Qn, ei = null,
            ti = e.changeEnd = function (e) {
                return e.text ? Ke(e.from.line + e.text.length - 1, $r(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
            };
        e.Pos = Ke, e.prototype = {
            constructor: e,
            focus: function () {
                window.focus(), de(this), We(this), ue(this)
            },
            setOption: function (e, t) {
                var r = this.options,
                    n = r[e];
                r[e] == t && "mode" != e || (r[e] = t, ri.hasOwnProperty(e) && oe(this, ri[e])(this, t, n))
            },
            getOption: function (e) {
                return this.options[e]
            },
            getDoc: function () {
                return this.doc
            },
            addKeyMap: function (e, t) {
                this.state.keyMaps[t ? "push" : "unshift"](e)
            },
            removeKeyMap: function (e) {
                for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                    if (t[r] == e || "string" != typeof t[r] && t[r].name == e) return t.splice(r, 1), !0
            },
            addOverlay: oe(null, function (t, r) {
                var n = t.token ? t : e.getMode(this.options, t);
                if (n.startState) throw new Error("Overlays may not be stateful.");
                this.state.overlays.push({
                    mode: n,
                    modeSpec: t,
                    opaque: r && r.opaque
                }), this.state.modeGen++, se(this)
            }),
            removeOverlay: oe(null, function (e) {
                for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                    var n = t[r].modeSpec;
                    if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, void se(this)
                }
            }),
            indentLine: oe(null, function (e, t, r) {
                "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Ze(this.doc, e) && ct(this, e, t, r)
            }),
            indentSelection: oe(null, function (e) {
                var t = this.doc.sel;
                if (Ue(t.from, t.to)) return ct(this, t.from.line, e);
                for (var r = t.to.line - (t.to.ch ? 0 : 1), n = t.from.line; n <= r; ++n) ct(this, n, e)
            }),
            getTokenAt: function (e, t) {
                var r = this.doc;
                e = Xe(r, e);
                for (var n = z(this, e.line, t), i = this.doc.mode, o = ur(r, e.line), l = new wt(o.text, this.options.tabSize); l.pos < e.ch && !l.eol();) {
                    l.start = l.pos;
                    var a = i.token(l, n)
                }
                return {
                    start: l.start,
                    end: l.pos,
                    string: l.current(),
                    className: a || null,
                    type: a || null,
                    state: n
                }
            },
            getTokenTypeAt: function (e) {
                e = Xe(this.doc, e);
                var t = Yt(this, ur(this.doc, e.line)),
                    r = 0,
                    n = (t.length - 1) / 2,
                    i = e.ch;
                if (0 == i) return t[2];
                for (;;) {
                    var o = r + n >> 1;
                    if ((o ? t[2 * o - 1] : 0) >= i) n = o;
                    else {
                        if (!(t[2 * o + 1] < i)) return t[2 * o + 2];
                        r = o + 1
                    }
                }
            },
            getModeAt: function (t) {
                var r = this.doc.mode;
                return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r
            },
            getHelper: function (e, t) {
                if (ci.hasOwnProperty(t)) {
                    var r = ci[t],
                        n = this.getModeAt(e);
                    return n[t] && r[n[t]] || n.helperType && r[n.helperType] || r[n.name]
                }
            },
            getStateAfter: function (e, t) {
                var r = this.doc;
                return e = je(r, null == e ? r.first + r.size - 1 : e), z(this, e + 1, t)
            },
            cursorCoords: function (e, t) {
                var r, n = this.doc.sel;
                return r = null == e ? n.head : "object" == typeof e ? Xe(this.doc, e) : e ? n.from : n.to, Z(this, r, t || "page")
            },
            charCoords: function (e, t) {
                return Y(this, Xe(this.doc, e), t || "page")
            },
            coordsChar: function (e, t) {
                return e = X(this, e, t || "page"), Q(this, e.left, e.top)
            },
            lineAtHeight: function (e, t) {
                return e = X(this, {
                    top: e,
                    left: 0
                }, t || "page").top, mr(this.doc, e + this.display.viewOffset)
            },
            heightAtLine: function (e, t) {
                var r = !1,
                    n = this.doc.first + this.doc.size - 1;
                e < this.doc.first ? e = this.doc.first : e > n && (e = n, r = !0);
                var i = ur(this.doc, e);
                return j(this, ur(this.doc, e), {
                    top: 0,
                    left: 0
                }, t || "page").top + (r ? i.height : 0)
            },
            defaultTextHeight: function () {
                return te(this.display)
            },
            defaultCharWidth: function () {
                return re(this.display)
            },
            setGutterMarker: oe(null, function (e, t, r) {
                return ut(this, e, function (e) {
                    var n = e.gutterMarkers || (e.gutterMarkers = {});
                    return n[t] = r, !r && tn(n) && (e.gutterMarkers = null), !0
                })
            }),
            clearGutter: oe(null, function (e) {
                var t = this,
                    r = t.doc,
                    n = r.first;
                r.iter(function (r) {
                    r.gutterMarkers && r.gutterMarkers[e] && (r.gutterMarkers[e] = null, se(t, n, n + 1), tn(r.gutterMarkers) && (r.gutterMarkers = null)), ++n
                })
            }),
            addLineClass: oe(null, function (e, t, r) {
                return ut(this, e, function (e) {
                    var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "wrapClass";
                    if (e[n]) {
                        if (new RegExp("(?:^|\\s)" + r + "(?:$|\\s)").test(e[n])) return !1;
                        e[n] += " " + r
                    } else e[n] = r;
                    return !0
                })
            }),
            removeLineClass: oe(null, function (e, t, r) {
                return ut(this, e, function (e) {
                    var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "wrapClass",
                        i = e[n];
                    if (!i) return !1;
                    if (null == r) e[n] = null;
                    else {
                        var o = i.match(new RegExp("(?:^|\\s+)" + r + "(?:$|\\s+)"));
                        if (!o) return !1;
                        var l = o.index + o[0].length;
                        e[n] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
                    }
                    return !0
                })
            }),
            addLineWidget: oe(null, function (e, t, r) {
                return Ut(this, e, t, r)
            }),
            removeLineWidget: function (e) {
                e.clear()
            },
            lineInfo: function (e) {
                if ("number" == typeof e) {
                    if (!Ze(this.doc, e)) return null;
                    var t = e;
                    if (!(e = ur(this.doc, e))) return null
                } else {
                    var t = pr(e);
                    if (null == t) return null
                }
                return {
                    line: t,
                    handle: e,
                    text: e.text,
                    gutterMarkers: e.gutterMarkers,
                    textClass: e.textClass,
                    bgClass: e.bgClass,
                    wrapClass: e.wrapClass,
                    widgets: e.widgets
                }
            },
            getViewport: function () {
                return {
                    from: this.display.showingFrom,
                    to: this.display.showingTo
                }
            },
            addWidget: function (e, t, r, n, i) {
                var o = this.display;
                e = Z(this, Xe(this.doc, e));
                var l = e.bottom,
                    a = e.left;
                if (t.style.position = "absolute", o.sizer.appendChild(t), "over" == n) l = e.top;
                else if ("above" == n || "near" == n) {
                    var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                        c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                    ("above" == n || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? l = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (l = e.bottom), a + t.offsetWidth > c && (a = c - t.offsetWidth)
                }
                t.style.top = l + "px", t.style.left = t.style.right = "", "right" == i ? (a = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = a + "px"), r && ot(this, a, l, a + t.offsetWidth, l + t.offsetHeight)
            },
            triggerOnKeyDown: oe(null, Ae),
            execCommand: function (e) {
                return ui[e](this)
            },
            findPosH: function (e, t, r, n) {
                var i = 1;
                t < 0 && (i = -1, t = -t);
                for (var o = 0, l = Xe(this.doc, e); o < t && (l = ft(this.doc, l, i, r, n), !l.hitSide); ++o);
                return l
            },
            moveH: oe(null, function (e, t) {
                var r, n = this.doc.sel;
                r = n.shift || n.extend || Ue(n.from, n.to) ? ft(this.doc, n.head, e, t, this.options.rtlMoveVisually) : e < 0 ? n.from : n.to, Je(this.doc, r, r, e)
            }),
            deleteH: oe(null, function (e, t) {
                var r = this.doc.sel;
                Ue(r.from, r.to) ? _e(this.doc, "", r.from, ft(this.doc, r.head, e, t, !1), "+delete") : _e(this.doc, "", r.from, r.to, "+delete"), this.curOp.userSelChange = !0
            }),
            findPosV: function (e, t, r, n) {
                var i = 1,
                    o = n;
                t < 0 && (i = -1, t = -t);
                for (var l = 0, a = Xe(this.doc, e); l < t; ++l) {
                    var s = Z(this, a, "div");
                    if (null == o ? o = s.left : s.left = o, a = ht(this, s, i, r), a.hitSide) break
                }
                return a
            },
            moveV: oe(null, function (e, t) {
                var r = this.doc.sel,
                    n = Z(this, r.head, "div");
                null != r.goalColumn && (n.left = r.goalColumn);
                var i = ht(this, n, e, t);
                "page" == t && st(this, 0, Y(this, i, "div").top - n.top), Je(this.doc, i, i, e), r.goalColumn = n.left
            }),
            toggleOverwrite: function (e) {
                null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" : this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", ""))
            },
            hasFocus: function () {
                return this.state.focused
            },
            scrollTo: oe(null, function (e, t) {
                at(this, e, t)
            }),
            getScrollInfo: function () {
                var e = this.display.scroller,
                    t = wi;
                return {
                    left: e.scrollLeft,
                    top: e.scrollTop,
                    height: e.scrollHeight - t,
                    width: e.scrollWidth - t,
                    clientHeight: e.clientHeight - t,
                    clientWidth: e.clientWidth - t
                }
            },
            scrollIntoView: oe(null, function (e, t) {
                "number" == typeof e && (e = Ke(e, 0)), t || (t = 0);
                var r = e;
                e && null == e.line || (this.curOp.scrollToPos = e ? Xe(this.doc, e) : this.doc.sel.head, this.curOp.scrollToPosMargin = t, r = Z(this, this.curOp.scrollToPos));
                var n = lt(this, r.left, r.top - t, r.right, r.bottom + t);
                at(this, n.scrollLeft, n.scrollTop)
            }),
            setSize: oe(null, function (e, t) {
                function r(e) {
                    return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                }
                null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)), this.options.lineWrapping && (this.display.measureLineCache.length = this.display.measureLineCachePos = 0), this.curOp.forceUpdate = !0
            }),
            operation: function (e) {
                return ae(this, e)
            },
            refresh: oe(null, function () {
                U(this), at(this, this.doc.scrollLeft, this.doc.scrollTop), se(this)
            }),
            swapDoc: oe(null, function (e) {
                var t = this.doc;
                return t.cm = null, cr(this, e), U(this), he(this, !0), at(this, e.scrollLeft, e.scrollTop), t
            }),
            getInputField: function () {
                return this.display.input
            },
            getWrapperElement: function () {
                return this.display.wrapper
            },
            getScrollerElement: function () {
                return this.display.scroller
            },
            getGutterElement: function () {
                return this.display.gutters
            }
        }, _r(e);
        var ri = e.optionHandlers = {},
            ni = e.defaults = {},
            ii = e.Init = {
                toString: function () {
                    return "CodeMirror.Init"
                }
            };
        mt("value", "", function (e, t) {
            e.setValue(t)
        }, !0), mt("mode", null, function (e, t) {
            e.doc.modeOption = t, r(e)
        }, !0), mt("indentUnit", 2, r, !0), mt("indentWithTabs", !1), mt("smartIndent", !0), mt("tabSize", 4, function (e) {
            r(e), U(e), se(e)
        }, !0), mt("electricChars", !0), mt("rtlMoveVisually", !Bn), mt("theme", "default", function (e) {
            a(e), s(e)
        }, !0), mt("keyMap", "default", l), mt("extraKeys", null), mt("onKeyEvent", null), mt("onDragEvent", null), mt("lineWrapping", !1, n, !0), mt("gutters", [], function (e) {
            h(e.options), s(e)
        }, !0), mt("fixedGutter", !0, function (e, t) {
            e.display.gutters.style.left = t ? y(e.display) + "px" : "0", e.refresh()
        }, !0), mt("coverGutterNextToScrollbar", !1, d, !0), mt("lineNumbers", !1, function (e) {
            h(e.options), s(e)
        }, !0), mt("firstLineNumber", 1, s, !0), mt("lineNumberFormatter", function (e) {
            return e
        }, s, !0), mt("showCursorWhenSelecting", !1, N, !0), mt("readOnly", !1, function (e, t) {
            "nocursor" == t ? (De(e), e.display.input.blur()) : t || he(e, !0)
        }), mt("dragDrop", !0), mt("cursorBlinkRate", 530), mt("cursorScrollMargin", 0), mt("cursorHeight", 1), mt("workTime", 100), mt("workDelay", 100), mt("flattenSpans", !0), mt("pollInterval", 100), mt("undoDepth", 40, function (e, t) {
            e.doc.history.undoDepth = t
        }), mt("historyEventDelay", 500), mt("viewportMargin", 10, function (e) {
            e.refresh()
        }, !0), mt("maxHighlightLength", 1e4, function (e) {
            r(e), e.refresh()
        }, !0), mt("moveInputWithCursor", !0, function (e, t) {
            t || (e.display.inputDiv.style.top = e.display.inputDiv.style.left = 0)
        }), mt("tabindex", null, function (e, t) {
            e.display.input.tabIndex = t || ""
        }), mt("autofocus", null);
        var oi = e.modes = {},
            li = e.mimeModes = {};
        e.defineMode = function (t, r) {
            if (e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2) {
                r.dependencies = [];
                for (var n = 2; n < arguments.length; ++n) r.dependencies.push(arguments[n])
            }
            oi[t] = r
        }, e.defineMIME = function (e, t) {
            li[e] = t
        }, e.resolveMode = function (t) {
            if ("string" == typeof t && li.hasOwnProperty(t)) t = li[t];
            else if (t && "string" == typeof t.name && li.hasOwnProperty(t.name)) {
                var r = li[t.name];
                t = Yr(r, t), t.name = r.name
            } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
            return "string" == typeof t ? {
                name: t
            } : t || {
                name: "null"
            }
        }, e.getMode = function (t, r) {
            var r = e.resolveMode(r),
                n = oi[r.name];
            if (!n) return e.getMode(t, "text/plain");
            var i = n(t, r);
            if (ai.hasOwnProperty(r.name)) {
                var o = ai[r.name];
                for (var l in o) o.hasOwnProperty(l) && (i.hasOwnProperty(l) && (i["_" + l] = i[l]), i[l] = o[l])
            }
            return i.name = r.name, i
        }, e.defineMode("null", function () {
            return {
                token: function (e) {
                    e.skipToEnd()
                }
            }
        }), e.defineMIME("text/plain", "null");
        var ai = e.modeExtensions = {};
        e.extendMode = function (e, t) {
            Zr(t, ai.hasOwnProperty(e) ? ai[e] : ai[e] = {})
        }, e.defineExtension = function (t, r) {
            e.prototype[t] = r
        }, e.defineDocExtension = function (e, t) {
            vi.prototype[e] = t
        }, e.defineOption = mt;
        var si = [];
        e.defineInitHook = function (e) {
            si.push(e)
        };
        var ci = e.helpers = {};
        e.registerHelper = function (t, r, n) {
            ci.hasOwnProperty(t) || (ci[t] = e[t] = {}), ci[t][r] = n
        }, e.isWordChar = en, e.copyState = gt, e.startState = vt, e.innerMode = function (e, t) {
            for (; e.innerMode;) {
                var r = e.innerMode(t);
                if (!r || r.mode == e) break;
                t = r.state, e = r.mode
            }
            return r || {
                mode: e,
                state: t
            }
        };
        var ui = e.commands = {
                selectAll: function (e) {
                    e.setSelection(Ke(e.firstLine(), 0), Ke(e.lastLine()))
                },
                killLine: function (e) {
                    var t = e.getCursor(!0),
                        r = e.getCursor(!1),
                        n = !Ue(t, r);
                    n || e.getLine(t.line).length != t.ch ? e.replaceRange("", t, n ? r : Ke(t.line), "+delete") : e.replaceRange("", t, Ke(t.line + 1, 0), "+delete")
                },
                deleteLine: function (e) {
                    var t = e.getCursor().line;
                    e.replaceRange("", Ke(t, 0), Ke(t), "+delete")
                },
                delLineLeft: function (e) {
                    var t = e.getCursor();
                    e.replaceRange("", Ke(t.line, 0), t, "+delete")
                },
                undo: function (e) {
                    e.undo()
                },
                redo: function (e) {
                    e.redo()
                },
                goDocStart: function (e) {
                    e.extendSelection(Ke(e.firstLine(), 0))
                },
                goDocEnd: function (e) {
                    e.extendSelection(Ke(e.lastLine()))
                },
                goLineStart: function (e) {
                    e.extendSelection(gn(e, e.getCursor().line))
                },
                goLineStartSmart: function (e) {
                    var t = e.getCursor(),
                        r = gn(e, t.line),
                        n = e.getLineHandle(r.line),
                        i = vr(n);
                    if (i && 0 != i[0].level) e.extendSelection(r);
                    else {
                        var o = Math.max(0, n.text.search(/\S/)),
                            l = t.line == r.line && t.ch <= o && t.ch;
                        e.extendSelection(Ke(r.line, l ? 0 : o))
                    }
                },
                goLineEnd: function (e) {
                    e.extendSelection(vn(e, e.getCursor().line))
                },
                goLineRight: function (e) {
                    var t = e.charCoords(e.getCursor(), "div").top + 5;
                    e.extendSelection(e.coordsChar({
                        left: e.display.lineDiv.offsetWidth + 100,
                        top: t
                    }, "div"))
                },
                goLineLeft: function (e) {
                    var t = e.charCoords(e.getCursor(), "div").top + 5;
                    e.extendSelection(e.coordsChar({
                        left: 0,
                        top: t
                    }, "div"))
                },
                goLineUp: function (e) {
                    e.moveV(-1, "line")
                },
                goLineDown: function (e) {
                    e.moveV(1, "line")
                },
                goPageUp: function (e) {
                    e.moveV(-1, "page")
                },
                goPageDown: function (e) {
                    e.moveV(1, "page")
                },
                goCharLeft: function (e) {
                    e.moveH(-1, "char")
                },
                goCharRight: function (e) {
                    e.moveH(1, "char")
                },
                goColumnLeft: function (e) {
                    e.moveH(-1, "column")
                },
                goColumnRight: function (e) {
                    e.moveH(1, "column")
                },
                goWordLeft: function (e) {
                    e.moveH(-1, "word")
                },
                goGroupRight: function (e) {
                    e.moveH(1, "group")
                },
                goGroupLeft: function (e) {
                    e.moveH(-1, "group")
                },
                goWordRight: function (e) {
                    e.moveH(1, "word")
                },
                delCharBefore: function (e) {
                    e.deleteH(-1, "char")
                },
                delCharAfter: function (e) {
                    e.deleteH(1, "char")
                },
                delWordBefore: function (e) {
                    e.deleteH(-1, "word")
                },
                delWordAfter: function (e) {
                    e.deleteH(1, "word")
                },
                delGroupBefore: function (e) {
                    e.deleteH(-1, "group")
                },
                delGroupAfter: function (e) {
                    e.deleteH(1, "group")
                },
                indentAuto: function (e) {
                    e.indentSelection("smart")
                },
                indentMore: function (e) {
                    e.indentSelection("add")
                },
                indentLess: function (e) {
                    e.indentSelection("subtract")
                },
                insertTab: function (e) {
                    e.replaceSelection("\t", "end", "+input")
                },
                defaultTab: function (e) {
                    e.somethingSelected() ? e.indentSelection("add") : e.replaceSelection("\t", "end", "+input")
                },
                transposeChars: function (e) {
                    var t = e.getCursor(),
                        r = e.getLine(t.line);
                    t.ch > 0 && t.ch < r.length - 1 && e.replaceRange(r.charAt(t.ch) + r.charAt(t.ch - 1), Ke(t.line, t.ch - 1), Ke(t.line, t.ch + 1))
                },
                newlineAndIndent: function (e) {
                    oe(e, function () {
                        e.replaceSelection("\n", "end", "+input"), e.indentLine(e.getCursor().line, null, !0)
                    })()
                },
                toggleOverwrite: function (e) {
                    e.toggleOverwrite()
                }
            },
            fi = e.keyMap = {};
        fi.basic = {
                Left: "goCharLeft",
                Right: "goCharRight",
                Up: "goLineUp",
                Down: "goLineDown",
                End: "goLineEnd",
                Home: "goLineStartSmart",
                PageUp: "goPageUp",
                PageDown: "goPageDown",
                Delete: "delCharAfter",
                Backspace: "delCharBefore",
                Tab: "defaultTab",
                "Shift-Tab": "indentAuto",
                Enter: "newlineAndIndent",
                Insert: "toggleOverwrite"
            }, fi.pcDefault = {
                "Ctrl-A": "selectAll",
                "Ctrl-D": "deleteLine",
                "Ctrl-Z": "undo",
                "Shift-Ctrl-Z": "redo",
                "Ctrl-Y": "redo",
                "Ctrl-Home": "goDocStart",
                "Alt-Up": "goDocStart",
                "Ctrl-End": "goDocEnd",
                "Ctrl-Down": "goDocEnd",
                "Ctrl-Left": "goGroupLeft",
                "Ctrl-Right": "goGroupRight",
                "Alt-Left": "goLineStart",
                "Alt-Right": "goLineEnd",
                "Ctrl-Backspace": "delGroupBefore",
                "Ctrl-Delete": "delGroupAfter",
                "Ctrl-S": "save",
                "Ctrl-F": "find",
                "Ctrl-G": "findNext",
                "Shift-Ctrl-G": "findPrev",
                "Shift-Ctrl-F": "replace",
                "Shift-Ctrl-R": "replaceAll",
                "Ctrl-[": "indentLess",
                "Ctrl-]": "indentMore",
                fallthrough: "basic"
            }, fi.macDefault = {
                "Cmd-A": "selectAll",
                "Cmd-D": "deleteLine",
                "Cmd-Z": "undo",
                "Shift-Cmd-Z": "redo",
                "Cmd-Y": "redo",
                "Cmd-Up": "goDocStart",
                "Cmd-End": "goDocEnd",
                "Cmd-Down": "goDocEnd",
                "Alt-Left": "goGroupLeft",
                "Alt-Right": "goGroupRight",
                "Cmd-Left": "goLineStart",
                "Cmd-Right": "goLineEnd",
                "Alt-Backspace": "delGroupBefore",
                "Ctrl-Alt-Backspace": "delGroupAfter",
                "Alt-Delete": "delGroupAfter",
                "Cmd-S": "save",
                "Cmd-F": "find",
                "Cmd-G": "findNext",
                "Shift-Cmd-G": "findPrev",
                "Cmd-Alt-F": "replace",
                "Shift-Cmd-Alt-F": "replaceAll",
                "Cmd-[": "indentLess",
                "Cmd-]": "indentMore",
                "Cmd-Backspace": "delLineLeft",
                fallthrough: ["basic", "emacsy"]
            }, fi.default = Pn ? fi.macDefault : fi.pcDefault, fi.emacsy = {
                "Ctrl-F": "goCharRight",
                "Ctrl-B": "goCharLeft",
                "Ctrl-P": "goLineUp",
                "Ctrl-N": "goLineDown",
                "Alt-F": "goWordRight",
                "Alt-B": "goWordLeft",
                "Ctrl-A": "goLineStart",
                "Ctrl-E": "goLineEnd",
                "Ctrl-V": "goPageDown",
                "Shift-Ctrl-V": "goPageUp",
                "Ctrl-D": "delCharAfter",
                "Ctrl-H": "delCharBefore",
                "Alt-D": "delWordAfter",
                "Alt-Backspace": "delWordBefore",
                "Ctrl-K": "killLine",
                "Ctrl-T": "transposeChars"
            }, e.lookupKey = bt, e.isModifierKey = xt, e.keyName = Ct, e.fromTextArea = function (t, r) {
                function n() {
                    t.value = s.getValue()
                }
                if (r || (r = {}), r.value = t.value, !r.tabindex && t.tabindex && (r.tabindex = t.tabindex), !r.placeholder && t.placeholder && (r.placeholder = t.placeholder), null == r.autofocus) {
                    var i = document.body;
                    try {
                        i = document.activeElement
                    } catch (e) {}
                    r.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body
                }
                if (t.form && (Ir(t.form, "submit", n), !r.leaveSubmitMethodAlone)) {
                    var o = t.form,
                        l = o.submit;
                    try {
                        var a = o.submit = function () {
                            n(), o.submit = l, o.submit(), o.submit = a
                        }
                    } catch (e) {}
                }
                t.style.display = "none";
                var s = e(function (e) {
                    t.parentNode.insertBefore(e, t.nextSibling)
                }, r);
                return s.save = n, s.getTextArea = function () {
                    return t
                }, s.toTextArea = function () {
                    n(), t.parentNode.removeChild(s.getWrapperElement()), t.style.display = "", t.form && (Fr(t.form, "submit", n), "function" == typeof t.form.submit && (t.form.submit = l))
                }, s
            }, wt.prototype = {
                eol: function () {
                    return this.pos >= this.string.length
                },
                sol: function () {
                    return 0 == this.pos
                },
                peek: function () {
                    return this.string.charAt(this.pos) || void 0
                },
                next: function () {
                    if (this.pos < this.string.length) return this.string.charAt(this.pos++)
                },
                eat: function (e) {
                    var t = this.string.charAt(this.pos);
                    if ("string" == typeof e) var r = t == e;
                    else var r = t && (e.test ? e.test(t) : e(t));
                    if (r) return ++this.pos, t
                },
                eatWhile: function (e) {
                    for (var t = this.pos; this.eat(e););
                    return this.pos > t
                },
                eatSpace: function () {
                    for (var e = this.pos;
                        /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
                    return this.pos > e
                },
                skipToEnd: function () {
                    this.pos = this.string.length
                },
                skipTo: function (e) {
                    var t = this.string.indexOf(e, this.pos);
                    if (t > -1) return this.pos = t, !0
                },
                backUp: function (e) {
                    this.pos -= e
                },
                column: function () {
                    return this.lastColumnPos < this.start && (this.lastColumnValue = Ur(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue
                },
                indentation: function () {
                    return Ur(this.string, null, this.tabSize)
                },
                match: function (e, t, r) {
                    if ("string" != typeof e) {
                        var n = this.string.slice(this.pos).match(e);
                        return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n)
                    }
                    var i = function (e) {
                        return r ? e.toLowerCase() : e
                    };
                    if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
                },
                current: function () {
                    return this.string.slice(this.start, this.pos)
                }
            }, e.StringStream = wt, e.TextMarker = Lt, _r(Lt), Lt.prototype.clear = function () {
                if (!this.explicitlyCleared) {
                    var e = this.doc.cm,
                        t = e && !e.curOp;
                    if (t && ne(e), Vr(this, "clear")) {
                        var r = this.find();
                        r && Br(this, "clear", r.from, r.to)
                    }
                    for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                        var l = this.lines[o],
                            a = Tt(l.markedSpans, this);
                        null != a.to && (i = pr(l)), l.markedSpans = Nt(l.markedSpans, a), null != a.from ? n = pr(l) : this.collapsed && !Bt(this.doc, l) && e && dr(l, te(e.display))
                    }
                    if (e && this.collapsed && !e.options.lineWrapping)
                        for (var o = 0; o < this.lines.length; ++o) {
                            var s = Pt(e.doc, this.lines[o]),
                                c = u(e.doc, s);
                            c > e.display.maxLineLength && (e.display.maxLine = s, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
                        }
                    null != n && e && se(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && tt(e)), t && ie(e)
                }
            },
            Lt.prototype.find = function () {
                for (var e, t, r = 0; r < this.lines.length; ++r) {
                    var n = this.lines[r],
                        i = Tt(n.markedSpans, this);
                    if (null != i.from || null != i.to) {
                        var o = pr(n);
                        null != i.from && (e = Ke(o, i.from)), null != i.to && (t = Ke(o, i.to))
                    }
                }
                return "bookmark" == this.type ? e : e && {
                    from: e,
                    to: t
                }
            }, Lt.prototype.changed = function () {
                var e = this.find(),
                    t = this.doc.cm;
                if (e && t) {
                    var r = ur(this.doc, e.from.line);
                    if (G(t, r), e.from.line >= t.display.showingFrom && e.from.line < t.display.showingTo) {
                        for (var n = t.display.lineDiv.firstChild; n; n = n.nextSibling)
                            if (n.lineObj == r) {
                                n.offsetHeight != r.height && dr(r, n.offsetHeight);
                                break
                            }
                        ae(t, function () {
                            t.curOp.selectionChanged = t.curOp.forceUpdate = t.curOp.updateMaxLine = !0
                        })
                    }
                }
            }, Lt.prototype.attachLine = function (e) {
                if (!this.lines.length && this.doc.cm) {
                    var t = this.doc.cm.curOp;
                    t.maybeHiddenMarkers && -1 != Xr(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                }
                this.lines.push(e)
            }, Lt.prototype.detachLine = function (e) {
                if (this.lines.splice(Xr(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                    var t = this.doc.cm.curOp;
                    (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                }
            }, e.SharedTextMarker = St, _r(St), St.prototype.clear = function () {
                if (!this.explicitlyCleared) {
                    this.explicitlyCleared = !0;
                    for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
                    Br(this, "clear")
                }
            }, St.prototype.find = function () {
                return this.primary.find()
            };
        var hi = e.LineWidget = function (e, t, r) {
            if (r)
                for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
            this.cm = e, this.node = t
        };
        _r(hi), hi.prototype.clear = _t(function () {
            var e = this.line.widgets,
                t = pr(this.line);
            if (null != t && e) {
                for (var r = 0; r < e.length; ++r) e[r] == this && e.splice(r--, 1);
                e.length || (this.line.widgets = null);
                var n = gr(this.cm, this.line) < this.cm.doc.scrollTop;
                dr(this.line, Math.max(0, this.line.height - Kt(this))), n && st(this.cm, 0, -this.height), se(this.cm, t, t + 1)
            }
        }), hi.prototype.changed = _t(function () {
            var e = this.height;
            this.height = null;
            var t = Kt(this) - e;
            if (t) {
                dr(this.line, this.line.height + t);
                var r = pr(this.line);
                se(this.cm, r, r + 1)
            }
        });
        var di = e.Line = function (e, t, r) {
            this.text = e, Vt(this, t), this.height = r ? r(this) : 1
        };
        _r(di);
        var pi = {},
            mi = /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;
        lr.prototype = {
            chunkSize: function () {
                return this.lines.length
            },
            removeInner: function (e, t) {
                for (var r = e, n = e + t; r < n; ++r) {
                    var i = this.lines[r];
                    this.height -= i.height, $t(i), Br(i, "delete")
                }
                this.lines.splice(e, t)
            },
            collapse: function (e) {
                e.splice.apply(e, [e.length, 0].concat(this.lines))
            },
            insertInner: function (e, t, r) {
                this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                for (var n = 0, i = t.length; n < i; ++n) t[n].parent = this
            },
            iterN: function (e, t, r) {
                for (var n = e + t; e < n; ++e)
                    if (r(this.lines[e])) return !0
            }
        }, ar.prototype = {
            chunkSize: function () {
                return this.size
            },
            removeInner: function (e, t) {
                this.size -= t;
                for (var r = 0; r < this.children.length; ++r) {
                    var n = this.children[r],
                        i = n.chunkSize();
                    if (e < i) {
                        var o = Math.min(t, i - e),
                            l = n.height;
                        if (n.removeInner(e, o), this.height -= l - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (t -= o)) break;
                        e = 0
                    } else e -= i
                }
                if (this.size - t < 25) {
                    var a = [];
                    this.collapse(a), this.children = [new lr(a)], this.children[0].parent = this
                }
            },
            collapse: function (e) {
                for (var t = 0, r = this.children.length; t < r; ++t) this.children[t].collapse(e)
            },
            insertInner: function (e, t, r) {
                this.size += t.length, this.height += r;
                for (var n = 0, i = this.children.length; n < i; ++n) {
                    var o = this.children[n],
                        l = o.chunkSize();
                    if (e <= l) {
                        if (o.insertInner(e, t, r), o.lines && o.lines.length > 50) {
                            for (; o.lines.length > 50;) {
                                var a = o.lines.splice(o.lines.length - 25, 25),
                                    s = new lr(a);
                                o.height -= s.height, this.children.splice(n + 1, 0, s), s.parent = this
                            }
                            this.maybeSpill()
                        }
                        break
                    }
                    e -= l
                }
            },
            maybeSpill: function () {
                if (!(this.children.length <= 10)) {
                    var e = this;
                    do {
                        var t = e.children.splice(e.children.length - 5, 5),
                            r = new ar(t);
                        if (e.parent) {
                            e.size -= r.size, e.height -= r.height;
                            var n = Xr(e.parent.children, e);
                            e.parent.children.splice(n + 1, 0, r)
                        } else {
                            var i = new ar(e.children);
                            i.parent = e, e.children = [i, r], e = i
                        }
                        r.parent = e.parent
                    } while (e.children.length > 10);
                    e.parent.maybeSpill()
                }
            },
            iterN: function (e, t, r) {
                for (var n = 0, i = this.children.length; n < i; ++n) {
                    var o = this.children[n],
                        l = o.chunkSize();
                    if (e < l) {
                        var a = Math.min(t, l - e);
                        if (o.iterN(e, a, r)) return !0;
                        if (0 == (t -= a)) break;
                        e = 0
                    } else e -= l
                }
            }
        };
        var gi = 0,
            vi = e.Doc = function (e, t, r) {
                if (!(this instanceof vi)) return new vi(e, t, r);
                null == r && (r = 0), ar.call(this, [new lr([new di("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.history = yr(), this.cleanGeneration = 1, this.frontier = r;
                var n = Ke(r, 0);
                this.sel = {
                    from: n,
                    to: n,
                    head: n,
                    anchor: n,
                    shift: !1,
                    extend: !1,
                    goalColumn: null
                }, this.id = ++gi, this.modeOption = t, "string" == typeof e && (e = Hi(e)), or(this, {
                    from: n,
                    to: n,
                    text: e
                }, null, {
                    head: n,
                    anchor: n
                })
            };
        vi.prototype = Yr(ar.prototype, {
            constructor: vi,
            iter: function (e, t, r) {
                r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e)
            },
            insert: function (e, t) {
                for (var r = 0, n = 0, i = t.length; n < i; ++n) r += t[n].height;
                this.insertInner(e - this.first, t, r)
            },
            remove: function (e, t) {
                this.removeInner(e - this.first, t)
            },
            getValue: function (e) {
                var t = hr(this, this.first, this.first + this.size);
                return !1 === e ? t : t.join(e || "\n")
            },
            setValue: function (e) {
                var t = Ke(this.first, 0),
                    r = this.first + this.size - 1;
                Fe(this, {
                    from: t,
                    to: Ke(r, ur(this, r).text.length),
                    text: Hi(e),
                    origin: "setValue"
                }, {
                    head: t,
                    anchor: t
                }, !0)
            },
            replaceRange: function (e, t, r, n) {
                t = Xe(this, t), r = r ? Xe(this, r) : t, _e(this, e, t, r, n)
            },
            getRange: function (e, t, r) {
                var n = fr(this, Xe(this, e), Xe(this, t));
                return !1 === r ? n : n.join(r || "\n")
            },
            getLine: function (e) {
                var t = this.getLineHandle(e);
                return t && t.text
            },
            setLine: function (e, t) {
                Ze(this, e) && _e(this, t, Ke(e, 0), Xe(this, Ke(e)))
            },
            removeLine: function (e) {
                e ? _e(this, "", Xe(this, Ke(e - 1)), Xe(this, Ke(e))) : _e(this, "", Ke(0, 0), Xe(this, Ke(1, 0)))
            },
            getLineHandle: function (e) {
                if (Ze(this, e)) return ur(this, e)
            },
            getLineNumber: function (e) {
                return pr(e)
            },
            getLineHandleVisualStart: function (e) {
                return "number" == typeof e && (e = ur(this, e)), Pt(this, e)
            },
            lineCount: function () {
                return this.size
            },
            firstLine: function () {
                return this.first
            },
            lastLine: function () {
                return this.first + this.size - 1
            },
            clipPos: function (e) {
                return Xe(this, e)
            },
            getCursor: function (e) {
                var t, r = this.sel;
                return t = null == e || "head" == e ? r.head : "anchor" == e ? r.anchor : "end" == e || !1 === e ? r.to : r.from, $e(t)
            },
            somethingSelected: function () {
                return !Ue(this.sel.head, this.sel.anchor)
            },
            setCursor: le(function (e, t, r) {
                var n = Xe(this, "number" == typeof e ? Ke(e, t || 0) : e);
                r ? Je(this, n) : et(this, n, n)
            }),
            setSelection: le(function (e, t) {
                et(this, Xe(this, e), Xe(this, t || e))
            }),
            extendSelection: le(function (e, t) {
                Je(this, Xe(this, e), t && Xe(this, t))
            }),
            getSelection: function (e) {
                return this.getRange(this.sel.from, this.sel.to, e)
            },
            replaceSelection: function (e, t, r) {
                Fe(this, {
                    from: this.sel.from,
                    to: this.sel.to,
                    text: Hi(e),
                    origin: r
                }, t || "around")
            },
            undo: le(function () {
                Be(this, "undo")
            }),
            redo: le(function () {
                Be(this, "redo")
            }),
            setExtending: function (e) {
                this.sel.extend = e
            },
            historySize: function () {
                var e = this.history;
                return {
                    undo: e.done.length,
                    redo: e.undone.length
                }
            },
            clearHistory: function () {
                this.history = yr(this.history.maxGeneration)
            },
            markClean: function () {
                this.cleanGeneration = this.changeGeneration()
            },
            changeGeneration: function () {
                return this.history.lastOp = this.history.lastOrigin = null, this.history.generation
            },
            isClean: function (e) {
                return this.history.generation == (e || this.cleanGeneration)
            },
            getHistory: function () {
                return {
                    done: kr(this.history.done),
                    undone: kr(this.history.undone)
                }
            },
            setHistory: function (e) {
                var t = this.history = yr(this.history.maxGeneration);
                t.done = e.done.slice(0), t.undone = e.undone.slice(0)
            },
            markText: function (e, t, r) {
                return kt(this, Xe(this, e), Xe(this, t), r, "range")
            },
            setBookmark: function (e, t) {
                var r = {
                    replacedWith: t && (null == t.nodeType ? t.widget : t),
                    insertLeft: t && t.insertLeft
                };
                return e = Xe(this, e), kt(this, e, e, r, "bookmark")
            },
            findMarksAt: function (e) {
                e = Xe(this, e);
                var t = [],
                    r = ur(this, e.line).markedSpans;
                if (r)
                    for (var n = 0; n < r.length; ++n) {
                        var i = r[n];
                        (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                    }
                return t
            },
            getAllMarks: function () {
                var e = [];
                return this.iter(function (t) {
                    var r = t.markedSpans;
                    if (r)
                        for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker)
                }), e
            },
            posFromIndex: function (e) {
                var t, r = this.first;
                return this.iter(function (n) {
                    var i = n.text.length + 1;
                    if (i > e) return t = e, !0;
                    e -= i, ++r
                }), Xe(this, Ke(r, t))
            },
            indexFromPos: function (e) {
                e = Xe(this, e);
                var t = e.ch;
                return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function (e) {
                    t += e.text.length + 1
                }), t)
            },
            copy: function (e) {
                var t = new vi(hr(this, this.first, this.first + this.size), this.modeOption, this.first);
                return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = {
                    from: this.sel.from,
                    to: this.sel.to,
                    head: this.sel.head,
                    anchor: this.sel.anchor,
                    shift: this.sel.shift,
                    extend: !1,
                    goalColumn: this.sel.goalColumn
                }, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
            },
            linkedDoc: function (e) {
                e || (e = {});
                var t = this.first,
                    r = this.first + this.size;
                null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
                var n = new vi(hr(this, t, r), e.mode || this.modeOption, t);
                return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                    doc: n,
                    sharedHist: e.sharedHist
                }), n.linked = [{
                    doc: this,
                    isParent: !0,
                    sharedHist: e.sharedHist
                }], n
            },
            unlinkDoc: function (t) {
                if (t instanceof e && (t = t.doc), this.linked)
                    for (var r = 0; r < this.linked.length; ++r) {
                        var n = this.linked[r];
                        if (n.doc == t) {
                            this.linked.splice(r, 1), t.unlinkDoc(this);
                            break
                        }
                    }
                if (t.history == this.history) {
                    var i = [t.id];
                    sr(t, function (e) {
                        i.push(e.id)
                    }, !0), t.history = yr(), t.history.done = kr(this.history.done, i), t.history.undone = kr(this.history.undone, i)
                }
            },
            iterLinkedDocs: function (e) {
                sr(this, e)
            },
            getMode: function () {
                return this.mode
            },
            getEditor: function () {
                return this.cm
            }
        }), vi.prototype.eachLine = vi.prototype.iter;
        var yi = "iter insert remove copy getEditor".split(" ");
        for (var bi in vi.prototype) vi.prototype.hasOwnProperty(bi) && Xr(yi, bi) < 0 && (e.prototype[bi] = function (e) {
            return function () {
                return e.apply(this.doc, arguments)
            }
        }(vi.prototype[bi]));
        _r(vi), e.e_stop = Or, e.e_preventDefault = Hr, e.e_stopPropagation = Wr;
        var xi, Ci = 0;
        e.on = Ir, e.off = Fr, e.signal = Pr;
        var wi = 30,
            Li = e.Pass = {
                toString: function () {
                    return "CodeMirror.Pass"
                }
            };
        Kr.prototype = {
            set: function (e, t) {
                clearTimeout(this.id), this.id = setTimeout(t, e)
            }
        }, e.countColumn = Ur;
        var ki = [""],
            Si = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
            Mi = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
        e.replaceGetRect = function (e) {
            an = e
        };
        var Ti = function () {
            if (Mn) return !1;
            var e = rn("div");
            return "draggable" in e || "dragDrop" in e
        }();
        Ln ? sn = function (e, t) {
            return 36 == e.charCodeAt(t - 1) && 39 == e.charCodeAt(t)
        } : Wn && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent) ? sn = function (e, t) {
            return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(e.slice(t - 1, t + 1))
        } : Tn && !/Chrome\/(?:29|[3-9]\d|\d\d\d)\./.test(navigator.userAgent) && (sn = function (e, t) {
            if (t > 1 && 45 == e.charCodeAt(t - 1)) {
                if (/\w/.test(e.charAt(t - 2)) && /[^\-?\.]/.test(e.charAt(t))) return !0;
                if (t > 2 && /[\d\.,]/.test(e.charAt(t - 2)) && /[\d\.,]/.test(e.charAt(t))) return !1
            }
            return /[~!#%&*)=+}\]|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|…[\w~`@#$%\^&*(_=+{[><]/.test(e.slice(t - 1, t + 1))
        });
        var Ni, Ai, Hi = 3 != "\n\nb".split(/\n/).length ? function (e) {
            for (var t = 0, r = [], n = e.length; t <= n;) {
                var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    l = o.indexOf("\r"); - 1 != l ? (r.push(o.slice(0, l)), t += l + 1) : (r.push(o), t = i + 1)
            }
            return r
        } : function (e) {
            return e.split(/\r\n?|\n/)
        };
        e.splitLines = Hi;
        var Wi = window.getSelection ? function (e) {
                try {
                    return e.selectionStart != e.selectionEnd
                } catch (e) {
                    return !1
                }
            } : function (e) {
                try {
                    var t = e.ownerDocument.selection.createRange()
                } catch (e) {}
                return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
            },
            Di = function () {
                var e = rn("div");
                return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy)
            }(),
            Oi = {
                3: "Enter",
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "PrintScrn",
                45: "Insert",
                46: "Delete",
                59: ";",
                91: "Mod",
                92: "Mod",
                93: "Mod",
                109: "-",
                107: "=",
                127: "Delete",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                63276: "PageUp",
                63277: "PageDown",
                63275: "End",
                63273: "Home",
                63234: "Left",
                63232: "Up",
                63235: "Right",
                63233: "Down",
                63302: "Insert",
                63272: "Delete"
            };
        e.keyNames = Oi,
            function () {
                for (var e = 0; e < 10; e++) Oi[e + 48] = String(e);
                for (var e = 65; e <= 90; e++) Oi[e] = String.fromCharCode(e);
                for (var e = 1; e <= 12; e++) Oi[e + 111] = Oi[e + 63235] = "F" + e
            }();
        var Ei, zi = function () {
            function e(e) {
                return e <= 255 ? t.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1791 ? r.charAt(e - 1536) : 1792 <= e && e <= 2220 ? "r" : "L"
            }
            var t = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",
                r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr",
                n = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                i = /[stwN]/,
                o = /[LRr]/,
                l = /[Lb1n]/,
                a = /[1n]/;
            return function (t) {
                if (!n.test(t)) return !1;
                for (var r, s = t.length, c = [], u = 0; u < s; ++u) c.push(r = e(t.charCodeAt(u)));
                for (var u = 0, f = "L"; u < s; ++u) {
                    var r = c[u];
                    "m" == r ? c[u] = f : f = r
                }
                for (var u = 0, h = "L"; u < s; ++u) {
                    var r = c[u];
                    "1" == r && "r" == h ? c[u] = "n" : o.test(r) && (h = r, "r" == r && (c[u] = "R"))
                }
                for (var u = 1, f = c[0]; u < s - 1; ++u) {
                    var r = c[u];
                    "+" == r && "1" == f && "1" == c[u + 1] ? c[u] = "1" : "," != r || f != c[u + 1] || "1" != f && "n" != f || (c[u] = f), f = r
                }
                for (var u = 0; u < s; ++u) {
                    var r = c[u];
                    if ("," == r) c[u] = "N";
                    else if ("%" == r) {
                        for (var d = u + 1; d < s && "%" == c[d]; ++d);
                        for (var p = u && "!" == c[u - 1] || d < s - 1 && "1" == c[d] ? "1" : "N", m = u; m < d; ++m) c[m] = p;
                        u = d - 1
                    }
                }
                for (var u = 0, h = "L"; u < s; ++u) {
                    var r = c[u];
                    "L" == h && "1" == r ? c[u] = "L" : o.test(r) && (h = r)
                }
                for (var u = 0; u < s; ++u)
                    if (i.test(c[u])) {
                        for (var d = u + 1; d < s && i.test(c[d]); ++d);
                        for (var g = "L" == (u ? c[u - 1] : "L"), v = "L" == (d < s - 1 ? c[d] : "L"), p = g || v ? "L" : "R", m = u; m < d; ++m) c[m] = p;
                        u = d - 1
                    }
                for (var y, b = [], u = 0; u < s;)
                    if (l.test(c[u])) {
                        var x = u;
                        for (++u; u < s && l.test(c[u]); ++u);
                        b.push({
                            from: x,
                            to: u,
                            level: 0
                        })
                    } else {
                        var C = u,
                            w = b.length;
                        for (++u; u < s && "L" != c[u]; ++u);
                        for (var m = C; m < u;)
                            if (a.test(c[m])) {
                                C < m && b.splice(w, 0, {
                                    from: C,
                                    to: m,
                                    level: 1
                                });
                                var L = m;
                                for (++m; m < u && a.test(c[m]); ++m);
                                b.splice(w, 0, {
                                    from: L,
                                    to: m,
                                    level: 2
                                }), C = m
                            } else ++m;
                        C < u && b.splice(w, 0, {
                            from: C,
                            to: u,
                            level: 1
                        })
                    }
                return 1 == b[0].level && (y = t.match(/^\s+/)) && (b[0].from = y[0].length, b.unshift({
                    from: 0,
                    to: y[0].length,
                    level: 0
                })), 1 == $r(b).level && (y = t.match(/\s+$/)) && ($r(b).to -= y[0].length, b.push({
                    from: s - y[0].length,
                    to: s,
                    level: 0
                })), b[0].level != $r(b).level && b.push({
                    from: s,
                    to: s,
                    level: b[0].level
                }), b
            }
        }();
        return e.version = "3.15.0", e
    }();
    ! function () {
        "use strict";
        var e = /^(\s*)([*+-]|(\d+)\.)(\s*)/;
        x.commands.newlineAndIndentContinueMarkdownList = function (t) {
            var r, n = t.getCursor();
            if (!t.getStateAfter(n.line).list || !(r = t.getLine(n.line).match(e))) return void t.execCommand("newlineAndIndent");
            var i = r[1],
                o = r[4],
                l = "*+-".indexOf(r[2]) >= 0 ? r[2] : parseInt(r[3], 10) + 1 + ".";
            t.replaceSelection("\n" + i + l + o, "end")
        }
    }(), x.defineMode("xml", function (e, t) {
        function r(e, t) {
            function r(r) {
                return t.tokenize = r, r(e, t)
            }
            var i = e.next();
            if ("<" == i) {
                if (e.eat("!")) return e.eat("[") ? e.match("CDATA[") ? r(o("atom", "]]>")) : null : e.match("--") ? r(o("comment", "--\x3e")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), r(l(1))) : null;
                if (e.eat("?")) return e.eatWhile(/[\w\._\-]/), t.tokenize = o("meta", "?>"), "meta";
                var a = e.eat("/");
                b = "";
                for (var s; s = e.eat(/[^\s\u00a0=<>\"\'\/?]/);) b += s;
                return b ? (x = a ? "closeTag" : "openTag", t.tokenize = n, "tag") : "error"
            }
            if ("&" == i) {
                var c;
                return c = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), c ? "atom" : "error"
            }
            return e.eatWhile(/[^&<]/), null
        }

        function n(e, t) {
            var n = e.next();
            return ">" == n || "/" == n && e.eat(">") ? (t.tokenize = r, x = ">" == n ? "endTag" : "selfcloseTag", "tag") : "=" == n ? (x = "equals", null) : "<" == n ? "error" : /[\'\"]/.test(n) ? (t.tokenize = i(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.eatWhile(/[^\s\u00a0=<>\"\']/), "word")
        }

        function i(e) {
            var t = function (t, r) {
                for (; !t.eol();)
                    if (t.next() == e) {
                        r.tokenize = n;
                        break
                    }
                return "string"
            };
            return t.isInAttribute = !0, t
        }

        function o(e, t) {
            return function (n, i) {
                for (; !n.eol();) {
                    if (n.match(t)) {
                        i.tokenize = r;
                        break
                    }
                    n.next()
                }
                return e
            }
        }

        function l(e) {
            return function (t, n) {
                for (var i; null != (i = t.next());) {
                    if ("<" == i) return n.tokenize = l(e + 1), n.tokenize(t, n);
                    if (">" == i) {
                        if (1 == e) {
                            n.tokenize = r;
                            break
                        }
                        return n.tokenize = l(e - 1), n.tokenize(t, n)
                    }
                }
                return "meta"
            }
        }

        function a() {
            for (var e = arguments.length - 1; e >= 0; e--) C.cc.push(arguments[e])
        }

        function s() {
            return a.apply(null, arguments), !0
        }

        function c(e, t) {
            var r = T.doNotIndent.hasOwnProperty(e) || C.context && C.context.noIndent;
            C.context = {
                prev: C.context,
                tagName: e,
                indent: C.indented,
                startOfLine: t,
                noIndent: r
            }
        }

        function u() {
            C.context && (C.context = C.context.prev)
        }

        function f(e) {
            if ("openTag" == e) return C.tagName = b, C.tagStart = w.column(), s(m, h(C.startOfLine));
            if ("closeTag" == e) {
                var t = !1;
                return C.context ? C.context.tagName != b && (T.implicitlyClosed.hasOwnProperty(C.context.tagName.toLowerCase()) && u(), t = !C.context || C.context.tagName != b) : t = !0, t && (L = "error"), s(d(t))
            }
            return s()
        }

        function h(e) {
            return function (t) {
                var r = C.tagName;
                return C.tagName = C.tagStart = null, "selfcloseTag" == t || "endTag" == t && T.autoSelfClosers.hasOwnProperty(r.toLowerCase()) ? (p(r.toLowerCase()), s()) : "endTag" == t ? (p(r.toLowerCase()), c(r, e), s()) : s()
            }
        }

        function d(e) {
            return function (t) {
                return e && (L = "error"), "endTag" == t ? (u(), s()) : (L = "error", s(arguments.callee))
            }
        }

        function p(e) {
            for (var t;;) {
                if (!C.context) return;
                if (t = C.context.tagName.toLowerCase(), !T.contextGrabbers.hasOwnProperty(t) || !T.contextGrabbers[t].hasOwnProperty(e)) return;
                u()
            }
        }

        function m(e) {
            return "word" == e ? (L = "attribute", s(g, m)) : "endTag" == e || "selfcloseTag" == e ? a() : (L = "error", s(m))
        }

        function g(e) {
            return "equals" == e ? s(v, m) : (T.allowMissing ? "word" == e && (L = "attribute") : L = "error", "endTag" == e || "selfcloseTag" == e ? a() : s())
        }

        function v(e) {
            return "string" == e ? s(y) : "word" == e && T.allowUnquoted ? (L = "string", s()) : (L = "error", "endTag" == e || "selfCloseTag" == e ? a() : s())
        }

        function y(e) {
            return "string" == e ? s(y) : a()
        }
        var b, x, C, w, L, k = e.indentUnit,
            S = t.multilineTagIndentFactor || 1,
            M = t.multilineTagIndentPastTag || !0,
            T = t.htmlMode ? {
                autoSelfClosers: {
                    area: !0,
                    base: !0,
                    br: !0,
                    col: !0,
                    command: !0,
                    embed: !0,
                    frame: !0,
                    hr: !0,
                    img: !0,
                    input: !0,
                    keygen: !0,
                    link: !0,
                    meta: !0,
                    param: !0,
                    source: !0,
                    track: !0,
                    wbr: !0
                },
                implicitlyClosed: {
                    dd: !0,
                    li: !0,
                    optgroup: !0,
                    option: !0,
                    p: !0,
                    rp: !0,
                    rt: !0,
                    tbody: !0,
                    td: !0,
                    tfoot: !0,
                    th: !0,
                    tr: !0
                },
                contextGrabbers: {
                    dd: {
                        dd: !0,
                        dt: !0
                    },
                    dt: {
                        dd: !0,
                        dt: !0
                    },
                    li: {
                        li: !0
                    },
                    option: {
                        option: !0,
                        optgroup: !0
                    },
                    optgroup: {
                        optgroup: !0
                    },
                    p: {
                        address: !0,
                        article: !0,
                        aside: !0,
                        blockquote: !0,
                        dir: !0,
                        div: !0,
                        dl: !0,
                        fieldset: !0,
                        footer: !0,
                        form: !0,
                        h1: !0,
                        h2: !0,
                        h3: !0,
                        h4: !0,
                        h5: !0,
                        h6: !0,
                        header: !0,
                        hgroup: !0,
                        hr: !0,
                        menu: !0,
                        nav: !0,
                        ol: !0,
                        p: !0,
                        pre: !0,
                        section: !0,
                        table: !0,
                        ul: !0
                    },
                    rp: {
                        rp: !0,
                        rt: !0
                    },
                    rt: {
                        rp: !0,
                        rt: !0
                    },
                    tbody: {
                        tbody: !0,
                        tfoot: !0
                    },
                    td: {
                        td: !0,
                        th: !0
                    },
                    tfoot: {
                        tbody: !0
                    },
                    th: {
                        td: !0,
                        th: !0
                    },
                    thead: {
                        tbody: !0,
                        tfoot: !0
                    },
                    tr: {
                        tr: !0
                    }
                },
                doNotIndent: {
                    pre: !0
                },
                allowUnquoted: !0,
                allowMissing: !0
            } : {
                autoSelfClosers: {},
                implicitlyClosed: {},
                contextGrabbers: {},
                doNotIndent: {},
                allowUnquoted: !1,
                allowMissing: !1
            },
            N = t.alignCDATA;
        return {
            startState: function () {
                return {
                    tokenize: r,
                    cc: [],
                    indented: 0,
                    startOfLine: !0,
                    tagName: null,
                    tagStart: null,
                    context: null
                }
            },
            token: function (e, t) {
                if (!t.tagName && e.sol() && (t.startOfLine = !0, t.indented = e.indentation()), e.eatSpace()) return null;
                L = x = b = null;
                var r = t.tokenize(e, t);
                if (t.type = x, (r || x) && "comment" != r)
                    for (C = t, w = e;;) {
                        var n = t.cc.pop() || f;
                        if (n(x || r)) break
                    }
                return t.startOfLine = !1, L || r
            },
            indent: function (e, t, i) {
                var o = e.context;
                if (e.tokenize.isInAttribute) return e.stringStartCol + 1;
                if (e.tokenize != n && e.tokenize != r || o && o.noIndent) return i ? i.match(/^(\s*)/)[0].length : 0;
                if (e.tagName) return M ? e.tagStart + e.tagName.length + 2 : e.tagStart + k * S;
                if (N && /<!\[CDATA\[/.test(t)) return 0;
                for (o && /^<\//.test(t) && (o = o.prev); o && !o.startOfLine;) o = o.prev;
                return o ? o.indent + k : 0
            },
            electricChars: "/",
            blockCommentStart: "\x3c!--",
            blockCommentEnd: "--\x3e",
            configuration: t.htmlMode ? "html" : "xml",
            helperType: t.htmlMode ? "html" : "xml"
        }
    }), x.defineMIME("text/xml", "xml"), x.defineMIME("application/xml", "xml"), x.mimeModes.hasOwnProperty("text/html") || x.defineMIME("text/html", {
        name: "xml",
        htmlMode: !0
    }), x.defineMode("markdown", function (e, t) {
        function r(e, t, r) {
            return t.f = t.inline = r, r(e, t)
        }

        function n(e, t, r) {
            return t.f = t.block = r, r(e, t)
        }

        function i(e) {
            return e.linkTitle = !1, e.em = !1, e.strong = !1, e.quote = 0, g || e.f != l || (e.f = u, e.block = o), e.trailingSpace = 0, e.trailingSpaceNewLine = !1, e.thisLineHasContent = !1, null
        }

        function o(e, i) {
            var o = !1 !== i.list;
            if (!1 !== i.list && i.indentationDiff >= 0 ? (i.indentationDiff < 4 && (i.indentation -= i.indentationDiff), i.list = null) : !1 !== i.list && i.indentation > 0 ? (i.list = null, i.listDepth = Math.floor(i.indentation / 4)) : !1 !== i.list && (i.list = !1, i.listDepth = 0), i.indentationDiff >= 4) return i.indentation -= 4, e.skipToEnd(), L;
            if (e.eatSpace()) return null;
            if ("#" === e.peek() || i.prevLineHasContent && e.match(G)) i.header = !0;
            else if (e.eat(">"))
                for (i.indentation++, i.quote = 1, e.eatSpace(); e.eat(">");) e.eatSpace(), i.quote++;
            else {
                if ("[" === e.peek()) return r(e, i, h);
                if (e.match(F, !0)) return A;
                if (i.prevLineHasContent && !o || !e.match(P, !0) && !e.match(B, !0)) {
                    if (t.fencedCodeBlocks && e.match(/^```([\w+#]*)/, !0)) return i.localMode = b(RegExp.$1), i.localMode && (i.localState = i.localMode.startState()), n(e, i, a), L
                } else i.indentation += 4, i.list = !0, i.listDepth++, t.taskLists && e.match(R, !1) && (i.taskList = !0)
            }
            return r(e, i, i.inline)
        }

        function l(e, t) {
            var r = v.token(e, t.htmlState);
            return g && "tag" === r && "openTag" !== t.htmlState.type && !t.htmlState.context && (t.f = u, t.block = o), t.md_inside && -1 != e.current().indexOf(">") && (t.f = u, t.block = o, t.htmlState.context = void 0), r
        }

        function a(e, t) {
            return e.sol() && e.match(/^```/, !0) ? (t.localMode = t.localState = null, t.f = u, t.block = o, L) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), L)
        }

        function s(e) {
            var t = [];
            if (e.taskOpen) return "meta";
            if (e.taskClosed) return "property";
            if (e.strong && t.push(I), e.em && t.push(z), e.linkText && t.push(O), e.code && t.push(L), e.header && t.push(w), e.quote && t.push(e.quote % 2 ? k : S), !1 !== e.list) {
                var r = (e.listDepth - 1) % 3;
                r ? 1 === r ? t.push(T) : t.push(N) : t.push(M)
            }
            return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
        }

        function c(e, t) {
            if (e.match(V, !0)) return s(t)
        }

        function u(e, i) {
            var o = i.text(e, i);
            if (void 0 !== o) return o;
            if (i.list) return i.list = null, s(i);
            if (i.taskList) {
                return "x" !== e.match(R, !0)[1] ? i.taskOpen = !0 : i.taskClosed = !0, i.taskList = !1, s(i)
            }
            i.taskOpen = !1, i.taskClosed = !1;
            var a = e.next();
            if ("\\" === a) return e.next(), s(i);
            if (i.linkTitle) {
                i.linkTitle = !1;
                var c = a;
                "(" === a && (c = ")"), c = (c + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                var u = "^\\s*(?:[^" + c + "\\\\]+|\\\\\\\\|\\\\.)" + c;
                if (e.match(new RegExp(u), !0)) return E
            }
            if ("`" === a) {
                var h = s(i),
                    d = e.pos;
                e.eatWhile("`");
                var p = 1 + e.pos - d;
                return i.code ? p === C ? (i.code = !1, h) : s(i) : (C = p, i.code = !0, s(i))
            }
            if (i.code) return s(i);
            if ("!" === a && e.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return e.match(/\[[^\]]*\]/), i.inline = i.f = f, H;
            if ("[" === a && e.match(/.*\](\(| ?\[)/, !1)) return i.linkText = !0, s(i);
            if ("]" === a && i.linkText) {
                var g = s(i);
                return i.linkText = !1, i.inline = i.f = f, g
            }
            if ("<" === a && e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return r(e, i, m(W, ">"));
            if ("<" === a && e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return r(e, i, m(D, ">"));
            if ("<" === a && e.match(/^\w/, !1)) {
                if (-1 != e.string.indexOf(">")) {
                    /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(e.string.substring(1, e.string.indexOf(">"))) && (i.md_inside = !0)
                }
                return e.backUp(1), n(e, i, l)
            }
            if ("<" === a && e.match(/^\/\w*?>/)) return i.md_inside = !1, "tag";
            var v = !1;
            if (!t.underscoresBreakWords && "_" === a && "_" !== e.peek() && e.match(/(\w)/, !1)) {
                var y = e.pos - 2;
                if (y >= 0) {
                    var b = e.string.charAt(y);
                    "_" !== b && b.match(/(\w)/, !1) && (v = !0)
                }
            }
            var h = s(i);
            if ("*" === a || "_" === a && !v) {
                if (i.strong === a && e.eat(a)) return i.strong = !1, h;
                if (!i.strong && e.eat(a)) return i.strong = a, s(i);
                if (i.em === a) return i.em = !1, h;
                if (!i.em) return i.em = a, s(i)
            } else if (" " === a && (e.eat("*") || e.eat("_"))) {
                if (" " === e.peek()) return s(i);
                e.backUp(1)
            }
            return " " === a && (e.match(/ +$/, !1) ? i.trailingSpace++ : i.trailingSpace && (i.trailingSpaceNewLine = !0)), s(i)
        }

        function f(e, t) {
            if (e.eatSpace()) return null;
            var n = e.next();
            return "(" === n || "[" === n ? r(e, t, m(E, "(" === n ? ")" : "]")) : "error"
        }

        function h(e, t) {
            return e.match(/^[^\]]*\]:/, !0) ? (t.f = d, O) : r(e, t, u)
        }

        function d(e, t) {
            return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = u, E)
        }

        function p(e) {
            return _[e] || (e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), _[e] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + e + ")")), _[e]
        }

        function m(e, t, r) {
            return r = r || u,
                function (n, i) {
                    return n.match(p(t)), i.inline = i.f = r, e
                }
        }
        var g = x.modes.hasOwnProperty("xml"),
            v = x.getMode(e, g ? {
                name: "xml",
                htmlMode: !0
            } : "text/plain"),
            y = {
                html: "htmlmixed",
                js: "javascript",
                json: "application/json",
                c: "text/x-csrc",
                "c++": "text/x-c++src",
                java: "text/x-java",
                csharp: "text/x-csharp",
                "c#": "text/x-csharp",
                scala: "text/x-scala"
            },
            b = function () {
                var t, r, n = {},
                    i = {},
                    o = [];
                for (var l in x.modes) x.modes.propertyIsEnumerable(l) && o.push(l);
                for (t = 0; t < o.length; t++) n[o[t]] = o[t];
                var a = [];
                for (var l in x.mimeModes) x.mimeModes.propertyIsEnumerable(l) && a.push({
                    mime: l,
                    mode: x.mimeModes[l]
                });
                for (t = 0; t < a.length; t++) r = a[t].mime, i[r] = a[t].mime;
                for (var s in y)(y[s] in n || y[s] in i) && (n[s] = y[s]);
                return function (t) {
                    return n[t] ? x.getMode(e, n[t]) : null
                }
            }();
        void 0 === t.underscoresBreakWords && (t.underscoresBreakWords = !0), void 0 === t.fencedCodeBlocks && (t.fencedCodeBlocks = !1), void 0 === t.taskLists && (t.taskLists = !1);
        var C = 0,
            w = "header",
            L = "comment",
            k = "atom",
            S = "number",
            M = "variable-2",
            T = "variable-3",
            N = "keyword",
            A = "hr",
            H = "tag",
            W = "link",
            D = "link",
            O = "link",
            E = "string",
            z = "em",
            I = "strong",
            F = /^([*\-=_])(?:\s*\1){2,}\s*$/,
            P = /^[*\-+]\s+/,
            B = /^[0-9]+\.\s+/,
            R = /^\[(x| )\](?=\s)/,
            G = /^(?:\={1,}|-{1,})$/,
            V = /^[^!\[\]*_\\<>` "'(]+/,
            _ = [];
        return {
            startState: function () {
                return {
                    f: o,
                    prevLineHasContent: !1,
                    thisLineHasContent: !1,
                    block: o,
                    htmlState: x.startState(v),
                    indentation: 0,
                    inline: u,
                    text: c,
                    linkText: !1,
                    linkTitle: !1,
                    em: !1,
                    strong: !1,
                    header: !1,
                    taskList: !1,
                    list: !1,
                    listDepth: 0,
                    quote: 0,
                    trailingSpace: 0,
                    trailingSpaceNewLine: !1
                }
            },
            copyState: function (e) {
                return {
                    f: e.f,
                    prevLineHasContent: e.prevLineHasContent,
                    thisLineHasContent: e.thisLineHasContent,
                    block: e.block,
                    htmlState: x.copyState(v, e.htmlState),
                    indentation: e.indentation,
                    localMode: e.localMode,
                    localState: e.localMode ? x.copyState(e.localMode, e.localState) : null,
                    inline: e.inline,
                    text: e.text,
                    linkTitle: e.linkTitle,
                    em: e.em,
                    strong: e.strong,
                    header: e.header,
                    taskList: e.taskList,
                    list: e.list,
                    listDepth: e.listDepth,
                    quote: e.quote,
                    trailingSpace: e.trailingSpace,
                    trailingSpaceNewLine: e.trailingSpaceNewLine,
                    md_inside: e.md_inside
                }
            },
            token: function (e, t) {
                if (e.sol()) {
                    if (e.match(/^\s*$/, !0)) return t.prevLineHasContent = !1, i(t);
                    t.prevLineHasContent = t.thisLineHasContent, t.thisLineHasContent = !0, t.header = !1, t.taskList = !1, t.code = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.f = t.block;
                    var r = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length,
                        n = 4 * Math.floor((r - t.indentation) / 4);
                    n > 4 && (n = 4);
                    var o = t.indentation + n;
                    if (t.indentationDiff = o - t.indentation, t.indentation = o, r > 0) return null
                }
                return t.f(e, t)
            },
            blankLine: i,
            getType: s
        }
    }, "xml"), x.defineMIME("text/x-markdown", "markdown");
    var C = /Mac/.test(navigator.platform),
        w = {
            "Cmd-B": l,
            "Cmd-I": a,
            "Cmd-K": f,
            "Cmd-Alt-I": h,
            "Cmd-'": s,
            "Cmd-Alt-L": u,
            "Cmd-L": c
        },
        L = [{
            name: "bold",
            action: l
        }, {
            name: "italic",
            action: a
        }, "|", {
            name: "quote",
            action: s
        }, {
            name: "unordered-list",
            action: c
        }, {
            name: "ordered-list",
            action: u
        }, "|", {
            name: "link",
            action: f
        }, {
            name: "image",
            action: h
        }, "|", {
            name: "info",
            action: "http://lab.lepture.com/editor/markdown"
        }, {
            name: "preview",
            action: m
        }, {
            name: "fullscreen",
            action: o
        }];
    b.toolbar = L, b.markdown = function (e) {
        if (window.markdowniter) return markdowniter.render(e)
    }, b.prototype.render = function (e) {
        if (e || (e = this.element || document.getElementsByTagName("textarea")[0]), !this._rendered || this._rendered !== e) {
            this.element = e;
            var r = this.options,
                n = this,
                i = {};
            for (var o in w) ! function (e) {
                i[t(e)] = function (t) {
                    w[e](n)
                }
            }(o);
            i.Enter = "newlineAndIndentContinueMarkdownList", this.codemirror = x.fromTextArea(e, {
                mode: "markdown",
                theme: "paper",
                indentWithTabs: !0,
                lineNumbers: !1,
                extraKeys: i
            }), !1 !== r.toolbar && this.createToolbar(), !1 !== r.status && this.createStatusbar(), this._rendered = this.element
        }
    }, b.prototype.createToolbar = function (e) {
        if ((e = e || this.options.toolbar) && 0 !== e.length) {
            var t = document.createElement("div");
            t.className = "editor-toolbar";
            var o = this;
            o.toolbar = {};
            for (var l = 0; l < e.length; l++) ! function (e) {
                var i;
                i = e.name ? r(e.name, e) : "|" === e ? n() : r(e), e.action && ("function" == typeof e.action ? i.onclick = function (t) {
                    e.action(o)
                } : "string" == typeof e.action && (i.href = e.action, i.target = "_blank")), o.toolbar[e.name || e] = i, t.appendChild(i)
            }(e[l]);
            var a = this.codemirror;
            a.on("cursorActivity", function () {
                var e = i(a);
                for (var t in o.toolbar) ! function (t) {
                    var r = o.toolbar[t];
                    e[t] ? r.className += " active" : r.className = r.className.replace(/\s*active\s*/g, "")
                }(t)
            });
            var s = a.getWrapperElement();
            return s.parentNode.insertBefore(t, s), t
        }
    }, b.prototype.createStatusbar = function (e) {
        if ((e = e || this.options.status) && 0 !== e.length) {
            var t = document.createElement("div");
            t.className = "editor-statusbar";
            for (var r, n = this.codemirror, i = 0; i < e.length; i++) ! function (e) {
                var i = document.createElement("span");
                i.className = e, "words" === e ? (i.innerHTML = "0", n.on("update", function () {
                    i.innerHTML = y(n.getValue())
                })) : "lines" === e ? (i.innerHTML = "0", n.on("update", function () {
                    i.innerHTML = n.lineCount()
                })) : "cursor" === e && (i.innerHTML = "0:0", n.on("cursorActivity", function () {
                    r = n.getCursor(), i.innerHTML = r.line + ":" + r.ch
                })), t.appendChild(i)
            }(e[i]);
            var o = this.codemirror.getWrapperElement();
            return o.parentNode.insertBefore(t, o.nextSibling), t
        }
    }, b.toggleBold = l, b.toggleItalic = a, b.toggleBlockquote = s, b.toggleUnOrderedList = c, b.toggleOrderedList = u, b.drawLink = f, b.drawImage = h, b.undo = d, b.redo = p, b.toggleFullScreen = o, b.prototype.toggleBold = function () {
        l(this)
    }, b.prototype.toggleItalic = function () {
        a(this)
    }, b.prototype.toggleBlockquote = function () {
        s(this)
    }, b.prototype.toggleUnOrderedList = function () {
        c(this)
    }, b.prototype.toggleOrderedList = function () {
        u(this)
    }, b.prototype.drawLink = function () {
        f(this)
    }, b.prototype.drawImage = function () {
        h(this)
    }, b.prototype.undo = function () {
        d(this)
    }, b.prototype.redo = function () {
        p(this)
    }, b.prototype.toggleFullScreen = function () {
        o(this)
    }, e.Editor = b, e.CodeMirror = x
}(this);
! function (e, t) {
    var n, i = {},
        r = function (e, t) {
            var n, i, r;
            if ("string" == typeof e) return a(e);
            for (n = [], i = e.length, r = 0; r < i; r++) n.push(a(e[r]));
            return t.apply(null, n)
        },
        o = function (e, t, n) {
            2 === arguments.length && (n = t, t = null), r(t || [], function () {
                s(e, n, arguments)
            })
        },
        s = function (e, t, n) {
            var o, s = {
                exports: t
            };
            "function" == typeof t && (n.length || (n = [r, s.exports, s]), void 0 !== (o = t.apply(null, n)) && (s.exports = o)), i[e] = s.exports
        },
        a = function (t) {
            var n = i[t] || e[t];
            if (!n) throw new Error("`" + t + "` is undefined");
            return n
        },
        u = function (e) {
            var t, n, r, o, s, a;
            a = function (e) {
                return e && e.charAt(0).toUpperCase() + e.substr(1)
            };
            for (t in i)
                if (n = e, i.hasOwnProperty(t)) {
                    for (r = t.split("/"), s = a(r.pop()); o = a(r.shift());) n[o] = n[o] || {}, n = n[o];
                    n[s] = i[t]
                }
            return e
        },
        c = function (n) {
            return e.__dollar = n, u(t(e, o, r))
        };
    "object" == typeof module && "object" == typeof module.exports ? module.exports = c() : "function" == typeof define && define.amd ? define("webuploader", ["jquery"], c) : (n = e.WebUploader, e.WebUploader = c(), e.WebUploader.noConflict = function () {
        e.WebUploader = n
    })
}(window, function (e, t, n) {
    return t("dollar-third", [], function () {
        var t = e.__dollar || e.jQuery || e.Zepto;
        if (!t) throw new Error("jQuery or Zepto not found!");
        return t
    }), t("dollar", ["dollar-third"], function (e) {
        return e
    }), t("promise-third", ["dollar"], function (e) {
        return {
            Deferred: e.Deferred,
            when: e.when,
            isPromise: function (e) {
                return e && "function" == typeof e.then
            }
        }
    }), t("promise", ["promise-third"], function (e) {
        return e
    }), t("base", ["dollar", "promise"], function (t, n) {
        function i(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }

        function r(e) {
            var t;
            return Object.create ? Object.create(e) : (t = function () {}, t.prototype = e, new t)
        }
        var o = function () {},
            s = Function.call;
        return {
            version: "0.1.5",
            $: t,
            Deferred: n.Deferred,
            isPromise: n.isPromise,
            when: n.when,
            browser: function (e) {
                var t = {},
                    n = e.match(/WebKit\/([\d.]+)/),
                    i = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
                    r = e.match(/MSIE\s([\d\.]+)/) || e.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                    o = e.match(/Firefox\/([\d.]+)/),
                    s = e.match(/Safari\/([\d.]+)/),
                    a = e.match(/OPR\/([\d.]+)/);
                return n && (t.webkit = parseFloat(n[1])), i && (t.chrome = parseFloat(i[1])), r && (t.ie = parseFloat(r[1])), o && (t.firefox = parseFloat(o[1])), s && (t.safari = parseFloat(s[1])), a && (t.opera = parseFloat(a[1])), t
            }(navigator.userAgent),
            os: function (e) {
                var t = {},
                    n = e.match(/(?:Android);?[\s\/]+([\d.]+)?/),
                    i = e.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
                return n && (t.android = parseFloat(n[1])), i && (t.ios = parseFloat(i[1].replace(/_/g, "."))), t
            }(navigator.userAgent),
            inherits: function (e, n, i) {
                var o;
                return "function" == typeof n ? (o = n, n = null) : o = n && n.hasOwnProperty("constructor") ? n.constructor : function () {
                    return e.apply(this, arguments)
                }, t.extend(!0, o, e, i || {}), o.__super__ = e.prototype, o.prototype = r(e.prototype), n && t.extend(!0, o.prototype, n), o
            },
            noop: o,
            bindFn: i,
            log: function () {
                return e.console ? i(console.log, console) : o
            }(),
            nextTick: function () {
                return function (e) {
                    setTimeout(e, 1)
                }
            }(),
            slice: function (e) {
                return function () {
                    return s.apply(e, arguments)
                }
            }([].slice),
            guid: function () {
                var e = 0;
                return function (t) {
                    for (var n = (+new Date).toString(32), i = 0; i < 5; i++) n += Math.floor(65535 * Math.random()).toString(32);
                    return (t || "wu_") + n + (e++).toString(32)
                }
            }(),
            formatSize: function (e, t, n) {
                var i;
                for (n = n || ["B", "K", "M", "G", "TB"];
                    (i = n.shift()) && e > 1024;) e /= 1024;
                return ("B" === i ? e : e.toFixed(t || 2)) + i
            }
        }
    }), t("mediator", ["base"], function (e) {
        function t(e, t, n, i) {
            return o.grep(e, function (e) {
                return e && (!t || e.e === t) && (!n || e.cb === n || e.cb._cb === n) && (!i || e.ctx === i)
            })
        }

        function n(e, t, n) {
            o.each((e || "").split(a), function (e, i) {
                n(i, t)
            })
        }

        function i(e, t) {
            for (var n, i = !1, r = -1, o = e.length; ++r < o;)
                if (n = e[r], !1 === n.cb.apply(n.ctx2, t)) {
                    i = !0;
                    break
                }
            return !i
        }
        var r, o = e.$,
            s = [].slice,
            a = /\s+/;
        return r = {
            on: function (e, t, i) {
                var r, o = this;
                return t ? (r = this._events || (this._events = []), n(e, t, function (e, t) {
                    var n = {
                        e: e
                    };
                    n.cb = t, n.ctx = i, n.ctx2 = i || o, n.id = r.length, r.push(n)
                }), this) : this
            },
            once: function (e, t, i) {
                var r = this;
                return t ? (n(e, t, function (e, t) {
                    var n = function () {
                        return r.off(e, n), t.apply(i || r, arguments)
                    };
                    n._cb = t, r.on(e, n, i)
                }), r) : r
            },
            off: function (e, i, r) {
                var s = this._events;
                return s ? e || i || r ? (n(e, i, function (e, n) {
                    o.each(t(s, e, n, r), function () {
                        delete s[this.id]
                    })
                }), this) : (this._events = [], this) : this
            },
            trigger: function (e) {
                var n, r, o;
                return this._events && e ? (n = s.call(arguments, 1), r = t(this._events, e), o = t(this._events, "all"), i(r, n) && i(o, arguments)) : this
            }
        }, o.extend({
            installTo: function (e) {
                return o.extend(e, r)
            }
        }, r)
    }), t("uploader", ["base", "mediator"], function (e, t) {
        function n(e) {
            this.options = i.extend(!0, {}, n.options, e), this._init(this.options)
        }
        var i = e.$;
        return n.options = {}, t.installTo(n.prototype), i.each({
            upload: "start-upload",
            stop: "stop-upload",
            getFile: "get-file",
            getFiles: "get-files",
            addFile: "add-file",
            addFiles: "add-file",
            sort: "sort-files",
            removeFile: "remove-file",
            skipFile: "skip-file",
            retry: "retry",
            isInProgress: "is-in-progress",
            makeThumb: "make-thumb",
            md5File: "md5-file",
            getDimension: "get-dimension",
            addButton: "add-btn",
            getRuntimeType: "get-runtime-type",
            refresh: "refresh",
            disable: "disable",
            enable: "enable",
            reset: "reset"
        }, function (e, t) {
            n.prototype[e] = function () {
                return this.request(t, arguments)
            }
        }), i.extend(n.prototype, {
            state: "pending",
            _init: function (e) {
                var t = this;
                t.request("init", e, function () {
                    t.state = "ready", t.trigger("ready")
                })
            },
            option: function (e, t) {
                var n = this.options;
                if (!(arguments.length > 1)) return e ? n[e] : n;
                i.isPlainObject(t) && i.isPlainObject(n[e]) ? i.extend(n[e], t) : n[e] = t
            },
            getStats: function () {
                var e = this.request("get-stats");
                return {
                    successNum: e.numOfSuccess,
                    progressNum: e.numOfProgress,
                    cancelNum: e.numOfCancel,
                    invalidNum: e.numOfInvalid,
                    uploadFailNum: e.numOfUploadFailed,
                    queueNum: e.numOfQueue
                }
            },
            trigger: function (e) {
                var n = [].slice.call(arguments, 1),
                    r = this.options,
                    o = "on" + e.substring(0, 1).toUpperCase() + e.substring(1);
                return !(!1 === t.trigger.apply(this, arguments) || i.isFunction(r[o]) && !1 === r[o].apply(this, n) || i.isFunction(this[o]) && !1 === this[o].apply(this, n) || !1 === t.trigger.apply(t, [this, e].concat(n)))
            },
            request: e.noop
        }), e.create = n.create = function (e) {
            return new n(e)
        }, e.Uploader = n, n
    }), t("runtime/runtime", ["base", "mediator"], function (e, t) {
        function n(t) {
            this.options = i.extend({
                container: document.body
            }, t), this.uid = e.guid("rt_")
        }
        var i = e.$,
            r = {},
            o = function (e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) return t;
                return null
            };
        return i.extend(n.prototype, {
            getContainer: function () {
                var e, t, n = this.options;
                return this._container ? this._container : (e = i(n.container || document.body), t = i(document.createElement("div")), t.attr("id", "rt_" + this.uid), t.css({
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: e.width() || "1px",
                    height: e.height() || "1px",
                    overflow: "hidden"
                }), e.append(t), e.addClass("webuploader-container"), this._container = t, t)
            },
            init: e.noop,
            exec: e.noop,
            destroy: function () {
                this._container && this._container.parentNode.removeChild(this.__container), this.off()
            }
        }), n.orders = "html5,flash", n.addRuntime = function (e, t) {
            r[e] = t
        }, n.hasRuntime = function (e) {
            return !!(e ? r[e] : o(r))
        }, n.create = function (e, t) {
            var s;
            if (t = t || n.orders, i.each(t.split(/\s*,\s*/g), function () {
                    if (r[this]) return s = this, !1
                }), !(s = s || o(r))) throw alert("程序需要 Flash 11 以上版本才能正常运行，请前往：http://get.adobe.com/cn/flashplayer/ 安装"), new Error("Runtime Error");
            return new r[s](e)
        }, t.installTo(n.prototype), n
    }), t("runtime/client", ["base", "mediator", "runtime/runtime"], function (e, t, n) {
        function i(t, i) {
            var o, s = e.Deferred();
            this.uid = e.guid("client_"), this.runtimeReady = function (e) {
                return s.done(e)
            }, this.connectRuntime = function (t, a) {
                if (o) throw new Error("already connected!");
                return s.done(a), "string" == typeof t && r.get(t) && (o = r.get(t)), o = o || r.get(null, i), o ? (e.$.extend(o.options, t), o.__promise.then(s.resolve), o.__client++) : (o = n.create(t, t.runtimeOrder), o.__promise = s.promise(), o.once("ready", s.resolve), o.init(), r.add(o), o.__client = 1), i && (o.__standalone = i), o
            }, this.getRuntime = function () {
                return o
            }, this.disconnectRuntime = function () {
                o && (o.__client--, o.__client <= 0 && (r.remove(o), delete o.__promise, o.destroy()), o = null)
            }, this.exec = function () {
                if (o) {
                    var n = e.slice(arguments);
                    return t && n.unshift(t), o.exec.apply(this, n)
                }
            }, this.getRuid = function () {
                return o && o.uid
            }, this.destroy = function (e) {
                return function () {
                    e && e.apply(this, arguments), this.trigger("destroy"), this.off(), this.exec("destroy"), this.disconnectRuntime()
                }
            }(this.destroy)
        }
        var r;
        return r = function () {
            var e = {};
            return {
                add: function (t) {
                    e[t.uid] = t
                },
                get: function (t, n) {
                    var i;
                    if (t) return e[t];
                    for (i in e)
                        if (!n || !e[i].__standalone) return e[i];
                    return null
                },
                remove: function (t) {
                    delete e[t.uid]
                }
            }
        }(), t.installTo(i.prototype), i
    }), t("lib/dnd", ["base", "mediator", "runtime/client"], function (e, t, n) {
        function i(e) {
            e = this.options = r.extend({}, i.options, e), e.container = r(e.container), e.container.length && n.call(this, "DragAndDrop")
        }
        var r = e.$;
        return i.options = {
            accept: null,
            disableGlobalDnd: !1
        }, e.inherits(n, {
            constructor: i,
            init: function () {
                var e = this;
                e.connectRuntime(e.options, function () {
                    e.exec("init"), e.trigger("ready")
                })
            },
            destroy: function () {
                this.disconnectRuntime()
            }
        }), t.installTo(i.prototype), i
    }), t("widgets/widget", ["base", "uploader"], function (e, t) {
        function n(e) {
            if (!e) return !1;
            var t = e.length,
                n = r.type(e);
            return !(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && "string" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e))
        }

        function i(e) {
            this.owner = e, this.options = e.options
        }
        var r = e.$,
            o = t.prototype._init,
            s = {},
            a = [];
        return r.extend(i.prototype, {
            init: e.noop,
            invoke: function (e, t) {
                var n = this.responseMap;
                return n && e in n && n[e] in this && r.isFunction(this[n[e]]) ? this[n[e]].apply(this, t) : s
            },
            request: function () {
                return this.owner.request.apply(this.owner, arguments)
            }
        }), r.extend(t.prototype, {
            _init: function () {
                var e = this,
                    t = e._widgets = [];
                return r.each(a, function (n, i) {
                    t.push(new i(e))
                }), o.apply(e, arguments)
            },
            request: function (t, i, r) {
                var o, a, u, c, l = 0,
                    d = this._widgets,
                    p = d.length,
                    f = [],
                    h = [];
                for (i = n(i) ? i : [i]; l < p; l++) o = d[l], (a = o.invoke(t, i)) !== s && (e.isPromise(a) ? h.push(a) : f.push(a));
                return r || h.length ? (u = e.when.apply(e, h), c = u.pipe ? "pipe" : "then", u[c](function () {
                    var t = e.Deferred(),
                        n = arguments;
                    return 1 === n.length && (n = n[0]), setTimeout(function () {
                        t.resolve(n)
                    }, 1), t.promise()
                })[r ? c : "done"](r || e.noop)) : f[0]
            }
        }), t.register = i.register = function (t, n) {
            var o, s = {
                init: "init"
            };
            return 1 === arguments.length ? (n = t, n.responseMap = s) : n.responseMap = r.extend(s, t), o = e.inherits(i, n), a.push(o), o
        }, i
    }), t("widgets/filednd", ["base", "uploader", "lib/dnd", "widgets/widget"], function (e, t, n) {
        var i = e.$;
        return t.options.dnd = "", t.register({
            init: function (t) {
                if (t.dnd && "html5" === this.request("predict-runtime-type")) {
                    var r, o = this,
                        s = e.Deferred(),
                        a = i.extend({}, {
                            disableGlobalDnd: t.disableGlobalDnd,
                            container: t.dnd,
                            accept: t.accept
                        });
                    return r = new n(a), r.once("ready", s.resolve), r.on("drop", function (e) {
                        o.request("add-file", [e])
                    }), r.on("accept", function (e) {
                        return o.owner.trigger("dndAccept", e)
                    }), r.init(), s.promise()
                }
            }
        })
    }), t("lib/filepaste", ["base", "mediator", "runtime/client"], function (e, t, n) {
        function i(e) {
            e = this.options = r.extend({}, e), e.container = r(e.container || document.body), n.call(this, "FilePaste")
        }
        var r = e.$;
        return e.inherits(n, {
            constructor: i,
            init: function () {
                var e = this;
                e.connectRuntime(e.options, function () {
                    e.exec("init"), e.trigger("ready")
                })
            },
            destroy: function () {
                this.exec("destroy"), this.disconnectRuntime(), this.off()
            }
        }), t.installTo(i.prototype), i
    }), t("widgets/filepaste", ["base", "uploader", "lib/filepaste", "widgets/widget"], function (e, t, n) {
        var i = e.$;
        return t.register({
            init: function (t) {
                if (t.paste && "html5" === this.request("predict-runtime-type")) {
                    var r, o = this,
                        s = e.Deferred(),
                        a = i.extend({}, {
                            container: t.paste,
                            accept: t.accept
                        });
                    return r = new n(a), r.once("ready", s.resolve), r.on("paste", function (e) {
                        o.owner.request("add-file", [e])
                    }), r.init(), s.promise()
                }
            }
        })
    }), t("lib/blob", ["base", "runtime/client"], function (e, t) {
        function n(e, n) {
            var i = this;
            i.source = n, i.ruid = e, this.size = n.size || 0, !n.type && ~"jpg,jpeg,png,gif,bmp".indexOf(this.ext) ? this.type = "image/" + ("jpg" === this.ext ? "jpeg" : this.ext) : this.type = n.type || "application/octet-stream", t.call(i, "Blob"), this.uid = n.uid || this.uid, e && i.connectRuntime(e)
        }
        return e.inherits(t, {
            constructor: n,
            slice: function (e, t) {
                return this.exec("slice", e, t)
            },
            getSource: function () {
                return this.source
            }
        }), n
    }), t("lib/file", ["base", "lib/blob"], function (e, t) {
        function n(e, n) {
            var o;
            this.name = n.name || "untitled" + i++, o = r.exec(n.name) ? RegExp.$1.toLowerCase() : "", !o && n.type && (o = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(n.type) ? RegExp.$1.toLowerCase() : "", this.name += "." + o), this.ext = o, this.lastModifiedDate = n.lastModifiedDate || (new Date).toLocaleString(), t.apply(this, arguments)
        }
        var i = 1,
            r = /\.([^.]+)$/;
        return e.inherits(t, n)
    }), t("lib/filepicker", ["base", "runtime/client", "lib/file"], function (t, n, i) {
        function r(e) {
            if (e = this.options = o.extend({}, r.options, e), e.container = o(e.id), !e.container.length) throw new Error("按钮指定错误");
            e.innerHTML = e.innerHTML || e.label || e.container.html() || "", e.button = o(e.button || document.createElement("div")), e.button.html(e.innerHTML), e.container.html(e.button), n.call(this, "FilePicker", !0)
        }
        var o = t.$;
        return r.options = {
            button: null,
            container: null,
            label: null,
            innerHTML: null,
            multiple: !1,
            accept: null,
            name: "file"
        }, t.inherits(n, {
            constructor: r,
            init: function () {
                var t = this,
                    n = t.options,
                    r = n.button;
                r.addClass("webuploader-pick"), t.on("all", function (e) {
                    var s;
                    switch (e) {
                        case "mouseenter":
                            r.addClass("webuploader-pick-hover");
                            break;
                        case "mouseleave":
                            r.removeClass("webuploader-pick-hover");
                            break;
                        case "change":
                            s = t.exec("getFiles"), t.trigger("select", o.map(s, function (e) {
                                return e = new i(t.getRuid(), e), e._refer = n.container, e
                            }), n.container)
                    }
                }), t.connectRuntime(n, function () {
                    t.refresh(), t.exec("init", n), t.trigger("ready")
                }), o(e).on("resize", function () {
                    t.refresh()
                })
            },
            refresh: function () {
                var e = this.getRuntime().getContainer(),
                    t = this.options.button,
                    n = t.outerWidth ? t.outerWidth() : t.width(),
                    i = t.outerHeight ? t.outerHeight() : t.height(),
                    r = t.offset();
                n < e.width() && (n = e.width()), i < e.height() && (i = e.height()), n && i && e.css({
                    bottom: "auto",
                    right: "auto",
                    width: n + "px",
                    height: i + "px"
                }).offset(r)
            },
            enable: function () {
                this.options.button.removeClass("webuploader-pick-disable"), this.refresh()
            },
            disable: function () {
                var e = this.options.button;
                this.getRuntime().getContainer().css({
                    top: "-99999px"
                }), e.addClass("webuploader-pick-disable")
            },
            destroy: function () {
                this.runtime && (this.exec("destroy"), this.disconnectRuntime())
            }
        }), r
    }), t("widgets/filepicker", ["base", "uploader", "lib/filepicker", "widgets/widget"], function (e, t, n) {
        var i = e.$;
        return i.extend(t.options, {
            pick: null,
            accept: null
        }), t.register({
            "add-btn": "addButton",
            refresh: "refresh",
            disable: "disable",
            enable: "enable"
        }, {
            init: function (e) {
                return this.pickers = [], e.pick && this.addButton(e.pick)
            },
            refresh: function () {
                i.each(this.pickers, function () {
                    this.refresh()
                })
            },
            addButton: function (t) {
                var r = this,
                    o = r.options,
                    s = o.accept,
                    a = [];
                if (t) return i.isPlainObject(t) || (t = {
                    id: t
                }), i(t.id).each(function () {
                    var u, c, l;
                    l = e.Deferred(), u = i.extend({}, t, {
                        accept: i.isPlainObject(s) ? [s] : s,
                        swf: o.swf,
                        runtimeOrder: o.runtimeOrder,
                        id: this
                    }), c = new n(u), c.once("ready", l.resolve), c.on("select", function (e) {
                        r.owner.request("add-file", [e])
                    }), c.init(), r.pickers.push(c), a.push(l.promise())
                }), e.when.apply(e, a)
            },
            disable: function () {
                i.each(this.pickers, function () {
                    this.disable()
                })
            },
            enable: function () {
                i.each(this.pickers, function () {
                    this.enable()
                })
            }
        })
    }), t("file", ["base", "mediator"], function (e, t) {
        function n() {
            return o + s++
        }

        function i(e) {
            this.name = e.name || "Untitled", this.size = e.size || 0, this.type = e.type || "application", this.lastModifiedDate = e.lastModifiedDate || 1 * new Date, this.id = n(), this.ext = a.exec(this.name) ? RegExp.$1 : "", this.statusText = "", u[this.id] = i.Status.INITED, this.source = e, this.loaded = 0, this.on("error", function (e) {
                this.setStatus(i.Status.ERROR, e)
            })
        }
        var r = e.$,
            o = "WU_FILE_",
            s = 0,
            a = /\.([^.]+)$/,
            u = {};
        return r.extend(i.prototype, {
            setStatus: function (e, t) {
                var n = u[this.id];
                void 0 !== t && (this.statusText = t), e !== n && (u[this.id] = e, this.trigger("statuschange", e, n))
            },
            getStatus: function () {
                return u[this.id]
            },
            getSource: function () {
                return this.source
            },
            destory: function () {
                delete u[this.id]
            }
        }), t.installTo(i.prototype), i.Status = {
            INITED: "inited",
            QUEUED: "queued",
            PROGRESS: "progress",
            ERROR: "error",
            COMPLETE: "complete",
            CANCELLED: "cancelled",
            INTERRUPT: "interrupt",
            INVALID: "invalid"
        }, i
    }), t("queue", ["base", "mediator", "file"], function (e, t, n) {
        function i() {
            this.stats = {
                numOfQueue: 0,
                numOfSuccess: 0,
                numOfCancel: 0,
                numOfProgress: 0,
                numOfUploadFailed: 0,
                numOfInvalid: 0
            }, this._queue = [], this._map = {}
        }
        var r = e.$,
            o = n.Status;
        return r.extend(i.prototype, {
            append: function (e) {
                return this._queue.push(e), this._fileAdded(e), this
            },
            prepend: function (e) {
                return this._queue.unshift(e), this._fileAdded(e), this
            },
            getFile: function (e) {
                return "string" != typeof e ? e : this._map[e]
            },
            fetch: function (e) {
                var t, n, i = this._queue.length;
                for (e = e || o.QUEUED, t = 0; t < i; t++)
                    if (n = this._queue[t], e === n.getStatus()) return n;
                return null
            },
            sort: function (e) {
                "function" == typeof e && this._queue.sort(e)
            },
            getFiles: function () {
                for (var e, t = [].slice.call(arguments, 0), n = [], i = 0, o = this._queue.length; i < o; i++) e = this._queue[i], t.length && !~r.inArray(e.getStatus(), t) || n.push(e);
                return n
            },
            _fileAdded: function (e) {
                var t = this;
                this._map[e.id] || (this._map[e.id] = e, e.on("statuschange", function (e, n) {
                    t._onFileStatusChange(e, n)
                })), e.setStatus(o.QUEUED)
            },
            _onFileStatusChange: function (e, t) {
                var n = this.stats;
                switch (t) {
                    case o.PROGRESS:
                        n.numOfProgress--;
                        break;
                    case o.QUEUED:
                        n.numOfQueue--;
                        break;
                    case o.ERROR:
                        n.numOfUploadFailed--;
                        break;
                    case o.INVALID:
                        n.numOfInvalid--
                }
                switch (e) {
                    case o.QUEUED:
                        n.numOfQueue++;
                        break;
                    case o.PROGRESS:
                        n.numOfProgress++;
                        break;
                    case o.ERROR:
                        n.numOfUploadFailed++;
                        break;
                    case o.COMPLETE:
                        n.numOfSuccess++;
                        break;
                    case o.CANCELLED:
                        n.numOfCancel++;
                        break;
                    case o.INVALID:
                        n.numOfInvalid++
                }
            }
        }), t.installTo(i.prototype), i
    }), t("widgets/queue", ["base", "uploader", "queue", "file", "lib/file", "runtime/client", "widgets/widget"], function (e, t, n, i, r, o) {
        var s = e.$,
            a = /\.\w+$/,
            u = i.Status;
        return t.register({
            "sort-files": "sortFiles",
            "add-file": "addFiles",
            "get-file": "getFile",
            "fetch-file": "fetchFile",
            "get-stats": "getStats",
            "get-files": "getFiles",
            "remove-file": "removeFile",
            retry: "retry",
            reset: "reset",
            "accept-file": "acceptFile"
        }, {
            init: function (t) {
                var i, r, a, u, c, l, d, p = this;
                if (s.isPlainObject(t.accept) && (t.accept = [t.accept]), t.accept) {
                    for (c = [], a = 0, r = t.accept.length; a < r; a++)(u = t.accept[a].extensions) && c.push(u);
                    c.length && (l = "\\." + c.join(",").replace(/,/g, "$|\\.").replace(/\*/g, ".*") + "$"), p.accept = new RegExp(l, "i")
                }
                if (p.queue = new n, p.stats = p.queue.stats, "html5" === this.request("predict-runtime-type")) return i = e.Deferred(), d = new o("Placeholder"), d.connectRuntime({
                    runtimeOrder: "html5"
                }, function () {
                    p._ruid = d.getRuid(), i.resolve()
                }), i.promise()
            },
            _wrapFile: function (e) {
                if (!(e instanceof i)) {
                    if (!(e instanceof r)) {
                        if (!this._ruid) throw new Error("Can't add external files.");
                        e = new r(this._ruid, e)
                    }
                    e = new i(e)
                }
                return e
            },
            acceptFile: function (e) {
                return !(!e || e.size < 6 || this.accept && a.exec(e.name) && !this.accept.test(e.name))
            },
            _addFile: function (e) {
                var t = this;
                if (e = t._wrapFile(e), t.owner.trigger("beforeFileQueued", e)) return t.acceptFile(e) ? (t.queue.append(e), t.owner.trigger("fileQueued", e), e) : void t.owner.trigger("error", "Q_TYPE_DENIED", e)
            },
            getFile: function (e) {
                return this.queue.getFile(e)
            },
            addFiles: function (e) {
                var t = this;
                e.length || (e = [e]), e = s.map(e, function (e) {
                    return t._addFile(e)
                }), t.owner.trigger("filesQueued", e), t.options.auto && setTimeout(function () {
                    t.request("start-upload")
                }, 20)
            },
            getStats: function () {
                return this.stats
            },
            removeFile: function (e) {
                var t = this;
                e = e.id ? e : t.queue.getFile(e), e.setStatus(u.CANCELLED), t.owner.trigger("fileDequeued", e)
            },
            getFiles: function () {
                return this.queue.getFiles.apply(this.queue, arguments)
            },
            fetchFile: function () {
                return this.queue.fetch.apply(this.queue, arguments)
            },
            retry: function (e, t) {
                var n, i, r, o = this;
                if (e) return e = e.id ? e : o.queue.getFile(e), e.setStatus(u.QUEUED), void(t || o.request("start-upload"));
                for (n = o.queue.getFiles(u.ERROR), i = 0, r = n.length; i < r; i++) e = n[i], e.setStatus(u.QUEUED);
                o.request("start-upload")
            },
            sortFiles: function () {
                return this.queue.sort.apply(this.queue, arguments)
            },
            reset: function () {
                this.owner.trigger("reset"), this.queue = new n, this.stats = this.queue.stats
            }
        })
    }), t("widgets/runtime", ["uploader", "runtime/runtime", "widgets/widget"], function (e, t) {
        return e.support = function () {
            return t.hasRuntime.apply(t, arguments)
        }, e.register({
            "predict-runtime-type": "predictRuntmeType"
        }, {
            init: function () {
                if (!this.predictRuntmeType()) throw Error("Runtime Error")
            },
            predictRuntmeType: function () {
                var e, n, i = this.options.runtimeOrder || t.orders,
                    r = this.type;
                if (!r)
                    for (i = i.split(/\s*,\s*/g), e = 0, n = i.length; e < n; e++)
                        if (t.hasRuntime(i[e])) {
                            this.type = r = i[e];
                            break
                        }
                return r
            }
        })
    }), t("lib/transport", ["base", "runtime/client", "mediator"], function (e, t, n) {
        function i(e) {
            var n = this;
            e = n.options = r.extend(!0, {}, i.options, e || {}), t.call(this, "Transport"), this._blob = null, this._formData = e.formData || {}, this._headers = e.headers || {}, this.on("progress", this._timeout), this.on("load error", function () {
                n.trigger("progress", 1), clearTimeout(n._timer)
            })
        }
        var r = e.$;
        return i.options = {
            server: "",
            method: "POST",
            withCredentials: !1,
            fileVal: "file",
            timeout: 12e4,
            formData: {},
            headers: {},
            sendAsBinary: !1
        }, r.extend(i.prototype, {
            appendBlob: function (e, t, n) {
                var i = this,
                    r = i.options;
                i.getRuid() && i.disconnectRuntime(), i.connectRuntime(t.ruid, function () {
                    i.exec("init")
                }), i._blob = t, r.fileVal = e || r.fileVal, r.filename = n || r.filename
            },
            append: function (e, t) {
                "object" == typeof e ? r.extend(this._formData, e) : this._formData[e] = t
            },
            setRequestHeader: function (e, t) {
                "object" == typeof e ? r.extend(this._headers, e) : this._headers[e] = t
            },
            send: function (e) {
                this.exec("send", e), this._timeout()
            },
            abort: function () {
                return clearTimeout(this._timer), this.exec("abort")
            },
            destroy: function () {
                this.trigger("destroy"), this.off(), this.exec("destroy"), this.disconnectRuntime()
            },
            getResponse: function () {
                return this.exec("getResponse")
            },
            getResponseAsJson: function () {
                return this.exec("getResponseAsJson")
            },
            getStatus: function () {
                return this.exec("getStatus")
            },
            _timeout: function () {
                var e = this,
                    t = e.options.timeout;
                t && (clearTimeout(e._timer), e._timer = setTimeout(function () {
                    e.abort(), e.trigger("error", "timeout")
                }, t))
            }
        }), n.installTo(i.prototype), i
    }), t("widgets/upload", ["base", "uploader", "file", "lib/transport", "widgets/widget"], function (e, t, n, i) {
        function r(e, t) {
            for (var n, i = [], r = e.source, o = r.size, s = t ? Math.ceil(o / t) : 1, a = 0, u = 0; u < s;) n = Math.min(t, o - a), i.push({
                file: e,
                start: a,
                end: t ? a + n : o,
                total: o,
                chunks: s,
                chunk: u++
            }), a += n;
            return e.blocks = i.concat(), e.remaning = i.length, {
                file: e,
                has: function () {
                    return !!i.length
                },
                fetch: function () {
                    return i.shift()
                }
            }
        }
        var o = e.$,
            s = e.isPromise,
            a = n.Status;
        o.extend(t.options, {
            prepareNextFile: !1,
            chunked: !1,
            chunkSize: 5242880,
            chunkRetry: 2,
            threads: 3,
            formData: null
        }), t.register({
            "start-upload": "start",
            "stop-upload": "stop",
            "skip-file": "skipFile",
            "is-in-progress": "isInProgress"
        }, {
            init: function () {
                var t = this.owner;
                this.runing = !1, this.pool = [], this.pending = [], this.remaning = 0, this.__tick = e.bindFn(this._tick, this), t.on("uploadComplete", function (e) {
                    e.blocks && o.each(e.blocks, function (e, t) {
                        t.transport && (t.transport.abort(), t.transport.destroy()), delete t.transport
                    }), delete e.blocks, delete e.remaning
                })
            },
            start: function () {
                var t = this;
                o.each(t.request("get-files", a.INVALID), function () {
                    t.request("remove-file", this)
                }), t.runing || (t.runing = !0, o.each(t.pool, function (e, n) {
                    var i = n.file;
                    i.getStatus() === a.INTERRUPT && (i.setStatus(a.PROGRESS), t._trigged = !1, n.transport && n.transport.send())
                }), t._trigged = !1, t.owner.trigger("startUpload"), e.nextTick(t.__tick))
            },
            stop: function (e) {
                var t = this;
                !1 !== t.runing && (t.runing = !1, e && o.each(t.pool, function (e, t) {
                    t.transport && t.transport.abort(), t.file.setStatus(a.INTERRUPT)
                }), t.owner.trigger("stopUpload"))
            },
            isInProgress: function () {
                return !!this.runing
            },
            getStats: function () {
                return this.request("get-stats")
            },
            skipFile: function (e, t) {
                e = this.request("get-file", e), e.setStatus(t || a.COMPLETE), e.skipped = !0, e.blocks && o.each(e.blocks, function (e, t) {
                    var n = t.transport;
                    n && (n.abort(), n.destroy(), delete t.transport)
                }), this.owner.trigger("uploadSkip", e)
            },
            _tick: function () {
                var t, n, i = this,
                    r = i.options;
                if (i._promise) return i._promise.always(i.__tick);
                i.pool.length < r.threads && (n = i._nextBlock()) ? (i._trigged = !1, t = function (t) {
                    i._promise = null, t && t.file && i._startSend(t), e.nextTick(i.__tick)
                }, i._promise = s(n) ? n.always(t) : t(n)) : i.remaning || i.getStats().numOfQueue || (i.runing = !1, i._trigged || e.nextTick(function () {
                    i.owner.trigger("uploadFinished")
                }), i._trigged = !0)
            },
            _nextBlock: function () {
                var e, t, n = this,
                    i = n._act,
                    o = n.options;
                return i && i.has() && i.file.getStatus() === a.PROGRESS ? (o.prepareNextFile && !n.pending.length && n._prepareNextFile(), i.fetch()) : n.runing ? (!n.pending.length && n.getStats().numOfQueue && n._prepareNextFile(), e = n.pending.shift(), t = function (e) {
                    return e ? (i = r(e, o.chunked ? o.chunkSize : 0), n._act = i, i.fetch()) : null
                }, s(e) ? e[e.pipe ? "pipe" : "then"](t) : t(e)) : void 0
            },
            _prepareNextFile: function () {
                var e, t = this,
                    n = t.request("fetch-file"),
                    i = t.pending;
                n && (e = t.request("before-send-file", n, function () {
                    return n.getStatus() === a.QUEUED ? (t.owner.trigger("uploadStart", n), n.setStatus(a.PROGRESS), n) : t._finishFile(n)
                }), e.done(function () {
                    var t = o.inArray(e, i);
                    ~t && i.splice(t, 1, n)
                }), e.fail(function (e) {
                    n.setStatus(a.ERROR, e), t.owner.trigger("uploadError", n, e), t.owner.trigger("uploadComplete", n)
                }), i.push(e))
            },
            _popBlock: function (e) {
                var t = o.inArray(e, this.pool);
                this.pool.splice(t, 1), e.file.remaning--, this.remaning--
            },
            _startSend: function (t) {
                var n, i = this,
                    r = t.file;
                i.pool.push(t), i.remaning++, t.blob = 1 === t.chunks ? r.source : r.source.slice(t.start, t.end), n = i.request("before-send", t, function () {
                    r.getStatus() === a.PROGRESS ? i._doSend(t) : (i._popBlock(t), e.nextTick(i.__tick))
                }), n.fail(function () {
                    1 === r.remaning ? i._finishFile(r).always(function () {
                        t.percentage = 1, i._popBlock(t), i.owner.trigger("uploadComplete", r), e.nextTick(i.__tick)
                    }) : (t.percentage = 1, i._popBlock(t), e.nextTick(i.__tick))
                })
            },
            _doSend: function (t) {
                var n, r, s = this,
                    u = s.owner,
                    c = s.options,
                    l = t.file,
                    d = new i(c),
                    p = o.extend({}, c.formData),
                    f = o.extend({}, c.headers);
                t.transport = d, d.on("destroy", function () {
                    delete t.transport, s._popBlock(t), e.nextTick(s.__tick)
                }), d.on("progress", function (e) {
                    var n = 0,
                        i = 0;
                    n = t.percentage = e, t.chunks > 1 && (o.each(l.blocks, function (e, t) {
                        i += (t.percentage || 0) * (t.end - t.start)
                    }), n = i / l.size), u.trigger("uploadProgress", l, n || 0)
                }), n = function (e) {
                    var n;
                    return r = d.getResponseAsJson() || {}, r._raw = d.getResponse(), n = function (t) {
                        e = t
                    }, u.trigger("uploadAccept", t, r, n) || (e = e || "server"), e
                }, d.on("error", function (e, i) {
                    t.retried = t.retried || 0, t.chunks > 1 && ~"http,abort".indexOf(e) && t.retried < c.chunkRetry ? (t.retried++, d.send()) : (i || "server" !== e || (e = n(e)), l.setStatus(a.ERROR, e), u.trigger("uploadError", l, e), u.trigger("uploadComplete", l))
                }), d.on("load", function () {
                    var e;
                    if (e = n()) return void d.trigger("error", e, !0);
                    1 === l.remaning ? s._finishFile(l, r) : d.destroy()
                }), p = o.extend(p, {
                    id: l.id,
                    name: l.name,
                    type: l.type,
                    lastModifiedDate: l.lastModifiedDate,
                    size: l.size
                }), t.chunks > 1 && o.extend(p, {
                    chunks: t.chunks,
                    chunk: t.chunk
                }), u.trigger("uploadBeforeSend", t, p, f), d.appendBlob(c.fileVal, t.blob, l.name), d.append(p), d.setRequestHeader(f), d.send()
            },
            _finishFile: function (e, t, n) {
                var i = this.owner;
                return i.request("after-send-file", arguments, function () {
                    e.setStatus(a.COMPLETE), i.trigger("uploadSuccess", e, t, n)
                }).fail(function (t) {
                    e.getStatus() === a.PROGRESS && e.setStatus(a.ERROR, t), i.trigger("uploadError", e, t)
                }).always(function () {
                    i.trigger("uploadComplete", e)
                })
            }
        })
    }), t("widgets/validator", ["base", "uploader", "file", "widgets/widget"], function (e, t, n) {
        var i, r = e.$,
            o = {};
        return i = {
            addValidator: function (e, t) {
                o[e] = t
            },
            removeValidator: function (e) {
                delete o[e]
            }
        }, t.register({
            init: function () {
                var t = this;
                e.nextTick(function () {
                    r.each(o, function () {
                        this.call(t.owner)
                    })
                })
            }
        }), i.addValidator("fileNumLimit", function () {
            var e = this,
                t = e.options,
                n = 0,
                i = parseInt(t.fileNumLimit, 10),
                r = !0;
            i && (e.on("beforeFileQueued", function (e) {
                return n >= i && r && (r = !1, this.trigger("error", "Q_EXCEED_NUM_LIMIT", i, e), setTimeout(function () {
                    r = !0
                }, 1)), !(n >= i)
            }), e.on("fileQueued", function () {
                n++
            }), e.on("fileDequeued", function () {
                n--
            }), e.on("uploadFinished reset", function () {
                n = 0
            }))
        }), i.addValidator("fileSizeLimit", function () {
            var e = this,
                t = e.options,
                n = 0,
                i = t.fileSizeLimit >> 0,
                r = !0;
            i && (e.on("beforeFileQueued", function (e) {
                var t = n + e.size > i;
                return t && r && (r = !1, this.trigger("error", "Q_EXCEED_SIZE_LIMIT", i, e), setTimeout(function () {
                    r = !0
                }, 1)), !t
            }), e.on("fileQueued", function (e) {
                n += e.size
            }), e.on("fileDequeued", function (e) {
                n -= e.size
            }), e.on("uploadFinished reset", function () {
                n = 0
            }))
        }), i.addValidator("fileSingleSizeLimit", function () {
            var e = this,
                t = e.options,
                i = t.fileSingleSizeLimit;
            i && e.on("beforeFileQueued", function (e) {
                if (e.size > i) return e.setStatus(n.Status.INVALID, "exceed_size"), this.trigger("error", "F_EXCEED_SIZE", e), !1
            })
        }), i.addValidator("duplicate", function () {
            function e(e) {
                for (var t, n = 0, i = 0, r = e.length; i < r; i++) t = e.charCodeAt(i), n = t + (n << 6) + (n << 16) - n;
                return n
            }
            var t = this,
                n = t.options,
                i = {};
            n.duplicate || (t.on("beforeFileQueued", function (t) {
                var n = t.__hash || (t.__hash = e(t.name + t.size + t.lastModifiedDate));
                if (i[n]) return this.trigger("error", "F_DUPLICATE", t), !1
            }), t.on("fileQueued", function (e) {
                var t = e.__hash;
                t && (i[t] = !0)
            }), t.on("fileDequeued", function (e) {
                var t = e.__hash;
                t && delete i[t]
            }), t.on("reset", function () {
                i = {}
            }))
        }), i
    }), t("runtime/compbase", [], function () {
        function e(e, t) {
            this.owner = e, this.options = e.options, this.getRuntime = function () {
                return t
            }, this.getRuid = function () {
                return t.uid
            }, this.trigger = function () {
                return e.trigger.apply(e, arguments)
            }
        }
        return e
    }), t("runtime/html5/runtime", ["base", "runtime/runtime", "runtime/compbase"], function (t, n, i) {
        function r() {
            var e = {},
                i = this,
                r = this.destory;
            n.apply(i, arguments), i.type = o, i.exec = function (n, r) {
                var o, a = this,
                    u = a.uid,
                    c = t.slice(arguments, 2);
                if (s[n] && (o = e[u] = e[u] || new s[n](a, i), o[r])) return o[r].apply(o, c)
            }, i.destory = function () {
                return r && r.apply(this, arguments)
            }
        }
        var o = "html5",
            s = {};
        return t.inherits(n, {
            constructor: r,
            init: function () {
                var e = this;
                setTimeout(function () {
                    e.trigger("ready")
                }, 1)
            }
        }), r.register = function (e, n) {
            return s[e] = t.inherits(i, n)
        }, e.Blob && e.FileReader && e.DataView && n.addRuntime(o, r), r
    }), t("runtime/html5/blob", ["runtime/html5/runtime", "lib/blob"], function (e, t) {
        return e.register("Blob", {
            slice: function (e, n) {
                var i = this.owner.source;
                return i = (i.slice || i.webkitSlice || i.mozSlice).call(i, e, n), new t(this.getRuid(), i)
            }
        })
    }), t("runtime/html5/dnd", ["base", "runtime/html5/runtime", "lib/file"], function (e, t, n) {
        var i = e.$,
            r = "webuploader-dnd-";
        return t.register("DragAndDrop", {
            init: function () {
                var t = this.elem = this.options.container;
                this.dragEnterHandler = e.bindFn(this._dragEnterHandler, this), this.dragOverHandler = e.bindFn(this._dragOverHandler, this), this.dragLeaveHandler = e.bindFn(this._dragLeaveHandler, this), this.dropHandler = e.bindFn(this._dropHandler, this), this.dndOver = !1, t.on("dragenter", this.dragEnterHandler), t.on("dragover", this.dragOverHandler), t.on("dragleave", this.dragLeaveHandler), t.on("drop", this.dropHandler), this.options.disableGlobalDnd && (i(document).on("dragover", this.dragOverHandler), i(document).on("drop", this.dropHandler))
            },
            _dragEnterHandler: function (e) {
                var t, n = this,
                    i = n._denied || !1;
                return e = e.originalEvent || e, n.dndOver || (n.dndOver = !0, t = e.dataTransfer.items, t && t.length && (n._denied = i = !n.trigger("accept", t)), n.elem.addClass(r + "over"), n.elem[i ? "addClass" : "removeClass"](r + "denied")), e.dataTransfer.dropEffect = i ? "none" : "copy", !1
            },
            _dragOverHandler: function (e) {
                var t = this.elem.parent().get(0);
                return !(t && !i.contains(t, e.currentTarget)) && (clearTimeout(this._leaveTimer), this._dragEnterHandler.call(this, e), !1)
            },
            _dragLeaveHandler: function () {
                var e, t = this;
                return e = function () {
                    t.dndOver = !1, t.elem.removeClass(r + "over " + r + "denied")
                }, clearTimeout(t._leaveTimer), t._leaveTimer = setTimeout(e, 100), !1
            },
            _dropHandler: function (e) {
                var t, o, s = this,
                    a = s.getRuid(),
                    u = s.elem.parent().get(0);
                if (u && !i.contains(u, e.currentTarget)) return !1;
                e = e.originalEvent || e, t = e.dataTransfer;
                try {
                    o = t.getData("text/html")
                } catch (e) {}
                return o ? void 0 : (s._getTansferFiles(t, function (e) {
                    s.trigger("drop", i.map(e, function (e) {
                        return new n(a, e)
                    }))
                }), s.dndOver = !1, s.elem.removeClass(r + "over"), !1)
            },
            _getTansferFiles: function (t, n) {
                var i, r, o, s, a, u, c, l = [],
                    d = [];
                for (i = t.items, r = t.files, c = !(!i || !i[0].webkitGetAsEntry), a = 0, u = r.length; a < u; a++) o = r[a], s = i && i[a], c && s.webkitGetAsEntry().isDirectory ? d.push(this._traverseDirectoryTree(s.webkitGetAsEntry(), l)) : l.push(o);
                e.when.apply(e, d).done(function () {
                    l.length && n(l)
                })
            },
            _traverseDirectoryTree: function (t, n) {
                var i = e.Deferred(),
                    r = this;
                return t.isFile ? t.file(function (e) {
                    n.push(e), i.resolve()
                }) : t.isDirectory && t.createReader().readEntries(function (t) {
                    var o, s = t.length,
                        a = [],
                        u = [];
                    for (o = 0; o < s; o++) a.push(r._traverseDirectoryTree(t[o], u));
                    e.when.apply(e, a).then(function () {
                        n.push.apply(n, u), i.resolve()
                    }, i.reject)
                }), i.promise()
            },
            destroy: function () {
                var e = this.elem;
                e.off("dragenter", this.dragEnterHandler), e.off("dragover", this.dragEnterHandler), e.off("dragleave", this.dragLeaveHandler), e.off("drop", this.dropHandler), this.options.disableGlobalDnd && (i(document).off("dragover", this.dragOverHandler), i(document).off("drop", this.dropHandler))
            }
        })
    }), t("runtime/html5/filepaste", ["base", "runtime/html5/runtime", "lib/file"], function (e, t, n) {
        return t.register("FilePaste", {
            init: function () {
                var t, n, i, r, o = this.options,
                    s = this.elem = o.container,
                    a = ".*";
                if (o.accept) {
                    for (t = [], n = 0, i = o.accept.length; n < i; n++)(r = o.accept[n].mimeTypes) && t.push(r);
                    t.length && (a = t.join(","), a = a.replace(/,/g, "|").replace(/\*/g, ".*"))
                }
                this.accept = a = new RegExp(a, "i"), this.hander = e.bindFn(this._pasteHander, this), s.on("paste", this.hander)
            },
            _pasteHander: function (e) {
                var t, i, r, o, s, a = [],
                    u = this.getRuid();
                for (e = e.originalEvent || e, t = e.clipboardData.items, o = 0, s = t.length; o < s; o++) i = t[o], "file" === i.kind && (r = i.getAsFile()) && a.push(new n(u, r));
                a.length && (e.preventDefault(), e.stopPropagation(), this.trigger("paste", a))
            },
            destroy: function () {
                this.elem.off("paste", this.hander)
            }
        })
    }), t("runtime/html5/filepicker", ["base", "runtime/html5/runtime"], function (e, t) {
        var n = e.$;
        return t.register("FilePicker", {
            init: function () {
                var e, t, i, r, o = this.getRuntime().getContainer(),
                    s = this,
                    a = s.owner,
                    u = s.options,
                    c = n(document.createElement("label")),
                    l = n(document.createElement("input"));
                if (l.attr("type", "file"), l.attr("name", u.name), l.addClass("webuploader-element-invisible"), c.on("click", function () {
                        l.trigger("click")
                    }), c.css({
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                        cursor: "pointer",
                        background: "#ffffff"
                    }), u.multiple && l.attr("multiple", "multiple"), u.accept && u.accept.length > 0) {
                    for (e = [], t = 0, i = u.accept.length; t < i; t++) e.push(u.accept[t].mimeTypes);
                    l.attr("accept", e.join(","))
                }
                o.append(l), o.append(c), r = function (e) {
                    a.trigger(e.type)
                }, l.on("change", function (e) {
                    var t, i = arguments.callee;
                    s.files = e.target.files, t = this.cloneNode(!0), t.value = null, this.parentNode.replaceChild(t, this), l.off(), l = n(t).on("change", i).on("mouseenter mouseleave", r), a.trigger("change")
                }), c.on("mouseenter mouseleave", r)
            },
            getFiles: function () {
                return this.files
            },
            destroy: function () {}
        })
    }), t("runtime/html5/transport", ["base", "runtime/html5/runtime"], function (e, t) {
        var n = e.noop,
            i = e.$;
        return t.register("Transport", {
            init: function () {
                this._status = 0, this._response = null
            },
            send: function () {
                var t, n, r, o = this.owner,
                    s = this.options,
                    a = this._initAjax(),
                    u = o._blob,
                    c = s.server;
                s.sendAsBinary ? (c += (/\?/.test(c) ? "&" : "?") + i.param(o._formData), n = u.getSource()) : (t = new FormData, i.each(o._formData, function (e, n) {
                    t.append(e, n)
                }), t.append(s.fileVal, u.getSource(), s.filename || o._formData.name || "")), s.withCredentials && "withCredentials" in a ? (a.open(s.method, c, !0), a.withCredentials = !0) : a.open(s.method, c), this._setRequestHeader(a, s.headers), n ? (a.overrideMimeType("application/octet-stream"), e.os.android ? (r = new FileReader, r.onload = function () {
                    a.send(this.result), r = r.onload = null
                }, r.readAsArrayBuffer(n)) : a.send(n)) : a.send(t)
            },
            getResponse: function () {
                return this._response
            },
            getResponseAsJson: function () {
                return this._parseJson(this._response)
            },
            getStatus: function () {
                return this._status
            },
            abort: function () {
                var e = this._xhr;
                e && (e.upload.onprogress = n, e.onreadystatechange = n, e.abort(), this._xhr = e = null)
            },
            destroy: function () {
                this.abort()
            },
            _initAjax: function () {
                var e = this,
                    t = new XMLHttpRequest;
                return !this.options.withCredentials || "withCredentials" in t || "undefined" == typeof XDomainRequest || (t = new XDomainRequest), t.upload.onprogress = function (t) {
                    var n = 0;
                    return t.lengthComputable && (n = t.loaded / t.total), e.trigger("progress", n)
                }, t.onreadystatechange = function () {
                    if (4 === t.readyState) return t.upload.onprogress = n, t.onreadystatechange = n, e._xhr = null, e._status = t.status, t.status >= 200 && t.status < 300 ? (e._response = t.responseText, e.trigger("load")) : t.status >= 500 && t.status < 600 ? (e._response = t.responseText, e.trigger("error", "server")) : e.trigger("error", e._status ? "http" : "abort")
                }, e._xhr = t, t
            },
            _setRequestHeader: function (e, t) {
                i.each(t, function (t, n) {
                    e.setRequestHeader(t, n)
                })
            },
            _parseJson: function (e) {
                var t;
                try {
                    t = JSON.parse(e)
                } catch (e) {
                    t = {}
                }
                return t
            }
        })
    }), t("runtime/flash/runtime", ["base", "runtime/runtime", "runtime/compbase"], function (t, n, i) {
        function r() {
            function i(e, t) {
                var n, i, r = e.type || e;
                n = r.split("::"), i = n[0], r = n[1], "Ready" === r && i === c.uid ? c.trigger("ready") : o[i] && o[i].trigger(r.toLowerCase(), e, t)
            }
            var r = {},
                o = {},
                u = this.destory,
                c = this,
                l = t.guid("webuploader_");
            n.apply(c, arguments), c.type = s, c.exec = function (e, n) {
                var i, s = this,
                    u = s.uid,
                    l = t.slice(arguments, 2);
                return o[u] = s, a[e] && (r[u] || (r[u] = new a[e](s, c)), i = r[u], i[n]) ? i[n].apply(i, l) : c.flashExec.apply(s, arguments)
            }, e[l] = function () {
                var e = arguments;
                setTimeout(function () {
                    i.apply(null, e)
                }, 1)
            }, this.jsreciver = l, this.destory = function () {
                return u && u.apply(this, arguments)
            }, this.flashExec = function (e, n) {
                var i = c.getFlash(),
                    r = t.slice(arguments, 2);
                return i.exec(this.uid, e, n, r)
            }
        }
        var o = t.$,
            s = "flash",
            a = {};
        return t.inherits(n, {
                constructor: r,
                init: function () {
                    var e, n = this.getContainer(),
                        i = this.options;
                    n.css({
                        position: "absolute",
                        top: "-8px",
                        left: "-8px",
                        width: "9px",
                        height: "9px",
                        overflow: "hidden"
                    }), e = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + i.swf + '" ', t.browser.ie && (e += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), e += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + i.swf + '" /><param name="flashvars" value="uid=' + this.uid + "&jsreciver=" + this.jsreciver + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', n.html(e)
                },
                getFlash: function () {
                    return this._flash ? this._flash : (this._flash = o("#" + this.uid).get(0), this._flash)
                }
            }), r.register = function (e, n) {
                return n = a[e] = t.inherits(i, o.extend({
                    flashExec: function () {
                        var e = this.owner;
                        return this.getRuntime().flashExec.apply(e, arguments)
                    }
                }, n))
            },
            function () {
                var e;
                try {
                    e = navigator.plugins["Shockwave Flash"], e = e.description
                } catch (t) {
                    try {
                        e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
                    } catch (t) {
                        e = "0.0"
                    }
                }
                return e = e.match(/\d+/g), parseFloat(e[0] + "." + e[1], 10)
            }() >= 11.4 && n.addRuntime(s, r), r
    }), t("runtime/flash/filepicker", ["base", "runtime/flash/runtime"], function (e, t) {
        var n = e.$;
        return t.register("FilePicker", {
            init: function (e) {
                var t, i, r = n.extend({}, e);
                for (t = r.accept && r.accept.length, i = 0; i < t; i++) r.accept[i].title || (r.accept[i].title = "Files");
                delete r.button, delete r.id, delete r.container, this.flashExec("FilePicker", "init", r)
            },
            destroy: function () {}
        })
    }), t("runtime/flash/transport", ["base", "runtime/flash/runtime", "runtime/client"], function (e, t, n) {
        var i = e.$;
        return t.register("Transport", {
            init: function () {
                this._status = 0, this._response = null, this._responseJson = null
            },
            send: function () {
                var e, t = this.owner,
                    n = this.options,
                    r = this._initAjax(),
                    o = t._blob,
                    s = n.server;
                r.connectRuntime(o.ruid), n.sendAsBinary ? (s += (/\?/.test(s) ? "&" : "?") + i.param(t._formData), e = o.uid) : (i.each(t._formData, function (e, t) {
                    r.exec("append", e, t)
                }), r.exec("appendBlob", n.fileVal, o.uid, n.filename || t._formData.name || "")), this._setRequestHeader(r, n.headers), r.exec("send", {
                    method: n.method,
                    url: s,
                    mimeType: "application/octet-stream"
                }, e)
            },
            getStatus: function () {
                return this._status
            },
            getResponse: function () {
                return this._response || ""
            },
            getResponseAsJson: function () {
                return this._responseJson
            },
            abort: function () {
                var e = this._xhr;
                e && (e.exec("abort"), e.destroy(), this._xhr = e = null)
            },
            destroy: function () {
                this.abort()
            },
            _initAjax: function () {
                var e = this,
                    t = new n("XMLHttpRequest");
                return t.on("uploadprogress progress", function (t) {
                    var n = t.loaded / t.total;
                    return n = Math.min(1, Math.max(0, n)), e.trigger("progress", n)
                }), t.on("load", function () {
                    var n = t.exec("getStatus"),
                        i = "";
                    return t.off(), e._xhr = null, n >= 200 && n < 300 ? (e._response = t.exec("getResponse"), e._responseJson = t.exec("getResponseAsJson")) : n >= 500 && n < 600 ? (e._response = t.exec("getResponse"), e._responseJson = t.exec("getResponseAsJson"), i = "server") : i = "http", e._response = decodeURIComponent(e._response), t.destroy(), t = null, i ? e.trigger("error", i) : e.trigger("load")
                }), t.on("error", function () {
                    t.off(), e._xhr = null, e.trigger("error", "http")
                }), e._xhr = t, t
            },
            _setRequestHeader: function (e, t) {
                i.each(t, function (t, n) {
                    e.exec("setRequestHeader", t, n)
                })
            }
        })
    }), t("preset/withoutimage", ["base", "widgets/filednd", "widgets/filepaste", "widgets/filepicker", "widgets/queue", "widgets/runtime", "widgets/upload", "widgets/validator", "runtime/html5/blob", "runtime/html5/dnd", "runtime/html5/filepaste", "runtime/html5/filepicker", "runtime/html5/transport", "runtime/flash/filepicker", "runtime/flash/transport"], function (e) {
        return e
    }), t("webuploader", ["preset/withoutimage"], function (e) {
        return e
    }), n("webuploader")
});
! function (i, e, o) {
    function t(i, e, o, t) {
        var r, a = i.getCursor("start"),
            l = i.getCursor("end"),
            t = t || "";
        e ? (r = i.getLine(a.line), o = r.slice(0, a.ch), t = r.slice(a.ch), i.setLine(a.line, o + t)) : (r = i.getSelection(), i.replaceSelection(o + r + t), a.ch += o.length, l.ch += o.length), i.setSelection(a, l), i.focus()
    }

    function r(i, e) {
        e = e || i.getCursor("start");
        var o = i.getTokenAt(e);
        if (!o.type) return {};
        for (var t, r, a = o.type.split(" "), l = {}, n = 0; n < a.length; n++) t = a[n], "strong" === t ? l.bold = !0 : "variable-2" === t ? (r = i.getLine(e.line), /^\s*\d+\.\s/.test(r) ? l["ordered-list"] = !0 : l["unordered-list"] = !0) : "atom" === t ? l.quote = !0 : "em" === t && (l.italic = !0);
        return l
    }
    var a = new e;
    a.set({
        html: !1,
        xhtmlOut: !1,
        breaks: !0,
        langPrefix: "language-",
        linkify: !1,
        typographer: !1
    }), window.markdowniter = a;
    var l = i.toolbar,
        n = function (i, e) {
            for (var o = 0, t = l.length; o < t; o++) {
                var r = l[o];
                if ("string" != typeof r && r.name === i) {
                    r.action = e;
                    break
                }
            }
        },
        d = $("body"),
        s = function () {
            var i = this;
            this.$win = $(['<div class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editorToolImageTitle" aria-hidden="true">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>', '<h3 id="editorToolImageTitle">添加链接</h3>', "</div>", '<div class="modal-body">', '<form class="form-horizontal">', '<div class="control-group">', '<label class="control-label">标题</label>', '<div class="controls">', '<input type="text" name="title" placeholder="Title">', "</div>", "</div>", '<div class="control-group">', '<label class="control-label">链接</label>', '<div class="controls">', '<input type="text" name="link" value="http://" placeholder="Link">', "</div>", "</div>", "</form>", "</div>", '<div class="modal-footer">', '<button class="btn btn-primary" role="save">确定</button>', "</div>", "</div>"].join("")).appendTo(d), this.$win.on("click", "[role=save]", function () {
                i.$win.find("form").submit()
            }).on("submit", "form", function () {
                var e = $(this),
                    o = e.find("[name=title]").val(),
                    a = e.find("[name=link]").val();
                i.$win.modal("hide");
                var l = i.editor.codemirror;
                return t(l, r(l).link, "[" + o + "](" + a + ")"), e.find("[name=title]").val(""), e.find("[name=link]").val("http://"), !1
            })
        };
    s.prototype.bind = function (i) {
        this.editor = i, this.$win.modal("show")
    };
    var h = function () {
        var i = this;
        this.$win = $(['<div class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editorToolImageTitle" aria-hidden="true">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>', '<h3 id="editorToolImageTitle">图片</h3>', "</div>", '<div class="modal-body">', '<div class="upload-img">', '<div class="button">上传图片</div>', '<span class="tip"></span>', '<div class="alert alert-error hide"></div>', "</div>", "</div>", "</div>"].join("")).appendTo(d), this.$upload = this.$win.find(".upload-img").css({
            height: 50,
            padding: "60px 0",
            textAlign: "center",
            border: "4px dashed#ddd"
        }), this.$uploadBtn = this.$upload.find(".button").css({
            width: 86,
            height: 40,
            margin: "0 auto"
        }), this.$uploadTip = this.$upload.find(".tip").hide(), this.file = !1;
        var e = $("[name=_csrf]").val();
        this.uploader = o.create({
            swf: "/public/libs/webuploader/Uploader.swf",
            server: "/upload?_csrf=" + e,
            pick: this.$uploadBtn[0],
            paste: document.body,
            dnd: this.$upload[0],
            auto: !0,
            fileSingleSizeLimit: 2097152,
            accept: {
                title: "Images",
                extensions: "gif,jpg,jpeg,bmp,png",
                mimeTypes: "image/*"
            }
        }), this.uploader.on("beforeFileQueued", function (e) {
            if (!1 !== i.file || !i.editor) return !1;
            i.showFile(e)
        }), this.uploader.on("uploadProgress", function (e, o) {
            i.showProgress(e, 100 * o)
        }), this.uploader.on("uploadSuccess", function (e, o) {
            if (o.success) {
                i.$win.modal("hide");
                var a = i.editor.codemirror;
                t(a, r(a).image, "![" + e.name + "](" + o.url + ")")
            } else i.removeFile(), i.showError(o.msg || "服务器走神了，上传失败")
        }), this.uploader.on("uploadComplete", function (e) {
            i.uploader.removeFile(e), i.removeFile()
        }), this.uploader.on("error", function (e) {
            switch (i.removeFile(), e) {
                case "Q_EXCEED_SIZE_LIMIT":
                case "F_EXCEED_SIZE":
                    i.showError("文件太大了, 不能超过2M");
                    break;
                case "Q_TYPE_DENIED":
                    i.showError("只能上传图片");
                    break;
                default:
                    i.showError("发生未知错误")
            }
        }), this.uploader.on("uploadError", function () {
            i.removeFile(), i.showError("服务器走神了，上传失败")
        })
    };
    h.prototype.removeFile = function () {
        this.file = !1, this.$uploadBtn.show(), this.$uploadTip.hide()
    }, h.prototype.showFile = function (i) {
        this.file = i, this.$uploadBtn.hide(), this.$uploadTip.html("正在上传: " + i.name).show(), this.hideError()
    }, h.prototype.showError = function (i) {
        this.$upload.find(".alert-error").html(i).show()
    }, h.prototype.hideError = function (i) {
        this.$upload.find(".alert-error").hide()
    }, h.prototype.showProgress = function (i, e) {
        this.$uploadTip.html("正在上传: " + i.name + " " + e + "%").show()
    }, h.prototype.bind = function (i) {
        this.editor = i, this.$win.modal("show")
    };
    var u = new h,
        p = new s;
    n("image", function (i) {
        u.bind(i)
    }), n("link", function (i) {
        p.bind(i)
    });
    var c = i.prototype.createToolbar;
    i.prototype.createToolbar = function (i) {
        c.call(this, i);
        var e = this;
        $(e.codemirror.display.input).on("focus", function () {
            u.editor = e
        })
    }, i.prototype.push = function (i) {
        var e = this.codemirror,
            o = e.lastLine();
        e.setLine(o, e.getLine(o) + i)
    }
}(window.Editor, window.markdownit, window.WebUploader);