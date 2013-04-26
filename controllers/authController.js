var crypto = require('crypto'),
    repository = require("../data/repository"),
    models = require('../models'),
    views = require("../views");

exports.checkLogin = function(req, res, next){
    if (req.session.user_id) {
        repository.User.findById(req.session.user_id, function(user) {
            if (user) {
//                req.currentUser = user;
                next();
            } else {
                res.redirect(views.actions.login);
            }
        });
    } else {
       res.redirect(views.actions.login);
       //next();
    }
};
exports.login = function(req, res) {
    var lvm = models.layout.get();
    var user = models.user.get();
    lvm.content = {
        'status': '',
        'user': user
    };
    res.render(views.paths.login,lvm);
};
exports.login_POST = function(req, res){ // Найти пользователя и выставить currentUser
    repository.User.findById(req.session.user_id, function(user) {
        if (user) {
            req.currentUser = user;
        } else {
//            res.redirect('/sessions/new');
        }
        //редирект туда от куда пришел
    });
};
exports.logout = function(req, res) {// Удалить сессию
    if (req.session) {
        req.session.destroy(function() {});
    }
    res.redirect('/sessions/new');
};

//

function encryptPassword(password) {
    return crypto.createHmac('sha1', this.salt).
        update(password).
        digest('hex');
};






