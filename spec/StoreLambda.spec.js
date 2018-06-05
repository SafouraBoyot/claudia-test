const request = require('request');
// export for others scripts to use

describe("Store Lambda", function () {

	it("calls DynamoDB with the data provided by the Ajax request", function(done) {
		const pstUrl = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports"
		const reportId ="3"
		const postData = {
			reportId: reportId,
			input_fields: "input-fields",
		}
        const options = {
            method: 'post',
            body: postData,
            json: true,
            url: pstUrl
        }

        request(options, function (err, res) {
            done();
        })


        const getUrl = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports/" + reportId
        request.get(getUrl, function (err, res, body) {
            expect(body).toBe(postData.toString());
            done();
        })
    })
})