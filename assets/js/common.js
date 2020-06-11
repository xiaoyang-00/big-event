// 优化js

$(function () {
    // ajax请求时候，请求都会被$.ajaxPrefilter()拦截
    // 拦截之后可以获取到此次请求的选项，还可以修改选项
    $.ajaxPrefilter(function (option) {
        // option代表ajax选项

        option.url = 'http://www.liulongbin.top:3007' + option.url
        option.complete = function (res) {
            // 根据请求结果来判断token是否正确，身份认证是否成功
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 删除token
                localStorage.removeItem('token')
                // 跳转到登录页面
                window.parent.location.href = '/login.html'
            }
        }
        // jq中ajax选项，通过它可以设置请求头
        option.headers = {
            'Authorization': localStorage.getItem('token')
        }
    })
})