const express = require('express')
const router = express.Router()

const positionController = require('../controllers/position')
const authMiddleware = require('../middlewares/auth')
const fileuploadMiddleware = require('../middlewares/fileupload')

router.get('/list', authMiddleware.auth, positionController.list)
router.post('/save', authMiddleware.auth, fileuploadMiddleware, positionController.save)
router.post('/findone', authMiddleware.auth, positionController.findone)
router.put('/put', authMiddleware.auth, positionController.put)
router.delete('/delete', authMiddleware.auth, positionController.delete)
router.post('/search', authMiddleware.auth, positionController.search)

module.exports = router