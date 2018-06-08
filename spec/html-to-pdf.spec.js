var fs = require('fs');
const tools = require('../src/tools.js');
var html = fs.readFileSync('/Users/safoura/IdeaProjects/claudia-test-new/claudia-test/spec/businesscard.html', 'utf8');

const converter = require('../src/html-to-pdf-converter');
describe("Html To Pdf Should", function () {


    it("Convert html to Pdf when call the Api ", function (done) {
        converter.htmlToPdf(html, tools.uuidv4())
        done();
    })

})
