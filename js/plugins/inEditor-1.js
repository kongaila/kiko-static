/**
 * @authors lininging
 * @date    2019-06-11 10:17:09
 * @version v1.0
 */
function setScro(obj, text) {
    // 获取编辑框对象
    var edit = obj
    // 获取输入框对象
    // 编辑框设置焦点
    edit.focus()
    // 获取选定对象
    var selection = getSelection()
    // 判断是否有最后光标对象存在
    if (lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges()
        selection.addRange(lastEditRange)
    }
    // var Codes = document.createElement('code')
    // Codes.innerHTML=text
    // 判断选定对象范围是编辑框还是文本节点
    if (selection.anchorNode.nodeName != '#text') {
        // 如果是编辑框范围。则创建表情文本节点进行插入
        var emojiText = document.createTextNode(text)
        if (edit.childNodes.length > 0) {
            // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
            // for (var i = 0; i < edit.childNodes.length; i++) {
            //     if (i == selection.anchorOffset) {
            //         edit.insertBefore(emojiText, edit.childNodes[i])
            //     }
            // }
            document.execCommand('insertHTML', 'false', '<code>' + text + '</code>')
        } else {
            document.execCommand('insertHTML', 'false', '<code>' + text + '</code>')
            // alert()
            // 否则直接插入一个表情元素
            // edit.appendChild(emojiText)
        }
        // 创建新的光标对象
        var range = document.createRange()
        // 光标对象的范围界定为新建的表情节点
        // range.selectNodeContents(emojiText)
        // 光标位置定位在表情节点的最大长度
        range.setStart(emojiText, emojiText.length)
        // 使光标开始和光标结束重叠
        range.collapse(true);
        // 清除选定对象的所有光标对象
        selection.removeAllRanges()
        // 插入新的光标对象
        selection.addRange(range)
    } else {
        alert()
        // 如果是文本节点则先获取光标对象
        var range = selection.getRangeAt(0)
        // 获取光标对象的范围界定对象，一般就是textNode对象
        var textNode = range.startContainer;
        // 获取光标位置
        var rangeStartOffset = range.startOffset;
        // 文本节点在光标位置处插入新的表情内容
        // textNode.insertData(rangeStartOffset, '')
        document.execCommand('insertHTML', 'false', '<code>' + text + '</code>')
        // console.log(document.execCommand('insertHTML', 'false', '<code>'))
        // var codes = document.createElement('code')
        // codes.innerHTML=text
        // console.log(edit)
        // edit.appendChild(codes)
        // console.log(textNode.insertData())
        // 光标移动到到原来的位置加上新内容的长度
        // range.setStart(textNode, rangeStartOffset + text.length)
        // 光标开始和光标结束重叠
        range.collapse(true)
        // 清除选定对象的所有光标对象
        selection.removeAllRanges()
        // 插入新的光标对象
        selection.addRange(range)
    }
    lastEditRange = selection.getRangeAt(0)
}

function Editor(obj) {
    this.$ = document;
    this.ElemId = obj.ElemId;
    this.Height = obj.Height;
    var _this = this;
    _this.FileConfig = {
        FileImgPath: '/',
        FileImgUrl: 'https://www.baidu.com'
    },
        _this.setPubConfig = {
            fontsize: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'xxx-large'],
            dataFont: {
                windows: [{
                    ch: '宋体',
                    en: 'SimSun'
                }, {
                    ch: '黑体',
                    en: 'SimHei'
                }, {
                    ch: '微软雅黑',
                    en: 'Microsoft Yahei'
                }, {
                    ch: '楷体',
                    en: 'KaiTi'
                },
                    {
                        ch: 'Airal',
                        en: 'Airal'
                    }]
            },
            Fongcolor: ['#000', '#444', '#666', '#888', '#ff1100', '#f600ff', '#0012ff', '#00fffc', '#00ff2a', '#fcff00', '#ffa200', '#ff4200', '#fff', '#744389', '#71573c', '#109480']
        },
        _this.init = function () {
            var style = _this.$.createElement('link');
            style.href = '/css/font-awesome.min2.css';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            var style2 = _this.$.createElement('style');
            style2.type2 = 'text/css';
            style2.innerHTML = "#writeB img{max-width:100%}.fa:hover{color:#000 !important}.TfontH button:hover{background:#f1f1f1 !important}.FontZis button:hover{background:#f1f1f1 !important}.FontFam button:hover{background:#f1f1f1 !important}.Ahove:hover{background:#f1f1f1 !important}.ylB p{font-size:14px;}.ylB img{max-width:100%}.Linhe button:hover{background:#f1f1f1 !important}a.fa-close:link{text-decoration: none;color:#fff}a.fa-close:hover{color:#fff !important}";
            _this.$.getElementsByTagName('HEAD').item(0).appendChild(style2);
            _this.$.getElementsByTagName('HEAD').item(0).appendChild(style);
            _this.$.getElementById(_this.ElemId).style.cssText = 'width:100%;height:' + _this.Height + 'px;border:1px solid #ccc;border-radius:3px;overflow:hidden;box-sizing:border-box;position:initial;overflow:hidden;background:#fff'
            var a = _this.$.createElement('div')
            a.setAttribute('id', 'TabNav')
            a.style.cssText = 'width:100%;min-height:25px;background:#fff;box-sizing:border-box;border-bottom:1px solid #ccc;position:relative'
            var k = _this.$.createElement('div')
            k.style.cssText = 'width:70px;background:#fff;position:absolute;top:30px;left:-3px;border:1px solid #eee;text-align:center;color:#444;z-index:9;display:none;cursor:pointer'
            k.setAttribute('class', 'TfontH')
            var l = _this.$.createElement('button')
            l.innerHTML = 'H1'
            l.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:24px;cursor:pointer'
            l.setAttribute('title', 'H1')
            l.onclick = function () {
                document.execCommand('formatBlock', 'true', '<h1>');
                k.style.display = 'none'
            }
            var z = _this.$.createElement('button')
            z.innerHTML = 'H2'
            z.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:22px;cursor:pointer'
            z.setAttribute('title', 'H2')
            z.onclick = function () {
                document.execCommand('formatBlock', 'false', '<h2>');
                k.style.display = 'none'
            }
            var x = _this.$.createElement('button')
            x.innerHTML = 'H3'
            x.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:20px;cursor:pointer'
            x.setAttribute('title', 'H3')
            x.onclick = function () {
                document.execCommand('formatBlock', 'false', '<h3>');
                k.style.display = 'none'
            }
            var c = _this.$.createElement('button')
            c.innerHTML = 'H4'
            c.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:18px;cursor:pointer'
            c.setAttribute('title', 'H4')
            c.onclick = function () {
                document.execCommand('formatBlock', 'false', '<h4>');
                k.style.display = 'none'
            }
            var v = _this.$.createElement('button')
            v.innerHTML = 'H5'
            v.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:16px;cursor:pointer'
            v.setAttribute('title', 'H5')
            v.onclick = function () {
                document.execCommand('formatBlock', 'false', '<h5>');
                k.style.display = 'none'
            }
            var b = _this.$.createElement('button')
            b.innerHTML = '正文'
            b.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer'
            b.setAttribute('title', '正文')
            b.onclick = function () {
                document.execCommand('formatBlock', 'false', '<p>');
                k.style.display = 'none'
            }
            k.appendChild(l);
            k.appendChild(z);
            k.appendChild(x);
            k.appendChild(c);
            k.appendChild(v);
            k.appendChild(b)
            var q1 = _this.$.createElement('div')
            q1.style.cssText = 'width:87px;background:#fff;position:absolute;top:30px;left:9px;border:1px solid #eee;text-align:center;color:#444;z-index:9;cursor:pointer;display:none'
            q1.setAttribute('class', 'FontZis')
            for (let i = 0; i < _this.setPubConfig.fontsize.length; i++) {
                var w1 = _this.$.createElement('button')
                w1.innerHTML = _this.setPubConfig.fontsize[i]
                w1.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer'
                w1.onclick = function () {
                    document.execCommand('fontSize', 'false', i + 1);
                    q1.style.display = 'none'
                }
                q1.appendChild(w1)
            }
            var q3 = _this.$.createElement('div')
            q3.style.cssText = 'width:174px;background:#fff;position:absolute;top:30px;left:155px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;display:none'
            q3.setAttribute('class', 'Fongcolor')
            var Fongcolor = ['#000', '#444', '#666', '#888', '#ff1100', '#f600ff', '#0012ff', '#00fffc', '#00ff2a', '#fcff00', '#ffa200', '#ff4200', '#fff', '#744389', '#71573c', '#109480']
            for (let i = 0; i < _this.setPubConfig.Fongcolor.length; i++) {
                var w3 = _this.$.createElement('button')
                w3.style.cssText = 'width:25px;height:25px;margin:0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer;background:' + _this.setPubConfig.Fongcolor[i] + ';margin:2px'
                w3.onclick = function () {
                    document.execCommand('foreColor', 'false', _this.setPubConfig.Fongcolor[i]);
                    q3.style.display = 'none'
                }
                q3.appendChild(w3)
            }
            var q4 = _this.$.createElement('div')
            q4.style.cssText = 'width:174px;background:#fff;position:absolute;top:30px;left:187px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;display:none'
            q4.setAttribute('class', 'fontBcolor')
            var Fongcolor = ['#000', '#444', '#666', '#888', '#ff1100', '#f600ff', '#0012ff', '#00fffc', '#00ff2a', '#fcff00', '#ffa200', '#ff4200', '#fff', '#744389', '#71573c', '#109480']
            for (let i = 0; i < Fongcolor.length; i++) {
                var w4 = _this.$.createElement('button')
                w4.style.cssText = 'width:25px;height:25px;margin:0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer;background:' + Fongcolor[i] + ';margin:2px;'
                w4.onclick = function () {
                    document.execCommand('backColor', 'false', Fongcolor[i]);
                    q4.style.display = 'none'
                }
                q4.appendChild(w4)
            }


            var q5 = _this.$.createElement('div')
            q5.style.cssText = 'width:218px;background:#fff;position:absolute;top:30px;left:370px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;padding:5px;display:none'
            var w5 = _this.$.createElement('input')
            w5.setAttribute('placeholder', '链接描述')
            var w6 = _this.$.createElement('input')
            w6.setAttribute('placeholder', 'http://')
            w5.style.cssText = 'width:98%;height:20px;margin:2px 0;padding-left:4px;font-size:14px;color:#666;border:0;outline:none;border-bottom:1px solid #1e88e5;margin-top:4px;;'
            w6.style.cssText = 'width:98%;height:20px;margin-top:5px;padding-left:4px;font-size:14px;color:#666;border:0;border-bottom:1px solid #1e88e5;outline:none'
            var w7 = _this.$.createElement('button')
            w7.innerHTML = '插入'
            w7.setAttribute('class', 'Ahove')
            w7.style.cssText = 'padding:3px 5px;font-size:14px;color:#1e88e5;float:right;margin-top:4px;border-radius:3px;outline:none;border:none;background:#fff;cursor:pointer'
            w7.onclick = function () {
                document.getElementById("writeB").focus()
                document.execCommand("insertHTML", false, "<a href=" + w6.value + " target='_back' style='font-size:14px;'>" + w5.value + "</a>")
                q5.style.display = 'none'
            }
            q5.appendChild(w5)
            q5.appendChild(w6)
            q5.appendChild(w7)
            var q6 = _this.$.createElement('div')
            q6.style.cssText = 'width:60px;background:#fff;position:absolute;top:30px;left:380px;border:1px solid #eee;text-align:center;color:#444;z-index:9;cursor:pointer;display:none'
            q6.setAttribute('class', 'Linhe')
            var Linhti = [14, 18, 22, 26, 30]
            for (let i = 0; i < Linhti.length; i++) {
                var wt1 = _this.$.createElement('button')
                wt1.innerHTML = Linhti[i]
                wt1.style.cssText = 'width:100%;margin:0;padding:10px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer'
                wt1.onclick = function () {
                    if (window.getSelection) {
                        var sel = window.getSelection();
                        if (sel.rangeCount > 0) {
                            if (sel.getRangeAt(0).commonAncestorContainer.parentElement.getAttribute('id') != 'writeB') {
                                sel.getRangeAt(0).commonAncestorContainer.parentElement.style.lineHeight = Linhti[i] + 'px'
                            }
                        }
                    } else if (document.selection) {
                        console.log(document.selection.createRange())
                        return document.selection.createRange();
                    }
                    q6.style.display = 'none'
                }
                q6.appendChild(wt1)
            }
            // code
            var q8 = _this.$.createElement('div')
            q8.style.cssText = 'width:auto;background:#fff;position:absolute;top:30px;left:345px;border:1px solid #eee;color:#444;z-index:9;cursor:pointer;padding:10px 10px 2px 10px;display:none'
            var w8 = _this.$.createElement('p')
            w8.innerHTML = '输入代码'
            w8.style.cssText = 'padding:0;margin:0;font-size:14px;color:#666'
            var w9 = _this.$.createElement('textarea')
            w9.style.cssText = 'width:330px;box-sizing:border-box;margin-top:5px;font-family:"Microsoft Yahei";display:block'
            w9.setAttribute('rows', '7')
            var w10 = _this.$.createElement('button')
            w10.innerHTML = '插入'
            w10.setAttribute('class', 'Ahove')
            w10.style.cssText = 'padding:3px 5px;font-size:14px;color:#1e88e5;float:right;margin-top:4px;border-radius:3px;outline:none;border:none;background:#fff;cursor:pointer;'
            w10.onclick = function () {
                setScro(_this.$.getElementById('writeB'), w9.value)
                // _this.$.getElementById('writeB').focus()
                // setCurPos(_this.$.getElementById('writeB'),5)
                // document.execCommand('insertHTML', 'false', '<code>'+w9.value+'</code>')
            }
            q8.appendChild(w8)
            q8.appendChild(w9)
            q8.appendChild(w10)
            var EditorConfig = {
                Arrd: [
                    {'ClassName': 'fa fa-header', 'Title': '设置标题', 'Elid': ''},
                    {'ClassName': 'fa fa-text-height', 'Title': '字体大小', 'Elid': ''},
                    {'ClassName': 'fa fa fa-font', 'Title': '设置字体', 'Elid': ''},
                    {'ClassName': 'fa fa-bold', 'Title': '加粗', 'Elid': ''},
                    {'ClassName': 'fa fa-italic', 'Title': '斜体', 'Elid': ''},
                    {'ClassName': 'fa fa-underline', 'Title': '下划线', 'Elid': ''},
                    {'ClassName': 'fa fa-strikethrough', 'Title': '删除线', 'Elid': ''},
                    {'ClassName': 'fa fa-pencil', 'Title': '字体颜色', 'Elid': ''},
                    {'ClassName': 'fa fa-paint-brush', 'Title': '背景颜色', 'Elid': ''},
                    {'ClassName': 'fa fa-align-left', 'Title': '左对齐', 'Elid': ''},
                    {'ClassName': 'fa fa-align-center', 'Title': '居中', 'Elid': ''},
                    {'ClassName': 'fa fa-align-right', 'Title': '右对齐', 'Elid': ''},
                    {'ClassName': 'fa fa-sort-numeric-asc', 'Title': '行间距', 'Elid': ''},
                    {'ClassName': 'fa fa-link', 'Title': '超链接', 'Elid': ''},
                    {'ClassName': 'fa fa-list-ul', 'Title': '无序列表', 'Elid': ''},
                    {'ClassName': 'fa fa-list-ol', 'Title': '有序列表', 'Elid': ''},
                    {'ClassName': 'fa fa-table', 'Title': '表格', 'Elid': ''},
                    {'ClassName': 'fa fa-code', 'Title': '代码', 'Elid': ''},
                    {'ClassName': 'fa fa-image', 'Title': '图片', 'Elid': ''},
                    // {'ClassName': 'fa fa-video-camera', 'Title': '视频', 'Elid': ''},
                    // {'ClassName': 'fa fa-music', 'Title': '音频', 'Elid': ''},
                    // {'ClassName': 'fa fa-paperclip', 'Title': '附件', 'Elid': ''},
                    {'ClassName': 'fa fa-eraser', 'Title': '清空', 'Elid': ''},
                    {'ClassName': 'fa fa-file-text-o', 'Title': '预览', 'Elid': ''},
                    {'ClassName': 'fa fa-arrows-alt', 'Title': '全屏', 'Elid': ''}
                ]
            }
            for (let i = 0; i < EditorConfig.Arrd.length; i++) {
                var b = _this.$.createElement('button')
                b.setAttribute('class', EditorConfig.Arrd[i].ClassName)
                b.setAttribute('title', EditorConfig.Arrd[i].Title)
                if (i == 18) {
                    b.setAttribute('id', 'ImgFileEd')
                    var inputObj = document.createElement('input')
                    inputObj.setAttribute('id', '_ef');
                    inputObj.setAttribute('type', 'file');
                    inputObj.setAttribute('accept', 'image/gif,image/jpeg,image/jpg,image/png,image/svg');
                    inputObj.setAttribute("style", 'opacity:0;width:20.5px;height:18px;margin:0px 0 0 -17px');
                    b.appendChild(inputObj);
                    inputObj.onchange = function () {
                        console.log(this.files[0]);
                        console.log(_this.FileConfig.FileImgUrl);
                        var form = new FormData();
                        form.append("uploadFile", this.files[0]);
                        var xhr = new XMLHttpRequest();
                        xhr.open("post", _this.FileConfig.FileImgUrl, true);
                        xhr.setRequestHeader("Authorization", localStorage.getItem(token));
                        xhr.responseType = "text";
                        xhr.send(form);
                        console.log("444" + xhr.responseText);
                        // xhr.onload = function(e){
                        // 	console.log("444" + e.data)
                        // 	console.log("444" + e)
                        // 	console.log("444" + e.target.response)
                        // 	// var data = JSON.parse(e.target.responseText);
                        // 	// if(data.statuCode==200){
                        // 	// 	var ImgFileUrl = data.imgurl
                        // 	// 	_this.$.getElementById('writeB').focus()
                        // 	// 	document.execCommand("insertImage",'false',_this.FileConfig.FileImgPath+ImgFileUrl)
                        // 	// }
                        // };
                        xhr.onload = function (e) {
                            let responseText = e.target.responseText;
                            if (responseText !== "") {
                                let data = JSON.parse(responseText);
                                console.log(data);
                                if (data.code === 200) {
                                    let ImgFileUrl = data.data;
                                    _this.$.getElementById('writeB').focus();
                                    document.execCommand("insertImage", 'false', _this.FileConfig.FileImgPath + ImgFileUrl)
                                }
                            }
                        };
                        xhr.onerror = function (e) {
                            alert('图片上传出现错误！')
                        }
                    }
                }
                b.style.cssText = 'font-size:14px;padding:8px 10px;position:relative;color:#999;cursor:pointer;outline:none;background:#fff;border:0;'
                var q2 = _this.$.createElement('div')
                q2.style.cssText = 'width:70px;background:#fff;position:absolute;top:30px;left:50px;border:1px solid #eee;text-align:center;color:#444;z-index:9;cursor:pointer;'
                q2.setAttribute('class', 'FontFam')
                b.onmouseover = function () {
                    i == 0 ? k.style.display = 'block' : k.style.display = 'none'
                    i == 1 ? q1.style.display = 'block' : q1.style.display = 'none'
                    if (i == 2) {
                        q2.innerHTML = ''
                        q2.style.display = 'block'
                        for (let i = 0; i < _this.setPubConfig.dataFont.windows.length; i++) {
                            var w2 = _this.$.createElement('button')
                            w2.innerHTML = _this.setPubConfig.dataFont.windows[i].ch
                            w2.style.cssText = 'width:100%;margin:0;padding:6px 0;outline:none;border:0;background:#fff;font-size:14px;cursor:pointer'
                            w2.onclick = function () {
                                document.execCommand('fontName', 'false', _this.setPubConfig.dataFont.windows[i].en);
                                q2.style.display = 'none'
                            }
                            q2.appendChild(w2)
                        }
                        a.appendChild(q2)
                    } else {
                        q2.style.display = 'none'
                    }
                    i == 7 ? q3.style.display = 'block' : q3.style.display = 'none'
                    i == 8 ? q4.style.display = 'block' : q4.style.display = 'none'
                    i == 12 ? q6.style.display = 'block' : q6.style.display = 'none'
                }
                b.addEventListener('click', onclickBtn, false)

                function onclickBtn() {
                    let iss = 1
                    q5.style.display = 'none'
                    if (i == 0) {

                    } else if (i == 3) {
                        document.execCommand('bold', false, null)
                    } else if (i == 4) {
                        document.execCommand('Italic', false, null)
                    } else if (i == 5) {
                        document.execCommand('Underline', false, null)
                    } else if (i == 6) {
                        document.execCommand('StrikeThrough', false, null)
                    } else if (i == 9) {
                        document.execCommand('JustifyLeft', false, null)
                    } else if (i == 10) {
                        document.execCommand('JustifyCenter', false, null)
                    } else if (i == 11) {
                        document.execCommand('JustifyRight', false, null)
                    } else if (i == 12) {

                    } else if (i == 13) {
                        q5.style.display = 'block'
                    } else if (i == 14) {
                        document.execCommand("insertUnorderedList")
                    } else if (i == 15) {
                        document.execCommand("insertOrderedList")
                    } else if (i == 17) {
                        q8.style.display = 'block'
                        // console.log(getSelection().focusOffset)
                    } else if (i == 20) {
                        var r1 = _this.$.createElement('div')
                        r1.style.cssText = 'width:100%;height:100%;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:99999999999999999'
                        r1.setAttribute('class', 'ylB')
                        var y1 = _this.$.createElement('div')
                        y1.style.cssText = 'width:45%;height:95%;background:#fff;margin:20px auto;border-radius:2px;'
                        var y2 = _this.$.createElement('div')
                        y2.style.cssText = 'width:100%;height:5%;background:#0e90d2;padding:0 10px;text-align:center;position:relative;line-height:240%;box-sizing:border-box;font-size:15px;color:#fff;font-weight:bold'
                        y2.innerHTML = '效果预览'
                        var y3 = _this.$.createElement('a')
                        y3.setAttribute('href', 'javascript:;')
                        y3.setAttribute('class', 'fa fa-close')
                        y3.style.cssText = 'width:25px;height:25px;position:absolute;top:8px;right:10px;color:#fff;font-size:20px'
                        y3.onclick = function () {
                            r1.remove()
                        }
                        var y4 = _this.$.createElement('div')
                        y4.style.cssText = 'width:100%;height:94%;overflow-x:auto;padding:0 10px;box-sizing:border-box'
                        y4.innerHTML = _this.$.getElementById('writeB').innerHTML
                        var y5 = _this.$.createElement('div')
                        y5.style.cssText = 'width:100%;height:1%'
                        y2.appendChild(y3)
                        y1.appendChild(y2)
                        y1.appendChild(y4)
                        y1.appendChild(y5)
                        r1.appendChild(y1)
                        _this.$.body.appendChild(r1)
                    } else if (i == 21) {
                        if (_this.$.getElementById(_this.ElemId).style.position == 'initial') {
                            _this.$.getElementById(_this.ElemId).style.position = "fixed"
                            _this.$.getElementById(_this.ElemId).style.left = "0px"
                            _this.$.getElementById(_this.ElemId).style.top = "0px"
                            _this.$.getElementById(_this.ElemId).style.height = "100%"
                            _this.$.getElementById(_this.ElemId).style.zIndex = "9999999999"
                            _this.$.getElementById('WirteBox').style.height = '97%'
                            iss = 2
                        } else {
                            _this.$.getElementById(_this.ElemId).style.position = "initial"
                            _this.$.getElementById(_this.ElemId).style.zIndex = "99"
                            _this.$.getElementById(_this.ElemId).style.height = _this.Height + 'px'
                            _this.$.getElementById('WirteBox').style.height = _this.$.getElementById(_this.ElemId).offsetHeight - _this.$.getElementById('TabNav').offsetHeight - 13 + 'px'
                            iss = 1
                        }

                    }
                    return false
                }

                a.appendChild(b)
                a.appendChild(q1)
                a.appendChild(q3)
                a.appendChild(q4)
                a.appendChild(q5)
                a.appendChild(q6)
                a.appendChild(q8)
            }
            a.appendChild(k)
            _this.$.getElementById(_this.ElemId).style.height
            var c = _this.$.createElement('div')
            c.setAttribute('id', 'WirteBox')
            c.style.cssText = 'overflow:auto;'
            var d = _this.$.createElement('p')
            c.onmouseover = function () {
                k.style.display = 'none'
                q1.style.display = 'none'
                q2.style.display = 'none'
                q3.style.display = 'none'
                q4.style.display = 'none'
                q6.style.display = 'none'
            }
            c.onclick = function () {
                q5.style.display = 'none'
                q8.style.display = 'none'
                // 获取选定对象
                var selection = getSelection()
                // 设置最后光标对象
                lastEditRange = selection.getRangeAt(0)
            }
            c.onkeyup = function () {
                // 获取选定对象
                var selection = getSelection()
                // 设置最后光标对象
                lastEditRange = selection.getRangeAt(0)
                console.log(lastEditRange)
            }
            d.innerHTML = '在此编辑文章内容'
            var e = _this.$.createElement('div')
            var f = _this.$.createElement('p')
            var g = _this.$.createElement('br')
            e.setAttribute('contenteditable', 'true')
            e.setAttribute('id', 'writeB')
            e.style.cssText = 'width:100%;height:97%;outline:none;font-size:13px;padding:0px 10px;box-sizing:border-box'
            e.appendChild(d)
            f.appendChild(g)
            e.appendChild(f)
            c.appendChild(e)
            _this.$.getElementById(_this.ElemId).appendChild(a)
            _this.$.getElementById(_this.ElemId).appendChild(c)
            _this.$.getElementById('WirteBox').style.height = _this.$.getElementById(_this.ElemId).offsetHeight - _this.$.getElementById('TabNav').offsetHeight - 13 + 'px'
            _this.$.getElementById('writeB').addEventListener('DOMSubtreeModified', function () {
                if (_this.$.getElementById('writeB').children.length < 2) {
                    var h = _this.$.createElement('p')
                    var j = _this.$.createElement('br')
                    h.appendChild(j)
                    _this.$.getElementById('writeB').appendChild(h)
                }
            }, false);
        },
        _this.getEditorHtml = function () {
            return _this.$.getElementById('writeB').innerHTML
        },
        _this.setEditorHtml = function (elem) {
            _this.$.getElementById('writeB').innerHTML = ''
            _this.$.getElementById('writeB').innerHTML = elem
        }
}
