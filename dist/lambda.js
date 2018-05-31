'use strict';

var _claudiaApiBuilder = require('claudia-api-builder');

var _claudiaApiBuilder2 = _interopRequireDefault(_claudiaApiBuilder);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _claudiaApiBuilder2.default(),
    dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

api.post('/reports', function (request) {
    // SAVE your report
    var params = {
        TableName: 'reports',
        Item: {
            id: request.body.reportId,
            input_fields: request.body.input_fields, // your report name
            results: request.body.results
        }
    };

    return dynamoDb.put(params).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/reports', function (request) {
    // GET all users
    return dynamoDb.scan({ TableName: 'reports' }).promise().then(function (response) {
        return response.Items;
    });
});

module.exports = api;