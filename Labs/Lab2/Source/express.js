var express = require("express");
var http = require('http');
var bodyParser  =    require("body-parser");
var app       =     express();
app.use(bodyParser.urlencoded({ extended: false }));
//use the application off of express.
'use strict';
var request = require("request");
var fs = require('fs');
var bodyParser = require('body-parser')

// For CORS Issue
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/get/:twitterName',function(req,res){
    var name = req.params.twitterName;
    console.log("Name is = "+name);
    var url = 'https://api.twitter.com/1.1/friends/list.json?cursor=-1&skip_status=true&include_user_entities=false&screen_name='+name;
    request({ url: url,
        method:'GET',
        headers: {
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANNn6wAAAAAAVkbD41b%2B3z%2BfHRhclqcynxAqLz8%3DyNDucgxspilLHOhWLpoJ2I0KVqdfxetjEJVftu7F5KgWJ2jXU3"
        }
    }, function(err, resp, data) {
        var data1 = JSON.parse(data);
        // Stringfying the Data
        var data2 = JSON.stringify([data1], null, 2);
        var obj = JSON.parse(data2)[0];
        console.log(obj);
        if(obj.errors == null || obj.errors == 'undefined' || obj.errors.isEmpty){
            obj.children = obj.users;
            delete obj.users;
            data2 = JSON.stringify([obj], null, 2);
            fs.writeFileSync('DynTreeData.json',data2);
            res.send("Success");
        }else{
            res.send("Failure");
        }
    });
});
//start the server
app.listen(8080,function(){
    console.log("Listening to Port 8080");

})