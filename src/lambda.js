const ApiBuilder = require('claudia-api-builder'),
const AWS = require('aws-sdk');

var api = new ApiBuilder(),
var dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/reports', function (request) { // SAVE your report
    var params = {
        TableName: 'reports',
        Item: {
            id: request.body.reportId,
            input_fields: request.body.input_fields, // your report name
            results: request.body.results
        }
    }
    
    return dynamoDb.put(params).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/reports', function (request) { // GET all users
    return dynamoDb.scan({ TableName: 'reports' }).promise()
        .then(response => response.Items)
});

module.exports = api;
