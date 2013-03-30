//var exec = require("child_process").exec;
//var model = require("../models/bowTie");
//var path = '/img/products/';
var repository = require("../data/repository");

exports.getOdessaImages = function(req, res){
//    exec("ls public"+path, function (error, stdout, stderr) {
        //var json ={ "images": JSON.stringify(stdout.split('\n'))};
//
//        var data= stdout.split('\n');
//        var images = repository.getBowTies();
//        for(var i=0; i < data.length; ++i){
//            if(data[i] !== ""){
//                images.push(model.createBowTie("Двусторонний галстук-бабочка",path + data[i],4,100));
//            }
//        }
//        var images = repository.getBowTies();
//        res.writeHead(200, {"Content-Type": "json"});
//        res.write(JSON.stringify(images));
//        res.end();
//    });
    var images = repository.getBowTies(function(data){
        res.writeHead(200, {"Content-Type": "json"});
        res.write(JSON.stringify(data));
        res.end();
    });
}
