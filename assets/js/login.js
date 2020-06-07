
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
                // alert(res.message)
                // 弹出层样式
                layer.msg(res.message)
                // 成功显示登陆页面
                if (res.status === 0) {
                    $('#login').show().next().hide()
                }
            }
        })
    })
    // ----------------------------------------表单验证----------------------------------------------
    // 使用layui的内置模块，必须先加载(弹出层可不用加载，直接使用)
    // 1.加载form模块
    var form = layui.form  //加载后得到一个对象
    // 2.调用form.verify()方法，自定义验证规则
    form.verify({
        // 键(验证规则): 值(验证方法（可以是数组，也可以是函数）)
        // 1.验证密码长度
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // len: [/^[\S]{6,12}$/, '密码长度须6到12位']
        len: function (val) {
            // val 表示使用该验证规则的输入的值
            if (val.trim().length < 6 || val.trim().length > 12) {
                return '密码长度须6到12位'
            }
        },
        // 2.验证两次密码是否相同
        same: function (val) {
            // 获取密码的值
            var pass = $('.pass').val()
            // 比较密码和确认密码
            if (val !== pass) {
                return '两次密码不一致'
            }
        }
    })
    // --------------------------------------完成登陆-----------------------------------------
    // 给表单注册submit事件
    $('#login form').on('submit', function (e) {
        // 阻止表单默认行为
        e.preventDefault()
        // 发送请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // alert(res.message)
                layer.msg(res.message)
                if (res.status === 0) {
                    // token是一个令牌，访问以 /my 开头的接口的时候，必须携带token，否则会提示身份认证失败。
                    // 如果登陆成功，需要把token保存到本地存储(localStorage)中
                    // localStorage.setItem('键','值') ---向本地存储中存值(字符串)
                    // localStorage.getItem('键')---获取本地存储中的值
                    // localStorage.removeItem('键')---删除本地存储中保存的值
                    localStorage.setItem('token', res.token)
                    // 跳转页面
                    location.href = '/index.html'
                }
            }
        })
    })
})