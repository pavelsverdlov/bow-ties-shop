var models = require('../models');
var emailcontroller = require('../controllers/emailController');
var views ={
    contact:'../views/contact.ejs',
    new_order: '../views/new_order.ejs'
};


exports.index = function(req, res){
    var lvm =  models.layout.get();
    lvm.content = '';
    res.render(views.contact,lvm);
};

exports.new_order = function(req, res){
    var lvm = models.layout.get();
    lvm.content = lvm.content = {
        'status': '',
        'orderId': req.params.idbow,
        'user':models.user.create('','','')
    };
    res.render(views.new_order,lvm);
};

exports.new_order_POST = function(req, res){
    var orderId = req.param('order-number', null);

    var user = models.user.create(
        req.param('first-name', null),
        req.param('last-name', null),
        req.param('email', null)
    );
    emailcontroller.sendNewOrder(orderId,user,function(error, response){
        var lvm = models.layout.get();
        orderId = 'kjndsnfshgheq3r';
        if(error){
            console.log(error);
            lvm.content = '';
        }else{
            lvm.content = {
                'status': '',
                'orderId': orderId,
                'user': user
            };
            console.log("Message sent: " + response.message);
        }
        res.render(views.new_order,lvm);
    });
}