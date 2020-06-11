function renderCatgory() {
    // -------------------发送请求，获取列表数据，渲染到页面---------
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // 调用template函数
            var str = template('tpl-category', res)
            // 把组合后的html标签放到tbody里
            $('tbody').html(str)
        }
    })
}


$(function () {
    // -------------------获取列表数据,渲染到页面---------
    renderCatgory()

    // ---------------------添加类别弹出层-----------------------
    var addIndex
    $('.layui-card-header button').on('click', function () {
        // 使用layer.open()实现弹出层
        addIndex = layer.open({
            type: 1,
            title: '添加类别',
            content: $('#tpl-add').html(),
            area: ['500px', '260px']
        })
    })

    // --------------------------弹出层表单的添加功能-----------------------
    // 注册事件委托，监听表单提交
    $('body').on('submit', '#add-form', function (e) {
        // 阻止表单提交默认行为
        e.preventDefault()
        // 发送请求
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // 提示
                layer.msg(res.message)
                if (res.status === 0) {
                    // 重新渲染页面
                    renderCatgory()
                    // 关闭弹出层
                    layer.close(addIndex)
                }
            }

        })
    })

    // -------------------------删除功能------------------------------------------
    $('body').on('click', '.delete', function () {

        // 询问前，获取id
        var id = $(this).attr('data-id')
        // 弹出询问框
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            // 发送请求
            $.ajax({
                type: 'GET',
                // /my/article/deletecate/:id
                // url: '/my/article/deletecate/1' // 删除id为1的分类
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // 提示
                    layer.msg(res.message)
                    if (res.status === 0) {
                        // 重新渲染页面
                        renderCatgory()
                    }
                }
            })

            layer.close(index);
        })
    })
})