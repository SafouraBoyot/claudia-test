const request = require('request');
// export for others scripts to usels

describe("Store Lambda", function() => {

	it("calls DynamoDB with the data provided by the Ajax request", function() => {
		const endpoint = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports";
		const data = {
			reportId: "123",
			input_fields: "input-fields",
		}

		request.post(endpoint, {json: true, body: data}, function(err, res) {
			done();
		})

		request.post(endpoint, function(err, res) {
			expect(res).toBe([data]);
			done();
		})
	})
})