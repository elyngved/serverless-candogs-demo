'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

const tableName = 'candogs-demo-items';

// const _ = require('lodash');
// const STATIC_ITEMS = require('../static_items');

module.exports.handler = function(event, context) {
  var category = 'eat';
  var slug = event.foodId;

  var params = {
    TableName: tableName,
    Key: {
      category: category,
      slug: slug
    }
  };

  dynamo.getItem(params, function(err, data) {
    if (err) {
      context.fail(JSON.stringify(err));
    } else {
      if (data.Item) {
        context.succeed({
          data: {
            food: data.Item
          }
        });
      } else {
        // 404
        context.fail("400");
      }
    }
  });


  // var food = _.find(STATIC_ITEMS, { id: event.foodId });
  // if (food) {
  //   return cb(null, {
  //     data: {
  //       food: food
  //     }
  //   });
  // } else {
  //   var response = {
  //     status: 400,
  //     errors: [
  //       {
  //         source: "foodId",
  //         message: "Item does not exist"
  //       }
  //     ]
  //   }
  //   context.fail(JSON.stringify(response));
  // }
};
