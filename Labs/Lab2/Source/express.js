var express = require("express");
var http = require('http');
var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();
app.use(bodyParser.urlencoded({ extended: false }));
//use the application off of express.
'use strict';
var request = require("request");
var fs = require('fs');
var bodyParser = require('body-parser')
app.get('/get/:twitterName',function(req,res){
    var name = req.params.twitterName;
    console.log("Name is = "+name);
    var url = 'https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name='+name;
    request({ url: url,
        method:'GET',
        headers: {
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAACT94gAAAAAA0LKd4PbcKFUcqiCDjpSsrTY%2BrCU%3DkAF9tjOBQmerwgs2umcjWMWPXVZ9fMwlegahRKt548fXjEQqv1"
        }
    }, function(err, resp, data) {
        // console.log(JSON.parse(data));
        var data1 = JSON.parse(data);
        // var data2 = JSON.stringify(data1);
        var data2 = JSON.stringify([data1], null, 2);
        // console.log(data2)
        var json = data2;

        var obj = JSON.parse(json)[0];
        // console.log(obj);
        obj.children = obj.users;
        delete obj.users;

        json = JSON.stringify([obj], null, 2);

        console.log(json);
        fs.writeFileSync('DynTreeData.json',json);
    })
});
//start the server
app.listen(8080,function(){
    console.log("Listening to Port 8080");

})