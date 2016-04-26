"use strict";

var mongoose = require('mongoose');

// Schema for the anuncios

var pushTokenSchema = mongoose.Schema({
    plataforma: {
        type: String, enum: ['ios', 'android']
    },
    token: String,
    usuario: String
});

// Assign the schema to model
mongoose.model('PushToken', pushTokenSchema);