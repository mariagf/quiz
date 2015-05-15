var models = require('../models/models.js');
/*
//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req,res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz){
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	})//. catch(function(error){next(error);})
};

*/
// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes});
	})//.catch(function (error){next(error);});
};
/*
// GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build( // crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
		res.render('quizes/new',{quiz: quiz});
};

// POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build( req.body.quiz);

	// guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
	}) // Redirección HTTP (URL relativo) lista de preguntas
};


// GET /quizes/:id
exports.show = function(req,res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: req.quiz});
	//})
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
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		var resultado = 'Incorrecta';
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcta';
		}
			res.render('quizes/answer',{
							quiz: req.quiz,
							respuesta: resultado});
	//})
	
};
*/

// Get /quizes/:id
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	
	res.render('quizes/show',{quiz: quiz});
	})
	
};

// Get /quizes/answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	
		var resultado = 'Incorrecta';
		if (req.query.respuesta === quiz.respuesta){
			resultado = 'Correcta';
		}
			res.render('quizes/answer',{quiz: quiz, respuesta: resultado});

	})
	
};

