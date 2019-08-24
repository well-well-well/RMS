const userModel = require('../models/users')
const tools = require('../utils/tools')

module.exports = {
    async signup(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')

        let {
            username,
            password
        } = req.body

        // 判断用户是否存在
        let result = await userModel.findOne(username)
        if (!result) {
            // 密码加密
            let newPassword = await tools.crypt(password)

            //保存数据到数据库
            await userModel.save({
                username,
                password: newPassword
            })

            // 给前端返回接口
            res.render('succ', {
                data: JSON.stringify({
                    msg: '用户注册成功~'
                })
            })
        }

        res.render('fail', {
            data: JSON.stringify({
                msg: '用户已存在~'
            })
        })
    },

    async signin(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')

        let {
            username,
            password
        } = req.body

        // 从数据库里根据用户名取出用户信息
        let result = await userModel.findOne(username)

        if (result) {
            if (await tools.compare(password, result.password)) {
                // 种cookie
                // res.cookie('name', 'tobi')

                req.session.username = username

                res.render('succ', {
                    data: JSON.stringify({
                        msg: '用户登录成功~',
                        username
                    })
                })
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        msg: '账号或密码错误~'
                    })
                })
            }
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '账号或密码错误~'
                })
            })
        }
    },

    async isSignin(req, res, next) {
        // res.set('content-type', 'application/json;charset=utf-8') // 有ajax的datatype它就没啥用了

        let username = req.session.username
        if (username) {
            // 中间件栈
            // if (req.url === '/list') next()
            // else if (req.url === '/isSignin') {
            //     res.render('succ', {
            //         data: JSON.stringify({
            //             msg: '用户有权限',
            //             username
            //         })
            //     })
            // }

            res.render('succ', {
                data: JSON.stringify({
                    msg: '用户有权限',
                    username
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '用户没有权限'
                })
            })
        }
    },

    async signout(req, res, next) {
        req.session = null
        res.render('succ', {
            data: JSON.stringify({
                msg: '用户登出成功.'
            })
        })
    }
}