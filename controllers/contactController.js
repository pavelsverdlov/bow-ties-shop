var models = require('../models'),
    emailcontroller = require('../controllers/emailController'),
    repository = require("../data/repository"),
    views = require("../views");

exports.index = function(req, res){
    var lvm =  models.layout.get(req);
    lvm.content = '';
    res.render(views.paths.contact,lvm);
};

exports.new_order = function(req, res){
    var product = repository.product.getById(req.params.idbow);
    var lvm = models.layout.get(req);
    lvm.content = lvm.content = {
        'status': {'text':'','type':''},
        'productId': product.id,
        'productImg': product.imgPath,
        'user':lvm.user ? lvm.user : models.user.get()
    };
    res.render(views.paths.new_order,lvm);
};

exports.new_order_POST = function(req, res){
    var orderId = req.param('order-number', null);
    var product = repository.product.getById(orderId);
    var user = models.user.createModel(
        req.param('first-name', null),
        req.param('last-name', null),
        req.param('email', null)
    );
    emailcontroller.sendNewOrder(product,user,function(error, response){
        var lvm = models.layout.get(req);
        lvm.content = {
            'status': '',
            'productId': product.id,
            'productImg': product.imgPath,
            'user': user
        };
        if(error){
            lvm.content.status = {
                'text': 'Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.',
                'type': 'error'};
            console.log("Message sent: " + error);
        }else{
            lvm.content.status = {'text': 'Сообщение было успешно отправленно.', 'type': 'success'};
            console.log("Message sent: " + response.message);
        }
        res.render(views.paths.new_order,lvm);
    });
};