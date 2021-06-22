const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')  // модуль для хеширования пароля
const config = require('config')
const jwt = require('jsonwebtoken') // модуль для создания токена
const {check, validationResult} = require('express-validator') // модуль для валидации полей приходящих данных
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router() // создаем новый маршрут, объект Роутера

// первый параметр путь, второй данные
router.post('/registration',
// с помощью функции чек выполняем валидацию, первый параметр поле валидации, второй, что вернуть в сообщении в качестве ошибки
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({min:3,max:12})
    ],

async (req, res) => {

    try {
        // получаем результат валидации
        const errors = validationResult(req)
        // если результат валидации содержит какие-либо ошибки то попадем в блок if
        if(!errors.isEmpty()){
            // при нахождении ошибок отправляем в ответ статус 400 и сообщение
            return res.status(400).json({mesage: `Uncorrect request`, errors})
        }
        
        // получаем email и password из тела запроса
        const {email, password} = req.body
        // выполняем запрос при помощи findOne в базу данных, проверяем есть ли такой же email
        const candidate = await User.findOne({email})
        // если юзер с таким емейлом найден то попадаем в if. Так как емейл должен быть уникален
        if(candidate){
            return res.status(400).json({message: `User with email ${email} was already exist`})
        }

        // хешируем пароль так как не можем его сохранять в исходном виде в целях безопасности
        const hashPassword = await bcrypt.hash(password, 8)
        // создаем нового юзера по модели User импортированной в самом верху
        const user = new User({email, password: hashPassword })
        await user.save()
        return res.json({message: `User was created`})

    } catch (error) {
        console.log(error)
        res.send({message: "Server error"})
    }
})


router.post('/login',

async (req, res) => {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: `User with email ${email} not found`})
        }
        // сравниваем зашифрованный и не зашифрованный пароль
        // функция compare сравнивает зашифрованный пароль с захешированным
      const isPassValid = await bcrypt.compareSync(password, user.password)
      if(!isPassValid){
          return res.status(400).json({message: `Wrong password`})
      }
    //   создаем токен
      const token = jwt.sign({id:user.id}, config.get('secretKey'), {expiresIn: '1h'})
      return res.json({
          token,
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
      })

    } catch (error) {
        console.log(error)
        res.send({message: "Server error"})
    }
})

router.get('/auth', authMiddleware, 

async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = await jwt.sign({id:user.id}, config.get('secretKey'), {expiresIn: '1h'})
        return res.json({
            token,
            id: user.id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar
        })
    } catch (error) {
        console.log(error)
        res.send({message: "Server error"})
    }
})


module.exports = router
