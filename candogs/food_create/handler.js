'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const dbInfo = require('../util/dbInfo');
const verifyAuthToken = require('../util/verifyAuthToken');

module.exports.handler = function(event, context, cb) {

  if (!verifyAuthToken(event.authToken)) {
    return context.fail('401');
  }

  // TODO: validate request params

  var item = Object.assign({}, event.body.food, {
    category: dbInfo.foodCategory
  });

  var params = {
    TableName: dbInfo.tableName,
    Item: item
  }

  dynamo.putItem(params, function(err, response) {
    context.succeed(response);
  });

};
