var nodemailer = require("nodemailer"),
    fs = require('fs'),
    log = require('../controllers/loggerController'),
    templates = require('../templates');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
       
    }
});
//
var email = "bow-ties@gmail.com";
var _from = 'Магазин галстук-бабочки<'+email+'>';
var signature = '<span>С уважением, администрация сайта <a href="www.bow-ties.od.ua">bow-ties.od.ua</a></span>';
var module_name = "emailController";

function send(own_options, optionsto, callback){
    smtpTransport.sendMail(own_options, function(error, response){
        if(error){
            write_er_log(null,null,'send',error + ' message:' + response.message);
            console.log('emailController->send::error: ' + error);
            callback(error);
        }else{
            smtpTransport.sendMail(optionsto, callback);
        }
    });
};

function get_own_options(subject,text,html){
    return {
        from: _from,
        to: smtpTransport.options.auth.user,
        subject: subject,
        text: text,
        html: html
    };
}

exports.sendSimpleEmail = function(user, text,callback){
    templates.create_support_email_template_async(user, text, function(html){
        var user_email = {
            from: _from,
            to: user.email, // list of receivers
            subject: 'Подтверждение об отправки письма', // Subject line
            text: 'Здравствуйте ' + user.firstName +' ' + user.lastName, // plaintext body
            html: html
        };

        var own_email = get_own_options(
            'Письмо в службу поддержки',
            'Пользователь ' + user.firstName +' ' + user.lastName,
            '<span>Сообщение от '+user.lastName +' ' + user.firstName +'('+user.email+')'+ ':</span></p>  <p>'+ text +'</p>'
        );
        write_debug_log(null,user,'sendSimpleEmail','sent message.');
        send(own_email,user_email,callback);

//        smtpTransport.sendMail(mailOptions, function(error, response){
//            if(error){
//                console.log(error);
//                write_er_log(null,user,'sendSimpleEmail',error + ' message:' + response.message);
//                callback(error);
//            }else{
//                write_debug_log(null,user,'sendSimpleEmail','The message was sent successful. message' + response.message);
//                smtpTransport.sendMail(mailOptionsOrderer, callback);
//            }
//        });
    });
};

exports.sendNewOrder = function(product,user, comments, callback){
    templates.create_order_email_template_async(user,product,comments, function(html){
        var user_email = {
            from: _from,
            to: user.email, // list of receivers
            subject: 'Заказ галстук-бабочки - ' + product.id, // Subject line
            text: 'Здравствуйте ' + user.firstName +' ' + user.lastName, // plaintext body
            html: html
        };
        var own_email = get_own_options(
            'Заказали галстук-бабочку - ' + product.id,
            'Пользователь ' + user.firstName +' ' + user.lastName + 'заказал галстук-бабочку.',
            html
        );
        write_debug_log(product,user,'sendConfirmAuth','send message.');
        send(own_email,user_email,callback);
//        smtpTransport.sendMail(mailOptions, function(error, response){
//            if(error){
//                console.log(error);
//                write_er_log(product,user,'sendNewOrder',error+ 'message: ' + response.message);
//                callback(error);
//            }else{
//                write_debug_log(product,user,'sendNewOrder','The message was sent successful. message: ' + response.message);
//                smtpTransport.sendMail(mailOptionsOrderer, callback);
//            }
//        });
    });
};

exports.sendConfirmAuth = function(user,confirm_url,callback){
    templates.create_registr_email_template_async(user, confirm_url, function(html){
        var user_email = {
            from: _from,
            to: user.email,
            subject: 'Регестрация на сайте bow-ties.od.ua',
            text: 'Здравствуйте ' + user.firstName +' ' + user.lastName ,
            html: html
        };
        var own_email = get_own_options(
            'Зарегестрировался новый пользователь - ' + user.id,
            'Пользователь ' + user.firstName +' ' + user.lastName +' за регестрировался.',
            'email: ' + user.email +' ' +user.firstName +' ' + user.lastName +' pass: '+ user.passwd
        );
        write_debug_log(null,user,'sendConfirmAuth','send message.');
        send(own_email,user_email,callback);
    });
//    var templ = '<div>\
//        <h3>Bow Ties Shop</h3>\
//        <div>\
//            <span>Здравствуйте, '+user.lastName +' ' + user.firstName + '!</span>\
//            <br/>\
//            <span>Спасибо за проявленный интерес к сайту <a href="www.bow-ties.od.ua">bow-ties.od.ua</a></span>\
//            <br/>\
//            <span>Перейдите по следующей ссылке чтобы подтвердить регистрацию:</span>\
//            <br/><br/>\
//            <strong><a href="'+ confirm_url +'">'+ confirm_url +'</a></strong>\
//            <br/><br/>\
//            <span>Если вы не регестрировались на сайте,можете проигнорировать данное письмо.</span>\
//            <br/>' + signature+
//        '</div></div>';

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