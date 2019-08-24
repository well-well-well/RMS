import userView from '../views/user.art'

let _url = ''
let _type = ''

const isSignin = z => {
    return $.ajax({ // 发起一个数据的请求，返回一个promise
        url: '/api/users/isSignin', // 调用后端的这个接口
        dataType: 'json', // 如果后端的响应首部的数据类型设置成功的话就不用了加这句话了
        success(result) {
            return result
        }
    })
}

// 绑定登录注册按钮的事件
const bindEvent = z => {
    $('#user-menu').on('click', '.hidden-xs', function () {
        _type = $(this).attr('id')
        _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
        $('input').val('') // 让input框里的值全都为空
    })

    $('#user-menu').on('click', '#btn-submit', z => {
        let data = $('#user-form').serialize()
        $.ajax({
            url: _url,
            type: 'POST',
            data,
            success: $.proxy(bindEventSucc, this),
            error: $.proxy(bindEventErr, this)
        })
    })

    $('#user-menu').on('click', '#btn-signout', z => {
        $.ajax({
            url: '/api/users/signout',
            dataType: 'json',
            success: $.proxy(bindEventSucc, this),
            error: $.proxy(bindEventErr, this)
        })

    })
}

const bindEventErr = z => alert('请求发送失败了')

const bindEventSucc = result => {
    if (_type === 'btn-signup') alert(result.data.msg)
    else if (_type === 'btn-signin') {
        if (result.ret) {
            // 方法一
            // let html = userView({
            //     isSignin: true,
            //     username: result.data.username
            // })
            // $('#user-menu').html(html)

            // 方法二
            isSigninRender(result)

            // 方法三：什么都不改，只需要重新刷新一遍页面，让他绑定上所有的事件即可
            // location.reload()
        } else {
            try { // 添加 try catch方法，返回如果不是json类型就抛出error
                alert(result.data.msg)
            } catch (error) {
                alert('json字符串返回有误')
            }
        }
    } else {
        // 方法一、三
        // location.reload()

        // 方法二
        isSigninRender({
            ret: false,
            data: result.data
        })
    }
}

// 方法二
const isSigninRender = async result => {
    // 如果已经有result，就不再做请求，这样登录和退出结束后就都少请求一次
    if (!result) result = await isSignin()

    // 转换result的类型为object
    // try {
    //     result = (result instanceof Object) ? result : JSON.parse(result);
    // } catch (error) {
    //     alert('result转object有误')
    // }

    const html = userView({
        isSignin: result.ret,
        username: result.data.username
    })

    $('#user-menu').html(html)
}

export default {
    async render() {
        // 方法一：老陆的写法
        // let result = await isSignin()
        // let html = userView({ // userView是art-template-loader返回的函数，此函数可以用于直接返回字符串 (userView(data))
        //     isSignin: result.ret,
        //     username: result.data.username
        // })
        // $('#user-menu').html(html)

        // 方法二：萌爷的写法
        await isSigninRender()

        bindEvent()
    }
}