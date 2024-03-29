import express from "express";
import * as path from "path";
import routes from "./routes/routes.js";
import * as mongoose from "mongoose";
import 'dotenv/config';


const app = express();


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
});

app.use(routes);


mongoose.connect(process.env.DB_LINK).then(() => {
    app.listen(process.env.PORT);
    console.log("Avviato")
});