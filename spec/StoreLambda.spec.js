const request = require('request');
// export for others scripts to use

describe("Store Lambda", function() {

	it("it stores and retrieves a report", function(done) {
		const postUrl = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports"
		const reportId = "123345"
		const postData = {
			reportId: reportId,
			input_fields: "input-fields",
		}

		const options = {
  			method: 'post',
  			body: postData,
  			json: true,
  			url: postUrl
		}

		request(options, function(err, res) {
			done();
		})

		const getUrl = `https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports/${reportId}`;
		
		request.get(getUrl, function(err, res, body) {
			expect(body).toBe(JSON.stringify(postData));
			done();
		})
	})
})