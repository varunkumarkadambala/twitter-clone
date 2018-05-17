var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200','http://localhost:4000','http://127.0.0.1:4000','http://192.168.136.145:4000','http://0.0.0.0:0'],
    credentials: true
}));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://dbuser:dbpassword@ds225840.mlab.com:25840/twitter"); //Connecting to the database


/* Schema definition for the database */
var tweetSchema  = new mongoose.Schema({
    // Define the keys in the database along with data type
    created_by : String,
    message : String,
    created_at : String
});
var tweets = mongoose.model("tweets", tweetSchema); //Connecting to a collection in the database


/*To get all the available gadgets*/
app.get('/tweets', function(req, res, next) {
    tweets.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});


/*To get based on gadget type*/
app.get('/tweet/:id', function(req, res, next) {
    tweets.find({"_id" : req.params.id},function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});


/*To add a new gadget*/
app.post('/tweet/post', function(req, res, next) {
    tweets.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});