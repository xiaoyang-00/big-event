$(function () {

    // 加载layui的form模块
    var form = layui.form
    // 更新渲染----刷新select选择框渲染
    form.render('select')
    // 加载layui的laypage模块
    var laypage = layui.laypage

    // --------------------获取文章列表数据-----------------------
    // 设置请求参数
    var data = {
        pagenum: 1, //页码值
        pagesize: 2,  //每页显示几条数据
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

                    // 这里有res.total数据总数
                    showPage(res.total)
                }
            }


        })
    }

    // 调用函数
    renderArticle()

    // ---------------------------分页----------------------------------
    function showPage(n) {
        laypage.render({
            elem: 'page', //page是ID，不用加 # 号
            count: n, //数据总数，从服务端得到
            limit: data.pagesize, //每页显示的条数
            limits: [2, 3, 4, 5], //每页条数的选择项
            curr: data.pagenum, //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义排版
            // 切换分页的回调
            // 当分页被切换时触发，函数返回两个参数
            // obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            jump: function (obj, first) {

                //首次不执行
                if (!first) {
                    //切换页码，改变请求参数
                    data.pagenum = obj.curr
                    data.pagesize = obj.limit
                    renderArticle()
                }
            }
        })
    }

    // ----------------------------搜索-----------------------------------
    // 获取分类，渲染到下拉框
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // 调用模板
            var str = template('tpl-category', res)
            // 渲染页面
            $('#category').html(str)
            // 更新渲染
            form.render('select')
        }


    })

    // -------------------------------筛选------------------------------
    $('#search-form').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 获取下拉框的值
        var p = $(this).serializeArray()
        // 判断是否选中了分类
        if (p[0].value) {
            data.cate_id = p[0].value
        } else {
            delete data.cate_id //delete 可以删除对象的属性
        }
        // 判断是否选中了状态
        if (p[1].value) {
            data.state = p[1].value
        } else {
            delete data.state
        }
        // 修改页码为1
        data.pagenum = 1
        // 更新渲染
        renderArticle()
    })

})

