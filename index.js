const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get("/", (req, res, next) => {
  res.json({ message: 'This is CORS-enabled for all origins!'})
})

const db = require("./app/models")
db.sequelize.sync()

require("./app/routes/user.routes.js")(app)

app.listen(process.env.SYSTEM_PORT, () => {
  console.log("Running at port:", process.env.SYSTEM_PORT);
})

module.exports = app