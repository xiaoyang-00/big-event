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
    var addIndex  //添加的弹出层
    var editIndex  //编辑的弹出层
    var form = layui.form

    // -------------------获取列表数据,渲染到页面---------
    renderCatgory()

    // ---------------------添加类别弹出层-----------------------

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
    // --------------- 点击 编辑 ，弹层，为表单赋值 -------------------------
    $('body').on('click', '.edit', function () {
        // 获取三个自定义属性
        var id = $(this).attr('data-id')
        var name = $(this).attr('data-name')
        var alias = $(this).attr('data-alias')
        // h5中，提供了dataset属性，专门用于获取对象的data-xxx属性值
        // var data = this.dataset; // dataset是dom属性，所以使用dom对象this
        editIndex = layer.open({
            type: 1,
            title: '编辑类别',
            content: $('#tpl-edit').html(),
            area: ['500px', '250px'],
            success: function () {
                // 弹层之后，执行这个函数， 
                // 快速为表单赋值
                // edit-form是表单的lay-filter属性值
                form.val('edit-form', {
                    id: id,
                    name: name,
                    alias: alias
                })
                // form.val('edit-form', JSON.parse(JSON.stringify(data)))
            }
        });
    });

    // --------------- 点击弹出框确认，提交数据，完成修改 ------
    $('body').on('submit', '#edit-form', function (e) {
        e.preventDefault()
        // var data = $(this).serialize()
        // data = data.replace('id=', 'Id=')
        // data = 'I' + data.substr(1)

        var data = $(this).serializeArray()
        data[0].name = 'Id'
        // console.log(data)
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                layer.msg(res.message)
                if (res.status === 0) {
                    // 重新渲染
                    renderCatgory()
                    // 关闭弹出层
                    layer.close(editIndex)
                }
            }
        })
    })


})

