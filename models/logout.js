// Definición del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Logout',
		{   logout: {
		  	type: DataTypes.STRING,
		  	validate: { notNull: {msg: "Olii"}}
		}
	});
}
