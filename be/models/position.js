const mongoose = require('../utils/db')

const Model = mongoose.model('positions', {
    companyName: String,
    positionName: String,
    city: String,
    salary: String,
    createTime: String
})

module.exports = {
    find() {
        return Model.find({}).sort({_id: -1})
    },

    save(data) {
        let model = new Model(data)
        return model.save()
    }
}