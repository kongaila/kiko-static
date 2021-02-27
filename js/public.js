const ctx = window.location.host;
const imagePrefix = "http://" + ctx + ":8000/images/";
const prefix = '/api/v1/';
const token = "token";

// 登录页面 不限定
if (!window.location.href.includes("login.html")) {
    // 验证是否登录， 如果没有跳到登录页面
    if (localStorage.getItem(token) === "" || localStorage.getItem(token) == null) {
        alert("请登录！");
        location.href = "login.html";
    } else {
        $.ajax({
            headers: {
                Authorization: localStorage.getItem(token)
            },
            url: '/ping',
            type: "get",
            success: function (data) {
                if (data.code === 666) {
                    // 说明没有登录或者token过期
                    alert("请登录！");
                    localStorage.removeItem(token);
                    location.href = "login.html";
                }
            }
        });
    }
}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
