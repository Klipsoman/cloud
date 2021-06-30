const {Schema, model} = require('mongoose')  // импортируем схему и модель из модуля mongoose
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// создаем схему, в которой будет храниться информация о полях сущности
// id создаются по умолчанию
const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String, default: ''},
    files: [{type: ObjectId, ref: 'File'}]
})

// экпортируем модель пользователя
module.exports = model('User', User)