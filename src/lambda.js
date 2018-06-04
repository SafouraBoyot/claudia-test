import API from 'claudia-api-builder';
import AWS from 'aws-sdk';

const api = new API(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/reports', (request) => { // SAVE your report
    var params = {
        TableName: 'reports',
        Item: {
            reportId: request.body.reportId,
            input_fields: request.body.input_fields, // your report name

        }
    }

    return dynamoDb.put(params).promise(); // returns dynamo result
}, {success: 201}); // returns HTTP status 201 - Created if successful

api.get('/reports', (request) => { // GET all users
    return dynamoDb.scan({TableName: 'reports'}).promise()
        .then(response => response.Items)
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

module.exports = api;
