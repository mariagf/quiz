var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
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
		res.render('quizes/index', {quizes: quizes});
	}).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req,res){
	
		res.render('quizes/show',{quiz: req.quiz});
	
};

exports.lista = function(req,res){
	var x = req.query.busqueda;
	var y = x.replace(/\s+/g, '%');
	models.Quiz.findAll({where: ["pregunta like ?", '%' + y + '%'], order: [["pregunta", 'ASC']]}).then(function(quizes){

		res.render('quizes/lista',{quizes: quizes});
	})
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecta';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcta';
	} res.render('quizes/answer',{
							quiz: req.quiz,
							respuesta: resultado});	
};

