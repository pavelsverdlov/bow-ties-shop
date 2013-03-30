var layout_data = require('../models/layout-viewmodel')

exports.index = function(req, res){
    var lvm =  layout_data.get();
    lvm.content = '';
    res.render('../views/home.ejs',lvm);
};