var fs = require('fs');


exports.robots = function(req,res){
    fs.readFile('seo/robots.txt','utf8',
        function(err,data){
            if(err){
                return console.log('[seoController] '+ err);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(data);
            res.end();
        }
    );
};

exports.sitemap_xml = function(req,res){
    fs.readFile('seo/sitemap.xml','utf8',
        function(err,data){
            if(err){
                return console.log('[seoController] '+ err);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(data);
            res.end();
        }
    );
};

exports.sitemap_xsl = function(req,res){
    fs.readFile('seo/sitemap.xsl','utf8',
        function(err,data){
            if(err){
                return console.log('[seoController] '+ err);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(data);
            res.end();
        }
    );
};

