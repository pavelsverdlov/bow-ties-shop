var mongoClient = require('mongodb').MongoClient;

var user ='bts_mdbd',
    pass='jltccrfzblacc20',
    url = 'mongodb://bts_mdbd:jltccrfzblacc20@dharma.mongohq.com:10092/bow-ties-shop';

//var exec = require("child_process").exec;
var model = require("../models");
var path = '/img/products/';

var products =[],
    users =[];
/*
mongoClient.connect(url, function(err, db) {
    if(err) throw err;
    console.log("connected");
    var collection = db.collection('products');
    collection.find({}, {limit:10}).toArray(function(err, docs) {
//        console.dir(docs);
//        products = docs;
        for(var i=0; i < docs.length; ++i){
            products.push(model.bowtie.createBowTie(docs[i]));
        }
    });
    db.collection('users').find({}, {limit:10}).toArray(function(err, docs) {
        for(var i=0; i < docs.length; ++i){
            users.push(model.user.createModel(docs[i]));
        }
    });
});
*/

exports.getConnection = function(){
    //return url;//
    return mongoClient.connect(url);
};

exports.getStoreConnectionArgs = function(){
    return {
        db: 'bow-ties-shop',
        host: 'dharma.mongohq.com',
        port: '10092',
        username:user,
        password: pass
    };
};
/*
exports.getProductById = function(idBowTie){
    for(var i=0; i < products.length; ++i){
        if(idBowTie === products[i].id){
            return products[i];
        }
    }
};

exports.getBowTies = function(func){
//    var data = [];
//    for(var i=0; i < products.length; ++i){
//        data.push(model.createBowTie(products[i]));
//    }
//    func(data);
    func(products);

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
};
*/
//=================================================

exports.Product =  {
    name: 'products',

    getById: function(id){
        for(var i=0; i < products.length; ++i){
            if(id === products[i].id){
                return products[i];
            }
        }
    },
    getList: function(func){
        if(products.length){
            func(products);
            return;
        }
        find(name, function(err, docs){
            if(err) throw err;
            for(var i=0; i < docs.length; ++i){
                products.push(model.bowtie.createBowTie(docs[i]));
            }
            func(products);
        });
    },
    save: function(model){

    }
};
exports.User = {
    name: 'users',

    findById: function(id, callback){
        for(var i=0; i < users.length; ++i){
            if(id === users[i].id){
                return users[i];
            }
        }
    },
    getList: function(func){
        if(users.length){
            func(users);
            return;
        }
        find(name, function(err, docs){
            if(err) throw err;
            for(var i=0; i < docs.length; ++i){
                users.push(model.user.createModel(docs[i]));
            }
            func(users);
        });
    },
    save: function(model){
        save(name,model,function(err, i){

        });
    }
};

function save(collection_name, model, callback){
    connect(collection_name,function(db){
        db.collection(collection_name)
            .save(JSON.stringify(model),{safe:true}, callback);
    });
};

function find(collection_name, callback){
    connect(collection_name,function(db){
        db.collection(collection_name)
            .find({}, {limit:10}).toArray(callback);
    });
};

function connect(collection_name,action){
    mongoClient.connect(url, function(err, db) {
        if(err){
            console.log("connected exception: "+err);
        }else{
            action(db);
        }
        /*
        console.log("connected");
        db.collection(collection_name).find({}, {limit:10}).toArray(function(err, docs) {
    //        console.dir(docs);
    //        products = docs;
            for(var i=0; i < docs.length; ++i){
                products.push(model.bowtie.createBowTie(docs[i]));
            }
        });
        db.collection('users').find({}, {limit:10}).toArray(function(err, docs) {
            for(var i=0; i < docs.length; ++i){
                users.push(model.user.createModel(docs[i]));
            }
        });*/
    });
};
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