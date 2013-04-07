//var view = require('../views/view').view;
var home = require('../controllers/homeController');
var contacts = require('../controllers/contactController');
var products = require('../controllers/productsController');
var api = require('../controllers/apiController');

//exports.index = function(req, res){
//    view(res,'home.ejs','');
//};
//exports.contact = function(req, res){
//    view(res,'contact.ejs','');
//};

exports.init = function(app){
    app.get('/', home.index);
    app.get('/home', home.index);

    app.get('/contacts', contacts.index);
    app.get('/contacts/new_order/:idbow', contacts.new_order);
    app.post('/contacts/new_order', contacts.new_order_POST);

    app.get('/bow-ties', products.index);

    //API
    app.get('/api/getProducts', api.getProducts);
    app.get('/api/getLoginForm',api.getLoginForm)

};