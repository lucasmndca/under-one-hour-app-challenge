const mongoose = require('mongoose')
module.exports = mongoose.model('Todo', {
    name: String,
    desc: String,
    complete: Boolean
})