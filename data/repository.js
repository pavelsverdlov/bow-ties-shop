var mongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    crypto = require('crypto');


//var exec = require("child_process").exec;
var models = require("../models");
var path = '/img/products/';

var products =[],
    users =[];

mongoClient.connect(url, function(err, db) {
    if(err) throw err;
    console.log("connected");
    var collection = db.collection('products');
    collection.find({}, {limit:0}).toArray(function(err, docs) {
        for(var i=0; i < docs.length; ++i){
            products.push(models.bowtie.createBowTie(docs[i]));
        }
    });
//    db.collection('users').find({}, {limit:0}).toArray(function(err, docs) {
//        for(var i=0; i < docs.length; ++i){
//            users.push(models.user.createModel(docs[i]));
//        }
//    });
});

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

exports.product =  {
    name: 'products',

    getById: function(id){
        for(var i=0; i < products.length; ++i){
            if(id === products[i].id){
                return products[i];
            }
        }
    },
    getList: function(func){

        find(this.name, function(err, docs){
            if(err) throw err;
            if(products.length){
                func(products);
                return;
            }
            for(var i=0; i < docs.length; ++i){
                products.push(models.bowtie.createBowTie(docs[i]));
            }
            func(products);
        });
    },
    save: function(model){

    }
};
exports.user = {
    name: 'users',
    find: function(passwd,email,callback){
//        if(users.length){
//            for(var i=0; i < users.length; ++i){
//                if(crypt.encrypt(passwd,users[i].salt) === users[i].hashed_password && email == users[i].email){
//                    callback(null,users[i]);
//                    return;
//                }
//            }
//            callback('user was not found',null);
//        }else{
            var col_name = this.name;
            connect('',function(db){
                db.collection(col_name).find( {email: email }, {limit:1}).toArray(
                    function(err, docs) {
                        if(docs.length){
                            var _user = models.user.createModel(docs[0]);
                            if(crypt.encrypt(passwd,_user.salt) === _user.hashed_password){
                                callback(null,_user);
                            }else{
                                callback('Password is not correct',null);
                            }
                        }else{
                            callback(err,null);
                        }
                    }
                );
            });
//        }
    },
    findById: function(id,callback){
        var col_name = this.name;
        connect('',function(db){
            db.collection(col_name).find( {_id: ObjectID(id)}, {limit:1}).toArray(
                function(err, docs) {
                    if(docs.length){
                        callback(err,models.user.createModel(docs[0]));
                    }else{
                        callback(err,null);
                    }
                }
            );

        });
    },
    findOrCreateAsync: function(email,firstName, lastName, callback){
        var col_name = this.name;
        connect('',function(db){
            db.collection(col_name).find( {email: email, firstName: firstName, lastName:lastName }, {limit:1})
                .toArray(function(err, docs) {
                    if(docs.length){
                        callback(null,models.user.createModel(docs[0]));
                    }else{
                        var model = models.user.get(firstName,lastName,email);
                        exports.user.save(model,function(err, i){
                            callback(err,i > 0 ? model : null);
                        });
                    }
            });
        });
    },
    findAsync: function(email,firstName, lastName, callback){
        var col_name = this.name;
        connect('',function(db){
            db.collection(col_name).find( {email: email, firstName: firstName, lastName:lastName }, {limit:1})
                .toArray(function(err, docs) {
                    if(docs.length){
                        callback(null,models.user.createModel(docs[0]));
                    }else{
                        callback(err,null);
                    }
                });
        });
    },

    getList: function(func){
//        if(users.length){
//            func(users);
//            return;
//        }
        find(this.name, function(err, docs){
            if(err) throw err;
            for(var i=0; i < docs.length; ++i){
                users.push(models.user.createModel(docs[i]));
            }
            func(users);
        });
    },
    save: function(model,callback){
        model._id  = new ObjectID();
        if(model.passwd && model.passwd !== ''){
            model.idate_reg = parseInt(+(new Date()));
            model.salt = crypt.makeSalt();
            model.hashed_password = crypt.encrypt(model.passwd,model.salt);
        }
        save(this.name,model,function(err, i){
            model.id = model._id.toHexString();
            callback(err, i, model);
        });
    },
    resave: function(model,callback){
        remove(this.name,{_id:ObjectID(model.id)}, function(err, numberOfRemovedDocs){
            if(err){
                callback(err,numberOfRemovedDocs,model);
            }else{
                exports.user.save(model,callback);
            }
//            model._id  = new ObjectID();
//            model.idate_reg = parseInt(+(new Date()));
//            model.salt = crypt.makeSalt();
//            model.hashed_password = crypt.encrypt(model.passwd,model.salt);
//            save(this.name,model,function(err, i){
//                model.id = model._id.toHexString();
//                callback(err, i, model);
//            });
        });
    },
    confirmAuth: function(id,callback){
        update(this.name, {_id:ObjectID(id)},{$set: {isConfirm:true}}, {safe:false});
    },
    addOrderAsync: function(_user,id_product){
        _user.orders.push(id_product);
        update(this.name, {_id:ObjectID(_user.id)},{$set: {orders: _user.orders}}, {safe:false});
    }
};
function remove(collection_name, keys, callback){
    connect(collection_name,function(db){
        db.collection(collection_name)
            .remove(keys, callback || function(){ });
    });
};
function update(collection_name, keys, fields, safe, callback){
    connect(collection_name,function(db){
        db.collection(collection_name)
            .update(keys, fields, safe, callback || function(){ });
    });
};
function save(collection_name, model, callback){
    connect(collection_name,function(db){
        db.collection(collection_name)
            .save(model,{safe:true},  callback || function(){});//JSON.stringify(
    });
};

function find(collection_name, callback){
    connect(collection_name,function(db){
        db.collection(collection_name)
            .find({}, {limit:10}).toArray( callback || function(){});
    });
};

function connect(collection_name,action){
    mongoClient.connect(url, function(err, db) {
        if(err){
            console.log("connected exception: "+err);
        }else{
            action(db);
        }
       // mongoClient.close();
    });
};

var crypt = {
    encrypt:function(password,salt) {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
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