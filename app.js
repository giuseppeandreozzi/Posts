import express from "express";
import * as path from "path";
import routes from "./routes/routes.js";
import * as mongoose from "mongoose";
import 'dotenv/config';
import multer from "multer";

const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
});

app.use(upload.single("image"));

app.use(routes);


mongoose.connect(process.env.DB_LINK).then(() => {
    app.listen(process.env.PORT);
    console.log("Avviato")
});