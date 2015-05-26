var models = require('../models/models.js');

exports.lista = function(req, res){
    var x = req.query.busqueda;
    var y = x.replace(/\s+/g, '%');
    models.Quiz.findAll({ where: ["pregunta like ?", '%' + y + '%'], order: [["pregunta", 'ASC']] }).then(function(quizes){
        res.render('quizes/lista',{ quizes: quizes, errors: [] });
    })
};          