import SMERouter from 'sme-router'

const router = new SMERouter('router-view', 'hash')

import Home from '../controllers/home'
import Position from '../controllers/position'

// sme-router 中间件
router.use((req, res, next) => {
    // 给左边的 首页 和 职位管理 做高亮
    $(`.blink a[href="/#${req.url}"]`).parent().addClass('active').siblings().removeClass('active')
})

// 挂载前端的路由
router.route('/', Home.render)
router.route('/position', Position.render)
router.route('/position_add', Position.add)

// 将页面导航到 / ，默认route方法不具备自动导航的功能
router.redirect('/')

export default router