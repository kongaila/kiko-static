"use strict";

function setScro(e, t) {
    var n = e;
    n.focus();
    var i = getSelection();
    if (lastEditRange && (i.removeAllRanges(), i.addRange(lastEditRange)), "#text" != i.anchorNode.nodeName) {
        var o = document.createTextNode(t);
        n.childNodes.length, document.execCommand("insertHTML", "false", "<code>" + t + "</code>");
        var l = document.createRange();
        l.setStart(o, o.length), l.collapse(!0), i.removeAllRanges(), i.addRange(l)
    } else {
        alert();
        var l = i.getRangeAt(0);
        l.startContainer, l.startOffset;
        document.execCommand("insertHTML", "false", "<code>" + t + "</code>"), l.collapse(!0), i.removeAllRanges(), i.addRange(l)
    }
    lastEditRange = i.getRangeAt(0)
}

function Editor(e) {
    this.$ = document, this.ElemId = e.ElemId, this.Height = e.Height;
    var t = this;
    t.FileConfig = {
        FileImgPath: "/",
        FileImgUrl: "https://www.baidu.com"
    }, t.setPubConfig = {
        fontsize: ["x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"],
        dataFont: {
            windows: [{ch: "宋体", en: "SimSun"}, {ch: "黑体", en: "SimHei"}, {
                ch: "微软雅黑",
                en: "Microsoft Yahei"
            }, {ch: "楷体", en: "KaiTi"}, {ch: "Airal", en: "Airal"}]
        },
        Fongcolor: ["#000", "#444", "#666", "#888", "#ff1100", "#f600ff", "#0012ff", "#00fffc", "#00ff2a", "#fcff00", "#ffa200", "#ff4200", "#fff", "#744389", "#71573c", "#109480"]
    }, t.init = function () {
        var e = t.$.createElement("link");
        e.href = "https://cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", e.rel = "stylesheet", e.type = "text/css";
        var n = t.$.createElement("style");
        n.type2 = "text/css", n.innerHTML = "#writeB img{max-width:100%}.fa:hover{color:#000 !important}.TfontH button:hover{background:#f1f1f1 !important}.FontZis button:hover{background:#f1f1f1 !important}.FontFam button:hover{background:#f1f1f1 !important}.Ahove:hover{background:#f1f1f1 !important}.ylB p{font-size:14px;}.ylB img{max-width:100%}.Linhe button:hover{background:#f1f1f1 !important}a.fa-close:link{text-decoration: none;color:#fff}a.fa-close:hover{color:#fff !important}", t.$.getElementsByTagName("HEAD").item(0).appendChild(n), t.$.getElementsByTagName("HEAD").item(0).appendChild(e), t.$.getElementById(t.ElemId).style.cssText = "width:100%;height:" + t.Height + "px;border:1px solid #ccc;border-radius:3px;overflow:hidden;box-sizing:border-box;position:initial;overflow:hidden;background:#fff";
        var i = t.$.createElement("div");
        i.setAttribute("id", "TabNav"), i.style.cssText = "width:100%;min-height:25px;background:#fff;box-sizing:border-box;border-bottom:1px solid #ccc;position:relative";
        var o = t.$.createElement("div");
        o.style.cssText = "width:70px;background:#fff;position:absolute;top:30px;left:-3px;border:1px solid #eee;text-align:center;color:#444;z-index:9;display:none;cursor:pointer", o.setAttribute("class", "TfontH");
        var l = t.$.createElement("button");
        l.innerHTML = "H1", l.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:24px;cursor:pointer", l.setAttribute("title", "H1"), l.onclick = function () {
            document.execCommand("formatBlock", "true", "<h1>"), o.style.display = "none"
        };
        var a = t.$.createElement("button");
        a.innerHTML = "H2", a.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:22px;cursor:pointer", a.setAttribute("title", "H2"), a.onclick = function () {
            document.execCommand("formatBlock", "false", "<h2>"), o.style.display = "none"
        };
        var r = t.$.createElement("button");
        r.innerHTML = "H3", r.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:20px;cursor:pointer", r.setAttribute("title", "H3"), r.onclick = function () {
            document.execCommand("formatBlock", "false", "<h3>"), o.style.display = "none"
        };
        var s = t.$.createElement("button");
        s.innerHTML = "H4", s.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:18px;cursor:pointer", s.setAttribute("title", "H4"), s.onclick = function () {
            document.execCommand("formatBlock", "false", "<h4>"), o.style.display = "none"
        };
        var d = t.$.createElement("button");
        d.innerHTML = "H5", d.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:16px;cursor:pointer", d.setAttribute("title", "H5"), d.onclick = function () {
            document.execCommand("formatBlock", "false", "<h5>"), o.style.display = "none"
        };
        var f = t.$.createElement("button");
        f.innerHTML = "正文", f.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer", f.setAttribute("title", "正文"), f.onclick = function () {
            document.execCommand("formatBlock", "false", "<p>"), o.style.display = "none"
        }, o.appendChild(l), o.appendChild(a), o.appendChild(r), o.appendChild(s), o.appendChild(d), o.appendChild(f);
        var c = t.$.createElement("div");
        c.style.cssText = "width:87px;background:#fff;position:absolute;top:30px;left:9px;border:1px solid #eee;text-align:center;color:#444;z-index:9;cursor:pointer;display:none", c.setAttribute("class", "FontZis");
        for (var p = 0; p < t.setPubConfig.fontsize.length; p++) {
            var m;
            !function (e) {
                m = t.$.createElement("button"), m.innerHTML = t.setPubConfig.fontsize[e], m.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer", m.onclick = function () {
                    document.execCommand("fontSize", "false", e + 1), c.style.display = "none"
                }, c.appendChild(m)
            }(p)
        }
        var g = t.$.createElement("div");
        g.style.cssText = "width:174px;background:#fff;position:absolute;top:30px;left:155px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;display:none", g.setAttribute("class", "Fongcolor");
        for (var u = ["#000", "#444", "#666", "#888", "#ff1100", "#f600ff", "#0012ff", "#00fffc", "#00ff2a", "#fcff00", "#ffa200", "#ff4200", "#fff", "#744389", "#71573c", "#109480"], p = 0; p < t.setPubConfig.Fongcolor.length; p++) {
            var x;
            !function (e) {
                x = t.$.createElement("button"), x.style.cssText = "width:25px;height:25px;margin:0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer;background:" + t.setPubConfig.Fongcolor[e] + ";margin:2px", x.onclick = function () {
                    document.execCommand("foreColor", "false", t.setPubConfig.Fongcolor[e]), g.style.display = "none"
                }, g.appendChild(x)
            }(p)
        }
        var h = t.$.createElement("div");
        h.style.cssText = "width:174px;background:#fff;position:absolute;top:30px;left:187px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;display:none", h.setAttribute("class", "fontBcolor");
        for (var u = ["#000", "#444", "#666", "#888", "#ff1100", "#f600ff", "#0012ff", "#00fffc", "#00ff2a", "#fcff00", "#ffa200", "#ff4200", "#fff", "#744389", "#71573c", "#109480"], p = 0; p < u.length; p++) {
            var b;
            !function (e) {
                b = t.$.createElement("button"), b.style.cssText = "width:25px;height:25px;margin:0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer;background:" + u[e] + ";margin:2px;", b.onclick = function () {
                    document.execCommand("backColor", "false", u[e]), h.style.display = "none"
                }, h.appendChild(b)
            }(p)
        }
        var y = t.$.createElement("div");
        y.style.cssText = "width:218px;background:#fff;position:absolute;top:30px;left:370px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;padding:5px;display:none";
        var E = t.$.createElement("input");
        E.setAttribute("placeholder", "链接描述");
        var C = t.$.createElement("input");
        C.setAttribute("placeholder", "http://"), E.style.cssText = "width:98%;height:20px;margin:2px 0;padding-left:4px;font-size:14px;color:#666;border:0;outline:none;border-bottom:1px solid #1e88e5;margin-top:4px;;", C.style.cssText = "width:98%;height:20px;margin-top:5px;padding-left:4px;font-size:14px;color:#666;border:0;border-bottom:1px solid #1e88e5;outline:none";
        var v = t.$.createElement("button");
        v.innerHTML = "插入", v.setAttribute("class", "Ahove"), v.style.cssText = "padding:3px 5px;font-size:14px;color:#1e88e5;float:right;margin-top:4px;border-radius:3px;outline:none;border:none;background:#fff;cursor:pointer", v.onclick = function () {
            document.getElementById("writeB").focus(), document.execCommand("insertHTML", !1, "<a href=" + C.value + " target='_back' style='font-size:14px;'>" + E.value + "</a>"), y.style.display = "none"
        }, y.appendChild(E), y.appendChild(C), y.appendChild(v);
        var T = t.$.createElement("div");
        T.style.cssText = "width:60px;background:#fff;position:absolute;top:30px;left:380px;border:1px solid #eee;text-align:center;color:#444;z-index:9;cursor:pointer;display:none", T.setAttribute("class", "Linhe");
        for (var $ = [14, 18, 22, 26, 30], p = 0; p < $.length; p++) {
            var k;
            !function (e) {
                k = t.$.createElement("button"), k.innerHTML = $[e], k.style.cssText = "width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer", k.onclick = function () {
                    if (window.getSelection) {
                        var t = window.getSelection();
                        t.rangeCount > 0 && "writeB" != t.getRangeAt(0).commonAncestorContainer.parentElement.getAttribute("id") && (t.getRangeAt(0).commonAncestorContainer.parentElement.style.lineHeight = $[e] + "px")
                    } else if (document.selection) return console.log(document.selection.createRange()), document.selection.createRange();
                    T.style.display = "none"
                }, T.appendChild(k)
            }(p)
        }
        var w = t.$.createElement("div");
        w.style.cssText = "width:auto;background:#fff;position:absolute;top:30px;left:345px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;padding:10px 10px 2px 10px;display:none";
        var B = t.$.createElement("p");
        B.innerHTML = "输入代码", B.style.cssText = "padding:0;margin:0;font-size:14px;color:#666";
        var I = t.$.createElement("textarea");
        I.style.cssText = 'width:330px;box-sizing:border-box;margin-top:5px;font-family:"Microsoft Yahei";display:block', I.setAttribute("rows", "7");
        var A = t.$.createElement("button");
        A.innerHTML = "插入", A.setAttribute("class", "Ahove"), A.style.cssText = "padding:3px 5px;font-size:14px;color:#1e88e5;float:right;margin-top:4px;border-radius:3px;outline:none;border:none;background:#fff;cursor:pointer;", A.onclick = function () {
            setScro(t.$.getElementById("writeB"), I.value)
        }, w.appendChild(B), w.appendChild(I), w.appendChild(A);
        for (var H = {
            Arrd: [{ClassName: "fa fa-header", Title: "设置标题", Elid: ""}, {
                ClassName: "fa fa-text-height",
                Title: "字体大小",
                Elid: ""
            }, {ClassName: "fa fa fa-font", Title: "设置字体", Elid: ""}, {
                ClassName: "fa fa-bold",
                Title: "加粗",
                Elid: ""
            }, {ClassName: "fa fa-italic", Title: "斜体", Elid: ""}, {
                ClassName: "fa fa-underline",
                Title: "下划线",
                Elid: ""
            }, {ClassName: "fa fa-strikethrough", Title: "删除线", Elid: ""}, {
                ClassName: "fa fa-pencil",
                Title: "字体颜色",
                Elid: ""
            }, {ClassName: "fa fa-paint-brush", Title: "背景颜色", Elid: ""}, {
                ClassName: "fa fa-align-left",
                Title: "左对齐",
                Elid: ""
            }, {ClassName: "fa fa-align-center", Title: "居中", Elid: ""}, {
                ClassName: "fa fa-align-right",
                Title: "右对齐",
                Elid: ""
            }, {ClassName: "fa fa-sort-numeric-asc", Title: "行间距", Elid: ""}, {
                ClassName: "fa fa-link",
                Title: "超链接",
                Elid: ""
            }, {ClassName: "fa fa-list-ul", Title: "无序列表", Elid: ""}, {
                ClassName: "fa fa-list-ol",
                Title: "有序列表",
                Elid: ""
            }, {ClassName: "fa fa-table", Title: "表格", Elid: ""}, {
                ClassName: "fa fa-code",
                Title: "代码",
                Elid: ""
            }, {ClassName: "fa fa-image", Title: "图片", Elid: ""}, {
                ClassName: "fa fa-video-camera",
                Title: "视频",
                Elid: ""
            }, {ClassName: "fa fa-music", Title: "音频", Elid: ""}, {
                ClassName: "fa fa-paperclip",
                Title: "附件",
                Elid: ""
            }, {ClassName: "fa fa-eraser", Title: "清空", Elid: ""}, {
                ClassName: "fa fa-file-text-o",
                Title: "预览",
                Elid: ""
            }, {ClassName: "fa fa-arrows-alt", Title: "全屏", Elid: ""}]
        }, p = 0; p < H.Arrd.length; p++) {
            var f, z, N;
            !function (e) {
                function n() {
                    if (y.style.display = "none", 0 == e) ; else if (3 == e) document.execCommand("bold", !1, null); else if (4 == e) document.execCommand("Italic", !1, null); else if (5 == e) document.execCommand("Underline", !1, null); else if (6 == e) document.execCommand("StrikeThrough", !1, null); else if (9 == e) document.execCommand("JustifyLeft", !1, null); else if (10 == e) document.execCommand("JustifyCenter", !1, null); else if (11 == e) document.execCommand("JustifyRight", !1, null); else if (12 == e) ; else if (13 == e) y.style.display = "block"; else if (14 == e) document.execCommand("insertUnorderedList"); else if (15 == e) document.execCommand("insertOrderedList"); else if (17 == e) w.style.display = "block"; else if (23 == e) {
                        var n = t.$.createElement("div");
                        n.style.cssText = "width:100%;height:100%;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:99999999999999999", n.setAttribute("class", "ylB");
                        var i = t.$.createElement("div");
                        i.style.cssText = "width:45%;height:95%;background:#fff;margin:20px auto;border-radius:2px;";
                        var o = t.$.createElement("div");
                        o.style.cssText = "width:100%;height:5%;background:#0e90d2;padding:0 10px;text-align:center;position:relative;line-height:240%;box-sizing:border-box;font-size:15px;color:#fff;font-weight:bold", o.innerHTML = "效果预览";
                        var l = t.$.createElement("a");
                        l.setAttribute("href", "javascript:;"), l.setAttribute("class", "fa fa-close"), l.style.cssText = "width:25px;height:25px;position:absolute;top:8px;right:10px;color:#fff;font-size:20px", l.onclick = function () {
                            n.remove()
                        };
                        var a = t.$.createElement("div");
                        a.style.cssText = "width:100%;height:94%;overflow-x:auto;padding:0 10px;box-sizing:border-box", a.innerHTML = t.$.getElementById("writeB").innerHTML;
                        var r = t.$.createElement("div");
                        r.style.cssText = "width:100%;height:1%", o.appendChild(l), i.appendChild(o), i.appendChild(a), i.appendChild(r), n.appendChild(i), t.$.body.appendChild(n)
                    } else 24 == e && ("initial" == t.$.getElementById(t.ElemId).style.position ? (t.$.getElementById(t.ElemId).style.position = "fixed", t.$.getElementById(t.ElemId).style.left = "0px", t.$.getElementById(t.ElemId).style.top = "0px", t.$.getElementById(t.ElemId).style.height = "100%", t.$.getElementById(t.ElemId).style.zIndex = "9999999999", t.$.getElementById("WirteBox").style.height = "97%", 2) : (t.$.getElementById(t.ElemId).style.position = "initial", t.$.getElementById(t.ElemId).style.zIndex = "99", t.$.getElementById(t.ElemId).style.height = t.Height + "px", t.$.getElementById("WirteBox").style.height = t.$.getElementById(t.ElemId).offsetHeight - t.$.getElementById("TabNav").offsetHeight - 13 + "px", 1));
                    return !1
                }

                f = t.$.createElement("button"), f.setAttribute("class", H.Arrd[e].ClassName), f.setAttribute("title", H.Arrd[e].Title), 18 == e && (f.setAttribute("id", "ImgFileEd"), z = document.createElement("input"), z.setAttribute("id", "_ef"), z.setAttribute("type", "file"), z.setAttribute("accept", "image/gif,image/jpeg,image/jpg,image/png,image/svg"), z.setAttribute("style", "opacity:0;width:20.5px;height:18px;margin:0px 0 0 -17px"), f.appendChild(z), z.onchange = function () {
                    console.log(this.files[0]), console.log(t.FileConfig.FileImgUrl);
                    var e = new FormData;
                    e.append("file", this.files[0]);
                    var n = new XMLHttpRequest;
                    n.open("post", t.FileConfig.FileImgUrl, !0), n.send(e), n.onload = function (e) {
                        var n = JSON.parse(e.target.responseText);
                        if (200 == n.statuCode) {
                            var i = n.imgurl;
                            t.$.getElementById("writeB").focus(), document.execCommand("insertImage", "false", t.FileConfig.FileImgPath + i)
                        }
                    }, n.onerror = function (e) {
                        alert("图片上传出现错误！")
                    }
                }), f.style.cssText = "font-size:14px;padding:8px 10px;position:relative;color:#999;cursor:pointer;outline:none;background:#fff;border:0;", N = t.$.createElement("div"), N.style.cssText = "width:70px;background:#fff;position:absolute;top:30px;left:50px;border:1px solid #eee;text-align:center;color:#444;z-index:9;cursor:pointer;", N.setAttribute("class", "FontFam"), f.onmouseover = function () {
                    if (o.style.display = 0 == e ? "block" : "none", c.style.display = 1 == e ? "block" : "none", 2 == e) {
                        N.innerHTML = "", N.style.display = "block";
                        for (var n = 0; n < t.setPubConfig.dataFont.windows.length; n++) {
                            var l;
                            !function (e) {
                                l = t.$.createElement("button"), l.innerHTML = t.setPubConfig.dataFont.windows[e].ch, l.style.cssText = "width:100%;margin:0;padding:6px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer", l.onclick = function () {
                                    document.execCommand("fontName", "false", t.setPubConfig.dataFont.windows[e].en), N.style.display = "none"
                                }, N.appendChild(l)
                            }(n)
                        }
                        i.appendChild(N)
                    } else N.style.display = "none";
                    g.style.display = 7 == e ? "block" : "none", h.style.display = 8 == e ? "block" : "none", T.style.display = 12 == e ? "block" : "none"
                }, f.addEventListener("click", n, !1), i.appendChild(f), i.appendChild(c), i.appendChild(g), i.appendChild(h), i.appendChild(y), i.appendChild(T), i.appendChild(w)
            }(p)
        }
        i.appendChild(o), t.$.getElementById(t.ElemId).style.height;
        var s = t.$.createElement("div");
        s.setAttribute("id", "WirteBox"), s.style.cssText = "overflow:auto;";
        var L = t.$.createElement("p");
        s.onmouseover = function () {
            o.style.display = "none", c.style.display = "none", N.style.display = "none", g.style.display = "none", h.style.display = "none", T.style.display = "none"
        }, s.onclick = function () {
            y.style.display = "none", w.style.display = "none";
            var e = getSelection();
            lastEditRange = e.getRangeAt(0)
        }, s.onkeyup = function () {
            var e = getSelection();
            lastEditRange = e.getRangeAt(0), console.log(lastEditRange)
        }, L.innerHTML = "在此编辑文章内容";
        var M = t.$.createElement("div"), F = t.$.createElement("p"), R = t.$.createElement("br");
        M.setAttribute("contenteditable", "true"), M.setAttribute("id", "writeB"), M.style.cssText = "width:100%;height:97%;outline:none;font-size:13px;padding:0px 10px;box-sizing:border-box", M.appendChild(L), F.appendChild(R), M.appendChild(F), s.appendChild(M), t.$.getElementById(t.ElemId).appendChild(i), t.$.getElementById(t.ElemId).appendChild(s), t.$.getElementById("WirteBox").style.height = t.$.getElementById(t.ElemId).offsetHeight - t.$.getElementById("TabNav").offsetHeight - 13 + "px", t.$.getElementById("writeB").addEventListener("DOMSubtreeModified", function () {
            if (t.$.getElementById("writeB").children.length < 2) {
                var e = t.$.createElement("p"), n = t.$.createElement("br");
                e.appendChild(n), t.$.getElementById("writeB").appendChild(e)
            }
        }, !1)
    }, t.getEditorHtml = function () {
        return t.$.getElementById("writeB").innerHTML
    }, t.setEditorHtml = function (e) {
        t.$.getElementById("writeB").innerHTML = "", t.$.getElementById("writeB").innerHTML = e
    }
}