var models = require('../models'),
    emailcontroller = require('../controllers/emailController'),
    repository = require("../data/repository"),
    views = require("../views");


exports.handler = function(req,res,next){
    if(/[^/]$/.test(req.url)){
        res.redirect(req.url + '/');
        return;
    }
    var lvm =  models.layout.get(req);

    res.status(404);
    lvm.content = 'Приносим свои извинения но данной страницы не существует :(';
    lvm.meta = {
        'title':'Error 404',
        'keywords':'',
        'descr':'',
        'canonical': 'http://' + req.get('host') + req.url
    };
    if(req.accepts('html')){
        res.render(views.paths.err404,lvm);
    }

//    if(req.accepts('json')){
//        res.send({error:'Not found'});
//    }
//
//    res.type('text').send('Not found');
};