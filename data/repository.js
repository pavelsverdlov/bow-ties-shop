var MongoClient = require('mongodb').MongoClient;
var user ='bts_mdbd';
var pass='jltccrfzblacc20';
var url = 'mongodb://bts_mdbd:jltccrfzblacc20@dharma.mongohq.com:10092/bow-ties-shop';
var products;

MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    console.log("connected");
    var collection = db.collection('products');
    collection.find({}, {limit:10}).toArray(function(err, docs) {
//        console.dir(docs);
        products = docs;
    });
})


var exec = require("child_process").exec;
var model = require("../models/bowTie");
var path = '/img/products/';

exports.getBowTies = function(func){
    var data = [];
    for(var i=0; i < products.length; ++i){
        data.push(model.createBowTie(products[i]));
    }
    func(data);

//    exec("ls public"+path, function (error, stdout, stderr) {
//        var images= stdout.split('\n');
//        var data = [];
//        for(var i=0; i < images.length; ++i){
//            if(images[i] !== ""){
//                data.push(model.createBowTie("Двусторонний галстук-бабочка",path + images[i],4,100));
//            }
//        }
//        func(data);
//    });
}


/*
    Mongo Console
*   mongo dharma.mongohq.com:10092/bow-ties-shop -u <user> -p<password>
*
*   Mongo URI
*   mongodb://<user>:<password>@dharma.mongohq.com:10092/bow-ties-shop
*
* user: bts_mdbd
* pass: jltccrfzblacc20
*
* */