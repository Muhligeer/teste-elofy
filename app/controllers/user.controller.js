const db = require("../models")
const User = db.users
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%`}}: null

  User.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro."
      })
    })
}