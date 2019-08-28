// export default $(window).on('hashchange', function () {
// 	// 给左边的 首页 和 职位管理 做高亮
// 	$(`.blink a[href="/${location.hash}"]`).parent().addClass('active').siblings().removeClass('active')
// })

export default (req, res, next) => {
	$(`.blink a[href="/#${req.url}"]`).parent().addClass('active').siblings().removeClass('active')
}