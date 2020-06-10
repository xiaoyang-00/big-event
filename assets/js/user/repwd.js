$(function () {
    // 加载layui的form模块
    var form = layui.form
    // ---------------------表单验证----------------------
    // 调用表单模块的方法
    form.verify({
        // 1.验证密码长度
        len: [/^[\S]{6,12}$/, '密码长度必须在6~12之间，且不能出现空格'],
        // 2.验证新密码和原密码不能相同
        diff: function (val) {
            // val代表新密码
            // 获取原密码
            var oldPwd = $('.oldPwd').val()
            if (oldPwd === val) {
                return '新密码不能和原密码相同'
            }
        },
        // 3.验证确认密码和新密码是否一致
        same: function (val) {
            // val代表确认密码
            // 获取新密码
            var newPwd = $('.newPwd').val()
            if (newPwd !== val) {
                return '两次密码不一致'
            }
        }
    })
    // --------------------------密码重置------------------
    $('form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发送请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: $(this).serialize(),
            success: function (res) {
                // 提示
                layer.msg(res.message)
                if (res.status === 0) {
                    // 如果成功，重置表单
                    $('form')[0].reset()
                }
            },
            complete: function (res) {
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    // 1.清除token
                    localStorage.removeItem('token')
                    // 2.跳转到登陆页面
                    // windo表示当前窗口
                    // window.parent表示当前窗口的父窗口index.html
                    window.parent.location.href = '/login.html'
                }
            }
        })
    })
})