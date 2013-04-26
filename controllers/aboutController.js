var models = require('../models'),
    views = require("../views");

exports.index = function(req, res){
    var lvm =  models.layout.get();
    lvm.content = '';
    res.render(views.paths.about,lvm);
};
