const express = require('express')
const passport = require('passport')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getInfo)

module.exports =  router
