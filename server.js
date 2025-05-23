const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/reviews", async (req, res) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.PLACE_ID}&fields=name,rating,reviews&key=${process.env.GOOGLE_API_KEY}`;
        const response = await axios.get(url);
        const reviews = response.data.result.reviews || [];
        res.json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ error: "Error retrieving reviews" });
    }
});

app.get("/", (req, res) => {
    res.send("✅ La API de reseñas está online");
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
