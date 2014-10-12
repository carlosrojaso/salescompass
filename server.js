var http           = require('http'),
    config         = require('./server/config'),
    express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    path           = require('path'),
    knex           = require('knex')(config.knex_options),
    bookshelf      = require('bookshelf')(knex),
    models         = require('./server/models')(bookshelf),
    notifier       = require('./server/notifier'),
    restful        = require('./server/bookshelf_rest'),
    auth           = require('./server/auth')(models),
    force          = require('./server/force')
    ;

/********************* APP SETUP *****************************/

app = express();
server = http.createServer(app);
io = require('socket.io')(server);

app.set('bookshelf', bookshelf);

logger = {
  debug: config.debug,
  warn: config.warn,
  error: config.error
};


app.use(bodyParser());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'client/')));
app.use(express.static(path.join(__dirname, 'admin/')));
app.use(express.static(path.join(__dirname, 'server/pages')));

// Logging
app.use(function(req, res, next) {
  logger.debug(req.method, req.url);
  next();
});

app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send(err.message);
});


/********************* ROUTES *****************************/
// Simple hack to only allow admin to load the admin page.
app.get('/admin', auth.authenticate, auth.require_admin, function (req, res) {
  res.set('Location', '/admin_Ypzr9fLs.html');
  return res.send('OK');
});


app.use('/register', auth.register);
app.use('/login', auth.login);

app.all('/resource/*', auth.authenticate);

app.use('/resource', restful(models.Page, 'pages'));
app.use('/resource', restful(models.Answer, 'answers'));
app.use('/resource', restful(models.Script, 'scripts'));

/********************* SERVER STARTT *****************************/


app.set('port', process.env.PORT || 5000);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function(socket) {
  console.log('a user connected');
});
