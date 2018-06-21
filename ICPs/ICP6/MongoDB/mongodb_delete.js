/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kranthi:krithika@ds131139.mlab.com:31139/kranthi_db";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { address: 'Main Road 989' };
    db.collection("Students_Registration").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});