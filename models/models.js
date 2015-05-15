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
      storage: storage, // Solo SQLite (.env)
      omitNull: true // solo Postgres
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
                        });
            Quiz.create({ pregunta:'¿Quién decsubrió América?',
                          respuesta: 'Colón'
                        });
            Quiz.create({ pregunta:'¿Quién inventó la bombilla?',
                          respuesta: 'Edison'
                        });
             Quiz.create({ pregunta:'¿Quién es el presidente de los EEUU?',
                          respuesta: 'Obama'
                        });
              Quiz.create({ pregunta:'¿Qué moneda se utiliza en Londres?',
                          respuesta: 'Libra'
                        });
              Quiz.create({ pregunta:'¿Qué moneda se utiliza en Suiza?',
                          respuesta: 'Franco'
                        });
              Quiz.create({ pregunta:'¿A qué temperatura en grados ºC hierve el agua?',
                          respuesta: '100'
                        });
              Quiz.create({ pregunta:'¿Qué nombre reciben las crías de Jabalí?',
                          respuesta: 'Jabatos'
                        });
              Quiz.create({ pregunta:'¿En qué lado está el acelerador en un coche?',
                          respuesta: 'Derecha'
                        });
              Quiz.create({ pregunta:'¿Cuántos quilates tiene una pieza de oro puro?',
                          respuesta: '24'
                        });
              Quiz.create({ pregunta:'¿Cuántos años de mala suerte siguen a la rotura de un espejo?',
                          respuesta: '7'
                        });
              Quiz.create({ pregunta:'¿Cuántos años de matrimonio se celebran en las Bodas de Oro?',
                          respuesta: '50'
                        })
            .then( function(){console.log('Base de datos inicializa')});
        };
    });
});

