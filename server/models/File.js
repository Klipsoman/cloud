const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accesLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
    user: {type: ObjectId, ref: 'User'},
    parent: {type: ObjectId, ref: 'File'},
    childs: [{type: ObjectId, ref: 'File'}],
})

module.exports = model('File' , File)