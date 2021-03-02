new Vue({
    el: '#main',
    data: {
    },
    mounted: function () {
        this._check();
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
                userName:$("#regUserName").val(),
                pass:$("#regPass").val(),
                nick:$("#regNick").val(),
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
    }

});