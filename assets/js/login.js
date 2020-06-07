
$(function () {
    // ------------------------------切换登陆和注册的盒子--------------------------------
    $('#showReg').on('click', function () {
        $('#login').hide().next().show()
    })
    $('#showLogin').on('click', function () {
        $('#register').hide().prev().show()
    })
    // --------------------------------完成注册--------------------------------------
    // 给表单注册submit事件
    $('#register form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 获取账号和密码
        var data = $(this).serialize()  //注意要检查表单的name属性
        // 发送请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                alert(res.message)
                // 成功显示登陆页面
                if (res.status === 0) {
                    $('#login').show().next().hide()
                }
            }
        })
    })

})