import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./src/routes.js";
import db from './src/config/config.js';
import mongoose from "mongoose";

let app = express();

dotenv.config();

app.use(function(req, res, next) {
    if (req.get("x-amz-sns-message-type")) {
        req.headers["content-type"] = "application/json";
    }
    next();
});

app.use(express.json());
var port = process.env.PORT || 8086;

app.use(
    cors({
        origin: "*",
        methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: [
            "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-IDENTITY",
        ],
    })
);

mongoose.connect(db.url, { useNewUrlParser: true }).then(() => {
    console.log('Connection Succesful')
}).catch((err) => (console.log(`connection error ${err}`)))

app.use("/", router);
app.listen(port, function(err) {
    if (!err) { console.log("Running restapp project on " + port); } else console.log(err);
});