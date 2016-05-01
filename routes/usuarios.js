"use strict";

var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var config = require('../local_config');

var express = require('express');
var router = express.Router();

var Usuario = require('mongoose').model('Usuario');

// Authenticate usuario
router.post('/authenticate', function (req, res) {
    var user = req.body.email;
    var pass =crypto.createHash('sha256').update(req.body.clave).digest('hex');

    Usuario.findOne({email: user}).exec(function (err, user) {
        if(err){
            return res.status(500).json({ success: false, error: err});
        }
        if(!user) {
            return res.status(401).json({ success: false, error: 'Auth failed. User not found'});
        }
        if(user.clave !== pass) {
            return res.status(401).json({ success: false, error: 'Auth failed. invalid password'});
        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {
            expiresIn: '2 days'
        });
        res.json({success: true, token: token});

    });
});

//Register new usuario
router.post('/register', function (req, res) {
    let nombre = req.body.nombre;
    let user = req.body.email;
    let clave =crypto.createHash('sha256').update(req.body.clave).digest('hex');

    // First, we check if the username exist in the DB to not create a duplicate one
    Usuario.findOne({email: user}).exec(function (err, user) {
        if(err){
            return res.status(500).json({ success: false, error: err});
        }
        if(user) {
            return res.status(403).json({ success: false, error: 'Register failed. User already exist'});
        } else {
            let email = req.body.email;
            let newUsuario = new Usuario({
                nombre: nombre,
                email: email,
                clave: clave
            });            

            console.log('Saving usuario: ' + newUsuario.nombre, ' ...');
            newUsuario.save(function (error,usuarioCreado) {
                if (error) {
                    console.log(error);
                    console.log('Usuario not saved: ', newUsuario.nombre);
                    process.exit();//mejorarlo con pasar el error al callback de async.series
                }
                console.log('OK');
                res.status(200).json({success: true, newUser: usuarioCreado });
            });
        }
    });
})


module.exports = router;