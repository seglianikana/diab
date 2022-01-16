const express = require("express")
const routes = require("./routes/index")
const cors = require("cors")
const path = require("path")
const errorHandler = require("./middlewares/errorHandler")

const app = express()



app.set("view engine", "pug");
app.set('views', './views')
app.use(express.static(path.join(__dirname ,"public")))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/resources', express.static(path.join(__dirname, '/views')))
app.use(cors())
app.use(routes)
app.use(errorHandler)


module.exports = app
