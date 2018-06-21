
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
    db.collection('kranthi_registration_users').aggregate([
        { $lookup:
                {
                    from: 'Students_Registration',
                    localField: 'name',
                    foreignField: 'name',
                    as: 'Student'
                }
        }
    ]).toArray(function(err, res) {
        if (err) throw err;
        else console.log(JSON.stringify(res)); callback();
    });
}

