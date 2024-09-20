const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');

// Function to fetch data from an API
const fetchData = async () => {
  try{
    const response = await fetch('http://localhost:4000/users/1');
    return await response.json();
  }  catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to generate PDF
function generatePDF(data) {
  // Create a document
  const doc = new PDFDocument();

  // Pipe the document to a blob
  const stream = fs.createWriteStream('output.pdf');
  doc.pipe(stream);

  // Add some content to the document
  doc.fontSize(25).text('User Information', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Name: ${data.name}`);
  doc.text(`Email: ${data.email}`);
  doc.text(`Phone: ${data.phone}`);
  doc.text(`Website: ${data.website}`);

  // Finalize the document and end the stream
  doc.end();

  stream.on('finish', function() {
    console.log('PDF created successfully');
  });
}

// Main function to fetch data and generate PDF
async function main() {
  const data = await fetchData();
  if (data) {
    generatePDF(data);
  }
  else {
  console.log("error");
}
}
main();
