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
    $('.retop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 300)
        return false
    })

    //通过hash改变页面
    //监听hash改变事件调用函数
    window.onhashchange = navchange;
    //通过hash改变页面内容
    navchange()
    function navchange() {
        var hash = location.hash
        switch (hash) {
            case "":
                $('#main').load("../../pages/home.html");
                break;
            case "#home":
                $('#main').load("../../pages/home.html");
                break;
            case "#mymsg":
                $('#main').load("../../pages/mymsg.html");
                break;
            case "#borrow":
                $('#main').load("../../pages/borrow.html");
                break;
            case "#invest":
                $('#main').load("../../pages/invest.html");
                break;
            default:
                $('#main').load("../../pages/404.html");
        }
        chagenNav(hash);
    }
    //通过hash添加激活样式
    function chagenNav(hash) {
        $('.second .list .nav-item[href=' + hash + ']').addClass('active')
            .closest('li').siblings('li').find('a').removeClass('active')

        /*  
        $('.second .list .nav-item').removeClass('active')
        $('.second .list .nav-item[href='+hash+']').addClass('active')
        */
    }
    //登陆跳转
    loginChange();
    function loginChange() {
        //获取本地存储数据
        var username = localStorage.getItem('username')
        var pwd = localStorage.getItem('uid')
        if (pwd && username) {
            //将首页的内容改变
            $('#login').html('<a href="./login.html">' + username + '</a> / <a href="./register.html" id="regOut">注销</a>')
        } else {
            $('#login').html('<a href="./login.html">登录</a> / <a href="./register.html" id="regOut">注册</a>')
        }
    }
    //点击注销
    $('#login').on('click', '#regOut', function () {
        if (confirm('您是否要退出?')) {
            localStorage.removeItem('username')
            localStorage.removeItem('uid')
            $('#login').html('<a href="./login.html">登录</a> / <a href="./register.html" id="regOut">注册</a>')
        }


    })
})