var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sverdlov24@gmail.com",
        pass: "crf@kjvfyek@gfhjk6!"
    }
});

exports.sendNewOrder = function(order,user,callback){
    var mailOptions = {
        from: 'Магазин галстук-бабочки<bow-ties-shop@gmail.com>',
        to: 'sverdlov_p@hotmail.com', // list of receivers
        subject: 'Заказ галстук-бабочки - ' + order, // Subject line
        text: 'Здравствуйте ' + user.firstName +' ' + user.lastName, // plaintext body
        html: '<b>' + user.email +'</b>'
    }
    //send us
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            lvm.content = '';
        }else{
            //send orderer
            smtpTransport.sendMail(mailOptions, callback);
        }
    });




}
