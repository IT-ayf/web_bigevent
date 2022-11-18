// 入口函数
$(function() {
    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击"去登陆"的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    let form = layui.form
    // 从layui中获取layer对象
    let layer = layui.layer

    // 通过form.verify函数自定义校验规则
    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认框中的内容，还需要拿到密码框中的内容
            // 进行一次相等的判断，如果判断不相等，return一个提示框即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致';
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', (e) => {
        // 阻止默认提交
        e.preventDefault()
        let date = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', date, (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功！')
            // 模拟人的点击行为，实现注册成功后跳转到登录页
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})