//var view = require('../views/view').view;
var views = require("../views"),
    seo = require('../controllers/seoController'),
    errors = require('../controllers/errorsController'),
    home = require('../controllers/homeController'),
    contacts = require('../controllers/contactController'),
    products = require('../controllers/productsController'),
    about = require('../controllers/aboutController'),
    user = require('../controllers/userController'),
    auth = require('../controllers/authController'),
    api = require('../controllers/apiController');

exports.init = function(app){
    app.use(errors.handler);
//    app.get(/[^/]$/, function(req, res, next){
//        if(/\.(png|css|js|txt|xml|xsl)/.test(req.url)){
//            next();
//        }else{
//            res.redirect(req.url + '/');
//        }
//    });

    app.get(views.actions.login, auth.login);
    app.post(views.actions.login, auth.login_post);
    app.get('/auth/confirm/:id/:date', auth.confirm_registr);
    app.get(views.actions.registration, auth.registration);
//    app.get('/auth/auth/registration',function(req,res){ res.redirect(views.actions.registration);;  });
    app.post(views.actions.registration, auth.registration_POST);
    //app.del
    app.get('/auth/logout/', auth.checkLogin, auth.logout);

    app.get('/user/orders/:id/', auth.checkLogin, user.orders);
    app.get('/user/settings/:id/', auth.checkLogin, user.settings);

    app.get('/', auth.checkLogin, home.index);
    app.get('/home/', auth.checkLogin, home.index);
    app.get('/about/', auth.checkLogin, about.index);

    app.get('/contacts/', contacts.index);
    app.get('/contacts/new_order/:idbow/', contacts.new_order);
    app.post('/contacts/new_order/', contacts.new_order_POST);
    app.post('/contacts/send_mail/', contacts.send_mail);

    app.get('/bow-ties/', products.index);
    //app.get('/bow-ties/', products.index);

    //API
    app.get('/api/getProducts/', api.getProducts);
    app.get('/api/getLoginForm/',api.getLoginForm)

    //seo
    app.get('/robots.txt', seo.robots);
    app.get('/sitemap.xml', seo.sitemap_xml);
    app.get('/sitemap.xsl', seo.sitemap_xsl);
};