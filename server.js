const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    yaml = require('js-yaml'),
    fs = require('fs');

// Data
const POKEDEX_DATA = yaml.safeLoad(fs.readFileSync('./data/pokedex.yml', 'utf8'));

const webpackConfig = require('./webpack.config'),
    config = require('./config');

var app = express(),
    workEnv = process.env.NODE_ENV || config.NODE_ENV;

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

app.get('/data/pokedex', function (req, res) {
    res.send(POKEDEX_DATA);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'app.html'));
});

app.listen(config.LOCAL_DEV_PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://' + config.LOCAL_DEV_IP + ':' + config.LOCAL_DEV_PORT);
});
