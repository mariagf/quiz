var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

//var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//var DB_name = (url[6]||null);
//var user = (url[2]||null);
//var pwd = (url[3]||null);
//var protocol = (url[1]||null);
//var dialect = (url[1]||null);
//var port = (url[5]||null);
//var host = (url[4]||null);
//var storage = process.env.DATABASE_STORAGE;

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
						{dialect:"sqlite", storage:"quiz.sqlite"
						//DB_name, user, pwd,
						//{dialect: protocol,
						//protocol: protocol,
						//port: port,
						//host: host, 
						//storage: storage, // solo SQLite (.env)
						//omitNull: true // solo Postgres
					}
				);

//var quiz_path = path.join(__dirname, 'quiz');
// Importar la definición de la tabla Quiz en quiz.js 
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //exportar definición de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
	//success(..) ejectura el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count===0){
			Quiz.create({ pregunta: '¿Cuál es la capital de Italia?',
						  respuesta: 'Roma'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
