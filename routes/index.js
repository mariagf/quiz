var express = require('express');
var router = express.Router();
var app = express();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
// Definición de rutas de /quizes
  router.get('/quizes', quizController.index);
  router.get('/quizes/:quizId(\\d+)', quizController.show);
  router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res) {
  res.render('author', { title: 'Créditos' });
});

app.get('/listas', function(req, res){
  
  var buscar1 = req.query.buscar1;

  res.render('/quizes/listas', { variable: buscar1 });

});

module.exports = router;
