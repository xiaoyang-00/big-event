// ------------------表单赋值，数据回填----------------
function renderUser() {
    // 发送请求，获取用户信息
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {

            if (res.status === 0) {
                // 数据回填(设置表单的value值)
                // $('input[name="id"]').val(res.data.id)
                // $('input[name="username"]').val(res.data.username)
                // $('input[name="nickname"]').val(res.data.nickname)
                // $('input[name="email"]').val(res.data.email)

                // layui提供了快速为表单赋值的方法
                // 加载layui的form模块
                var form = layui.form
                // res.data 这个对象的属性（key）要和表单各项的name属性值相同，才能赋值
                form.val('abc', res.data)

            }
        }
    })
}
$(function () {
    // ------------------表单赋值，数据回填----------------
    renderUser()

    // -----------------监听表单提交事件，完成更新-----------------
    $('form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 获取表单数据
        var data = $(this).serialize() //serialize()不能收集到禁用的元素
        // 发送请求
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                // 提示
                layer.msg(res.message)
                if (res.status === 0) {
                    // 成功后，重新渲染用户的头像信息
                    // 调用父页面的getUserInfo()函数即可
                    window.parent.getUserInfo()
                }
            }
        })
    })
    // -----------------重置表单----------------------------------
    // 表单重置是要恢复默认表单的值，而不是清空
    $('button[type="reset"]').on('click', function (e) {
        // 阻止重置的默认行为
        e.preventDefault()
        // 调用函数，从新发送ajax请求，获取用户信息，从新为表单赋值
        renderUser()
    })
})