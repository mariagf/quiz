// Mensaje alerta

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		validate: {{msg: "¡Su sesión ha expirado!\n\nIntroduzca de nuevo su usuario y contraseña por favor."}}
		}
	});
}
