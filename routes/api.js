var exec = require("child_process").exec;
var path = '/img/products/';


exports.getOdessaImages = function(req, res){
    exec("ls public"+path, function (error, stdout, stderr) {
        //var json ={ "images": JSON.stringify(stdout.split('\n'))};

        var data= stdout.split('\n');
        var images = [];
        for(var i=0; i < data.length; ++i){
            if(data[i] !== ""){
                images.push({ "path": path + data[i], "title" : "Two-way bow tie"});//Двусторонний галстук-бабочка
            }
        }

        res.writeHead(200, {"Content-Type": "json"});
        res.write(JSON.stringify(images));
        res.end();
    });
}
