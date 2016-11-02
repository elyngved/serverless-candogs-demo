'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const dbInfo = require('../util/dbInfo');

module.exports.handler = function(event, context, cb) {
  var params = {
    TableName: dbInfo.tableName,
    KeyConditionExpression: '#cat = :cat',
    ExpressionAttributeNames: {
      '#cat': 'category'
    },
    ExpressionAttributeValues: {
      ':cat': dbInfo.foodCategory
    }
  };

  dynamo.query(params, function(err, data) {
    if (err) {
      context.fail(JSON.stringify(err));
    } else {
      context.succeed({
        data: {
          foods: data.Items
        }
      })
    }
  });
};
