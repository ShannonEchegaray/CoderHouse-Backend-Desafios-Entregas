const router = require("./routers/index")
const {errorHandler} = require("./utils/errors")
// init project
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "static")))

app.use("/api", router)

app.use(errorHandler)

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
})
