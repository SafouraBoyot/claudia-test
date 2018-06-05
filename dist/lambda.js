'use strict';

var _claudiaApiBuilder = require('claudia-api-builder');

var _claudiaApiBuilder2 = _interopRequireDefault(_claudiaApiBuilder);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _claudiaApiBuilder2.default();
var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

var assignDatabase = function assignDatabase(database) {
    dynamoDb = database;
};

api.post('/reports', function (request) {
    var params = {
        TableName: 'reports',
        Item: {
            reportId: request.body.reportId,
            input_fields: request.body.input_fields

        }
    };

    console.log(dynamoDb);

    return dynamoDb.put(params).promise();
}, { success: 201 });

api.get('/reports', function (request) {
    return dynamoDb.scan({ TableName: 'reports' }).promise().then(function (response) {
        return response.Items;
    });
});

api.get('/reports/{id}', function (request) {
    'use strict';

    var id, params;
    id = request.pathParams.id;

    params = {
        TableName: 'reports',
        Key: {
            reportId: id
        }
    };

    return dynamoDb.get(params).promise().then(function (response) {
        return response.Item;
    });
});

module.exports = { api: api, assignDatabase: assignDatabase };