//Definición del modelo de Comment con validación

module.exports = function(sequelize, DataTypes){
  return sequelize.define('Logout', {
    logout: {
        type: DataTypes.STRING,
        validate: { notNull: {null, msg: "Oliii"}}
    }
  });
}