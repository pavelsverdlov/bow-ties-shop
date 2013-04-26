//var view = require('../views/view').view;
var views = require("../views"),
    home = require('../controllers/homeController'),
    contacts = require('../controllers/contactController'),
    products = require('../controllers/productsController'),
    about = require('../controllers/aboutController'),
    auth = require('../controllers/authController'),
    api = require('../controllers/apiController');

exports.init = function(app){

    app.get(views.actions.login, auth.login);
    app.post(views.actions.login, auth.login_POST);
    app.del('/auth/logout', auth.checkLogin, auth.logout);

    app.get('/', auth.checkLogin, home.index);
    app.get('/home', auth.checkLogin, home.index);
    app.get('/about', auth.checkLogin, about.index);

    app.get('/contacts', contacts.index);
    app.get('/contacts/new_order/:idbow', contacts.new_order);
    app.post('/contacts/new_order', contacts.new_order_POST);

    app.get('/bow-ties', products.index);

    //API
    app.get('/api/getProducts', api.getProducts);
    app.get('/api/getLoginForm',api.getLoginForm)

};