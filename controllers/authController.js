var url = require("url"),
    data = require('../data'),
    repository = require("../data/repository"),
    models = require('../models'),
    views = require("../views"),
    email = require("../controllers/emailController"),
    log = require('../controllers/loggerController'),
    module_name = "authController";

var meta = {
    'title':'Регистрация на сайте магазина галстук-бабочек '+ data.shop_name(),
    'keywords':'регистрация на сайте '+ data.shop_name(),
    'descr':'Регистрация на сайте магазина галстук-бабочек - '+ data.shop_name(),
    'canonical':''
};

exports.checkLogin = function(req, res, next){
    if (req.session.is_auth && req.session.user) {
        next();
    }else{
//        repository.user.findById(req.session.user_id, function(user) {
//            if (user) {
//                req.currentUser = user;
//                next();
//            } else {
//                res.redirect(views.actions.login);
//            }
//        });
//    } else {
       //res.redirect(view)s.actions.login);
       next();
    }
};
exports.confirm_registr = function(req, res){//проверить  по http://www.bow-ties.od.ua/auth/confirm/517cfa4352d08efb34000002/1367145027086
    var id = req.params.id;
    var date = parseInt(req.params.date);
    repository.user.findById(id,function(err, user){
        if(err){
            console.log('AuthContrl: '+err);
        }else{
            if(user && user.idate_reg === date){
                repository.user.confirmAuth(id);
                setUserToSession(user,req);
                res.redirect(views.actions.home);
            }
        }
    });
};

exports.forgot_passwd = function(req, res) {

};

exports.registration = function(req, res) {
    if (req.session.is_auth && req.session.user) {
        res.redirect(views.actions.home);
    }
    meta.canonical = 'http://' + req.get('host') + req.url;

    var lvm = models.layout.get(req);
    lvm.meta = meta;
    lvm.content = {
        'status': ''
       // 'user': user
    };
    res.render(views.paths.registration,lvm);
};

exports.registration_POST = function(req, res){
    var user = models.user.get();
    user.firstName = req.param('first-name', null);
    user.lastName = req.param('last-name', null);
    user.email = req.param('email', null);
    user.phone = req.param('phone', null);
    user.isSubscribe = req.param('is-subscribe', null) !== null;
    user.passwd = req.param('passwd', null);

    var sendEmail =

    //if the user has already bought
    repository.user.findAsync(user.email,user.firstName, user.lastName, function(err,findUser){
        if(err){
            write_er_log(null,user,'registration_POST->exports.user.find',err);
        }
        if(findUser){
            if(findUser.idate_reg > 0){
                meta.canonical = 'http://' + req.get('host') + req.url;
                var lvm = models.layout.get(req);
                lvm.meta = meta;
                lvm.content = {
                    'status': '<div class="alert alert-block">Вы уже зарегестрированны или не подтвердили запрос на регистрацию. На Вашу почту было повторно отправлено письмо поддвержения.</div>'
                };

                email.sendConfirmAuth(findUser,generate_url_confirm_reg(findUser.id, findUser.idate_reg),
                    function(error, response){
                        if(error){
                            write_er_log(null,findUser,'registration_POST->repository.user.findAsync->sendConfirmAuth',
                                'resend confirm message ' + error+' message: ' + response._message);
                            render_response_error(req,res, views.paths.registration,
                                'Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.');
                        }else{
                            write_debug_log(null,findUser,'registration_POST->repository.user.findAsync->sendConfirmAuth',
                                'resend confirm message');
                            res.render(views.paths.registration,lvm);
                        }
                    }
                );
                return;
            }

            write_debug_log(null,findUser,'registration_POST->exports.user.find','successful');
            findUser.phone = req.param('phone', null);
            findUser.isSubscribe = user.isSubscribe;
            findUser.passwd = user.passwd;
            repository.user.resave(findUser,function(err, i, resaveUser){
                if(err){
                    write_er_log(null,resaveUser,'registration_POST->repository.user.resave',err);
                    render_response_error(req,res, views.paths.registration,
                        'Произошла ошибка во время регистрации. Пожалуйста, повторите попытку.');
                }else{
                    write_debug_log(null,resaveUser,'registration_POST->repository.user.resave','index: '+ i);
                    send_confirm_auth(resaveUser,req,res);
                }
            });
            return;
        }
        //new user
        repository.user.save(user, function(err, i, saveUser){
            if(err){
                write_er_log(null,saveUser,'registration_POST->repository.user.save',err);
                render_response_error(req,res, views.paths.registration,
                    'Произошла ошибка во время регистрации. Пожалуйста, повторите попытку.');
            }else{
                write_debug_log(null,saveUser,'registration_POST->repository.user.save','index: '+ i);
                send_confirm_auth(saveUser,req,res);
            }
        });
    })
};

exports.login = function(req, res){
   // res.render(views.paths.registration,lvm);
};

exports.login_post = function(req, res){
    repository.user.find(req.param('passwd', null),req.param('email', null),
        function(err,user){
            var result = {"success": true, "error" : null};
            if (user) {
                setUserToSession(user,req);
            } else {
                result.success = false;
                result.error = "Введено неправильное имя пользователя или пароль.";
            }
            res.writeHead(200, {"Content-Type": "json"});
            res.write(JSON.stringify(result));
            res.end();
        }
    );
};

exports.logout = function(req, res) {// Удалить сессию
    if (req.session) {
        req.session.destroy(function() {});
    }
    res.redirect(views.actions.home);//url.parse(req.headers['referer']).pathname);
};

//
function render_response_error(req,res,path,message){
    meta.canonical = 'http://' + req.get('host') + req.url;
    var lvm = models.layout.get(req);
    lvm.meta = meta;
    lvm.content = {
        'status': '<div class="alert alert-error">'+message+'</div>'
    };
    res.render(path,lvm);
};

function send_confirm_auth(user,req,res){
    email.sendConfirmAuth(user,generate_url_confirm_reg(user.id, user.idate_reg),
        function(error, response){
            if(error){
                write_er_log(null,user,'registration_POST->repository.user.save',error+' message: ' + response._message);
                render_response_error(req,res, views.paths.registration,
                    'Произошла ошибка при отправке сообщения. Пожалуйста, повторите попытку.');
            }else{
                meta.canonical = 'http://' + req.get('host') + req.url;
                var lvm = models.layout.get(req);
                lvm.meta = meta;
                lvm.content = {
                    'status': '<div class="alert alert-success">Спасибо за регистрацию. Письмо с подтверждением прийдет на ваш почтовый ящик в теченни нескольких минут.</div>'
                };
                write_debug_log(null,user,'registration_POST->repository.user.save->sendConfirmAuth','');
                res.render(views.paths.registration,lvm);
            }

        }
    );
}

function generate_url_confirm_reg(id,date){
    return 'http://www.bow-ties.od.ua/auth/confirm/' +id+'/' + date;
}

function setUserToSession(user, req){
    req.currentUser = user;
    req.session.is_auth = true;
    req.session.user = user;
}

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





