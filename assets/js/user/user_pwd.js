$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "请输入6-12位字符"],
        samePwd: function(value) {
            if (value == $(".layui-form [name=oldPwd]").val()) {
                return "新旧密码不能一致！"
            }

        },
        rePwd: function(value) {
            if (value !== $(".layui-form [name=newPwd]").val()) {
                return "两次密码不一致！"
            }
        }

    });

    $(".layui-form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                $(".layui-form")[0].reset();
            }
        })
    })


})