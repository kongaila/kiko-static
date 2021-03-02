new Vue({
    el: '#main',
    data: {
        total: 0,
        page: 1,
        articles: [],
        user: {},
        declare: "",
        isData: false,
        isClub: true, // 默认显示论坛
        isArticle: false,
        isComment: false,
        clubs: [],
        comments: [],
        headImg: "",
    },
    mounted: function () {
        this.initUser();
        this.init();
        this._menu(2);
        this.uploadHeadImg();
    },
    methods: {
        // 查询帖子
        // 查询字典
        // 查询用户信息
        init: function () {
            let self = this;
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
        initUser: function () {
            let self = this;
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
        },
        _menu: function (type) {
            let self = this;
            self.isData = false;
            $(".selfMenu").css("color", "#888");
            switch (type) {
                case 1:
                    $("a[name=selfInfo]").css("color", "#31b0d5");
                    self.isClub = false;
                    self.isArticle = false;
                    self.isComment = false;
                    syalert.syopen('updateUser');
                    break;
                case 2:
                    $("a[name=selfClub]").css("color", "#31b0d5");
                    self.isClub = true;
                    self.isArticle = false;
                    self.isComment = false;
                    $.ajax({
                        headers: {
                            Authorization: localStorage.getItem(token)
                        },
                        url: prefix + 'user/club',
                        type: "get",
                        data: {
                            page: 1,
                            limit: 999999,
                        },
                        success: function (data) {
                            if (data.code === 200) {
                                if (data.data.length === 0) {
                                    self.isData = true;
                                }
                                for (let i = 0; i < data.data.length; i++) {
                                    data.data[i].createdAt = data.data[i].createdAt.replace("T", " ").substring(0, data.data[i].createdAt.lastIndexOf('+'));
                                    data.data[i].clubHeadImg = imagePrefix + data.data[i].clubHeadImg;
                                }
                                self.clubs = data.data;
                            }
                        }
                    });
                    break;
                case 3:
                    $("a[name=selfArticle]").css("color", "#31b0d5");
                    self.isClub = false;
                    self.isArticle = true;
                    self.isComment = false;
                    $.ajax({
                        headers: {
                            Authorization: localStorage.getItem(token)
                        },
                        url: prefix + 'user/article',
                        type: "get",
                        data: {
                            page: 1,
                            limit: 999999,
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
                            }
                        }
                    });
                    break;
                case 4:
                    $("a[name=selfComment]").css("color", "#31b0d5");
                    self.isClub = false;
                    self.isArticle = false;
                    self.isComment = true;
                    $.ajax({
                        headers: {
                            Authorization: localStorage.getItem(token)
                        },
                        url: prefix + 'user/comment',
                        type: "get",
                        data: {
                            page: 1,
                            limit: 999999,
                        },
                        success: function (data) {
                            if (data.code === 200) {
                                if (data.data.length === 0) {
                                    self.isData = true;
                                }
                                for (let i = 0; i < data.data.length; i++) {
                                    data.data[i].createdAt = data.data[i].createdAt.replace("T", " ").substring(0, data.data[i].createdAt.lastIndexOf('+'));
                                }
                                self.comments = data.data;
                            }
                        }
                    });
                    break;
            }

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
        uploadHeadImg: function () {
            let self = this;
            $("#headImg").change(function () {
                let file = $("#headImg")[0].files[0];
                if (!self.checkFile("headImg", 10)) {
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
                        if (data.code === 200) {
                            self.headImg = data.data;
                            // 图片回显
                            let imgAddr = imagePrefix + self.headImg;
                            $("#headImgShow").remove();
                            $("#alertUserForm").append("<img id='headImgShow' style='width: 85px;height: 85px' src='" + imgAddr + "' alt=''>");
                        }
                    }
                });

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
        _updateUser: function () {
            let self = this;
            let user = {
                nick: $("#nick").val(),
                headImg: self.headImg,
                phone: $("#phone").val(),
            };
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'user/info',
                type: "post",
                data: JSON.stringify(user),
                success: function (data) {
                    if (data.code === 200) {
                        alert("修改成功！");
                        self.initUser();
                    } else {
                        alert("修改失败！");
                    }
                    syalert.syhide('updateUser');
                    self._menu(2);
                }
            });
            $('#updateUserForm')[0].reset();
            $("#headImgShow").remove();
        },
    }

});