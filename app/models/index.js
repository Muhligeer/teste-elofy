const dbConfig = require("../../config/db.config.js")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig)


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./user.model.js")(sequelize, Sequelize)

module.exports = db