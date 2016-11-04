var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , repository = require('./data/repository')
  //, mongoStore = require('connect-mongo')(express);
//
var app = express();
//var db = repository.getConnection();

app.configure(function(){
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
  app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser());
  app.use(express.session({
      secret: 'your secret here',
      //store: new mongoStore(repository.getStoreConnectionArgs())
  }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes.init(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
