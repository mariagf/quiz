var models = require('../models/models.js');

// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/show',{quizes: quizes});
	})
};

// GET /quizes/question
exports.question = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: quiz});
	})
};

// GET /quizes/answer
exports.answer = function(req,res){
	models.Quiz.find(rew.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer',{
							quiz: quiz,
							respuesta: 'Correcta'});
		} else{
			res.render('quizes/answer',{
							quiz: quiz,
							respuesta: 'Incorrecta'});
		}
	})
	
};

