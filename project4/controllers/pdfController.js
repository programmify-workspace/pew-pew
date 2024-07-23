const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

async function printPDF(htmlContent) {
    let browser;
    try {
        console.log('Launching browser...');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 60000
        });
        console.log('Browser launched');

        const page = await browser.newPage();
        console.log('New page opened');

        await page.setContent(htmlContent);
        console.log('Content set to the page');

        const pdfBuffer = await page.pdf({ format: 'A4' });
        console.log('PDF generated');

        // Save the PDF to a file
        // await fs.writeFile('output.pdf', pdfBuffer);
        // console.log('PDF saved successfully!');

        return pdfBuffer;
    } catch (err) {
        console.error('Error generating PDF:', err);
    } finally {
        if (browser) {
            await browser.close();
            console.log('Browser closed');
        }
    }
}

const pdfController = {
    generatePDF: async (req, res) => {
        const { filename, headerTitle, headerLogo, headerDate, authorName, bodyContent, footerText, footerPageNumber, customStyles } = req.body;
  
        console.log(`filename: ${filename}, headerTitle: ${headerTitle}, headerTitle: ${headerLogo} bodyContent: ${bodyContent}, footerText: ${footerText}, footerPageNumber: ${footerPageNumber}, authorName: ${authorName}, date: ${headerDate}, customStyles: ${customStyles} `);
  
        res.render('template', { headerTitle, headerLogo, bodyContent, footerText, footerPageNumber, authorName, headerDate, customStyles }, async (err, htmlContent) => {
          if (err) {
            console.error('Error rendering template:', err);
            return res.status(500).send('Internal Server Error');
          }      
        
          try {
            const pdfBuffer = await printPDF(htmlContent);
            // res.setHeader('Content-Type', 'application/pdf');
            res.contentType('application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
            res.send(pdfBuffer);
          } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).send('Error generating PDF');
          }
        });
    }
}

module.exports = pdfController;

