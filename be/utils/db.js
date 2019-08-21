const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/RMS', {
    useNewUrlParser: true
}) // 最后一个写数据库的名字

module.exports = mongoose