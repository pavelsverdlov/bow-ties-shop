var fs = require('fs')
  , log = require('../controllers/LoggerController');

exports.create_email_template_async = function(user, product,callback){
    fs.readFile('templates/new_order_email_template.html','utf8',
        function(err,data){
            if(err){
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

