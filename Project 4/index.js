const PDFDocument = require('pdfkit'),
    // Create a pdf doc
    doc = new PDFDocument()
const fs = require('fs');
const axios = require('axios');

// Function to create a PDF with fetched data
const createPdf = (data) => {
    const fileName = 'output.pdf';

    doc.pipe(fs.createWriteStream(fileName));

    // Add Title
    doc.fontSize(20).text('User Report', { align: 'center' });

    // Add data to the PDF
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${data.name}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Username: ${data.username}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Website: ${data.website}`);
    doc.text(`Company: ${data.company.name}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    // Finalize the PDF
    doc.end();

    console.log(`PDF Generated: ${fileName}`);
};

// Function to fetch data from the API
async function fetchData() {
    try {
        // Fetch data from a sample API
        const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        return null;
    }
}

// Main function to fetch and generate PDF
(async () => {
    const data = await fetchData();
    if (data) {
        createPdf(data);
    }
})();
