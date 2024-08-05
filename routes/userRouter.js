const { Router } = require('express')
const { userRegistration, userLogin ,getusertodo} = require('../controller/userController')
const router = Router()

router.post('/register', userRegistration)
    .post('/login', userLogin)


module.exports = router