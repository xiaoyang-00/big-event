$(function () {
    // 进入到首页之后，马上发送请求，获取用户信息，并渲染页面
    getUserInfo()
    // ---------------退出功能------------
    $('#logout').on('click', function () {
        // 1.询问
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 2.删除token
            localStorage.removeItem('token')
            // 3.跳转到login.html
            location.href = '/login.html'
            // 关闭当前弹出层
            layer.close(index);
        })

    })
})
// 方便在其它位置复用
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                // 1.设置欢迎语(有昵称使用昵称，没有使用用户名)
                var myname = res.data.nickname || res.data.username
                $('.myname').text(myname)
                // 2.设置头像(有图片用图片，没有用用户名首字母)
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show()
                    $('.text-avatar').hide()
                } else {
                    // 先截取用户名首位并转为大写
                    var t = myname.substr(0, 1).toUpperCase()
                    // 注意：jq中 show方法会设置元素为display：inline
                    $('.text-avatar').text(t).css('display', 'inline-block')
                    $('.layui-nav-img').hide()
                }
            }

        },
        // 无论成功与否，在请求完成后调用
        complete: function (res) {
            // 根据请求结果来判断token是否正确，身份认证是否成功
            // console.log(res)
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.删除token
                localStorage.removeItem('token')
                // 2.跳转到登陆页面
                location.href = '/login.html'
            }
        },
        // jq中ajax选项，通过它可以设置请求头
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
}