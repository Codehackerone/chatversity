"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
dotenv_1.config();
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server);
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "public")));
app.use(express_1["default"].static(__dirname + "/views"));
app.set("view engine", "ejs");
io.on("connection", function (socket) {
    socket.emit('message', 'Welcome to chatversity!');
    socket.broadcast.emit('message', 'A user has joined the chat');
    socket.on('disconnect', function () {
        io.emit('message', 'A user has left the chat');
    });
});
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/chat", function (req, res) {
    var _a = req.query, username = _a.username, room = _a.room;
    res.render("chat", { username: username, room: room });
});
var port = Number(process.env.PORT);
server.listen(port, function () {
    console.log("Chat-app running on port " + port + ".");
});
//# sourceMappingURL=server.js.map