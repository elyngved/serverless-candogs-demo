# Can Dogs ...?
## Serverless Implementation Example

This is an example of the "Can Dogs" app as presented at the MiamiJS Meetup on October 26, 2016. This was made with the [serverless framework](http://serverless.com) v0.5.3, which is outdated and will look a bit different from the current v1.0.

### Architecture

There are three endpoints:

- `GET /foods` => `foods` - This serves all the records in the DynamoDB table currently called `candogs-demo-items` with the `category` value of "eat". These table and category names are defined in util/dbInfo.js.
- `GET /foods/{slug}` => `/food` - This looks in the table and category above for a record with the matching `slug` value. If non is found, a 404 is returned.
- `POST /foods` => `/food` - This creates a new record in the DynamoDB table above. Through my own logic, this endpoint is protected with Auth0 authentication. Only requests with a valid JWT token that was generated by my Auth0 app passed in through the `X-Auth-Token` header are granted access. See util/verifyAuthToken.js for my authentication logic and util/auth0Info.js to change the client/secret tokens for your use.

### Notes

- Note that there is no DynamoDB configuration involved here other than specifying the table name. Lambda functions uploaded to my AWS account automatically have access to my DynamoDB tables, unless I specify otherwise.
- I could have consolidated all three endpoints to one function. One function is able to handle multiple endpoints, and the function logic can determine which endpoint to handle by using arbitrary values passed in via `requestTemplates`. There is a tradeoff here:
  - Less functions == less AWS configuration to deal with; less chances of having a cold function since the same function is always being called.
  - More functions == less coupling, ability to deploy one endpoint without affecting other endpoints; usually smaller function footprint meaning lower startup time for cold functions
