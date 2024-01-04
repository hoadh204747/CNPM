const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const authRoute = require('./routes/authRoute')
const siteRoute = require('./routes/siteRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const User = require('./model/userModel')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/CNPM',
    collection: 'sessions'
  })
  
  app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next()
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next()
      })
      .catch()
  })

app.use(authRoute)
app.use(siteRoute)
app.use(userRoute)
app.use(adminRoute)

//set view engine
app.set('view engine', 'ejs')


//connect to MongoDB
const uri = 'mongodb://localhost:27017/CNPM'
async function connect(){
    try {
        await mongoose.connect(uri)
        console.log("Connect to Mongoodb")
    } catch (err) {
        console.error(err)
    }
}
connect()



app.listen(port, () => console.log(`Server running on http://localhost:${port}`))