new Vue({
    el: '#main',
    data: {
        total: 0,
        page: 1,
        articles: [],
        dicts: [],
        user: {},
        userClub: [],
        declare: "",
        isData: false,
        clubs: [],
        tiezi1: "的帖子",
        clubUuid: null,
        thisClub: {},
        isFatie: false,
        lEditor: {}, // 富文本编辑器
        reportUuid: "",
        isGuanzhu: "关注",
    },
    mounted: function () {
        this.init();
        this._recommend();
        this.initFuwenben();
        this.initSelfClub();
    },
    methods: {
        // 查询帖子
        // 查询字典
        // 查询用户信息
        init: function () {
            let self = this;
            self.clubUuid = getUrlParam("uuid");
            if (self.clubUuid == null) {
                location.href = "index.html";
            }
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'dict/code/like',
                type: "get",
                data: {
                    code: "like"
                },
                success: function (data) {
                    if (data.code === 200) {
                        self.dicts = data.data;
                    }
                }
            });
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'user/join/' + self.clubUuid,
                type: "post",
                success: function (data) {
                    if (data.code === 200) {
                        if (data.data === true) {
                            self.isGuanzhu = "取消关注";
                        }
                    }
                }
            });
            // 个人信息
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'user/detail',
                type: "post",
                success: function (data) {
                    if (data.code === 200) {
                        self.user = data.data;
                        self.user.headImg = imagePrefix + self.user.headImg;
                    }
                }
            });
            // 公告板
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'bulletin',
                type: "get",
                success: function (data) {
                    if (data.code === 200) {
                        self.declare = data.data.content;
                    }
                }
            });
            // 当前论坛详情
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'club/' + self.clubUuid,
                type: "get",
                success: function (data) {
                    if (data.code === 200) {
                        self.thisClub = data.data;
                        self.tiezi1 = self.thisClub.name + self.tiezi1;
                        self.thisClub.headImg = imagePrefix + self.thisClub.headImg;
                    }
                }
            });
        },
        initFuwenben: function () {
            let editor = new Editor({
                ElemId: 'inEditor',
                Height: '500'
            });
            editor.init();
            editor.FileConfig.FileImgUrl = prefix + 'upload';  //设置图片上传接口
            editor.FileConfig.FileImgPath = imagePrefix;  //
            editor.setPubConfig.dataFont.windows.push({ch: '宋体', en: 'SimSun'})//设置字体
            this.lEditor = editor;
        },
        initSelfClub: function () {
            let self = this;
            // 自己加入的贴吧
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'user/club',
                type: "get",
                data: {
                    page: 1,
                    limit: 2
                },
                success: function (data) {
                    if (data.code === 200) {
                        self.userClub = data.data;
                    }
                }
            });
        },
        _recommend: function (typeName) {
            let self = this;
            self.isFatie = false;
            if (self.clubUuid == null) {
                alert("没有找到论坛信息！");
                location.href = "index.html";
            }
            let query;
            if (typeName === 'search') {
                query = $("#query").val();
            } else {
                // 先改变所有类型标签的颜色为初始颜色
                $(".likeType").css("color", "#888");
                query = typeName;
                $("a[name=" + query + "]").css("color", "#31b0d5");
            }
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'search/search',
                type: "get",
                data: {
                    page: self.page,
                    limit: 20,
                    type: 2,
                    query: query,
                    clubUuid: self.clubUuid
                },
                success: function (data) {
                    if (data.code === 200) {
                        if (data.data.length === 0) {
                            self.isData = true;
                        }
                        for (let i = 0; i < data.data.length; i++) {
                            data.data[i].createdAt = data.data[i].createdAt.replace("T", " ").substring(0, data.data[i].createdAt.lastIndexOf('+'));
                        }
                        self.articles = data.data;
                        self.total = data.count;
                    }
                }
            });
        },
        _gotop: function () {
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            scrollBy(0, -top);
        },
        goshow: function (uuid) {
            window.open("show.html?uuid=" + uuid);
        },
        _fatie: function () {
            window.scrollTo(0, document.body.scrollHeight);
            this.isData = false;
            this.isFatie = true;
        },
        // 发布帖子
        _createArticle: function () {
            let self = this;
            let content = self.lEditor.getEditorHtml();
            // content = content.replace(new RegExp(imagePrefix,"gm"),"");
            let article = {
                clubUuid: self.thisClub.uuid,
                title: $("#articleTitle").val(),
                content: content,
                description: $("#articleDescription").val(),
                type: self.thisClub.type,
                typeName: self.thisClub.typeName
            };
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'article/create',
                type: "post",
                data: JSON.stringify(article),
                success: function (data) {
                    if (data.code === 200) {
                        alert("发布成功！");
                    } else {
                        alert("发布失败！")
                    }
                    self._recommend();
                }
            });
        },
        _logout: function () {
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'exit',
                type: "post",
                success: function (data) {
                    localStorage.removeItem(token);
                    location.href = "login.html";
                }
            });

        },
        _reportShow: function (uuid) {
            this.reportUuid = uuid;
            syalert.syopen('reportArticle');
        },
        // 举报
        _report: function () {
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'article/report',
                type: "post",
                data: {
                    uuid: this.reportUuid,
                    reportMsg: $("#reportMsg").val()
                },
                success: function (data) {
                    if (data.code === 200) {
                        alert("举报成功！")
                    } else {
                        alert("举报失败");
                    }
                    $("#reportMsg").val("");
                    syalert.syhide('reportArticle');
                }
            });
        },
        _guanzhu: function () {
            let self = this;
            if (self.isGuanzhu === "关注") {
                $.ajax({
                    headers: {
                        Authorization: localStorage.getItem(token)
                    },
                    url: prefix + 'club/add/' + self.clubUuid,
                    type: "post",
                    success: function (data) {
                        if (data.code === 200) {
                            alert("关注成功！");
                            self.isGuanzhu = "取消关注";
                        } else {
                            alert("关注失败");
                            self.isGuanzhu = "关注";
                        }
                    }
                });
            } else {
                $.ajax({
                    headers: {
                        Authorization: localStorage.getItem(token)
                    },
                    url: prefix + 'club/exit/' + self.clubUuid,
                    type: "post",
                    success: function (data) {
                        if (data.code === 200) {
                            alert("取消关注成功！");
                            self.isGuanzhu = "关注";
                        } else {
                            alert("取消关注失败");
                            self.isGuanzhu = "取消关注";
                        }
                    }
                });
            }
        }
    }

});