const posModel = require('../models/position')
const moment = require('moment')

module.exports = {
    async list(req, res, next) {
        let {
            list,
            total
        } = posModel.find(req.query)
        if (await list) {
            res.render('succ', {
                data: JSON.stringify({
                    list: await list,
                    total: await total
                })
            })
        }
    },

    async findone(req, res, next) {
        let result = await posModel.findone(req.body.id)
        if (result) {
            res.render('succ', {
                data: JSON.stringify(result)
            })
        }
    },

    async save(req, res, next) {
        let result = await posModel.save({
            ...req.body,
            companyLogo: req.filename,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
        })

        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据添加成功.'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据添加失败.'
                })
            })
        }
    },

    async put(req, res, next) {
        let result = await posModel.put({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
        })
        res.render('succ', {
            data: JSON.stringify({
                msg: '数据修改成功.'
            })
        })
    },

    async delete(req, res, next) {
        const result = await posModel.delete(req.body.id)
        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据删除成功.'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据删除失败.'
                })
            })
        }
    },

    async search(req, res, next) {
        const {
            keywords
        } = req.body
        let list = await posModel.search(keywords)
        res.render('succ', {
            data: JSON.stringify({
                list,
                total: -1
            })
        })
    }
}