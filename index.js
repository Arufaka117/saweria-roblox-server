const express = require("express");
const app = express();
app.use(express.json());

let latestDonation = null;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/saweria-webhook", (req, res) => {
  const data = req.body;
  console.log("Raw webhook data:", JSON.stringify(data));

  latestDonation = {
    name: data.donator_name || data.name || "Unknown",
    amount: data.amount_raw || data.amount || 0,
    message: data.message || "",
    id: Date.now().toString()
  };

  console.log("Donation masuk:", latestDonation);
  res.sendStatus(200);
});

app.get("/latest-donation", (req, res) => {
  if (!latestDonation) {
    return res.json({ id: "none", name: "", amount: 0, message: "" });
  }
  res.json(latestDonation);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
