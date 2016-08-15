const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    webpack = require('webpack'),
    morgan = require('morgan'),
    compression = require('compression'),
    routes = require('./routes')

const webpackConfig = require('./webpack.config'),
    config = require('./config');

const workEnv = process.env.NODE_ENV || config.NODE_ENV;

var app = express();

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

// SocketIO
var io = require('socket.io')(config.SERVER_SOCKET_PROT);

var messages = [];
io.on('connection', function (socket) {

    socket.on('FETCH_ALL_MESSAGE', function () {
        io.emit('FETCH_ALL_MESSAGE_ACK', messages);
    });

    socket.on('SEND_MESSAGE', function (data) {
        messages.push(data);

        io.emit('NEW_MESSAGE', data);
        io.emit('SEND_MESSAGE_ACK', data);
    });

    socket.on('SEND_IMAGE', function (data) {
        io.emit('SEND_MESSAGE_ACK', messages);
    });

    socket.on('JOIN_CHATROOM', function (data) {
        io.emit('JOIN_CHATROOM_ACK', messages);
    });

    socket.on('LEAVE_CHATROOM', function (data) {
        io.emit('LEAVE_CHATROOM_ACK', messages);
    });

    socket.on('TYPING_MESSAGE', function (data) {
        io.emit('TYPING_MESSAGE_ACK', messages);
    });

    socket.on('STOP_TYPING_MESSAGE', function (data) {
        io.emit('STOP_TYPING_MESSAGE_ACK', messages);
    });
});

// setup routes
routes(app);

app.listen(config.SERVER_PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://' + config.SERVER_IP + ':' + config.SERVER_PORT);
});

