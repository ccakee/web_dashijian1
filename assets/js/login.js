$(function() {
    $("#link_login").on("click", function() {
        $("#login").hide();
        $("#reg").show();
    })
    $("#link_reg").on("click", function() {
        $("#login").show();
        $("#reg").hide();
    })


    var form = layui.form;



    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "请输入6-16位非空白字符"
        ],
        repwd: function(value) {
            var pwd = $("#reg [name=password]").val();
            if (value !== pwd) {
                return "两次密码不一致！"
            }
        }
    });

    var layer = layui.layer;
    $("#formReg").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/reguser",
            method: "post",
            data: {
                username: $('#reg [name=username]').val(),
                password: $('#reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $("#link_reg").click();

                $("#formReg")[0].reset();
            }
        })
    });
    $("#login_form").submit(function(e) {
        e.preventDefault();
        $.ajax({

            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = "/index.html";

            }
        })
    })
})