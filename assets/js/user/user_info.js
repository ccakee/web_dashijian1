$(function() {

    var form = layui.form;
    form.verify({

        nickname: function(value) {
            if (value.length > 6) {
                return "请输入0-6位字符"
            }

        }
    });
    var layer = layui.layer;
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //  console.log(res);
                form.val("formUserInfo", res.data);

            }
        })
    };

    $("#btnReset").click(function(e) {
        e.preventDefault();
        initUserInfo();
    });

    $(".layui-form").submit(function(e) {
        e.preventDefault();

        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                layer.msg("修改成功");
                window.parent.gitUserIofo();
            }
        })
    })
})