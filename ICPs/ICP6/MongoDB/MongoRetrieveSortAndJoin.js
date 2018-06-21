/**
 * Created by Kranthi on 15/03/2018.
 */

// Required Mongo Client
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Mongo DB URL.
var url = 'mongodb://kranthi:krithika@ds131139.mlab.com:31139/kranthi_db';

mongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    // Sending Database Name to the Get Functions.
    var database = client.db('kranthi_db')
    mongoRetrieveByPhoneNumber(database, function() {
        client.close();
    });
});

// Retrieving User Details by PhoneNumber
var mongoRetrieveByPhoneNumber = function (db,callback) {
    // Searches for the Address and returns the Data (Name by Descending)
    var dataRetrieved = db.collection('Students_Registration').find({"address":"Sideway 1633"})
        .sort({"name":-1});
    // -1 means descending , 1 means ascending
    // Iterating the Retrieved Data
    var detail=0;
    dataRetrieved.each(function(err,document) {
        assert.equal(err,null);
        if(document != null)
        {
            detail = detail+1;
            console.log("\nUser Detail "+detail+" for the Searched Address\n");
            console.log("Student Name : " + document.name);
            console.log("Student Address : " + document.address);
        }else{
            // If no Documents are present callback()
            console.log("No Data")
            callback();
        }
    });
}

