const express = require('express')  // фреймворк для упрощенной работы с Node.js, облегчает написание кода + плюшки
const mongoose = require('mongoose') // позволяет взаимодействовать с БД mongoDB
const config = require('config') // конфиг
const authRouter = require('./routes/auth.routes') // импортируем роутер
const fileRouter = require('./routes/file.routes') // импортируем роутер
const app = express()  // создаем сервер из express
const PORT = config.get('serverPort') // получаем значение по ключу serverPort из config/default.json
const corsMiddleware = require('./middleware/cors.middleware')//экспортируем созданный миддлвейр


app.use(corsMiddleware)
// по умолчанию express не может распарсить json строку. Поэтому указываем это явно:
app.use(express.json()) 
// 1 параметр юрл, по которомоу роутер будет обрабатываться, 2 параметр роутер
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

//выполняем соединение с базой данных mongoDB и запускаем сервер
const start = async () => {

    try {
        //подключение к БД
        await mongoose.connect(config.get('dbUrl'))
        //запуск сервера, 1п - порт, 2п - ф-я которая вызывается при запуске сервера
        app.listen(PORT, () => {
            console.log('server start on port ', PORT)
        })

    } catch (error) {
        console.log(error)
    }

}

start()