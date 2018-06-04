const request = require('request');
// export for others scripts to use

describe("Store Lambda", function() {

	it("calls DynamoDB with the data provided by the Ajax request", function(done) {
		const url = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports"
		const postData = {
			reportId: "123345",
			input_fields: "input-fields",
		}

		const options = {
  			method: 'post',
  			body: postData,
  			json: true,
  			url: url
		}

		request(options, function(err, res) {
			done();
		})

		request.get(url, function(err, res, body) {
			expect(body).toBe([postData]);
			done();
		})
	})
})