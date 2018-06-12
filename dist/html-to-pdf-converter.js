'use strict';

var pdf = require('html-pdf');
var options = { format: 'Letter' };
var htmlToPdf = function htmlToPdf(html, reportId) {

    pdf.create(html, options).toFile('./pdf_test_file/' + reportId + '.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
};
module.exports = { htmlToPdf: htmlToPdf };