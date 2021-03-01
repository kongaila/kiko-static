new Vue({
    el: '#main',
    data: {
        total: 0,
        page: 1,
        user: {},
        declare: "",
        clubs: [],
        clubUuid: null,
        thisArticle: {},
        master: {},
        comments: [],
        commentUuid: "",
        isYiji: false,
        thisArticleUuid: "",
    },
    mounted: function () {
        this.init();
        this.initComment();
    },
    methods: {
        // 查询用户信息
        init: function () {
            let self = this;
            let uuid = getUrlParam("uuid");
            if (uuid == null || uuid === "") {
                alert("缺少文章uuid!");
                location.href = "index.html";
            }
            self.thisArticleUuid = uuid;
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
            // 查看帖子
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'article/' + uuid,
                type: "get",
                success: function (data) {
                    if (data.code === 200) {
                        self.thisArticle = data.data.article;
                        self.master = data.data.master;
                        self.master.headImg = imagePrefix + self.master.headImg;
                        self.thisArticle.createdAt = self.thisArticle.createdAt.replace("T", " ").substring(0, self.thisArticle.createdAt.lastIndexOf('+'));
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
        initComment: function () {
            let self = this;
            // 查看评论
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'comment/many',
                type: "get",
                data: {
                    articleUuid: self.thisArticleUuid,
                    page: 1,
                    limit: 9999
                },
                success: function (data) {
                    if (data.code === 200) {
                        for (let i = 0; i < data.data.length; i++) {
                            data.data[i].user.headImg = imagePrefix + data.data[i].user.headImg;
                            data.data[i].createdAt = data.data[i].createdAt.replace("T", " ").substring(0, data.data[i].createdAt.lastIndexOf('+'));
                            if (data.data[i].sonComment !== undefined) {
                                for (let j = 0; j < data.data[i].sonComment.length; j++) {
                                    data.data[i].sonComment[j].createdAt = data.data[i].sonComment[j].createdAt.replace("T", " ").substring(0, data.data[i].sonComment[j].createdAt.lastIndexOf('+'));
                                    data.data[i].sonComment[j].user.headImg = imagePrefix +  data.data[i].sonComment[j].user.headImg;
                                }
                            }
                        }
                        self.comments = data.data;
                    }
                }
            });
        },
        _gotop: function () {
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            scrollBy(0, -top);
        },
        // 评论打开
        _commentShow: function (uuid) {
            if (uuid == null) {
                // 说明一级评论
                this.isYiji = true;
            } else {
                this.isYiji = false;
                this.commentUuid = uuid;
            }
            syalert.syopen('comment');
        },
        _comment: function () {
            let self = this;
            let comment = {};
            if (self.isYiji) {
                comment.type = 1;
            } else {
                comment.type = 2;
                comment.pUuid = self.commentUuid;
            }
            comment.articleUuid = self.thisArticle.uuid;
            comment.content = $("#commentContent").val();
            comment.articleTitle = self.thisArticle.title;
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'comment/create',
                type: "post",
                data: JSON.stringify(comment),
                success: function (data) {
                    if (data.code === 200) {
                        alert("回复成功！")
                    } else {
                        alert("回复失败！")
                    }
                    $("#commentContent").val("");
                    self.initComment();
                    syalert.syhide('comment')
                },
                error: function (e) {
                    $("#commentContent").val("");
                    syalert.syhide('comment')
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
        _like: function (uuid) {
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'comment/like/' + uuid,
                type: "post",
                success: function (data) {
                    alert("点赞成功！");
                    let text = $("#" + uuid).text();
                    let number = parseInt(text,10);
                    number += 1;
                    $("#" + uuid).text(number);
                }
            });

        },
    }

});