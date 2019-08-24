const posModel = require('../models/position')
const moment = require('moment')

module.exports = {
    async list(req, res, next) {
        let result = await posModel.find()
        if (result) {
            res.render('succ', {
                data:JSON.stringify(result)
            })
        }
    },

    async save(req, res, next) {
        let result = await posModel.save({
            ...req.body,
            createTime: moment().format(yyyy)
        })
        
        if (result) {
            res.render('succ', {
                data:JSON.stringify({
                    msg: '数据添加成功.'
                })
            })
        } else {
            res.render('fail', {
                data:JSON.stringify({
                    msg: '数据添加失败.'
                })
            })
        }
    }
}