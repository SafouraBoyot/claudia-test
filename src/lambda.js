import API from 'claudia-api-builder';
import AWS from 'aws-sdk';
const tools = require ('../src/tools.js');
const converter = require('../src/html-to-pdf-converter');

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

api.post('/convertReport', (request) => {
    const reportId =request.body.reportId;
    var params = {
        TableName: 'reports',
        Item: {
            reportId: reportId,
            input_fields: request.body.input_fields,

        }
    }
    // converter.htmlToPdf(html,reportId); Todo : create html file based on the input_fields
    return dynamoDb.put(params).promise();
}, {success: 201});
module.exports = {api, assignDatabase};
