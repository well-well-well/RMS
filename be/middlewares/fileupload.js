const multer = require('multer')
const path = require('path')
const strRandom = require('string-random')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    filename(req, file, cb) {
        const file_name = strRandom(8) + '-' + Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.'))
        // 中间件栈传参
        req.filename = file_name // 将文件名传给下一个中间件
        cb(null, file_name)
    }
})

function fileFilter(req, file, cb) {
    const index = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].indexOf(file.mimetype)
    if (index === -1) {
        cb(null, false)
        cb(new Error('文件类型必须是.jpg, .png, .gif, .jpeg'))
    } else cb(null, true)
}

const upload = multer({
    storage,
    fileFilter
}).single('companyLogo')

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            res.render('fail', {
                data: JSON.stringify({
                    msg: err.message
                })
            })
        } else {
            delete req.body
            next()
        }
    })
}