
const PDFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback, heading, content) {
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(25).text(heading);
    doc.fontSize(12).text(content);

    doc.end();
}

module.exports = { buildPDF };