exports.email = function(){
  return '';
};
exports.shop_name = getShopName;


exports.meta =  {
    contact: {
        'title':'Контактная информация '+ getShopName()+' - Заказ и пошив галстук-бабочек',
        'keywords':'контакты, Одесса',
        'descr':'Контактная информация онлайн магазина галстук-бабочек '+ getShopName(),
        'canonical':''
    }
};

exports.repository = require("./repository");


function getShopName(){
    return 'Bow Ties Shop';
}

