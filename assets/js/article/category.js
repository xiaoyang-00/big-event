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
})