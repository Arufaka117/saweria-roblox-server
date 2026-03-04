const express = require("express");
const app = express();

app.use(express.json());

let lastDonation = null;

app.post("/webhook", (req, res) => {
    lastDonation = req.body;
    console.log("Donasi masuk:", lastDonation);
    res.sendStatus(200);
});

app.get("/donation", (req, res) => {
    res.json(lastDonation);
});

app.get("/", (req, res) => {
    res.send("Server Saweria ke Roblox aktif!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server jalan di port", PORT);
});
