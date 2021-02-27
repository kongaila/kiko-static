new Vue({
    el: '#main',
    data: {
        headImg:"",
    },
    mounted: function () {
        this._check();
        this.uploadClubHeadImg();
    },
    methods: {
        // 选择登录或者注册按钮
        _check: function () {
            document.querySelector('.img__btn').addEventListener('click', function () {
                document.querySelector('.content').classList.toggle('s--signup')
            });
        },
        _login: function () {
            let json = JSON.stringify($('#login').serializeJSON());
            $.ajax({
                headers: {
                    Authorization: localStorage.getItem(token)
                },
                url: prefix + 'login',
                type: "post",
                dataType: "json",
                data: json,
                success: function (data) {
                    if (data.code === 200) {
                        localStorage.setItem(token, data.data);
                        location.href = 'index.html';
                    } else {
                        $('#msg').html(data.msg)
                    }
                }
            })
        },
        _register: function () {
            let user = {
                userName:$("#userName").val(),
                pass:$("#pass").val(),
                nick:$("#nick").val(),
                headImg:this.headImg
            };
            $.ajax({
                headers: {
                    Authorization: token
                },
                url: prefix + 'register',
                type: "post",
                dataType: "json",
                data: JSON.stringify(user),
                success: function (data) {
                    if (data.code === 200) {
                        alert("注册成功！请登录");
                    } else {
                        $('#registerMsg').html(data.msg)
                    }
                }
            })
        },
        uploadClubHeadImg: function () {
            let self = this;
            $("#headImg").change(function () {
                let file = $("#headImg")[0].files[0];
                if (!self.checkFile("headImg", 3)) {
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
                        self.headImg = data.data;
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
        }
    }

});