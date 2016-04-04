var express = require("express");
var app= express();
var page;   //For index.html

var multer = require("multer");
var upload = multer({dest:'uploads/'});

var fs = require("fs");
fs.readFile("index.html",function(err,data){
    if(err)console.error(err);
    else{
        page=data.toString();
    }
});

app.post("/",upload.single('user-file'),function(req,res){
    //console.log(req.file);
    res.writeHead(200, {'content-type':'application/json'});
    var op = {
        'Name':req.file.originalname,
        'Size':req.file.size
    };
    res.end(JSON.stringify(op));
});

app.get("/",function(req,res){
    res.end(page);
}).listen(8080);