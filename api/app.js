const expess = require('express');
const bodyParser  = require('body-parser')
const  authRoutes = require('./routes/auth')
const  categoryRoutes = require('./routes/category')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const app = expess()

mongoose.connect(keys.mongoURI)
  .then(() => console.log('mongoDB connect'))
  .catch(error => console.log(error))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', expess.static(__dirname + '/uploads/'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)

module.exports = app
