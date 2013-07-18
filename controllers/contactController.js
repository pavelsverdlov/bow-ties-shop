var models = require('../models'),
    data = require('../data'),
    emailcontroller = require('../controllers/emailController'),
    repository = require("../data/repository"),
    log = require('../controllers/loggerController'),
    views = require("../views");

var meta = {
    'title':'Контактная информация '+ data.shop_name()+' - Заказ и пошив галстук-бабочек',
    'keywords':'контакты, Одесса',
    'descr':'Контактная информация онлайн магазина галстук-бабочек '+ data.shop_name(),
    'canonical':''
};

var module_name = 'contractController';

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
        'productId': product.id,
        'productImg': product.imgPath,
        'user':req.session.is_auth ? req.session.user : models.user.get('','','')
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
        function(error){
            meta.canonical = 'http://' + req.get('host') + req.url;
            var lvm =  models.layout.get(req);
            lvm.meta = meta;
            lvm.content = {status:''};
            if(error){
                write_er_log(null,user,'send_mail',error);
                lvm.content.status = '<div class="alert alert-error">Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.</div>';
                console.log("contactComtroller.send_mail: " + error);
            }else{
                lvm.content.status = '<div class="alert alert-success">Сообщение было успешно отправленно.</div>';
                console.log("contactComtroller.send_mail: " );
                write_debug_log(null,user,'send_mail','ok');
            }
            res.render(views.paths.contact,lvm);
        });
};

exports.new_order_POST = function(req, res){
    if(req.session.is_auth){
        write_debug_log(null,req.session.user,'new_order_POST','The user was auth.');
        sendNewOrder(req.session.user, req, res);
    }else{//look for in db
        repository.user.findOrCreateAsync(
            req.param('email', null),req.param('first-name', null),req.param('last-name', null),
            function(error,_user){
                if(error){
                    new_order_response(error, _user, req, res);
                }else{
                    _user.phone = req.param('phone', null);
                    write_debug_log(null,_user,'new_order_POST','The not auth user was created/found successful.');
                    sendNewOrder(_user, req, res);
                }
            }
        );
    }
};

function sendNewOrder(user, req, res){
    var orderId = req.param('order-number', null);
    var comments = req.param('comments', null);
    var product = repository.product.getById(orderId);
    emailcontroller.sendNewOrder(product,user, comments,
        function(error){
            write_debug_log(product,user,'sendNewOrder','The message: ');
            new_order_response(error, user, req, res);
        }
    );
};

function new_order_response(error, user, req, res){
    var orderId = req.param('order-number', null);
    var product = repository.product.getById(orderId);
    var lvm = models.layout.get(req);
    lvm.meta = {
        'title':'Заказ галстук бабочки',
        'keywords':'',
        'descr':'',
        'canonical': 'http://' + req.get('host') + req.url
    };
    lvm.content = {
        'status': '',
        'productId': product.id,
        'productImg': product.imgPath,
        'user': user
    };
    if(error){
        write_er_log(product,user,'new_order_response',error);
        lvm.content.status = '<div class="alert alert-error">Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.</div>';
        console.log("Message sent: " + error);
    }else{
        write_debug_log(product,user,'new_order_response','The message was sent successful.');
        lvm.content.status = '<div class="alert alert-success">Сообщение было успешно отправленно.</div>';
        repository.user.addOrderAsync(user,orderId);
    }

    res.render(views.paths.new_order,lvm);
};

function write_er_log(product,user,method,error){
    log.error(module_name, method,
        ' product: ' + product ? product.id : '' +
        ' user: ' + user ? user.id : '', error);
};
function write_debug_log(product,user,method,descr){
    log.debug(module_name, method, +
        ' product: ' + product ? product.id : '' +
        ' user: ' + user ? user.id : '' +
        ' ' + descr);
};