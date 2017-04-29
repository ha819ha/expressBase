var express = require('express');
var routes = require('./routes');
var app = module.exports = express.createSErver();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.moduleOverride());
	app.use(app.router);
	app.use(express.static(__dirname+'/public'));
});

app.configure('development', function(){
	app.set(express.errorHandler({ dumpExceptions : true,
								showStack: true
	}));
})

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.get('/',routes.index);
app.listen(process.env.npm_package_config_port);

console.log("%d in %s",app.adress().port,app.settings.env);