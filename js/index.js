new Vue({
    el: '#main',
    data: {
        total: 0,
        page: 1,
        articles: [],
        dicts: [],
        user: {},
        userClub: [],
        tops: [],
        topNum: 0,
        declare: "",
        isData: false,
        isClub: false,
        clubs: [],
        tiezi1: "推荐主题帖",
        luntan1: "论坛列表",
        tiezi2: "→查看论坛列表",
        luntan2: "→查看推荐主题帖",
        clubHeadImg: "",
    },
    mounted: function () {
        this.init();
        this._recommend();
        this.uploadClubHeadImg();
    },
    methods: {
        // 查询帖子
        // 查询字典
        // 查询用户信息
        init: function () {
            let self = this;
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
            // 热榜
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'top',
                type: "get",
                success: function (data) {
                    if (data.code === 200) {
                        if (data.data != null) {
                            self.topNum = data.data[0].num;
                        }
                        self.tops = data.data;
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
        },
        _recommend: function (typeName) {
            let self = this;
            self.isData = false;
            let query;
            if (typeName === 'search') {
                query = $("#query").val();
            } else {
                // 先改变所有类型标签的颜色为初始颜色
                $(".likeType").css("color", "#888");
                query = typeName;
                $("a[name=" + query + "]").css("color", "#31b0d5");
            }
            let type = self.isClub ? 3 : 2;
            let limit = self.isClub ? 99999 : 20;
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'search/search',
                type: "get",
                data: {
                    page: self.page,
                    limit: limit,
                    type: type, // 帖子
                    query: query
                },
                success: function (data) {
                    if (data.code === 200) {
                        if (data.data.length === 0) {
                            self.isData = true;
                        }
                        for (let i = 0; i < data.data.length; i++) {
                            data.data[i].createdAt = data.data[i].createdAt.replace("T", " ").substring(0, data.data[i].createdAt.lastIndexOf('+'));
                            if (self.isClub) {
                                data.data[i].headImg = imagePrefix + data.data[i].headImg;
                            }
                        }
                        if (self.isClub) {
                            self.clubs = data.data;
                            console.log(self.clubs)
                        } else {
                            self.articles = data.data;
                        }
                        self.total = data.count;
                        // setTimeout(function () {
                        //     $(".content").render("div");
                        // }, 150);
                        // // $(".content").render();
                        // self.render()
                    }
                }
            });
        },
        setPage: function () {
        },
        _gotop: function () {
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            scrollBy(0, -top);
        },
        goshow: function (uuid) {
            window.open("show.html?uuid=" + uuid);
        },
        goclub: function (uuid) {
            window.open("club.html?uuid=" + uuid);
        },
        // 创建贴吧
        _createClub: function () {
            let self = this;
            let type = "";
            let typeName = "";
            $(".createClubClass:checked").each(function () {
                type += $(this).val() + ",";
                typeName += $(this).attr("name") + ",";
            });
            let club = {
                name: $("#clubName").val(),
                headImg: this.clubHeadImg,
                description: $("#clubDescription").val(),
                type: type.substring(0, type.lastIndexOf(',')),
                typeName: typeName.substring(0, typeName.lastIndexOf(','))
            };
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + "club/create",
                type: 'post',
                data: JSON.stringify(club),
                success: function (data) {
                    if (data.code === 200) {
                        alert("创建成功");
                    } else {
                        alert("创建失败");
                    }
                    self.isClub = true;
                    self._recommend();
                    syalert.syhide('createClub')
                }
            });
        },
        _changeType: function () {
            this.isClub = !this.isClub;
            this._recommend()
        },
        uploadClubHeadImg: function () {
            let self = this;
            $("#clubHeadImg").change(function () {
                let file = $("#clubHeadImg")[0].files[0];
                if (!self.checkFile("clubHeadImg", 3)) {
                    return;
                }
                let formData = new FormData();
                formData.append("uploadFile", file);
                $.ajax({
                    headers: {
                        Authorization: localStorage.getItem(token)
                    },
                    contentType: false,//使用form的enctype
                    url: prefix + "upload", /*接口域名地址*/
                    type: 'post',
                    data: formData,
                    processData: false,
                    success: function (data) {
                        self.clubHeadImg = data.data;
                    }
                })
            });
        },
        checkFile: function (uploadFileId, maxSize) {
            let file = $("#" + uploadFileId);
            let suffix = ".jpg,.png,.gif,.jpeg";
            if (suffix) {
                let arr = suffix.split(',');
                let fileName = file.val();
                let fileSuffix = fileName.substr(fileName.lastIndexOf('.'));
                if ($.inArray(fileSuffix.toLowerCase(), arr) < 0) {
                    alert('文件格式不正确');
                    return false;
                }
            }
            if (file.get(0).files[0].size > 1024 * 1024 * maxSize) {
                alert('文件不能大于' + maxSize + 'M');
                return false;
            }
            return true;
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
        _repostShow:function () {
            syalert.syopen('reportArticle');
        },
        // 举报
        _report:function () {
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'article/report',
                type: "post",
                success: function (data) {
                    if (data.code === 200) {
                        alert("举报成功！")
                    } else {
                        alert("举报失败");
                    }
                    syalert.syhide('reportArticle');
                }
            });
        }

    }

});