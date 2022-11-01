import router from "./routers/index.js";
import {errorHandler} from "./utils/errors.js";
// init project
import express from "express";
import bodyParser from 'body-parser';
import path from "path";
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join("./", "static")))

app.use("/api", router)

app.use(errorHandler)

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
})
