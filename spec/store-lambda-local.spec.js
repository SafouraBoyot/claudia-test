const tools = require ('../src/tools.js');
const dummyData = require('../dummy-data');

const lambda = require('../dist/lambda.js');
const rp = require('request-promise');
const underTest = lambda.api;
var assignDatabase = lambda.assignDatabase;

const localDynamo = require('local-dynamo')

localDynamo.launch(null, 4567);

var AWS = require("aws-sdk");

AWS.config.update({
    apiVersion: "2012-08-10",
    region: "eu-west-1",
    endpoint: "http://localhost:4567"
});
var documentClient = new AWS.DynamoDB.DocumentClient();

describe('Store Lambda', function () {

    var lambdaContextSpy;
    assignDatabase(documentClient);

    beforeEach(() => {
        lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
    });

    it('it stores a report', () => {
        const reportId = "12345"//tools.uuidv4();
        // const postData = {
        //     reportId: reportId,
        //     input_fields: "input-fields",
        // }
        underTest.proxyRouter({
            requestContext: {
                resourcePath: '/reports',
                httpMethod: 'POST'
            },
            body: dummyData,
            resolveWithFullResponse: true
        }, lambdaContextSpy).then(() => {
            expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, jasmine.objectContaining({statusCode :201}));
                underTest.proxyRouter({
                    requestContext: {
                        resourcePath: '/reports/{id}',
                        httpMethod: 'GET'
                    },
                    pathParameters: {
                        id: reportId
                    }
                }, lambdaContextSpy).then(() => {
                    expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, 
                        jasmine.objectContaining({body : dummyData}));
                })
            })
        })
})
