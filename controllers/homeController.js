var layout_data = require('../models/layout-viewmodel')
    views = require("../views");

exports.index = function(req, res){
    var lvm =  layout_data.get();
    lvm.content = '';
    res.render(views.paths.home,lvm);
};