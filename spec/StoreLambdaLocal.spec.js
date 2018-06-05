const lambda = require('../dist/lambda');
const underTest = lambda.api;
const assignDatabase = lambda.assignDatabase;

const localDynamo = require('local-dynamo')

localDynamo.launch(null, 4567);



describe('Store Lambda', () => {
	var lambdaContextSpy;
	assignDatabase(localDynamo);

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
				reportId: "123456",
				input_fields: "input-fields"
	      	}
		}, lambdaContextSpy).then((err, res, body) => {
			expect(body.status).toEqual(201)
		})
	})
})
