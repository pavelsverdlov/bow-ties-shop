var models = require('../models'),
    data = require('../data'),
    views = require("../views");

var meta = {
    'title':'Магазин галстук-бабочек '+ data.shop_name()+', ассортимент товаров',
    'keywords':'ассортимент, продажа галстук-бабочек, пошив на заказ галстук-бабочек, галстук-бабочка, вязальная бабочка, '+ data.shop_name(),
    'descr':'Ассортимент магазина галстук-бабочек - '+ data.shop_name(),
    'canonical':''
};

exports.index = function(req, res){
    meta.canonical = 'http://' + req.get('host') + req.url;

    data.repository.product.getList(function(products){
        var lvm =  models.layout.get(req);
        lvm.meta = meta;
        lvm.content ={products: products};
        res.render(views.paths.bow_ties,lvm);
    });
};