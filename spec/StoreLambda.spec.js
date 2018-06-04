const request = require('request');
// export for others scripts to use

describe("Store Lambda", function() {

	it("calls DynamoDB with the data provided by the Ajax request", function(done) {
		const endpoint = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports"
		const reportData = {
			reportId: "123",
			input_fields: "input-fields",
		}

		const data = [
			{
				'content-type': 'application/json',
                body: reportData
			}	
		]

		console.log(JSON.stringify(data));

		request.post(endpoint, {json: true, data: data}, function(err, res) {
			done();
		})

		request.post(endpoint, function(err, res) {
			expect(res.body).toBe([data]);
			done();
		})
	})
})