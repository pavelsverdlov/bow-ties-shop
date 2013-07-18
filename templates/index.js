var fs = require('fs')
  , log = require('../controllers/loggerController')
  , module_name = 'templates/index';

function create_simple_message(user,body,callback){
    fs.readFile('templates/support_email_template.html','utf8',
        function(err,data){
            if(err){
                write_er_log(null,user,'create_support_email_template_async',err);
                log.error('templates/index','create_support_email_template_async',err);
                return;
            }

            var list = [
                ['first-name',user.firstName],
                ['last-name',user.lastName],
                ['user-email',user.email],
                ['phone-number','Телефон: '+ user.phone],

                ['html-body',body]
            ];

            for(var i =0;i<list.length;i++){
                data = data.replace(new RegExp(list[i][0],'gi'),list[i][1])
            }

            callback(data);
        }
    );
}

exports.create_registr_email_template_async = function(user, confirm_url, callback){
    var body =
        '<div align="left" class="article-content">\
            <multiline label="Description">Спасибо за проявленный интерес к сайту <a href="www.bow-ties.od.ua">bow-ties.od.ua</a></multiline>\
            <br/>\
            <span>Перейдите по следующей ссылке чтобы подтвердить регистрацию:</span>\
            <br/><br/>\
            <strong><a href="'+ confirm_url +'">'+ confirm_url +'</a></strong>\
            <br/><br/>\
        </div>\
        <br/>\
        <div align="left" class="article-content">\
            <multiline label="Description">\
                Если вы не регестрировались на сайте,можете проигнорировать данное письмо.\
            </multiline>\
        </div>';
    create_simple_message(user,body,callback);
};

exports.create_support_email_template_async = function(user, message, callback){
    var body =
        '<div align="left" class="article-content">\
            <multiline label="Description">Спасибо за проявленный интерес к сайту <a href="www.bow-ties.od.ua">bow-ties.od.ua</a>,\
                мы постораемся ответим Вам как можно скорее. </multiline>\
        </div>\
        <br/>\
        <div align="left" class="article-content">\
            <span>Ваше сообщение:</span>\
            <multiline label="Description">\
                <p>'+message+'</p>\
            </multiline>\
        </div>';
    create_simple_message(user,body,callback);
};

exports.create_order_email_template_async = function(user, product,comments,callback){
    fs.readFile('templates/new_order_email_template.html','utf8',
        function(err,data){
            if(err){
                write_er_log(product,user,'create_order_email_template_async',err);
                log.error('templates/index','create_email_template',err);
                return;
            }

            var list = [
                ['first-name',user.firstName],
                ['last-name',user.lastName],
                ['user-email',user.email],
                ['phone-number','Телефон: '+ user.phone],

                ['number',product.id],
                ['image-src',product.imgPath],
                ['prod-title',product.title],
                ['price',product.price],
                ['descr',product.descr],
                ['prod-size',product.size],
                ['comment-message',comments]
            ];

            for(var i =0;i<list.length;i++){
                data = data.replace(new RegExp(list[i][0],'gi'),list[i][1])
            }

            callback(data);
        }
    );
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

