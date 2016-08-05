const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    webpack = require('webpack'),
    morgan = require('morgan'),
    compression = require('compression'),
    yaml = require('js-yaml'),
    fs = require('fs');

const webpackConfig = require('./webpack.config'),
    config = require('./config');

const workEnv = process.env.NODE_ENV || config.NODE_ENV;

var app = express();

// Pokedex Data
var POKEDEX_DATA = yaml.safeLoad(fs.readFileSync('./data/pokedex.yml', 'utf8'));

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

app.get('/data/pokedex', function (req, res) {
    res.send(POKEDEX_DATA);
});

app.put('/data/pokedex', function (req, res) {

    var username = req.body.username,
        password = req.body.password;

    if (config.USERNAME == username && config.PASSWORD == password) {
        POKEDEX_DATA = yaml.safeLoad(fs.readFileSync('./data/pokedex.yml', 'utf8'));
        res.send('Data updated.');
    } else {
        res.send('Wrong Username or Password.');
    }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'app.html'));
});

app.listen(config.SERVER_PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://' + config.SERVER_IP + ':' + config.SERVER_PORT);
});
