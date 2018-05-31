const ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk');
var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/reports', function (request) { // SAVE your report
    var params = {
        TableName: 'reports',
        Item: {
            reportId: request.body.reportId,
            input_fields: request.body.input_fields // your report name
        }
    }
    return dynamoDb.put(params).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/reports', function (request) { // GET all users
    return dynamoDb.scan({ TableName: 'reports' }).promise()
        .then(response => response.Items)
});

module.exports = api;
