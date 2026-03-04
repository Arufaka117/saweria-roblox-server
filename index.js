const express = require("express");
const app = express();

app.use(express.json());

let latestDonation = null;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/saweria-webhook", (req, res) => {
  const data = req.body;

  latestDonation = {
    name: data.donator_name,
    amount: data.amount_raw,
    message: data.message
  };

  console.log("Donation masuk:", latestDonation);

  res.sendStatus(200);
});

app.get("/latest-donation", (req, res) => {
  res.json(latestDonation);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
