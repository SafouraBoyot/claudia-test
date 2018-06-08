var pdf = require('html-pdf');
var options = {format: 'Letter'};
const htmlToPdf = function (html,reportId) {

    pdf.create(html, options).toFile('./pdf_test_file/'+reportId+'.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}
module.exports = { htmlToPdf }