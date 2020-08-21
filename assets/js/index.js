$(function() {


    gitUserIofo();


    $("#btnLogout").click(function() {
        layer.confirm('滚？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html";
            layer.close(index);
        });
    })


})

function gitUserIofo() {
    $.ajax({
        method: "get",

        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") ||
        //         "",
        // },

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // console.log(res);
            renderAvater(res.data);
        },
        // complete: function(res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem("token");
        //         location.href = "/login.html";

        //     }
        // }
    })
};

function renderAvater(user) {
    var name = user.nickname || user.username;
    //  console.log(name);
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);

    if (user.user_pic !== null) {

        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avater").hide();
    } else {
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avater").show().html(text)
    }
}