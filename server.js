const router = require("./routers/productos")
// init project
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "static")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(router)

app.use((error, req, res, next) => {
  if(error.statusCode){
    return res.status(error.statusCode).render("error", {...error, message: error.message})
  }
  console.log(error)
  res.status(500).json({error: "Somethings brokes..."})
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
  console.log("Environment: " + process.env.NODE_ENV)
})
