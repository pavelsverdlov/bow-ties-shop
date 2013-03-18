var page_data = require('../models/layout-viewmodel')

exports.view = function(response,templateName, data){
    var lvm =  page_data.get();
    lvm.content = data;
    response.render(templateName,lvm);
};
