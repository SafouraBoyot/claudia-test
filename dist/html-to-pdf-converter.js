'use strict';

var pdf = require('html-pdf');
var options = { format: 'Letter' };

var htmlToPdf = function htmlToPdf(html) {
    pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
};
module.exports = { htmlToPdf: htmlToPdf };