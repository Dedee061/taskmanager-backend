const mongoose = require("mongoose");

const connectToDataBase = async () => {
    await mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@taskmanagerclub.rtplj.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerClub`
        )
        .then(() => {
            console.log("Connected to MongoDB!");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = connectToDataBase;
