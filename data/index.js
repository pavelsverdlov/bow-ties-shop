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


function getShopName(){
    return 'Bow Ties Shop';
}