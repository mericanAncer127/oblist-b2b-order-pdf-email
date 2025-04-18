const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const { google } = require('googleapis');
const streamifier = require('streamifier');
// Replace with your HTML-to-PDF logic
async function generatePdf(data) {
  const templateHtml = await fs.readFile('./config/template.html', 'utf-8');
  const filledHtml = templateHtml.replace('{{name}}', data.name);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(filledHtml, { waitUntil: 'load' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
}

// Upload PDF to Google Drive
async function uploadToDrive(authClient, pdfBuffer) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  const res = await drive.files.create({
    requestBody: {
      name: 'B2B Order Confirmation.pdf',
      mimeType: 'application/pdf',
    },
    media: {
      mimeType: 'application/pdf',
      body: streamifier.createReadStream(pdfBuffer),
    },
    fields: 'id, webViewLink',
  });

  return res.data;
}

module.exports = { generatePdf, uploadToDrive }
