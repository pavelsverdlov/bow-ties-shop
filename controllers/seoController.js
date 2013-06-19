var fs = require('fs');


exports.robots = function(req,res){ readFile('seo/robots.txt',res); };

exports.sitemap_xml = function(req,res){ readFile('seo/sitemap.xml',res); };

exports.sitemap_xsl = function(req,res){ readFile('seo/sitemap.xsl',res); };

function readFile(filePath,res){
    fs.readFile(filePath,'utf8',
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

