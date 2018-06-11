const request = require('request');
const requestPromise = require('request-promise');

const tools = require ('../src/tools.js');



describe("Store Lambda", function () {


    it("calls DynamoDB with the data provided by the Ajax request", function (done) {
        const postUri = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports"

        const reportId = tools.uuidv4()
        const postData = {
            reportId: reportId,
            input_fields: "input-fields"
        }

        const options = {
            method: 'post',
            body: postData,
            uri: postUri,
            json: true,
            resolveWithFullResponse: true

        }


        const getUri = `https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports/${reportId}`;

        requestPromise(options).then(function (response) {
            expect(response.statusCode).toEqual(201)

            requestPromise.get(getUri, function (err, res, body) {
                expect(res.statusCode).toEqual(200)
                expect(body).toBe(JSON.stringify(postData));
                done();
            })
        })
            .catch(function (err) {
                console.log(err)
            });

    })
    it("calls Lambda API to getting all the reports", function () {

        const getUrl = "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports";
        request.get(getUrl, function (err, res, body) {
            expect(res.statusCode).toEqual(200);
        })
    })
})
