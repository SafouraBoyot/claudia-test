const request = require('request');
const requestPromise = require('request-promise');

describe("Store Lambda", function () {
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    it("calls DynamoDB with the data provided by the Ajax request", function (done) {
        const postUrl = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports"

        const reportId = uuidv4()
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

        const getUrl = `https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports/${reportId}`;

        request(options, function (err, res) {
            expect(res.statusCode).toEqual(201)

            request.get(getUrl, function (err, res, body) {
                expect(res.statusCode).toEqual(200)
                expect(body).toBe(JSON.stringify(postData));
                done();
            })
        })

    })
})