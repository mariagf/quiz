var models = require('../models/models.js');

exports.index = function(req, res, next) {
    req.user.getFavourites().then(function(favs){ //selecciono todos los favoritos del usuario
        favs.forEach(function(favourite){
            favourite.selected = true; //para cada uno pongo su parámetro a true
        });
        //res.render('quizes/listaFavourites',{ quizes: favs, errors: [] });
        res.render('quizes/index',{ quizes: favs, errors: [] });
    }).catch(function(error) { next(error) });
};

exports.fav = function(req, res, next){
    req.user.addFavourites(req.quiz).then(function(){
        res.redirect('/quizes');       
    }).catch(function(error) { next(error) });
};                      
                
//DELETE /quizes/:userId/favourites/:quizId                
exports.unfav = function(req, res, next){
    req.user.removeFavourites(req.quiz).then(function(){
        res.redirect('/quizes');
    }).catch(function(error) { next(error) });
};                            