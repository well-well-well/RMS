import SMERouter from 'sme-router'

const router = new SMERouter('router-view', 'hash')

import homeController from '../controllers/home'
import positionController from '../controllers/position'
import userController from '../controllers/user'

// import '../utils/active-nav'

import activeNavUtil from '../utils/active-nav'
// sme-router 中间件
router.route('*', activeNavUtil)

// 挂载前端的路由，绑定顺序很重要，顺序写乱很可能导致路由出错
router.route('/', homeController.render)
router.route('/position', positionController.render)
router.route('/position_add', positionController.add)
router.route('/position_edit', positionController.edit)


// 将页面导航到 / ，默认route方法不具备自动导航的功能
router.redirect('/')

// 渲染用户信息的模板
userController.render()