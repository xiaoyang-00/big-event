$(function () {
    // -----------实现剪裁区域效果------------
    // 1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 2.配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 3 创建裁剪区域
    $image.cropper(options)

    // --------------------点击上传按钮可以选择图片-----------
    // :contains选择器
    $('button:contains("上传")').on('click', function () {
        // 触发文件域的事件
        $('#file').trigger('click')
    })

    // -------------------更换图片，重置剪裁区---------------------------
    // 文件域的内容改变时的事件
    $('#file').change(function () {

        // 更换剪裁的图片
        // 1. 获取到用户选择的图片（文件对象）
        // console.dir(this);
        var fileObj = this.files[0]; // 我们选择的图片的文件对象
        // 2. 根据文件对象，创建一个url，用于访问被选择的图片
        var newImgURL = URL.createObjectURL(fileObj);
        // 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })

    // --------------点击确定，实现剪裁并修改头像---------------------------
    $('button:contains("确定")').on('click', function () {
        // 将剪裁后的图片输出为base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串 

        // 发送请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/update/avatar',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: { avatar: dataURL },
            success: function (res) {
                // 提示
                layer.msg(res.message)
                if (res.status === 0) {
                    // 调用父元素getUserInfo()函数，重新渲染头像
                    window.parent.getUserInfo()
                }
            },
            complete: function (res) {
                // 根据请求结果来判断token是否正确，身份认证是否成功
                // console.log(res)
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    // 1.删除token
                    localStorage.removeItem('token')
                    // 2.跳转到登陆页面
                    location.href = '/login.html'
                }
            }
        })
    })
})