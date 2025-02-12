const axios = require("axios");
exports.createInvoice = async (req, res) => {
  const { payload } = req.body;

  console.log("req body: ", req.body);
  console.log("payload: ", payload);
  try {
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

    console.log(response);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create invoice" });
  }
};
