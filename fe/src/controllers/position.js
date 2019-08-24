import positionView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'

export default {
  render(req, res) {
    $.ajax({
      url: '/api/position/list',
      success(result) {
        if (result.ret) {
          res.render(positionView({
            list: result.data
          }))

          $('#addbtn').on('click', z => {
            res.go('/position_add')
          })
        } else {
          res.go('/') // 跳转路由
        }

      }
    })
    res.render(positionView(req))
  },

  add(req, res) {
    res.render(positionAddView({}))

    $('#posback').on('click', z => {
      res.back()
    })

    $('#possubmit').on('click', z => {
      let data = $('#possave').serialize()
      $.ajax({
        url: 'api/position/save',
        type: 'POST',
        // contentType: 'application/json; charset=utf-8', // application/x-www-form-urlencoded默认
        data,
        success(result) {
          if (result.ret) {
            res.back()
          } else {
            
          }
        }
      })
    })
  }
}