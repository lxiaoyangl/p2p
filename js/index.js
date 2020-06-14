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
            //默认
            case "":
                $('#main').load("../../pages/home.html");
                break;
            //首页
            case "#home":
                $('#main').load("../../pages/home.html");
                break;
            //个人中心
            case "#mymsg":
                /* $('#main').load("../../pages/mymsg.html");
                $('#rightContent').load('../../pages/mymsg/getuserinfo.html') */
                loadPage('#mymsg/getuserinfo')
                break;
            //个人中心==>账户信息
            case "#mymsg/getuserinfo":
                loadPage(hash)
                break;
            //个人中心==>更新资料
            case "#mymsg/updateuser":
                loadPage(hash)
            //个人中心==>发布贷款
            case "#mymsg/borrow_apply":
                loadPage(hash)
                break;
            //我要借款
            case "#borrow":
                $('#main').load("../../pages/borrow.html");
                break;
            //我要投资
            case "#invest":
                $('#main').load("../../pages/invest.html");
                break;
            //404
            default:
                $('#main').load("../../pages/404.html");
        }
        chagenNav(hash);
    }
    //加载个人中心二级页面
    function loadPage(hash) {
        // 去掉获取到的hash的#号
        hash = hash.substr(1)
        // 切换页面
        if ($('#rightContent').length) {//点击
            $('#rightContent').load('../../pages/' + hash + '.html')
            activePage(hash)
        } else {//刷新
            $('#main').load('../../pages/mymsg.html', function () {
                $('#rightContent').load('../../pages/' + hash + '.html')
                activePage(hash)
            })
        }
    }

    //二级路由激活样式改变
    function activePage(hash) {
        //此时的hash为去掉#的值

        $('.list-group li a').removeClass('active')
        $('.list-group li a[href="#' + hash + '"]').addClass('active')
    }

    //通过hash添加导航栏激活样式
    function chagenNav(hash) {
        //当hash为空时就将hash变量改为#home
        if (hash === '') hash = '#home'
        //只要hash包含mymsg就将hash变量改为#mymsg
        if (hash.includes('mymsg')) hash = '#mymsg'
        //添加激活样式
        $('.second .list .nav-item[href="' + hash + '"]').addClass('active')
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
            $('#login').html('<a href="#">' + username + '</a> / <a href="#" id="regOut">注销</a>')
        } else {
            $('#login').html('<a href="./login.html">登录</a> / <a href="./register.html">注册</a>')
        }
    }
    //点击注销
    $('#login').on('click', '#regOut', function () {
        if (confirm('您是否要退出?')) {
            localStorage.removeItem('username')
            localStorage.removeItem('uid')
            $('#login').html('<a href="./login.html">登录</a> / <a href="#">注册</a>')
        }
    })
})