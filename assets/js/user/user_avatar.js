// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
    // 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)


$("#btnChooseImage").click(function() {
    $("#file").click();
})

var layer = layui.layer;
$("#file").change(function(e) {
    var file = e.target.files[0];
    if (file == undefined) {

        return layer.msg("请选择图片");
    }
    var newImgUrl = URL.createObjectURL(file);
    $image.cropper("destroy").attr("src", newImgUrl).cropper(options);
})

$("#btnUplode").click(function() {
    var dataUrl = $image.cropper("getCroppedCanvas", {
        width: 100,
        height: 100
    }).toDataURL("image/png");

    $.ajax({
        method: "post",
        url: '/my/update/avatar',
        data: {
            avatar: dataUrl
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("头像修改成功");
            window.parent.gitUserIofo();

        }
    })
})