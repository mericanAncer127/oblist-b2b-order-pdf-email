exports.createInvoice = async (req, res) => {
  const payload = req.body;

  try {
    const response = await fetch(
      "https://app.pennylane.com/api/external/v1/customer_invoices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer aB8EZbbvL9epFcxeVdQsp2xwfyfTFCVsrIQtTkkUj-U`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create invoice");
    }

    const data = await response.json();
    res.json(data); // Send data back to Shopify extension
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
