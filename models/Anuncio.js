"use strict";

var mongoose = require('mongoose');
var configTags = require('../local_config').tags;
var async = require('async');

// Schema for the anuncios

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function (filter, start, limit, sort, cb) {
    console.log('filter',filter);
    var query = Anuncio.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec(cb);
};

anuncioSchema.statics.listTags = function(callback) { 

    let tags=configTags.tags;
    let tagExistente = [];
    Anuncio.count({ tags: tags[0]}, function (err, result) {
        console.log(result);
        if (result !== 0){
            tagExistente.push(tags[0]);
        }
        Anuncio.count({ tags: tags[1]}, function (err, result) {
            console.log(result);
            if (result !== 0){
                tagExistente.push(tags[1]);
            }
            Anuncio.count({ tags: tags[2]}, function (err, result) {
                console.log(result);
                if (result !== 0){
                    tagExistente.push(tags[2]);
                }
                Anuncio.count({ tags: tags[3]}, function (err, result) {
                    console.log(result);
                    if (result !== 0){
                        tagExistente.push(tags[3]);
                    }
                    return callback(err, tagExistente);
                });
            });
        });
    });

    // async.series([
    //    function (cb) {
    //        Anuncio.count({ tags: tags[0]}, function (err, result) {
    //            if (result !==0) {
    //                tagExistente.push(tags[0]);
    //                cb(null, true);
    //            }
    //        })
    //    } ,
    //     function (cb) {
    //         Anuncio.count({ tags: tags[1]}, function (err, result) {
    //             if (result !==0) {
    //                 tagExistente.push(tags[1]);
    //                 cb(null, true);
    //             }
    //         })
    //     }
    // ], function (error, result) {
    //     if (error) {
    //         console.error('Hubo un error: ', error);
    //         return process.exit(1);
    //     }
    //     console.log('Init script ready!! Bye!!');
    //     return result;
    // });

    // let lifestyle = this.count({ tags: tags[0]});
    // let motor = this.count({ tags: tags[0]});
    // let mobile = this.count({ tags: tags[0]});

};

// lo asignamos al modelo
let Anuncio = mongoose.model('Anuncio', anuncioSchema);
