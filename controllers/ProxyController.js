const axios = require("axios");

exports.createInvoice = async (req, res) => {
  const { payload } = req.body;

  try {
    // Send the POST request to the external API (PennyLane)
    const response = await axios.post(
      "https://app.pennylane.com/api/external/v1/customer_invoices",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer aB8EZbbvL9epFcxeVdQsp2xwfyfTFCVsrIQtTkkUj-U",
        },
      }
    );

    // Check if the response status is 422 (Unprocessable Entity)
    if (response.status === 422) {
      console.log("Invoice already created: ", response.data);
      return res.status(422).json({
        message: "Invoice already created", // Return a specific message for 422
      });
    }

    // Log the response data for debugging purposes
    console.log("Invoice created successfully:", response.data);

    // Return the created invoice data back to the client
    res.json(response.data);
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
