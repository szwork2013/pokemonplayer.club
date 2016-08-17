const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    webpack = require('webpack'),
    morgan = require('morgan'),
    compression = require('compression'),
    http = require('http'),
    socketIO = require('socket.io'),
    routes = require('./routes');

const chatSocket = require('./socket/chat'),
    pokeserverSocket = require('./socket/pokeserver');

const webpackConfig = require('./webpack.config'),
    config = require('./config');

const workEnv = process.env.NODE_ENV || config.NODE_ENV;

var app = express();
var server = http.createServer(app);
var io = socketIO.listen(server);

if (workEnv === 'development') {

    var compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
} else {
    app.use('/dist', express.static('dist'));
}

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// compression
app.use(compression());

// logger
app.use(morgan('[:date[iso]] :method :url :status :response-time[digits]ms :res[content-length] :remote-user :remote-addr HTTP/:http-version'));

// setup routes
routes(app);

// socketio
chatSocket(io);
pokeserverSocket(io);

server.listen(config.SERVER_PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://' + config.SERVER_IP + ':' + config.SERVER_PORT);
});
