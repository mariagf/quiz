var models = require('../models/models.js');

// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes});
	})
};

// GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: quiz});
	})
};

exports.lista = function(req,res){
	var x = req.query.busqueda;
	var y = x.replace(/\s+/g, '%');
	models.Quiz.findAll({where: ["pregunta like ?", '%' + y + '%'], sort: [pregunta, descending]}).then(function(quizes){

		res.render('quizes/lista',{quizes: quizes});
	})
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
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

