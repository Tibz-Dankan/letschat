const express = require("express");
const cors = require("cors");
// const path = require("path");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { chatHandler } = require("./controllers/chatController");
const { errorHandler } = require("./controllers/errorController");
const { keepActiveController } = require("keep-apps-active");
const app = express();

let url;

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: process.env.PRODUCTION_URL }));
  url = process.env.PRODUCTION_URL;
} else {
  app.use(cors());
  url = "http://localhost:5173";
}

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: url,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "views")));

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

// chats
chatHandler(io);

keepActiveController(app);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "error end point not found!",
    // message: req.originalUrl,
    message: "End-point not found",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`server started and running on port ${PORT}...`)
);

// module.exports = app;
module.exports = server;
