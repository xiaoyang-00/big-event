$(function () {

    // 加载layui的form模块
    var form = layui.form
    // 更新渲染----刷新select选择框渲染
    form.render('select')

    // --------------------获取文章列表数据-----------------------
    // 设置请求参数
    var data = {
        pagenum: 1, //页码值
        pagesize: 10,  //每页显示几条数据
        // cate_id  //文章分类的id
        // state   //文章的状态，可选值有：已发布、草稿
    }
    function renderArticle() {
        // 发送请求
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: data,
            success: function (res) {
                if (res.status === 0) {
                    // 调用模板引擎
                    var str = template('tpl-article', res)
                    // 渲染到页面
                    $('tbody').html(str)
                }
            }


        })
    }

    // 调用函数
    renderArticle()
})

