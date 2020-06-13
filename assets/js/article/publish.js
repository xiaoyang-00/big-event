$(function () {
    // 调用layui的form模板
    var form = layui.form


    // -----------------------------获取分类数据，渲染到下拉列表--------------------
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // 调用模板
            var str = template('tpl-category', res)
            // 渲染到页面
            $('select').html(str)
            // 刷新select选择框渲染
            form.render('select')
        }
    })
    // --------------------------富文本编辑器--------------------
    // 1.修改文本域的name为content
    // 2.调用initEditor() 初始化富文本编辑器
    initEditor()

    // ---------------------------图片剪裁效果------------------
    // 1.初始化图片剪裁器
    var $image = $('#image')
    // 2.剪裁配置选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3.初始化剪裁区域
    $image.cropper(options)
    // ----------------------------------图片处理-------------------
    $('.img-btn').on('click', function () {
        // 触发文件域
        $('#file').click()
    })
    // 文件域内容改变时，重置剪裁区
    $('#file').change(function () {
        // 1.找到用户选择的文件
        var file = this.files[0]
        // 2.根据选择的文件，创建对应的url
        var newImgURL = URL.createObjectURL(file)
        // 3.先销毁之前的剪裁区，再重新设置图片路径，之后再创建剪裁区
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })
    // ----------------------------------设置发布状态---------------------------------
    // 表示发布状态
    var s = ''
    // 点击发布按钮，修改s为发布
    $('button:contains("发布")').on('click', function () {
        s = '已发布'
    })
    $('button:contains("存为草稿")').on('click', function () {
        s = '草稿'
    })
    // -----------------------------------发布文章-----------------------------------------
    $('form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 搜集表单数据
        // 根据表单的name属性收集数据FormData(表单的dom对象)
        var data = new FormData(this)
        // 追加state
        data.append('state', s)
        // ----- 将剪裁的图片，输出为blob二进制形式---
        // 1.创建canvas画布
        var canvas = $image.cropper('getCroppedCanvas', {
            width: 400,
            heigth: 280
        })
        // 2.调用canvas中的toBlob()方法，将图片转为二进制形式
        canvas.toBlob(function (blob) {
            // 3.把二进制形式的图片追加到data中
            data.append('cover_img', blob)

            // 可以遍历带有遍历器结构的对象
            for (var ele of data) {
                console.log(ele)
            }

            // 发送请求
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: data,
                // 提交FormData对象,必须指定两个false
                contentType: false,
                processData: false,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        // 添加成功跳转到 文章列表页 
                        location.href = '/article/article.html';
                    }
                }
            })
        })




    })
})
