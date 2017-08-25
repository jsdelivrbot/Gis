const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const observer = require("./observer");

const app = express();
const http = require("http").Server(app);

app.use(bodyParser.json());

const allClients = [];

const storage = {
	allBranches: []
}

app.get("/", (req, res) => {
	res.sendFile(path.resolve("./server/client.html"));
});

const postRoutes = ["branches", "currentBranch", "diff", "commits"];

postRoutes.forEach(route => {
	app.post(`/${route}`, (req, res) => {
		storage[route] = req.body[route];
		allClients.forEach(c => c.emit(route, storage[route]));
		res.send("success");
	});
});

const server = app.listen(8493, () => console.log("Listening on 8493"));

const io = require("socket.io")(server);
io.on("connection", function(socket){
  allClients.push(socket);
});

observer.watch();