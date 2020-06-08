$(function () {

    //固定距离滑出返回顶部按钮
    $(window).scroll(function () {
        1e3 < $("html,body").scrollTop() ? $(".retop").slideDown() : $(".retop").slideUp()
    })
    $(".retop").click(function () {
        var l = setInterval(function () {
            var o = $("html,body").scrollTop();
            $("html,body").scrollTop(o - 50), o <= 0 && clearInterval(l)
        }, 30)
    })

    //点击返回顶部
    $('.retop').click(function(){
        $('html,body').animate({scrollTop:0},300)
        return false
    })
})
