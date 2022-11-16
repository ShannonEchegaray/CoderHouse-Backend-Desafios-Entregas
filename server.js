// init project
import express from "express";
import {initServer, emit} from "./socket.js";
import http from "http";
import bodyParser from "body-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/index.js";
const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(expressSession({
  store: new MongoStore({
    mongoUrl: "mongodb+srv://backend:Passw0rd@cluster0.rdtbnd0.mongodb.net/?retryWrites=true&w=majority",
    ttl: 10
  }),
  secret: "shhh",
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./static"));
app.set("views", "./views");
app.set("view engine", "pug");

app.use("/", router);

app.use((error, req, res, next) => {
  if(error.statusCode){
    return res.status(error.statusCode).send(`Error ${error.statusCode}`);
  }
  console.log(error);
  res.status(500).json({error: "Somethings brokes..."});
})

// listen for requests :)

const server = http.createServer(app);
initServer(server);

server.listen(PORT, function() {
  console.log("Your app is listening on port " + PORT);
  console.log("Environment: " + process.env.NODE_ENV);
})
