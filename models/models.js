var path = require('path');

//Postgress DATABAS_URL = postgress://user:passwd@host:port/database
//Sqlite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user  = (url[2] || null);
var pwd  = (url[3] || null);
var protocol  = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//CARGAR modelo ORM
var Sequelize = require('sequelize');

//USAR BBDD SQlite o  Postgres
var sequelize = new Sequelize(DB_name,user,pwd,
	{ dialect: protocol,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage,
      omitNull: true
    }
);

//Importar la definicion de la tabla quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //exportar definicion de la tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
    //then(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count){
        if(count === 0) { //la tabla se inicializa solo si esta vacia
            Quiz.create({ pregunta:'¿Cuál es la capital de España?',
                          respuesta: 'Madrid'
                         });
            Quiz.create({ pregunta:'¿Cuál es la capital de Italia?',
				                  respuesta: 'Roma'
			                   });
            Quiz.create({ pregunta:'¿Cuál es la capital de Inglaterra?',
                          respuesta: 'Londres'
                        });
            Quiz.create({ pregunta:'¿Cuál es la capital de Francia?',
                          respuesta: 'Paris'
                        })
            .then( function(){console.log('Base de datos inicializa')});
        };
    });
});

