const express = require('express')
const router = express.Router()

const positionController = require('../controllers/position')
const authMiddleware = require('../middlewares/auth')

router.get('/list', authMiddleware.auth, positionController.list)
router.post('/save', authMiddleware.auth, positionController.save)

module.exports = router