var baseURL = "http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;

    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") ||
                "",
        }
    };
    params.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem("token");
            location.href = "/login.html";

        }
    }
})