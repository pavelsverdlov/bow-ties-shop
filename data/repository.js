
exports.getConnection = function(){

};

exports.getStoreConnectionArgs = function(){

};

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

//        }
    },
    findById: function(id,callback){
        var col_name = this.name;

    },
    findOrCreateAsync: function(email,firstName, lastName, callback){
        var col_name = this.name;

    },
    findAsync: function(email,firstName, lastName, callback){
        var col_name = this.name;

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

};
function update(collection_name, keys, fields, safe, callback){

};
function save(collection_name, model, callback){

};

function find(collection_name, callback){

};

function connect(collection_name,action){

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