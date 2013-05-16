var layout_data = require('../models/layout-viewmodel'),
    data = require('../data'),
    views = require("../views");

var meta = {
    'title':'Продажа галстук-бабочек, пошив на заказ галстук-бабочек - '+ data.shop_name(),
    'keywords':'продажа галстук-бабочек, пошив на заказ галстук-бабочек, галстук-бабочка, вязальная бабочка, '+ data.shop_name(),
    'descr':'Продажа и пошив на заказ галстук-бабочек. Оформить заказ можно просто написав - ' + data.email(),
    'canonical':''
};

exports.index = function(req, res){
    meta.canonical = 'http://' + req.get('host') + req.url;

    var lvm =  layout_data.get(req);
    lvm.meta = meta;
    lvm.content = '';

    res.render(views.paths.home,lvm);
};