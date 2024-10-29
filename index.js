import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});