const axios = require("axios");
const env = require("dotenv");
const { generatePdf, uploadToDrive } = require('../config/utils');
const { google } = require('googleapis');

env.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDRIECT_URI = process.env.REDRIECT_URI;

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EXPIAY_DATE = process.env.EXPIAY_DATE;

const CreatePDF_Upload2GoogleDrive = async (products) => {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDRIECT_URI
  );

  // Set credentials from previous OAuth flow
  oAuth2Client.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN,
    token_type: 'Bearer',
    expiry_date: EXPIAY_DATE,
  });

  const pdf = await generatePdf({ name: 'John Doe' });
  const uploadedFile = await uploadToDrive(oAuth2Client, pdf);

  console.log('✅ PDF uploaded to Google Drive:');
  console.log(uploadedFile.webViewLink);

  return uploadedFile.webViewLink;
}

const CreatePDf_TriggerKlaviyo = async (req, res) => {
  const { email, products } = req.body;

  try {
    const link = await CreatePDF_Upload2GoogleDrive(products);
    res.status(200).json({msg: "succeed", link: link});
    // Send the POST request to the external API (PennyLane)
  } catch (error) {
    // Handle errors more specifically:
    if (error.response) {
      // If the error is from the response (e.g., 4xx or 5xx)
      console.error("Error response from external API:", error.response.data);
      return res.status(error.response.status).json({
        message: `Failed to create invoice: ${
          error.response.data.message || error.response.statusText
        }`,
      });
    } else if (error.request) {
      // If the error is due to a request not being sent
      console.error("No response received from external API:", error.request);
      return res.status(500).json({ message: "No response from the server" });
    } else {
      // Other unexpected errors (e.g., issues in the code)
      console.error("Unexpected error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = { CreatePDf_TriggerKlaviyo, CreatePDF_Upload2GoogleDrive };