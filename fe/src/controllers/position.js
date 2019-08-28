import positionListView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'lodash'

const count = 5

function remove(id, res) {
	$.ajax({
		url: '/api/position/delete',
		type: 'DELETE',
		data: {
			id
		},
		success(result) {
			if (result.ret) {
				res.go('/position?_=' + new Date().getTime())
			}
		}
	})
}

function loadData(pageNo, res) {
	let start = pageNo * count
	$.ajax({
		url: '/api/position/list',
		data: {
			start,
			count
		},
		success(result) {
			// console.log(result)
			if (result.ret) {
				res.render(positionListView({
					...result.data,
					showPage: true,
					pageNo,
					pageCount: _.range(Math.ceil(result.data.total / count))
				}))
			} else {
				res.go('/')
			}
		}
	})
}

export default {
	render(req, res) {
		loadData(0, res)

		$('#router-view').off('click').on('click', '#addbtn', () => {
			res.go('/position_add')
		})

		$('#router-view').on('click', '.btn-update', function () {
			res.go('/position_edit', {
				id: $(this).attr('data-id')
			})
		})

		$('#router-view').on('click', '.btn-delete', function () {
			remove($(this).attr('data-id'), res)
		})

		$('#router-view').on('click', '#page li[data-index]', function () {
			// console.log($(this).attr('data-index'))
			loadData(~~$(this).attr('data-index'), res)
		})

		$('#router-view').on('click', '#prev', function () {
			console.log(1)
			const currIndex = $('#page li.active').attr('data-index')
			const index = ~~currIndex - 1
			if (index > -1) loadData(index, res)
		})

		$('#router-view').on('click', '#next', function () {
			console.log(3)
			const currIndex = $('#page li.active').attr('data-index')
			// console.log(currIndex);
			const index = ~~currIndex + 1
			// console.log(index);
			// console.log(this); // 事件委托里的this是委托给的那个子元素
			if (index < ~~$(this).attr('data-pagecount')) loadData(index, res)
		})

		$('#router-view').on('click', '#possearch', function () {
			let keywords = $('#keywords').val()
			$.ajax({
				url: '/api/position/search',
				type: 'post',
				data: {
					keywords
				},
				success(result) { // 看一下这里是否是只有成功时才触发，如果是的话那下面的判断就没必要了
					if (result.ret) {
						res.render(positionListView({
							...result.data,
							showPage: false
						}))
					}
				}
			})
		})
	},

	add(req, res) {
		res.render(positionAddView({}))

		$('#posback').on('click', z => {
			res.back()
		})

		$('#possubmit').on('click', z => {
			$('#possave').ajaxSubmit({
				url: 'api/position/save',
				type: 'POST',
				clearForm: true,
				// contentType: 'application/json; charset=utf-8', // application/x-www-form-urlencoded默认
				success(result) {
					if (result.ret) {
						res.back()
					} else {
						alert(result.data.msg)
					}
				}
			})
		})
	},

	edit(req, res) {
		$.ajax({
			url: '/api/position/findone',
			type: 'POST',
			data: {
				id: req.body.id,
			},
			success(result) {
				res.render(positionEditView(result.data))

				$('#posback').on('click', () => {
					res.back()
				})

				$('#possubmit').on('click', () => {
					$('#posedit').ajaxSubmit({
						url: '/api/position/patch',
						type: 'PATCH',
						success(result) {
							if (result.ret) {
								res.back()
							} else {
								alert(result.data.msg)
							}
						}
					})
				})
			}
		})
	}
}