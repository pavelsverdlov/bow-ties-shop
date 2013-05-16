var layout_data = require('../models/layout-viewmodel'),
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

    var lvm =  layout_data.get(req);
    lvm.meta = meta;
    lvm.content = '';
    res.render(views.paths.bow_ties,lvm);
};