const lambda = require('../dist/lambda');
const underTest = lambda.api;
var assignDatabase = lambda.assignDatabase;

const localDynamo = require('local-dynamo')

localDynamo.launch(null, 4567);

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
var documentClient = new AWS.DynamoDB.DocumentClient();

describe('Store Lambda', () => {

    var lambdaContextSpy;
    assignDatabase(documentClient);

    beforeEach(() => {
        lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
    });

    it('it stores and retrieves a report', () => {
        underTest.proxyRouter({
            requestContext: {
                resourcePath: '/reports',
                httpMethod: 'POST'
            },
            body: {
                reportId: 123456,
                input_fields: "input-fields"
            }
        }, lambdaContextSpy).then((err, res, body) => {
            expect(res.statusCode).toEqual(201)
        })
    })
})
