const express = require('express')
const app = express()
const port = 3000

const session = require('express-session');
const router = require('./routers/index');
app.locals.moment = require('moment');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use(session({
  secret: 'cuyahoga county',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Library app listening at http://localhost:${port}`)
})