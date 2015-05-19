var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	
	models.Quiz.find({ where: {id: Number(quizId)},
						include:[{model: models.Comment}]
		})
	.then(
		function(quiz){
			if(quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId));}
		}).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, errors: []});
	}).catch(function(error) { next(error)});
};

// GET /quizes/:id
exports.show = function(req,res){
		res.render('quizes/show',{quiz: req.quiz, errors: []});
};

// GET /author
exports.author = function(req,res){
		res.render('author',{quiz: req.quiz, errors: []});
};

// GET /quizes/:id/edit
exports.edit = function(req,res){
		var quiz = req.quiz; //autoload de instancia de quiz
		res.render('quizes/edit',{quiz: quiz, errors: []});
};

// DELETE /quizes/:id
exports.destroy = function(req,res){
		req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error) { next(error)});
};

// GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build( // crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
		res.render('quizes/new',{quiz: quiz, errors: []});
};

exports.statistics = function(req,res){
	
	models.Comment.findAll().then(function(comment){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/statistics',{quiz: req.quiz, quizes: quizes, comment: comment, errors: []});
	})
	}).catch(function(error) { next(error)});
};

exports.lista = function(req,res){
	var x = req.query.busqueda;
	var y = x.replace(/\s+/g, '%');
	models.Quiz.findAll({where: ["pregunta like ?", '%' + y + '%'], order: [["pregunta", 'ASC']]}).then(function(quizes){

		res.render('quizes/lista',{quizes: quizes});
	})
};

// POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build( req.body.quiz );
	
	quiz.validate().then(function(err){

	if(err){
		res.render('quizes/new', {quiz:quiz, errors: err.errors});

	} else{ // guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){

		res.redirect('/quizes')
	}) // res.redirect: Redirección HTTP a lista de preguntas
	}
   }
  );
};

// PUT /quizes/:id
exports.update = function(req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	req.quiz.validate().then(function(err){

	if(err){
		res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});

	} else{ // guarda en DB los campos pregunta y respuesta de quiz
	req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){

		res.redirect('/quizes');
	}); // res.redirect: Redirección HTTP a lista de preguntas
	}
   }
  );
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecta';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcta';
	} res.render('quizes/answer',{
							quiz: req.quiz,
							respuesta: resultado,
							errors: [] });	
};