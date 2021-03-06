// Provide routes specificly for API GET requests for Recruteur Schema

// DB Models ==================================
var Recruteur = require('../../../models/Recruteur.js');
var verifyAPIKey = require('../../../routesCtrls/api.routes.controller');

// Exported API calls ========================================================
module.exports = function(app, db) {
    // RECRUTEURS ========================================================================
    // get a list of all recruteurs
    app.get('/api:key/recruteurs', function(req, res) {
        verifyAPIKey(req.params.key, req, res, function(req, res) {
            // ToDo : hide password
            Recruteur.find(function(err, thing) {
                if (err) {
                    console.log(err);
                }
                var i
                var len = thing.length
                for (i = 0; i < len; i++) {
                    thing[i].password = 'we keep it secret ;)'
                }
                res.json(thing); // prints all recruteurs in json format to the response page
            });
        });
    });
    // get 1-recruteur informations by id
    app.get('/api:key/recruteurs/:id', function(req, res) {
        verifyAPIKey(req.params.key, req, res, function(req, res) {
            Recruteur.findOne({ _id: req.params.id }, function(err, thing) {
                if (err) {
                    console.log(err);
                }
                thing.password = 'we keep it secret ;)'
                res.json(thing); // prints recruteur infos in json format to the response page
            });
        });
    });
};