const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./controllers/ROUTES')
const db = require('./config/connectDB')
require('dotenv').config()
const port = 5050

//Connect to database
db.connect()

//Run json in request.http
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Use cors to talk to front end
app.use(cors())

//Routes init
route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})