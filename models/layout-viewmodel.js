var LayoutViewModel = function(_title,_menu, _socials){

    this.title = _title;
    this.content = '';
    this.menu = _menu;
    this.socials = _socials;

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

exports.get = function(){
    //return new LayoutViewModel(app.get('title'),app.get('menu'));
    return new LayoutViewModel(
        'Bow Ties',
        [   {"name":"Главная", "link":"/home"},
            {"name":"Ассортимент", "link":"/bow-ties"},
            {"name":"О нас", "link":"/about"},
            {"name":"Контакты", "link":"/contacts"}
        ],
        [
            {"name":"vk","link":"http://vk.com/galstuk_babochka_odessa","img":"/img/vk-rus.png"}
        ]
    );

}