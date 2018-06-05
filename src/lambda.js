import API from 'claudia-api-builder';
import AWS from 'aws-sdk';

const api = new API();
var dynamoDb = new AWS.DynamoDB.DocumentClient();

const assignDatabase = (databaseClient) => {
    dynamoDb = databaseClient;
}

api.post('/reports', (request) => { 
    var params = {
        TableName: 'reports',
        Item: {
            reportId: request.body.reportId,
            input_fields: request.body.input_fields, 

        }
    }

    console.log(dynamoDb)

    return dynamoDb.put(params).promise(); 
}, {success: 201}); 

api.get('/reports', (request) => { 
    return dynamoDb.scan({TableName: 'reports'}).promise().then(response => response.Items)
});

api.get('/reports/{id}', (request) => {
    'use strict';
    var id, params;
    id = request.pathParams.id;

    params = {
        TableName: 'reports',
        Key: {
            reportId: id
        }
    };

    return dynamoDb.get(params).promise().then(response => response.Item);
});

module.exports = { api, assignDatabase };
