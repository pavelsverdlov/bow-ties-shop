var views = require("../views");

var LayoutViewModel = function(_title,_menu, _socials){

    this.user = null;

    this.title = _title;
    this.content = '';
    this.menu = _menu;
    this.socials = _socials;

    this.user_menu =[];
    this.logout =null;
    this.registration = null;
    this.login = null;

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
    var host = '..';

    var lvm = new LayoutViewModel(
        'Bow Ties',
        [   {"name":"Главная", "link": host +"/home/"},
            {"name":"О нас", "link": host +"/about/"},
            {"name":"Ассортимент", "link": host +"/bow-ties/"},
            {"name":"Контакты", "link": host +"/contacts/"}
        ],
        [
            {"name":"vk","link":"http://vk.com/galstuk_babochka_odessa","img":"/img/vk-rus.png"}
        ]
    );

    if(req){
        if(req.session.is_auth){
            lvm.user = req.session.user;
            lvm.user_menu =[
                {"name":"Настройки", "link": host + '/auth/setting/'+lvm.user.id+'/'},
                {"name":"Покупки", "link": host +'/auth/setting/'+lvm.user.id+'/'}
            ];
        }
        host = 'http://' + req.get('host');
    }

    lvm.logout = {"name":"Выйти", "link": host + '/auth/logout/'};

    lvm.registration = {"name":"Регистрация", "link": host + '/auth/registration/'};

    lvm.login = {"name":"Войти", "link": '/auth/login/'};

    return lvm;
}