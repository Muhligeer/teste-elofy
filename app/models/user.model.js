module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    Identificador: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nome_usuario: {
      type: Sequelize.STRING
    },
    altura: {
      type: Sequelize.STRING
    },
    lactose: {
      type: Sequelize.INTEGER
    },
    peso: {
      type: Sequelize.STRING
    },
    atleta: {
      type: Sequelize.INTEGER
    }
  })

  return User
}