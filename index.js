import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const API_URL = "https://calendarific.com/api/v2";
const API_KEY = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Information will appear here", holidays: [] });
});

app.post("/submit", async (req, res) => {
    const { country, year } = req.body;

    try {
        const result = await axios.get(`${API_URL}/holidays?api_key=${API_KEY}&country=${country}&year=${year}`);

        const holidays = result.data.response.holidays.map(holiday => ({
            name: holiday.name,
            description: holiday.description,
            date: holiday.date.iso // ISO date string
        }));

        res.render("index.ejs", { holidays });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});