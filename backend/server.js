require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const journalRoutes = require("./routes/journalRoutes");

const app = express();
console.log(process.env.GEMINI_API_KEY);
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/journalDB")
    .then(()=> console.log("MongoDB connected"));

app.use("/api", journalRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port", process.env.PORT);
});