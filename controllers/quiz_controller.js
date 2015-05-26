var models = require('../models/models.js');

// MW que permite acciones solamente si el quiz objeto
// pertenece al usuario logeado o si es cuenta admin
exports.ownershipRequired = function(req, res, next){
	var objQuizOwner = req.quiz.UserId;
	var logUser = req.session.user.id;
	var isAdmin = req.session.user.isAdmin;

	if (isAdmin || objQuizOwner === logUser) {
		next();
	} else {
		res.redirect('/');
	}
};

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find({ 
		where: { id: Number(quizId) },
		include:[{ model: models.Comment }]
	}).then(function(quiz){
		if(quiz) {
			req.quiz = quiz;
			next();
		} else { 
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error) { next(error) });
};

// GET /quizes
exports.index = function(req, res, next){
	var options = {};
	if (req.user){	// req.user es creado por autoload de usuario si la ruta lleva el parámetro .quizId
		options.where = { UserId: req.user.id }
	}
	options.include = { model: models.User, as: "Followers" }
	models.Quiz.findAll(options).then(function(quizes){ //Buscamos todas las preguntas que tengan followers
        if(req.session.user){
            quizes.forEach(function(quiz){ //Buscamos todos los followers del quiz
                quiz.selected = quiz.Followers.some(function(follower) {
                    return follower.id == req.session.user.id 
                }); //Comprobamos que el follower concida con el usuario loggeado
            });
        }
        res.render('quizes/index', { quizes: quizes, errors: [] });
	}).catch(function(error) { next(error) });
};

// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.findAll({
		where: {id:req.params.quizId}, 
		include:{model: models.User, as: "Followers"}
	}).then(function(quizes){
         if (req.session.user){
            quizes.forEach(function(quiz){
                req.quiz.selected = quiz.Followers.some(function(follower){
                    return follower.id === req.session.user.id
                });
            });
        }
        res.render('quizes/show', { quiz: req.quiz, errors: [] });
    });
};

// GET /author
exports.author = function(req, res){
	res.render('author', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz; //autoload de instancia de quiz
	res.render('quizes/edit', { quiz: quiz, errors: [] });
};

// DELETE /quizes/:id
exports.destroy = function(req, res, next){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error) { next(error) });
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build({ pregunta: "Pregunta", respuesta: "Respuesta" }); // crea objeto quiz
	res.render('quizes/new', { quiz: quiz, errors: [] });
};

exports.statistics = function(req, res, next){
	models.Comment.findAll().then(function(comment){
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/statistics', { quiz: req.quiz, quizes: quizes, comment: comment, errors: [] });
		})
	}).catch(function(error) { next(error)});
};

exports.lista = function(req, res){
	var x = req.query.busqueda;
	var y = x.replace(/\s+/g, '%');
	models.Quiz.findAll({where: ["pregunta like ?", '%' + y + '%'], order: [["pregunta", 'ASC']]}).then(function(quizes){
		res.render('quizes/lista',{ quizes: quizes, errors: [] });
	})
};

// POST /quizes/create
exports.create = function(req, res, next){
	req.body.quiz.UserId = req.session.user.id;
	if(req.files.image){
		req.body.quiz.image = req.files.image.name;
	}
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', { quiz:quiz, errors: err.errors });
		} else{ // guarda en DB los campos pregunta y respuesta de quiz
			quiz.save({ fields: ["pregunta", "respuesta", "UserId", "image"] }).then(function(){
				res.redirect('/quizes')
			}) // res.redirect: Redirección HTTP a lista de preguntas
		}	
  	}).catch(function(error){ next(error) });;
};

// PUT /quizes/:id
exports.update = function(req, res){
	if(req.files.image){
		req.body.quiz.image = req.files.image.name;
	}
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		} else{ // guarda en DB los campos pregunta y respuesta de quiz
			req.quiz.save({ fields: ["pregunta", "respuesta", "image"] }).then(function(){
				res.redirect('/quizes');
			}); // res.redirect: Redirección HTTP a lista de preguntas
		}
   });
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecta';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcta';
	} res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado, errors: [] });	
};