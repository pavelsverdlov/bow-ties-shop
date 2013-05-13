var nodemailer = require("nodemailer"),
    fs = require('fs');
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sverdlov24@gmail.com",
        pass: "crf@kjvfyek@gfhjk6!"
    }
});

function send(own_options, optionsto, callback){
    smtpTransport.sendMail(own_options, function(error, response){
        if(error){
            console.log('emailController->send::error: ' + error);
            callback(error,response);
        }else{
            smtpTransport.sendMail(optionsto, callback);
        }
    });
};

function getOwnOptions(subject,text,html){
    return {
        from: 'Магазин галстук-бабочки<bow-ties-shop@gmail.com>',
        to: smtpTransport.options.auth.user,
        subject: subject,
        text: text,
        html: html
    };
}

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
    };
    var mailOptions = getOwnOptions(
        'Заказали галстук-бабочку - ' + product.id,
        'Пользователь ' + user.firstName +' ' + user.lastName + 'заказал галстук-бабочку.',
        templ
    );
//    {
//        from: 'Магазин галстук-бабочки<bow-ties-shop@gmail.com>',
//        to: smtpTransport.options.auth.user,
//        subject: 'Заказали галстук-бабочку - ' + product.id, // Subject line
//        text: 'Пользователь ' + user.firstName +' ' + user.lastName + 'заказал галстук-бабочку.', // plaintext body
//        html: templ
//    }
    //send us
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            callback(error,response);
        }else{
            smtpTransport.sendMail(mailOptionsOrderer, callback);
        }
    });
};

exports.sendConfirmAuth = function(user,confirm_url,callback){
    var templ = '<div>\
        <h3>Bow Ties Shop</h3>\
        <div>\
            <span>Здравствуйте, '+user.lastName +' ' + user.firstName + '!</span>\
            <br/>\
            <span>Спасибо за проявленный интерес к сайту <a href="www.bow-ties.od.ua">bow-ties.od.ua</a></span>\
            <br/>\
            <span>Перейдите по следующей ссылке чтобы подтвердить регистрацию:</span>\
            <br/><br/>\
            <strong><a href="'+ confirm_url +'">'+ confirm_url +'</a></strong>\
            <br/><br/>\
            <span>Если вы не регестрировались на сайте,можете проигнорировать данное письмо.</span>\
            <br/>\
            <span>Спасибо.<br/>Администрация сайта <a href="www.bow-ties.od.ua">bow-ties.od.ua</a></span>\
        </div>\
        </div>';
    var email = {
        from: 'Магазин галстук-бабочки<bow-ties-shop@gmail.com>',
        to: smtpTransport.options.auth.user,
        subject: 'Регестрация на сайте bow-ties.od.ua', // Subject line
        text: 'Здравствуйте ' + user.firstName +' ' + user.lastName + ',', // plaintext body
        html: templ
    };
    var own_email = getOwnOptions(
        'Зарегестрировался новый пользователь - ' + user.getId(),
        'Пользователь ' + user.firstName +' ' + user.lastName + ' за регестрировался.',
        ''
    );
    send(own_email,email,callback);
};
