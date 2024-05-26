require("dotenv").config();

const http = require('http');
// library imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {Server} = require("socket.io");

// custom imports
const initiateServer = require("./config/server");
const {initializeSocket} = require('./sockets')

const app = express();

// create an http server for sockets
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors : {
        origin : "https://dribble-clone-gamma.vercel.app"
    }
}); 

app.set("io", io); 

initializeSocket(io);

// connect database and listen to port 
initiateServer(httpServer);

const corsOptions = {
    origin : 'https://dribble-clone-gamma.vercel.app', 
    optionSuccessStatus : 200, 
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://dribble-clone-gamma.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to dribble clone backend" });
});

// Auth routes...
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// User routes...
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

// Invalid routes...
app.get("*", (req, res) => {
    res.status(404).json({ message: "not-found" });
});
