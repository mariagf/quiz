// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
		if (req.session.user){
			next();
		} else{
			res.redirect('/login');
		}
};

exports.timeout = function(req, res, err, next){
	if(req.session.user){
		var endDate = new Date();
		var time = endDate.getTime();
		//if((time - req.session.user.startTime) > 120000){
		if((time - req.session.user.startTime) > 5000){
			delete req.session.user;
			//req.flash("message", {"error" : "Bieeeeen"});

			var logout = models.Logout.build( req.body.logout );
			req.logout.logout = null;
			logout.validate().then(function(err){
			res.redirect("/login", {quiz: req.quiz, errors: err.errors});
			})  
		} else{
			req.session.user.startTime = time;
		}
	}
	next();
};

// Get /login -- Formulario de login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new',{errors: errors});
};

// POST /login -- Crear la sesión
exports.create = function(req,res){

	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
	var startDate = new Date();
	var startTime = startDate.getTime(); // En ms
	if(error){ // si hay error retornamos mensajes de error de sesión
		req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
		res.redirect("/login");
		return;
	} // Crear req.session.user y guardar campos id y username
	  // La sesión se define por la existencia de: req.session.user
	  	req.session.user = {id:user.id, username:user.username, startTime: startTime};
	  	
		res.redirect(req.session.redir.toString()); // redirección a path anterior a login
	
   });
};

//DELETE /logout -- Destruir sesión
exports.destroy = function(req,res){
		delete req.session.user;
		res.redirect(req.session.redir.toString()); // Redirect a path anterior al login 
};