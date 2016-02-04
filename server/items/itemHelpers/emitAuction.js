var moment = require('moment');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {
    emitAuction: function(dbItemID) {
        var app = require('./../../server.js');
        var findItem = Q.nbind(Item.findOne, Item);
        findItem({
                _id: dbItemID
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else {
                    if(item.priceIndex < item.priceSchedule.length){
                        var priceFlag;
                        if(item.priceIndex === -1){
                            priceFlag = 0;
                        } else {
                            priceFlag = item.priceIndex;
                        }
                        var transmitObject = {
                            _id: item._id,
                            price: item.priceSchedule[priceFlag].price,
                            timeRemaining: item.priceSchedule[priceFlag].decrementTime,
                            description: item.description,
                            productName: item.productName,
                            createdBy: item.createdBy,
                            quantity: item.quantity,
                            category: item.category,
                            image: item.image,
                            auctionEnds: item.auctionEnds
                        };
                        console.log(transmitObject)
                        app.io.sockets.emit('productUpdate', transmitObject);
                        item.priceIndex++;
                        item.save(); 
                    } else {
                        clearTimeout(item.timeId[0]);
                    }
                }
            });
    },
    emitAuctionGet: function(dbItemID) {
        var app = require('./../../server.js');
        var findItem = Q.nbind(Item.findOne, Item);
        findItem({
                _id: dbItemID
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else {
                    if(item.priceIndex < item.priceSchedule.length){
                        var priceFlag;
                        if(item.priceIndex === -1){
                            priceFlag = 0;
                        } else {
                            priceFlag = item.priceIndex;
                        }
                        var transmitObject = {
                            _id: item._id,
                            price: item.priceSchedule[priceFlag].price,
                            timeRemaining: item.priceSchedule[priceFlag].decrementTime,
                            description: item.description,
                            productName: item.productName,
                            createdBy: item.createdBy,
                            quantity: item.quantity,
                            category: item.category,
                            image: item.image,
                            auctionEnds: item.auctionEnds
                        };
                        app.io.sockets.emit('productUpdate', transmitObject);
                        item.save(); 
                    } else {
                        clearTimeout(item.timeId[0]);
                    }
                }
            });
    }
};
