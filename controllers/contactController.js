var models = require('../models'),
    data = require('../data'),
    emailcontroller = require('../controllers/emailController'),
    repository = require("../data/repository"),
    views = require("../views");

var meta = {
    'title':'Контактная информация '+ data.shop_name()+' - Заказ и пошив галстук-бабочек',
    'keywords':'контакты, Одесса',
    'descr':'Контактная информация онлайн магазина галстук-бабочек '+ data.shop_name(),
    'canonical':''
};

exports.index = function(req, res){
    meta.canonical = 'http://' + req.get('host') + req.url;

    var lvm =  models.layout.get(req);
    lvm.meta = meta;
    lvm.content = [];
    lvm.content.status='';
    res.render(views.paths.contact,lvm);
};

exports.new_order = function(req, res){
    var product = repository.product.getById(req.params.idbow);
    var lvm = models.layout.get(req);
    lvm.meta = {
        'title':'Заказ галстук-бабочки',
        'keywords':'',
        'descr':'',
        'canonical': 'http://' + req.get('host') + req.url
    };
    lvm.content = {
        'status': '',
        'productId': product._id,
        'productImg': product.imgPath,
        'user':lvm.user ? lvm.user : models.user.get()
    };
    res.render(views.paths.new_order,lvm);
};

exports.send_mail = function(req, res){
    var user = req.session.is_auth ? req.session.user :
        models.user.get(
            req.param('first-name', null),
            req.param('last-name', null),
            req.param('email', null)
        );
    emailcontroller.sendSimpleEmail(user,req.param('comments', null),
        function(error, response){
            meta.canonical = 'http://' + req.get('host') + req.url;
            var lvm =  models.layout.get(req);
            lvm.meta = meta;
            lvm.content = {status:''};
            if(error){
                lvm.content.status = '<div class="alert alert-error">Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.</div>';
                console.log("contactComtroller.send_mail: " + error);
            }else{
                lvm.content.status = '<div class="alert alert-success">Сообщение было успешно отправленно.</div>';
                console.log("contactComtroller.send_mail: " + response.message);
            }
            res.render(views.paths.contact,lvm);
        });
};

exports.new_order_POST = function(req, res){
    var orderId = req.param('order-number', null);
    var product = repository.product.getById(orderId);

    var user = req.session.is_auth ? req.session.user :
        models.user.createModel(
            req.param('first-name', null),
            req.param('last-name', null),
            req.param('email', null)
        );

    emailcontroller.sendNewOrder(product,user,function(error, response){
        var lvm = models.layout.get(req);
        lvm.meta = {
            'title':'Заказ галстук бабочки',
            'keywords':'',
            'descr':'',
            'canonical': 'http://' + req.get('host') + req.url
        };
        lvm.content = {
            'status': '',
            'productId': product._id,
            'productImg': product.imgPath,
            'user': user
        };
        if(error){
            lvm.content.status = '<div class="alert alert-error">Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.</div>';
            console.log("Message sent: " + error);
        }else{
            lvm.content.status = '<div class="alert alert-success">Сообщение было успешно отправленно.</div>';
            repository.user.addOrderAsync(user,orderId);
            console.log("Message sent: " + response.message);
        }

        res.render(views.paths.new_order,lvm);
    });
};