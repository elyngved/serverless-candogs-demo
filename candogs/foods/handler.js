'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const tableName = 'candogs-demo-items';

module.exports.handler = function(event, context, cb) {
  var category = 'eat';
  var params = {
    TableName: tableName,
    KeyConditionExpression: '#cat = :cat',
    ExpressionAttributeNames: {
      '#cat': 'category'
    },
    ExpressionAttributeValues: {
      ':cat': category
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
