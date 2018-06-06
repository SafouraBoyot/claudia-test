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

<<<<<<< HEAD
describe('Store Lambda', () => {
    var lambdaContextSpy;
    assignDatabase(documentClient);

    beforeEach(() => {
        lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
    });

    it('stores a report', () => {
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

    it('stores and retrieves multiple reports', () => {
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
=======
describe('Store Lambda', function () {

        var lambdaContextSpy;
        assignDatabase(documentClient);

        beforeEach(() => {
            lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
        });

        it('it stores a report', () => {
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
>>>>>>> 6bd5f12418d4af1a8d908d5363d4e5e73df9a75c
        })
    }
)
