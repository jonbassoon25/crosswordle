/*
Jonathan Hanson, Zacarias Young

index.js

Server-side javascript hosting engine

4.13.23
*/

//------------------------------------------------------------------------------------//
//NPM Imports

const express = require('express');

const app = express();

const fs = require('fs');

const http = require('http').Server(app);

const io = require('socket.io')(http);

const path = require('path');

//------------------------------------------------------------------------------------//
//Local Imports

//Get function exports from crosswordCreator.js
const cc = require('./serverFiles/crosswordCreator.js');

//Load backup of database dictionary in event of server crash / shutdown
let database = require("./serverFiles/database.json");



//------------------------------------------------------------------------------------//
//Variables

//Number of users currently connected to the server
let connections = 0;

//Dictionary describing the room that every client is in
let clientRooms = {};

//Dictionary linking client socket-id to their username
let clientUsernames = {};

//Load backup of roomData dictionary in event of server crash / shutdown
let roomData = {};

//Did the server just die
let serverDied = true;

//------------------------------------------------------------------------------------//
//Functions

//deletes a array element at specified index
function del(array, index){
	return array.splice(index, 1);
};

//Saves JSON data to selected file
function save(data, file = "database"){
	let saveData = JSON.stringify(data);
	fs.writeFile("./serverFiles/" + file + ".json", saveData, (err) => {
		if (err) {
			console.log(err)
		}
	});
};

//Creates new user object with a set password
function createUser(password) {
	return {
		"password": password,
		"friendUsernames": [],
		"wins": 0,
		"games": 0,
		"highScore": 0,
		"bestTime": 0,
		"friendRequests": [],
		"developer": false
	};
};

//Initalizes a server object with set password
function createServer(host, password) {
	return {
		"password": password,
		"users": [],
		"userLimit": 6,
		"gameMode": "cooperative",
		"crosswordData": [],
		"hitboxes": [],
    	"gameState": "lobby", 
		"host": host,
		"highlightedTiles": {}
	}
};

//Send a update to one or all clients containing the server list
function serverListUpdate(socket, client){
	let keys = Object.keys(roomData);
	let tempDictionary = {};
	for (let i = 0; i < keys.length; i++) {
		tempDictionary[keys[i]] = roomData[keys[i]]["users"];
	}
	console.log("sending update");
	console.log(tempDictionary);
	if (!(Object.keys(tempDictionary).length > 0)) {
		if (client === "one") {socket.emit("error", "noServers");}
		if (client === "all") {io.emit("error", "noServers");}
	}
	if (client === "one") {socket.emit("serverNames", tempDictionary);}
	if (client === "all") {io.emit("serverNames", tempDictionary);}
};

function updateCrosswordData(roomName, crosswordData, hitboxes) {
	for (let rowIndex = 0; rowIndex < crosswordData.length; rowIndex++) {
		for (let columnIndex = 0; columnIndex < crosswordData.length; columnIndex++) {
			if (crosswordData[rowIndex][columnIndex][0] !== roomData[roomName]["crosswordData"][rowIndex][columnIndex][0]) {
				if (roomData[roomName]["crosswordData"][rowIndex][columnIndex][0] === "-") {
					roomData[roomName]["crosswordData"][rowIndex][columnIndex] = crosswordData[rowIndex][columnIndex];
				}
			}
		}
	}
	for (let hitboxIndex = 0; hitboxIndex < hitboxes.length; hitboxIndex++) {
		if (hitboxes[hitboxIndex][5] !== roomData[roomName]["hitboxes"][hitboxIndex][5]) {
			if (roomData[roomName]["hitboxes"][hitboxIndex][5] === false) {
				roomData[roomName]["hitboxes"][hitboxIndex][5] = true;
			}
		}
	}
};

//------------------------------------------------------------------------------------//
//App Commands

//Mark clientFiles folder as static
app.use(express.static(path.join(__dirname, 'clientFiles')));

//Send user index.html when they load the url
app.get('/', function(req, res){
	//__dirname is the name of the current directory
	res.sendFile(__dirname + '/clientFiles/index.html');
});

//------------------------------------------------------------------------------------//
//User event listener

io.on('connection', (socket) => {
	connections = io.engine.clientsCount;
	console.log("\nConnected Users: " + connections.toString());

	//On username transmission
	socket.on("username", (username) => {
		clientUsernames[socket.id] = username;
	});
	
	//On user requested crossword generation
	socket.on("generateCrossword", async function(spawnData) {
		let wordLength = spawnData[0];
		let wordCount = spawnData[1];
		data = await cc.generateCrossword(wordLength, wordCount);
		console.log("Sending Crossword with " + data[1].length.toString() + " Words\n");
		socket.emit("crosswordData", data);
	});

	//On user requested log
	socket.on("log", (message) => {console.log(message);});

	//On user requested word list
	socket.on("wordList", () => {
		let allWords = fs.readFileSync("./serverFiles/largeAllWords.txt").toString('utf-8');
		allWords = allWords.split("\n");
		socket.emit("wordList", allWords);
	});

	//When user wants to login
	socket.on("login", (loginInfo) => {
		let username = loginInfo[0];
		let password = loginInfo[1];
		//Check to see if username exists, then check to see if the password matches, if it password doesn't match or the username doesn't exist fail
		if (!(username in database)) {
			socket.emit("error", "usernameUndefined");
		} else if (database[username]["password"] === password) {
			let userDatabase = {...database[username]};
			delete userDatabase["password"];
			console.log(username + " Logged In");
			socket.emit("loggedIn", userDatabase);
		} else {
			console.log("Incorrect Password");
			socket.emit("error", "incorrectPassword");
		}
	});

	//When user wants to make an account
	socket.on("createAccount", (accountInfo) => {
		let newUsername = accountInfo[0];
		let newPassword = accountInfo[1];
		if (newUsername in database) {
			socket.emit("error", "usernameInUse");
		} else {
			database[newUsername] = createUser(newPassword);
			save(database);
			let userDatabase = {...database[newUsername]};
			delete userDatabase["password"];
			console.log(newUsername + " Created an Account");
			socket.emit("accountCreated", userDatabase);
		}
	});

	//When user wants to change password
	socket.on("changePassword", (changeInfo) => {
		let username = changeInfo[0];
		let password = changeInfo[1];
		let newPassword = changeInfo[2];
		if (username in database) {
			if (database[username]["password"] === password) {
				database[username]["password"] = newPassword;
				save(database);
				socket.emit("passwordChangeSuccess", null);
			} else {
				socket.emit("error", "incorrectPassword");
			}
		} else {
			socket.emit("error", "incorrectUsername");
		}
	});

	//When user wants to change username
	socket.on("changeUsername", (changeInfo) => {
		let username = changeInfo[0];
		let password = changeInfo[1];
		let newUsername = changeInfo[2];
		if (!(newUsername in database)) {
			if (database[newUsername]["password"] === password) {
				database[newUsername] = database[username];
				delete database[username];
				save(database);
				socket.emit("usernameChanged", newUsername);
			} else {
				socket.emit("error", "passwordIncorrect")
			}
		} else {
			socket.emit("error", "usernameTaken");
		}
	});

	//When the user has won a game
	socket.on("userWin", (username) => {
		database[username]["wins"] += 1;
		save(database);
	});

	//When the user has started a game
	socket.on("gameStarted", (username) => {
		console.log(username);
		database[username]["games"] += 1;
		save(database);
	});

	//When user score update has been recieved
	socket.on("updateScore", (data) => {
		let username = data[0];
		let score = data[1];
		if (database[username]["highScore"] < score) {
			database[username]["highScore"] = score;
			save(database);
		}
	});

	//When user time update has been recieved
	socket.on("updateTime", (data) => {// time is expressed in seconds
		let username = data[0];
		let time = data[1];
		if (database[username]["bestTime"] < time) {
			database[username]["bestTime"] = time;
			save(database);
		}
	});

	//When the user has requested a update to their client-side database
	socket.on("updateDatabase", (username) => {
		let userDatabase = {...database[username]};
		userDatabase["password"] = null;
		socket.emit("databaseUpdate", userDatabase);
	});

	//When the user wants to host a private server
	socket.on("privateHost", (data) => {
		let username = data[0];
		let serverName = data[1];
		let serverPassword = data[2];
		if (!(serverName in roomData)){
			roomData[serverName] = createServer(serverPassword);
			roomData[serverName]["users"].push(username);
			roomData[serverName]["host"] = username;
			save(roomData, "roomData");
			clientRooms[socket.id] = serverName;
			socket.join(serverName);
			serverListUpdate(socket, "all");
			socket.emit("joinedRoom", serverName);
		}
	});

	//When user wants to request a crossword generation for their room
	socket.on("generateRoomCrossword", async function (generationData) {
		// let wordLength = spawnData[0];
		// let wordCount = spawnData[1];
		// data = await cc.generateCrossword(wordLength, wordCount);
		// console.log("Sending Crossword with " + data[1].length.toString() + " Words\n");
		// socket.emit("crosswordData", data);
		let roomName = generationData[0];
		let wordLength = generationData[1];
		let wordCount = generationData[2];
		socket.to(roomName).emit("generatingRoomCrossword", null);
		data = await cc.generateCrossword(wordLength, wordCount);
		console.log("Sending Crossword with " + data[1].length.toString() + " Words to Room: " + roomName + "\n");
		roomData[roomName]["crosswordData"] = data[0];
		roomData[roomName]["hitboxes"] = data[1];
		save(roomData, "roomData");
		socket.in(roomName).emit("crosswordData", data);
		socket.emit("crosswordData", data);
	});

	//When user requests update to their data (crosswordData)
	socket.on("requestGameData", (roomName) => {
		socket.emit("crosswordData", [roomData[roomName]["crosswordData"], roomData[roomName]["hitboxes"]]);
	});

	//When user wants to update their room's crossword data
	socket.on("updateGameData", (data) => {
		let roomName = data[0];
		let crosswordData = data[1];
		let hitboxes = data[2];
		updateCrosswordData(roomName, crosswordData, hitboxes);
		socket.to(roomName).emit("crosswordData", [roomData[roomName]["crosswordData"], roomData[roomName]["hitboxes"]]);
	});

	//When user wants to request a update to all of the room data
	socket.on("requestRoomData", (roomName) => {
		socket.emit("roomDataUpdate", roomData[roomName]);
	});

	//When user wants to disconnect from a room
	socket.on("leaveRoom", () => {
		let roomName = clientRooms[socket.id];
		//Leave the socket room
		socket.leave(roomName);
		delete clientRooms[socket.id]
		del(roomData[roomName]["users"], roomData[roomName]["users"].indexOf(clientUsernames[socket.id]));
		save(roomData, "roomData");
	});

	//When user wants to join a room
	socket.on("joinRoom", (data) => {
		//Unpack data
		let username = data[0];
		let roomName = data[1];
		let roomPassword = data[2];
		clientRooms[socket.id] = roomName;
		//Join the socket room
		socket.join(roomName);
		console.log(io.sockets.adapter.rooms.get(roomName).size);
		//Update database to reflect the new room
		roomData[roomName]["users"].push(username);
		save(roomData, "roomData");
		socket.emit("joinedRoom", roomName);
	});

	//When user wants to see all of the roomsi
	socket.on("requestServerNames", () => {
		serverListUpdate(socket, "one");
	});

	//When user has a addition to the highlighted spaces
	socket.on("hitboxSelected", (serverName, selectedHitbox, color) => {
		//roomData[serverName]["highlightedTiles"][socket.id] = selectedHitbox.push(color);
		//socket.to(serverName).emit("highlightUpdate", roomData[serverName]["highlightedTiles"]);
	});
	
	socket.on("hitboxDeselected", (serverName) => {
		//delete roomData[serverName]["highlightedTiles"][socket.id];
		//socket.to(serverName).emit("highlightUpdate", roomData[serverName]["highlightedTiles"]);
	});
	
	//When a user has disconnected
	socket.on('disconnect', () => {
		connections = io.engine.clientsCount;
		console.log("\nConnected Users: " + connections.toString());
		let room = clientRooms[socket.id];
		if (roomData[room] !== undefined) {
			del(roomData[room]["users"], roomData[room]["users"].indexOf(clientUsernames[socket.id]));
			if (roomData[room]["users"].length === 0) {
				delete roomData[room];
				save(roomData, "roomData");
				serverListUpdate(socket, "all");
			}
		}
		if (socket.id in clientRooms) { delete clientRooms[socket.id]; }
	});
});

//------------------------------------------------------------------------------------//
//Host server on port 8000

http.listen(8000, () => {
   console.log('Server Started');
});

//Wait 10 seconds to tell the clients that the server died
setTimeout(() => {
	if (serverDied) {
		io.emit("error", "serverDied");
	}
}, 10000);

setInterval(() => {
	connections = io.engine.clientsCount;
	console.log("\nConnected Users: " + connections.toString());
}, 10000);

save(roomData, "roomData");