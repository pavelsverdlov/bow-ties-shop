var views = require("../views");

var LayoutViewModel = function(_title,_menu, _socials){

    this.user = null;

    this.menu_title = _title;
    this.content = '';
    this.menu = _menu;
    this.socials = _socials;

    this.user_menu =[];
    this.logout =null;
    this.registration = null;
    this.login = null;
    this.new_order = null;

    this.meta = {'title':'','keywords':'','descr':'','canonical':''};

//    this.getJson = function() {
//        var json = {
//            "title": this.title,
//            "content" : this.content,
//            "scripts": this.scripts,
//            "menu":this.menu
//        };
//        return json;
//    };
}

exports.get = function(req){
    var host = 'http://' + req.get('host');

    var lvm = new LayoutViewModel(
        'Bow Ties',
        [   {"name":"Главная", "link": host +"/"},
//            {"name":"О нас", "link": host +"/about/"},
            {"name":"Ассортимент", "link": host +"/bow-ties/"},
            {"name":"Контакты", "link": host +"/contacts/"}
        ],
        [
            {"name":"vk","link":"http://vk.com/galstuk_babochka_odessa","img":"/img/vk-rus.png"}
        ]
    );

    //if(req){
        if(req.session.is_auth){
            lvm.user = req.session.user;
            lvm.user_menu =[
                {"name":"Настройки", icon: 'icon-wrench', "link": host + '/user/setting/'+lvm.user.id+'/'},
                {"name":"Покупки",  icon: 'icon-shopping-cart', "link": host +'/user/orders/'+lvm.user.id+'/'}
            ];
        }

    //}

    lvm.logout = {"name":"Выйти", "link": host + '/auth/logout/'};

    lvm.registration = {"name":"Регистрация", "link": host + '/auth/registration/'};

    lvm.login = {"name":"Войти", "link": '/auth/login/'};

    lvm.new_order = {"name":"Оформить заказ", "link": '/contacts/new_order/'};

  //  lvm.contacts =  {"name":"", "link": '/contacts/'};

    return lvm;
}