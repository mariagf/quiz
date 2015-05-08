var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta: '¿Cuál es la capital de Italia?'})
	})
};

// GET /quizes/answer
exports.answer = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer',{respuesta: 'Correcta'});
		} else{
			res.render('quizes/answer',{respuesta: 'Incorrecta'});
		}
	})
	
};

