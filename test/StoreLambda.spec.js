 $ = require("jquery");

var api = require("../src/lambda")
var dynamoDb = new AWS.DynamoDB.DocumentClient();

describe("Store Lambda", () => {

	beforeEach(function() {
	    jasmine.Ajax.install();

	    spyOn(dynamoDb);
    });

    afterEach(function() {
    	jasmine.Ajax.uninstall();
    })

	it("calls DynamoDB with the data provided by the Ajax request", () => {
		let	data = {
				reportId: "123",
				input_fields: "input-fields",
				results: "results"
		}
		const ajaxCall = {
			"Content-Type": "application/json",
			type: "POST",
			url: "https://zgapooq1zi.execute-api.us-east-1.amazonaws.com/latest/reports",
			data: data
		}
		const expectedParams = {
			TableName: 'reports',
			Item: data		
		}

		$.ajax(ajaxCall);

		expect(dynamoDb.put).toHaveBeenCalledWith(expectedParams);
	})

})