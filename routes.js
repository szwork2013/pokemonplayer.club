'use strict';

const path = require('path'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    config = require('./config');

// Pokedex Data
var POKEDEX_DATA = yaml.safeLoad(fs.readFileSync('./data/pokedex.yml', 'utf8')),
    DONATION_DATA = yaml.safeLoad(fs.readFileSync('./data/donation.yml', 'utf8'));

module.exports = function (app) {

    app.get('/data/pokedex', function (req, res) {
        res.send(POKEDEX_DATA);
    });

    app.get('/data/donation', function (req, res) {
        res.send(DONATION_DATA);
    });

    app.put('/data/pokedex', function (req, res) {

        const username = req.body.username,
            password = req.body.password;

        if (config.USERNAME == username && config.PASSWORD == password) {
            POKEDEX_DATA = yaml.safeLoad(fs.readFileSync('./data/pokedex.yml', 'utf8'));
            res.send('Data updated.');
        } else {
            res.send('Wrong Username or Password.');
        }
    });

    app.put('/data/donation', function (req, res) {

        const username = req.body.username,
            password = req.body.password;

        if (config.USERNAME == username && config.PASSWORD == password) {
            DONATION_DATA = yaml.safeLoad(fs.readFileSync('./data/donation.yml', 'utf8'));
            res.send('Data updated.');
        } else {
            res.send('Wrong Username or Password.');
        }
    });

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'app.html'));
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'app.html'));
    });

};
