var view = require('../views/view').view;

exports.index = function(req, res){
    view(res,'bow_ties.ejs','');
};