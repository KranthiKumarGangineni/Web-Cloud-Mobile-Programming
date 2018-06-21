/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://kranthi:krithika@ds131139.mlab.com:31139/kranthi_db';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("kranthi_db");
    var myobj = [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'},
        { name: 'Kranthi', address: 'Sideway 1633'},
        { name: 'Bhavesh', address: 'Sideway 1633'},
        { name: 'Yuvesh', address: 'Sideway 1633'},
        { name: 'Vinay', address: 'Sideway 1633'},
        { name: 'Kiran', address: 'Sideway 1633'}
    ];
    dbase.collection("Students_Registration").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of records inserted: " + res.insertedCount);
        db.close();
    });
});