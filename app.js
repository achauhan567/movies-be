const express = require("express");
const app = express();
const moviesrouter = require("./src/routes/movies");
const genresrouter = require("./src/routes/genres");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});

app.use("/movies", moviesrouter);

app.use("/genres", genresrouter);

module.exports = app;