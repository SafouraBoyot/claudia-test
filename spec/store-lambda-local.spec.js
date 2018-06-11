const tools = require('../src/tools.js');
const dummyData = require('../dummy-data');
const lambda = require('../dist/lambda.js');
const underTest = lambda.api;
var assignDatabase = lambda.assignDatabase;

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
        const reportId = tools.uuidv4();

        dummyData.reportId = reportId;
        console.log(dummyData)

        underTest.proxyRouter({
            requestContext: {
                resourcePath: '/reports',
                httpMethod: 'POST'
            },
            body: dummyData,
            resolveWithFullResponse: true
        }, lambdaContextSpy).then(() => {
            expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, jasmine.objectContaining({statusCode: 201}));

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
                    jasmine.objectContaining({body: JSON.parse(dummyData)}));
            })
                .catch(function (err) {
                    console.log(err)
                });
        })
    })
})
