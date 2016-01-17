//var _ = require('underscore');
var db = require('../data.js');
var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
//var request = require('request');
//var url = require('url');
var Q = require('q');
// commented out for deployment
// uncomment for development
//var apiInfo = require('./apiKeys.js');

module.exports = {
    getItems: function(req, res, next) {
        Item.find({}, function(err, items) {
            var itemMap = [];
            items.forEach(function(item) {
                itemMap.push(item);
            });
            // res.send(itemMap);
        res.send(db.items);
            
        });

    },
    postItem: function(req, res, next) {

        var productName = req.body.productName;
        var createdBy = req.body.createdBy;
        var category = req.body.category;
        var quantity = req.body.quantity;
        var price = req.body.price;
        var auctionEnds = req.body.auctionEnds;
        var description = req.body.description;

        var newItem = {
            productName: productName,
            createdBy: createdBy,
            category: category,
            quantity: quantity,
            price: price,
            auctionEnds: auctionEnds,
            description: description
        };
        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                res.status(200).send();
            })
            .fail(function(err) {
                console.log(err.errors);
                res.status(400).send();
                next(err);
            });

        //setInterval fo make call to db to update price
        //var app = require('../../server/server.js');
        /*
        var findTimeReduce = function (currentPrice, minPrice, endDate) {
            //if endDate is not passed in
            endDate = endDate || 4;
            //stand in for database
            //to be set with post request
            var db = { price: 100 };
            var sec = ((endDate * 24)*60*60);
            var count = 0;
            var amountToDecrease = currentPrice/minPrice;
            var results = [];
            while (currentPrice >= minPrice){
                results.push(currentPrice);
                currentPrice = currentPrice - amountToDecrease;
                count++;
            }

            var numberOfSecUntilIncrment = sec/count;
            //flag to keep index for each setTimeout
            var priceIndex = 0;
            console.log(results);
            
            var recurse = function() {
                console.log('recurse')
                if(priceIndex < results.length - 1){
                    priceIndex++;
                    //current price in database update
                    db.price = results[priceIndex];
                    console.log(priceIndex, 'priceIndex');
                    console.log(db.price, 'db.price');
                    console.log('app.get("/setPrice", function(results[priceIndex]){ database price set action here })')
                    //called with 30 seconds for simulation
                    //to be changed to numberOfSecUntilIncrment at runtime
                    setTimeout(recurse, 3000)
                }
            }
            
            //called with 30 seconds for simulation
            //to be changed to numberOfSecUntilIncrment at runtime
            setTimeout(recurse, 3000);

        };

        findTimeReduce(100, 10); */
    }
};
