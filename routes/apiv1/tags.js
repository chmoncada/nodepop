'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Anuncio = mongoose.model('Anuncio');

let jwtAuth = require('../../lib/jwtAuth');

router.use(jwtAuth()); // We need to check if the call has the right token

// Show existing tags, calling a static method of the model Anuncio
router.get('/', function(req, res, next) {

    Anuncio.listTags(function(err, list) {

        if (err) {
            return next(err);
        }

        res.json({sucess: true, tags: list});
    });
});

module.exports = router;
