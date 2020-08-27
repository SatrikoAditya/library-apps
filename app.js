const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

const router = require('./routers/index')

app.use('/', router)

app.listen(port, () => {
  console.log(`Library app listening at http://localhost:${port}`)
})