var $ = require('jquery');
AWS = require('aws-sdk');

describe("Store Lambda", function() {

	it("calls DynamoDB with the data provided by the Ajax request", function() {
		var	data = {
			reportId: "123",
			input_fields: "input-fields",
			results: "results"
		}

		console.log("AJAX")
		console.log($.ajax)

		// $.ajax({
		// 	type: "POST",
		// 	url: "https://zgapooq1zi.execute-api.us-east-1.amazonaws.com/latest/reports",
		// 	data: data,
		// 	contentType: "application/json",
		// 	success: function() {
		// 		console.log("Success");
		// 	}
		// }).then(function(result) {
		// 	console.log(result);
		// })
	})

})