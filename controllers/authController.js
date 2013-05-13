var url = require("url"),
    repository = require("../data/repository"),
    models = require('../models'),
    views = require("../views"),
    email = require("../controllers/emailController");

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

exports.registration = function(req, res) {
    if (req.session.is_auth && req.session.user) {
        res.redirect(views.actions.home);
    }
    var lvm = models.layout.get(req);
    //var user = models.user.get();
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
    user.isSubscribe = req.param('is-subscribe', null);
    user.passwd = req.param('passwd', null);

    repository.user.save(user,function(err, i, user){
        console.log('user save: ' + i + ' ' + err);
        //send email;
        email.sendConfirmAuth(user,
            generate_url_confirm_reg(user.getId(), user.idate_reg),
            function(error, response){
                var lvm = models.layout.get(req);
                if(error){
                    lvm.content = {
                        'status': '<div class="alert alert-error"></div>'
                    };
                    console.log("Message sent: " + error);
                }else{
                    lvm.content = {
                        'status': '<div class="alert alert-success">Спасибо за регистрацию. Письмо с подтверждением прийдет на ваш почтовый ящик в теченни нескольких минут.</div>'
                    };
                    console.log("Message sent: " + response.message);
                }
                res.render(views.paths.registration,lvm);
            }
        );
    });
};

exports.login = function(req, res){ // Найти пользователя и выставить currentUser
   // res.render(views.paths.registration,lvm);
};

exports.login_post = function(req, res){
    repository.user.find(req.param('passwd', null),req.param('email', null),
        function(err,user){
            if (user) {
                setUserToSession(user,req);
            } else {
                res.redirect(views.actions.registration);
            }
            //редирект туда от куда пришел
            res.redirect(url.parse(req.headers['referer']).pathname);
        }
    );
};

exports.logout = function(req, res) {// Удалить сессию
    if (req.session) {
        req.session.destroy(function() {});
    }
    res.redirect(views.actions.home);
};

exports.setting = function(req,res){
    res.redirect(views.actions.home);
};

//

function generate_url_confirm_reg(id,date){
    return 'http://www.bow-ties.od.ua/auth/confirm/' +id+'/' + date;
}

function setUserToSession(user, req){
    req.currentUser = user;
    req.session.is_auth = true;
    req.session.user = user;
}






