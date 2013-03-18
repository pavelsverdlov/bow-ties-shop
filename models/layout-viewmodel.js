var LayoutViewModel = function(_title,_menu){

    this.title = _title;
    this.content = '';
    this.menu = _menu;


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
    return new LayoutViewModel('Bow Ties Shop',[ {"name":"Home", "link":"/home"},
        {"name":"About", "link":"/about"},{"name":"Contact", "link":"/contact"}]);

}