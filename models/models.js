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

//Importar la definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//Importar la definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

//Importar la definicion de la tabla User
var user_path = path.join(__dirname,'user');
var User = sequelize.import(user_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// los quizes pertenecen a un usuario registrado
Quiz.belongsTo(Quiz);
User.hasMany(Quiz);

// exportar tablas
exports.Quiz = Quiz; //exportar definicion de la tabla Quiz
exports.Comment = Comment;
exports.User = User;

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
    //then(..) ejecuta el manejador una vez creada la tabla
    User.count().then(function(count){
        if(count === 0) { //la tabla se inicializa solo si esta vacia
          User.bulkCreate(
            [ {username: 'admin', password:'1234', isAdmin:true},
              {username: 'pepe', password:'5678'} // isAdmin por defecto false
            ]
          ).then(function(){
            console.log('Base de datos (tabla user) inicializada');
            Quiz.count().then(function(count){
              if(count === 0) { //la tabla se inicializa solo si esta vacia
                Quiz.bulkCreate(
                  [ {pregunta: '¿Cuál es la capital de España?', respuesta:'Madrid', UserId: 2},
                    {pregunta: '¿Cuál es la capital de Italia?', respuesta:'Roma', UserId: 2},
                    {pregunta: '¿Cuál es la capital de Inglaterra?', respuesta:'Londres', UserId: 2},
                    {pregunta: '¿Cuál es la capital de Francia?', respuesta:'Paris', UserId: 2},
                    {pregunta: '¿Quién decsubrió América?', respuesta:'Colón', UserId: 2},
                    {pregunta: '¿Quién inventó la bombilla?', respuesta:'Edison', UserId: 2},
                    {pregunta: '¿Quién es el presidente de los EEUU?', respuesta:'Obama', UserId: 2},
                    {pregunta: '¿Qué moneda se utiliza en Londres?', respuesta:'Libra', UserId: 2},
                    {pregunta: '¿Qué moneda se utiliza en Suiza?', respuesta:'Franco', UserId: 2},
                    {pregunta: '¿A qué temperatura en grados ºC hierve el agua?', respuesta:'100', UserId: 2},
                    {pregunta: '¿Qué nombre reciben las crías de Jabalí?', respuesta:'Jabatos', UserId: 2},
                    {pregunta: '¿En qué lado está el acelerador en un coche?', respuesta:'Derecha', UserId: 2},
                    {pregunta: '¿Cuántos quilates tiene una pieza de oro puro?', respuesta:'24', UserId: 2},
                    {pregunta: '¿Cuántos años de mala suerte siguen a la rotura de un espejo?', respuesta:'7', UserId: 2},
                    {pregunta: '¿Cuántos años de matrimonio se celebran en las Bodas de Oro?', respuesta:'50', UserId: 2}

                  ]).then( function(){console.log('Base de datos (tabla quiz) inicializa')});
          };
        });
      });
    };
  });
});

