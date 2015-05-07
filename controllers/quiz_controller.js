var models = require('../models/models.js');

// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		//for (i = 0, i < quiz.length(), i++){
		  res.render('quizes/index',{ quizes: quizes})
		  //res.render('quizes/question',{ pregunta: '¿Italia?'})
		//}
	})	
};

// GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		//for (i = 0, i < quiz.length(), i++){
		  res.render('quizes/show',{ quiz: quiz})
		  //res.render('quizes/question',{ pregunta: '¿Italia?'})
		//}
	})	
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
	if (req.query.respuesta === quiz.respuesta){
	  //if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer',{respuesta: 'Correcta'});
	} else{
		res.render('quizes/answer',{respuesta: 'Incorrecta'});
	}
  })
};

