const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDataBase();

app.get("/", (req, res) => {
    const task = [{ description: "estudar ", isCompleted: true }];
    res.status(200).send(task);
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
