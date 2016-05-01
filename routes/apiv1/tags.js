"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Anuncio = mongoose.model('Anuncio');

// Show existing tags, calling a statis method of the model Anuncio
router.get('/', function(req, res) {

    Anuncio.listTags(function(err, list) {

        if (err) {
            return ; // IMPLEMENTAR ERROR HANDLER
        }
        res.json({ok:true, tags: list});
    });
});

module.exports = router;