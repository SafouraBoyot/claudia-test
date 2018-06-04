// import { $,jQuery } from 'jquery';
const $=require ('jquery');
const jQuery=require ('jquery');
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

describe("Store Lambda", () => {

	it("calls DynamoDB with the data provided by the Ajax request", () => {
		var	data = {
			reportId: "123",
			input_fields: "input-fields",
		}

		$.ajax({
			type: "POST",
			url: "https://y77j5js7md.execute-api.us-east-1.amazonaws.com/dev/reports",
			data: data,
			contentType: "application/json",
			success: () => console.log("Success")
		}).then((result) => {
			expect(result).toBe([data])
		})
	})
})