//var exec = require("child_process").exec;
//var model = require("../models/bowTie");
//var path = '/img/products/';
var repository = require("../data/repository");

exports.getProducts = function(req, res){
    var images = repository.product.getList(function(data){
        res.writeHead(200, {"Content-Type": "json"});
        res.write(JSON.stringify(data));
        res.end();
    });
};
exports.productRating = function(idUser,idProduct,iraty){

};

exports.getLoginForm = function(req, res){
    var html = '<form class="form-login">\
        <input type="text" class="input-small" placeholder="Email">\
        <input type="password" class="input-small" placeholder="Password">\
            <button type="submit" class="btn">Go</button>\
        </form>';
    res.writeHead(200, {"Content-Type": "html"});
    res.write(html);
    res.end();
};