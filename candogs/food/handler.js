'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const dbInfo = require('../util/dbInfo');

module.exports.handler = function(event, context) {
  var slug = event.foodId;

  var params = {
    TableName: dbInfo.tableName,
    Key: {
      category: dbInfo.foodCategory,
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
};
