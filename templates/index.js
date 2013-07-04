var fs = require('fs')
  , log = require('../controllers/loggerController')
  , module_name = 'templates/index';

exports.create_support_email_template_async = function(user, message, callback){
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

                ['user-message',message]
            ];

            for(var i =0;i<list.length;i++){
                data = data.replace(new RegExp(list[i][0],'gi'),list[i][1])
            }

            callback(data);
        }
    );
};

exports.create_order_email_template_async = function(user, product,callback){
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

                ['number',product.getId()],
                ['image-src',product.imgPath],
                ['prod-title',product.title],
                ['price',product.price],
                ['descr',product.descr],
                ['prod-size',product.size]
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
        ' product: ' + product ? product._id : '' +
            ' user: ' + user ? user._id : '', error);
};
function write_debug_log(product,user,method,descr){
    log.debug(module_name, method, +
        ' product: ' + product ? product._id : '' +
        ' user: ' + user ? user._id : '' +
        ' ' + descr);
};

