var nodemailer = require("nodemailer"),
    fs = require('fs');
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sverdlov24@gmail.com",
        pass: "crf@kjvfyek@gfhjk6!"
    }
});

exports.sendNewOrder = function(product,user,callback){

    var templ = '<div>\
        <h3>Bow Ties Shop</h3>\
        <div>\
        <span>Здравствуйте, '+user.lastName +' ' + user.firstName + '!</span>\
        <br/>\
        <span>Вы сделали заказ на покупку бачки №' + product.id +'</span>\
        <br/>\
        <span>Цена: '+product.price+' грн.; '+ product.descr +'</span>\
        </div>\
        <img style="width: 20%" src="'+product.imgPath+'"/>\
        </div>';

    var mailOptionsOrderer = {
        from: 'Магазин галстук-бабочки<bow-ties-shop@gmail.com>',
        to: user.email, // list of receivers
        subject: 'Заказ галстук-бабочки - ' + product.id, // Subject line
        text: 'Здравствуйте ' + user.firstName +' ' + user.lastName, // plaintext body
        html: templ
    }
    var mailOptions = {
        from: 'Магазин галстук-бабочки<bow-ties-shop@gmail.com>',
        to: smtpTransport.options.auth.user,
        subject: 'Заказали галстук-бабочку - ' + product.id, // Subject line
        text: 'Пользователь ' + user.firstName +' ' + user.lastName + 'заказал галстук-бабочку.', // plaintext body
        html: templ
    }
    //send us
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            callback(error,response);
        }else{
            smtpTransport.sendMail(mailOptionsOrderer, callback);
        }
    });




}
