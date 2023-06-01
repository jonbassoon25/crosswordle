/*
Jonathan Hanson, Zacarias Young

client.js

Client side javascript program for crosswordle

4.28.23
*/
// Simulate an HTTP redirect:
//Initalize the server communication handler
const socket = io();
//initalize canvas
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;


//------------------------------------------------------------------------------------//
//Image Assets

const logo = new Image();
logo.src = "/textures/mainLogo.png";

const textMarker = new Image();
textMarker.src = "/textures/textmarker.png";

const brownOutline = new Image();
brownOutline.src = "/textures/BrownOutline.png";

const brownSquare = new Image();
brownSquare.src = "/textures/brownTile.png";

const redOutline = new Image();
redOutline.src = "/textures/RedOutline.png";

const redSquare = new Image();
redSquare.src = "/textures/RedSquare.png";

const yellowOutline = new Image();
yellowOutline.src = "/textures/YellowOutline.png";

const yellowSquare = new Image();
yellowSquare.src = "/textures/YellowSquare.png";

const greenOutline = new Image();
greenOutline.src = "/textures/GreenOutline.png";

const greenSquare = new Image();
greenSquare.src = "/textures/GreenSquare.png";

const grayOutline = new Image();
grayOutline.src = "/textures/GrayOutline.png";

const graySquare = new Image();
graySquare.src = "/textures/GraySquare.png";

const whiteOutline = new Image();
whiteOutline.src = "/textures/WhiteOutline.png";

const leftSideBar = new Image();
leftSideBar.src = "/textures/leftSideBar.png";

const rightSideBar = new Image();
rightSideBar.src = "/textures/rightSideBar.png";

const topBar = new Image();
topBar.src = "/textures/topBar.png";

const bottomBar = new Image();
bottomBar.src = "/textures/bottomBar.png";

const outlineSquare = new Image();
outlineSquare.src = "/textures/black-gold_Outline.png";

const grayBackground = new Image();
grayBackground.src = "/textures/grayBackground.png";

const mainBanner = new Image();
mainBanner.src = "/textures/banner.png";

const crosswordTile = new Image();
crosswordTile.src = "/textures/crosswordTile.png";

const seperator = new Image();
seperator.src = "/textures/seperatorBar_orange-gold.png";

const lightTextMarker = new Image();
lightTextMarker.src = "/textures/lightTextMarker.png";

const darkTextMarker = new Image();
darkTextMarker.src = "/textures/darkTextMarker.png";

const placeholder = new Image();
placeholder.src = "/textures/placeholderImage.png";

const joinArrow = new Image();
joinArrow.src = "/textures/buttons/joinArrow.png";

//------------------------------------------------------------------------------------//
//Hitbox Images

let hitboxHorizontalLeft = {};
let hitboxHorizontalMiddle = {};
let hitboxHorizontalRight = {};

let hitboxVerticalTop = {};
let hitboxVerticalMiddle = {};
let hitboxVerticalBottom = {};

const colors = ["blue", "red", "yellow", "green", "pink", "white", "orange", "cyan"];

for (let i = 0; i < colors.length; i++) {
	hitboxHorizontalLeft[colors[i]] = new Image();
	hitboxHorizontalLeft[colors[i]].src = "/textures/coloredHitboxes/" + colors[i] + "/hitboxHorizontalLeft.png";

	hitboxHorizontalMiddle[colors[i]] = new Image();
	hitboxHorizontalMiddle[colors[i]].src = "/textures/coloredHitboxes/" + colors[i] + "/hitboxHorizontalMiddle.png";

	hitboxHorizontalRight[colors[i]] = new Image();
	hitboxHorizontalRight[colors[i]].src = "/textures/coloredHitboxes/" + colors[i] + "/hitboxHorizontalRight.png";

	hitboxVerticalTop[colors[i]] = new Image();
	hitboxVerticalTop[colors[i]].src = "/textures/coloredHitboxes/" + colors[i] + "/hitboxVerticalTop.png";

	hitboxVerticalMiddle[colors[i]] = new Image();
	hitboxVerticalMiddle[colors[i]].src = "/textures/coloredHitboxes/" + colors[i] + "/hitboxVerticalMiddle.png";

	hitboxVerticalBottom[colors[i]] = new Image();
	hitboxVerticalBottom[colors[i]].src = "/textures/coloredHitboxes/" + colors[i] + "/hitboxVerticalBottom.png";
}

//------------------------------------------------------------------------------------//
//Button Images

const back = new Image();
back.src = "/textures/buttons/back.png";

const settings = new Image();
settings.src = "/textures/buttons/settings.png";

const buttonHovered = new Image();
buttonHovered.src = "/textures/buttons/buttonhovered.png";

const buttonSelected = new Image();
buttonSelected.src = "/textures/buttons/buttonpressed.png";

const easy = new Image();
easy.src = "/textures/buttons/easy.png";

const medium = new Image();
medium.src = "/textures/buttons/medium.png";

const hard = new Image();
hard.src = "/textures/buttons/hard.png";

const custom = new Image();
custom.src = "/textures/buttons/custom.png";

const signIn = new Image();
signIn.src = "/textures/buttons/signin.png";

const play = new Image();
play.src = "/textures/buttons/play.png";

const howToPlay = new Image();
howToPlay.src = "/textures/buttons/howtoplay.png";

const musicDisabled = new Image();
musicDisabled.src = "/textures/buttons/music(disabled).png";

const musicEnabled = new Image();
musicEnabled.src = "/textures/buttons/music(enabled).png";

const volumeUp = new Image();
volumeUp.src = "/textures/buttons/plus.png";

const volumeDown = new Image();
volumeDown.src = "/textures/buttons/minus.png";

const leaderboard = new Image();
leaderboard.src = "/textures/buttons/leaderboard.png";

const textboxLeft = new Image();
textboxLeft.src = "/textures/textboxLeft.png";

const textboxMiddle = new Image();
textboxMiddle.src = "/textures/textboxCenter.png";

const textboxRight = new Image();
textboxRight.src = "/textures/textboxRight.png";

const solo = new Image();
solo.src = "/textures/buttons/solo.png";

const hostServerImg = new Image();
hostServerImg.src = "/textures/buttons/hostserver.png";

const joinServerImg = new Image();
joinServerImg.src = "/textures/buttons/serverselect.png";

//------------------------------------------------------------------------------------//
//Audio

mainMusic = new Audio();
mainMusic.src = "/audio/crossWorldleSoundTrackLoop4.wav";

calm2 = new Audio();
calm2.src = "/audio/crossWordleCalm2.wav";

calm3 = new Audio();
calm3.src = "/audio/crossWordleCalm3.wav";

music1 = new Audio();
music1.src = "/audio/crossWordleMusic3.0.wav";

//------------------------------------------------------------------------------------//
//Blocky font Letter Images

let letterImages = [];
//alphabet characters
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

for (let letterIndex = 0; letterIndex < 26; letterIndex++){
	let imageToPush = new Image();
	imageToPush.src = "/textures/alphabet/" + alphabet[letterIndex].toUpperCase() + ".png";
	letterImages.push(imageToPush);
}

const period = new Image();
period.src = "/textures/alphabet/period.png";

//------------------------------------------------------------------------------------//
//Full Alphabet Images

let fullAlphabetImages = [];

for (let letterIndex = 0; letterIndex < 26 * 2; letterIndex++) {
	let identifier = "_lower";
	if (letterIndex >= 26) {
		identifier = "_upper";
	}
	let imageToPush = new Image();
	imageToPush.src = "/textures/fullAlphabet/" + alphabet[letterIndex % 26] + identifier + ".png";
	fullAlphabetImages.push(imageToPush);
}

//Special Characters

const underscore = new Image();
underscore.src = "/textures/fullAlphabet/_.png";

const dash = new Image();
dash.src = "/textures/fullAlphabet/-.png";

const semiColon = new Image();
semiColon.src = "/textures/fullAlphabet/;.png";

const exclamation = new Image();
exclamation.src = "/textures/fullAlphabet/!.png";

const leftParenthisis = new Image();
leftParenthisis.src = "/textures/fullAlphabet/(.png";

const rightParenthisis = new Image();
rightParenthisis.src = "/textures/fullAlphabet/).png";

const leftBracket = new Image();
leftBracket.src = "/textures/fullAlphabet/[.png";

const rightBracket = new Image();
rightBracket.src = "/textures/fullAlphabet/].png";

const leftCurlyBracket = new Image();
leftCurlyBracket.src = "/textures/fullAlphabet/{.png";

const rightCurlyBracket = new Image();
rightCurlyBracket.src = "/textures/fullAlphabet/}.png";

const atSign = new Image();
atSign.src = "/textures/fullAlphabet/@.png";

const ampersand = new Image();
ampersand.src = "/textures/fullAlphabet/&.png";

const hashtag = new Image();
hashtag.src = "/textures/fullAlphabet/hashtag.png";

const percentSign = new Image();
percentSign.src = "/textures/fullAlphabet/percent.png";

const backQuote = new Image();
backQuote.src = "/textures/fullAlphabet/`.png";

const carrotSign = new Image();
carrotSign.src = "/textures/fullAlphabet/^.png";

const plusSign = new Image();
plusSign.src = "/textures/fullAlphabet/+.png";

const equalSign = new Image();
equalSign.src = "/textures/fullAlphabet/=.png";

const tilde = new Image();
tilde.src = "/textures/fullAlphabet/~.png";

const dollarSign = new Image();
dollarSign.src = "/textures/fullAlphabet/$.png";

const zeroNumber = new Image();
zeroNumber.src = "/textures/fullAlphabet/0.png";

const oneNumber = new Image();
oneNumber.src = "/textures/fullAlphabet/1.png";

const twoNumber = new Image();
twoNumber.src = "/textures/fullAlphabet/2.png";

const threeNumber = new Image();
threeNumber.src = "/textures/fullAlphabet/3.png";

const fourNumber = new Image();
fourNumber.src = "/textures/fullAlphabet/4.png";

const fiveNumber = new Image();
fiveNumber.src = "/textures/fullAlphabet/5.png";

const sixNumber = new Image();
sixNumber.src = "/textures/fullAlphabet/6.png";

const sevenNumber = new Image();
sevenNumber.src = "/textures/fullAlphabet/7.png";

const eightNumber = new Image();
eightNumber.src = "/textures/fullAlphabet/8.png";

const nineNumber = new Image();
nineNumber.src = "/textures/fullAlphabet/9.png";

const arrowLeft = new Image();
arrowLeft.src = "/textures/fullAlphabet/arrowLeft.png";

const arrowRight = new Image();
arrowRight.src = "/textures/fullAlphabet/leftPoint.png";

const backslash = new Image();
backslash.src = "/textures/fullAlphabet/backslash.png";

const colon = new Image();
colon.src = "/textures/fullAlphabet/colon.png";

const questionMark = new Image();
questionMark.src = "/textures/fullAlphabet/question.png";

const slash = new Image();
slash.src = "/textures/fullAlphabet/slash.png";

const asterisk = new Image();
asterisk.src = "/textures/fullAlphabet/star.png";

//------------------------------------------------------------------------------------//
//Constants

//size of images on crossword
const CES = 50;

const charactersToLower = ["g", "p", "q", "y", "j"];

//{difficulty: [[minLength, maxLength], wordCount]}
let difficulty = {"easy": [[4, 6], 4], "medium": [[5, 8], 5], "hard": [[6, 10], 5]}

//define the shapes of the keyboard display and the constants used to build them
const keyboardDataDisplayShape = "rows";
const keyboardDisplayKeySize = CES + 25;
const keyboardDisplayXOffset = 100;
const keyboardDisplayYOffset = 1080/2 - 5 * (CES + 25)/2;

//Position of letters x, y (offset, size, muliplier)
const rowsKeyboardDisplayShape = {
	"a": [keyboardDisplayXOffset + keyboardDisplayKeySize * 0, keyboardDisplayYOffset + keyboardDisplayKeySize * 0],
	"b": [keyboardDisplayXOffset + keyboardDisplayKeySize * 1, keyboardDisplayYOffset + keyboardDisplayKeySize * 0], 
	"c": [keyboardDisplayXOffset + keyboardDisplayKeySize * 2, keyboardDisplayYOffset + keyboardDisplayKeySize * 0],
	"d": [keyboardDisplayXOffset + keyboardDisplayKeySize * 3, keyboardDisplayYOffset + keyboardDisplayKeySize * 0],
	"e": [keyboardDisplayXOffset + keyboardDisplayKeySize * 4, keyboardDisplayYOffset + keyboardDisplayKeySize * 0],
	"f": [keyboardDisplayXOffset + keyboardDisplayKeySize * 0, keyboardDisplayYOffset + keyboardDisplayKeySize * 1],
	"g": [keyboardDisplayXOffset + keyboardDisplayKeySize * 1, keyboardDisplayYOffset + keyboardDisplayKeySize * 1],
	"h": [keyboardDisplayXOffset + keyboardDisplayKeySize * 2, keyboardDisplayYOffset + keyboardDisplayKeySize * 1],
	"i": [keyboardDisplayXOffset + keyboardDisplayKeySize * 3, keyboardDisplayYOffset + keyboardDisplayKeySize * 1],
	"j": [keyboardDisplayXOffset + keyboardDisplayKeySize * 4, keyboardDisplayYOffset + keyboardDisplayKeySize * 1],
	"k": [keyboardDisplayXOffset + keyboardDisplayKeySize * 0, keyboardDisplayYOffset + keyboardDisplayKeySize * 2],
	"l": [keyboardDisplayXOffset + keyboardDisplayKeySize * 1, keyboardDisplayYOffset + keyboardDisplayKeySize * 2],
	"m": [keyboardDisplayXOffset + keyboardDisplayKeySize * 2, keyboardDisplayYOffset + keyboardDisplayKeySize * 2],
	"n": [keyboardDisplayXOffset + keyboardDisplayKeySize * 3, keyboardDisplayYOffset + keyboardDisplayKeySize * 2],
	"o": [keyboardDisplayXOffset + keyboardDisplayKeySize * 4, keyboardDisplayYOffset + keyboardDisplayKeySize * 2],
	"p": [keyboardDisplayXOffset + keyboardDisplayKeySize * 0, keyboardDisplayYOffset + keyboardDisplayKeySize * 3],
	"q": [keyboardDisplayXOffset + keyboardDisplayKeySize * 1, keyboardDisplayYOffset + keyboardDisplayKeySize * 3],
	"r": [keyboardDisplayXOffset + keyboardDisplayKeySize * 2, keyboardDisplayYOffset + keyboardDisplayKeySize * 3],
	"s": [keyboardDisplayXOffset + keyboardDisplayKeySize * 3, keyboardDisplayYOffset + keyboardDisplayKeySize * 3],
	"t": [keyboardDisplayXOffset + keyboardDisplayKeySize * 4, keyboardDisplayYOffset + keyboardDisplayKeySize * 3],
	"u": [keyboardDisplayXOffset + keyboardDisplayKeySize * 0, keyboardDisplayYOffset + keyboardDisplayKeySize * 4],
	"v": [keyboardDisplayXOffset + keyboardDisplayKeySize * 1, keyboardDisplayYOffset + keyboardDisplayKeySize * 4],
	"w": [keyboardDisplayXOffset + keyboardDisplayKeySize * 2, keyboardDisplayYOffset + keyboardDisplayKeySize * 4],
	"x": [keyboardDisplayXOffset + keyboardDisplayKeySize * 3, keyboardDisplayYOffset + keyboardDisplayKeySize * 4],
	"y": [keyboardDisplayXOffset + keyboardDisplayKeySize * 4, keyboardDisplayYOffset + keyboardDisplayKeySize * 4],
	"z": [keyboardDisplayXOffset + keyboardDisplayKeySize * 0, keyboardDisplayYOffset + keyboardDisplayKeySize * 5]
};

//------------------------------------------------------------------------------------//
//Variables

//List of lists. Formatted [type, startingFrame, x, y, data]
let animations = [];

let availableServers = {};

let averageWordLength = 0;

let blackSquareAlpha = 0;

let collectInput = true;

let clientData = {
	"username": "guest",
	"userData": {},
	"color": "blue"
};

//List of lists, indexed as [y][x], each spot inside is a string with a length of 2
//Key:
//   "//" - empty, "-/" - blacklisted, "+_" - shown letter, "-_" - hidden letter
let crosswordData = [];

//Offset of the crossword from edge of the screen
let crosswordOffset = [];

let currentRoom = "";

let emptyYellow = [];

let fadeOut = false;

let finishedAnimations = [];

let frames = 0;

let gameState = "mainMenu";

let greens = [];

let guesses = 0;

let highlightData = [];

//List of the hitbox pressed to get into wordle gamestate
let hitboxPressed = [];

//List of lists, every word that was spawned has [x, y, width, height, word, isFound]
let hitboxes = [];

let horizontalOffset = 0;

let host = false;

//keyboardData dictionary
let keyboardData = {
	"a": "gray",
	"b": "gray",
	"c": "gray",
	"d": "gray",
	"e": "gray",
	"f": "gray",
	"g": "gray",
	"h": "gray",
	"i": "gray",
	"j": "gray",
	"k": "gray",
	"l": "gray",
	"m": "gray",
	"n": "gray",
	"o": "gray",
	"p": "gray",
	"q": "gray",
	"r": "gray",
	"s": "gray",
	"t": "gray",
	"u": "gray",
	"v": "gray",
	"w": "gray",
	"x": "gray",
	"y": "gray",
	"z": "gray"
};

//Keys pressed this frame
let keyPressedThisFrame = "";

//Keys currently being pressed
let keysPressed = [];

//Current leaderboard tab
let leaderboardTab = "";

//single frame mouse button vars
let mouseButtonDown = false;

//What state the mouse is in
let mouseButtonState = "";

let mouseButtonUp = false;

//Mouse position

let mouseX = 0;

let mouseY = 0;

let ms = 0;

let musicPlaying = false;

//Whether or not the noServers error has been recieved
let noServers = false;

let roomData = {};

//User score
let score = 0;

let sizeMult = 1;

let selectedDifficulty = "none";

//Currently selected text box
let selectedTextBox = "";

//Event that socket recieved to run updateGame
let serverEvent = "";

//Error message sent by server on things like failed login
let serverError = "";

let serverName = "";

let serverSelected = false;

//is shift being pressed
let shiftKey = false;

//Data for text boxes, indexed with selectedTextBox
let textboxData = {
	"createUsername": [],
	"createPassword": [],
	"loginUsername": [],
	"loginPassword": [],
	"serverName": [],
	"serverPassword": []
};

//Keys inputtable into the wordle
let trackedKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "enter", "backspace"];

let tempData = [];

//string of letters that the user has inputed
let wordleInput = [];

//Should updateGame update again at the end of the function
let update = false;

let verticalOffset = 0;

let won = false;

//Word being passed into the wordle gamestate
let word = "";

//List of ~466k words used for user input, retrieved from server
let wordList = [];

let yellows = {};

//------------------------------------------------------------------------------------//
//Server Request Functions

function requestCrossword(wordLength, wordCount){
	socket.emit("generateCrossword", [wordLength, wordCount]);
};

function requestLog(message){
	socket.emit("log", message);
};

function requestWordList(){
	socket.emit("wordList", null);
};

function requestLogin(username, password){
	let data = [username, password];
	socket.emit("login", data);
};

function createAccount(username, password) {
	let data = [username, password];
	socket.emit("createAccount", data);
};

function requestPasswordChange(username, password, newPassword) {
	let data = [username, password, newPassword];
	socket.emit("changePassword", data);
};

function requestUsernameChange(username, password, newUsername) {
	let data = [username, password, newUsername];
	socket.emit("changeUsername", data);
};

function sendUserWin(username) {
	socket.emit("userWin", username);
};

function sendUserPlay(username) {
	socket.emit("gameStarted", username);
};

function updateScore(username, score) {
	data = [username, score];
	socket.emit("updateScore", data);
};

function updateTime(username, time) {
	data = [username, time];
	socket.emit("updateTime", data);
};

function updateDatabase(username) {
	socket.emit("updateDatabase", username);
};

function hostServer(username, serverName, serverPassword) {
	socket.emit("privateHost", [username, serverName, serverPassword]);
	gameState = "hosting";
	console.log("sent");
};

function joinServer(username, serverName, serverPassword) {
	socket.emit("joinRoom", [username, serverName, serverPassword]);
};

function leaveServer() {
	resetData("server");
	socket.emit("leaveRoom", null);
	gameState = "mainMenu";
};

function requestServers() {
	socket.emit("requestServerNames", null);
}

function sendUsername() {
	socket.emit("username", clientData["username"]);
}

function requestRoomCrossword(roomName, wordLength, wordCount) {
	socket.emit("generateRoomCrossword", [roomName, wordLength, wordCount]);
};

function requestRoomDataUpdate(roomName) { //requestRoomDataUpdate(currentRoom);
	socket.emit("requestRoomData", roomName)
};

function updateGameData(roomName, crosswordData, hitboxes) {
	socket.emit("updateGameData", [roomName, crosswordData, hitboxes]);
};

function hitboxSelected(roomName, selectedHitbox, color) {
	socket.emit("hitboxSelected", [roomName, selectedHitbox, color]);
};

function hitboxDeselected(roomName) {
	socket.emit("hitboxDeselected", roomName);
};

//------------------------------------------------------------------------------------//
//Ease of life functions

//Returns true if both crosswords are the same
function compareCrosswords(crossword1, crossword2) {
	for (let rowIndex = 0; rowIndex < crossword1.length; rowIndex++) {
		for (let columnIndex = 0; columnIndex < crossword1[rowIndex].length; columnIndex++) {
			if (crossword1[rowIndex][columnIndex] !== crossword2[rowIndex][columnIndex]) {
				return false;
			}
		}
	}
	return true;
};

//clears select clientside data
function resetData(type) {
	if (type === "crossword") { //resetData("crossword");
		averageWordLength = 0;
		crosswordData = [];
		guesses = 0;
		highlightData = {};
		hitboxPressed = [];
		hitboxes = [];
		score = 0;
		wordleInput = [];
		won = false;
	} else if (type === "wordle") { //resetData("wordle");
		greens = [];
		word = "";
		yellows = {};
		emptyYellow = [];
		keyboardData = {
			"a": "gray",
			"b": "gray",
			"c": "gray",
			"d": "gray",
			"e": "gray",
			"f": "gray",
			"g": "gray",
			"h": "gray",
			"i": "gray",
			"j": "gray",
			"k": "gray",
			"l": "gray",
			"m": "gray",
			"n": "gray",
			"o": "gray",
			"p": "gray",
			"q": "gray",
			"r": "gray",
			"s": "gray",
			"t": "gray",
			"u": "gray",
			"v": "gray",
			"w": "gray",
			"x": "gray",
			"y": "gray",
			"z": "gray"
		};
	} else if (type === "text") { //resetData("text");
		textboxData = {
			"createUsername": [],
			"createPassword": [],
			"loginUsername": [],
			"loginPassword": [],
			"serverName": [],
			"serverPassword": []
		};
		selectedTextBox = "";
	} else if (type === "server") {
		roomData = {};
	}
};

//deletes a array element at index
function del(array, index){
	array.splice(index, 1);
};

//Returns a random integer between range [min, max], if one value is given min is 0 and max is that value
function randint(min, max = "none"){
	if (max === "none"){
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max + 1)) + min;
};

//draws a image with center at x and y with width "width" and height "height" with respect to the screen size and offsets
function draw(image, x, y, width, height, button = false) {
	let newX = (x - width/2) * sizeMult + horizontalOffset;
	let newY = (y - height/2) * sizeMult + verticalOffset;
	let newWidth = width * sizeMult;
	let newHeight = height * sizeMult;
	ctx.drawImage(image, newX, newY, newWidth, newHeight);
	if (button) {
		if (select(x, y, width, height)){ draw(buttonSelected, x, y, width, height); } else if (hover(x, y, width, height)){ draw(buttonHovered, x, y, width, height); }
	}
};

//creates button listeners at center, x, y with width "width" and height "height" with respect to the screen size and offsets. To be used with draw()
function button(x, y, width, height, image = placeholder){
	let newX = (x - width/2) * sizeMult + horizontalOffset;
	let newY = (y - height/2) * sizeMult + verticalOffset;
	let newWidth = width * sizeMult;
	let newHeight = height * sizeMult;
	if (image != "none") {
		draw(image, x, y, width, height, true);
	}
	let answer = mouseX > newX && mouseX < newX + newWidth && mouseY > newY && mouseY < newY + newHeight && mouseButtonUp;
	if (answer) {mouseButtonUp = false;}
	return answer;
};

//Is the mouse hovering over a element at specified coords
function hover(x, y, width, height){
	let newX = (x - width/2) * sizeMult + horizontalOffset;
	let newY = (y - height/2) * sizeMult + verticalOffset;
	let newWidth = width * sizeMult;
	let newHeight = height * sizeMult;
	return mouseX > newX && mouseX < newX + newWidth && mouseY > newY && mouseY < newY + newHeight;
};

//Same as button but for mouse button down
function select(x, y, width, height){
	let newX = (x - width/2) * sizeMult + horizontalOffset;
	let newY = (y - height/2) * sizeMult + verticalOffset;
	let newWidth = width * sizeMult;
	let newHeight = height * sizeMult;
	return mouseX > newX && mouseX < newX + newWidth && mouseY > newY && mouseY < newY + newHeight && mouseButtonState === "down";
};

//counts the number of letters in a given string and returns the number of letters in the string
function countLetter(string, letter) {
	return (string.split(letter).length - 1);
};

//Displays selected letter at x, y with size paramater in px, defaults to (15/25) * CES. Only works with simple letters (no numbers/special chars)
function drawLetter(letter, x, y, size = (15/25) * CES) {
	for (let i = 0; i < alphabet.length; i++) {
		if (letter === alphabet[i]) {
			draw(letterImages[i], x, y, size, size);
		}
	}
	if (letter === ".") {
		draw(period, x, y, size, size);
	}
};

//Displays selected letter at x, y with size parameter in px, defaults to 25, works with all keyboard characters (no ' or " or | or . or ,)
function drawCharacter(character, x, y, size = 15) {
	let letter = character;
	let actualAlphabetLetter = "";
	for (let i = 0; i < 26 * 2; i++) {
		if (i >= 26) {
			actualAlphabetLetter = alphabet[i % 26].toUpperCase();
		} else {
			actualAlphabetLetter = alphabet[i];
		}
		if (letter === actualAlphabetLetter) {
			if (charactersToLower.includes(letter)) {
				draw(fullAlphabetImages[i], x, y + size * 36/130, size, size);
			} else {
				draw(fullAlphabetImages[i], x, y, size, size);
			}
		}
	}
	
	if (letter === "_") {
		draw(underscore, x, y, size, size);
	} else if (letter === "-") {
		draw(dash, x, y, size, size);
	} else if (letter === ";") {
		draw(semiColon, x, y, size, size);
	} else if (letter === "!") {
		draw(exclamation, x, y, size, size);
	} else if (letter === "(") {
		draw(leftParenthisis, x, y, size, size);
	} else if (letter === ")") {
		draw(rightParenthisis, x, y, size, size);
	} else if (letter === "[") {
		draw(leftBracket, x, y, size, size);
	} else if (letter === "]") {
		draw(rightBracket, x, y, size, size);
	} else if (letter === "{") {
		draw(leftCurlyBracket, x, y, size, size);
	} else if (letter === "}") {
		draw(rightCurlyBracket, x, y, size, size);
	} else if (letter === "@") {
		draw(atSign, x, y, size, size);
	} else if (letter === "&") {
		draw(ampersand, x, y, size, size);
	} else if (letter === "#") {
		draw(hashtag, x, y, size, size);
	} else if (letter === "%") {
		draw(percentSign, x, y, size, size);
	} else if (letter === "`") {
		draw(backQuote, x, y, size, size);
	} else if (letter === "^") {
		draw(carrotSign, x, y, size, size);
	} else if (letter === "+") {
		draw(plusSign, x, y, size, size);
	} else if (letter === "=") {
		draw(equalSign, x, y, size, size);
	} else if (letter === "~") {
		draw(tilde, x, y, size, size);
	} else if (letter === "$") {
		draw(dollarSign, x, y, size, size);
	} else if (letter === "0") {
		draw(zeroNumber, x, y, size, size);
	} else if (letter === "1") {
		draw(oneNumber, x, y, size, size);
	} else if (letter === "2") {
		draw(twoNumber, x, y, size, size);
	} else if (letter === "3") {
		draw(threeNumber, x, y, size, size);
	} else if (letter === "4") {
		draw(fourNumber, x, y, size, size);
	} else if (letter === "5") {
		draw(fiveNumber, x, y, size, size);
	} else if (letter === "6") {
		draw(sixNumber, x, y, size, size);
	} else if (letter === "7") {
		draw(sevenNumber, x, y, size, size);
	} else if (letter === "8") {
		draw(eightNumber, x, y, size, size);
	} else if (letter === "9") {
		draw(nineNumber, x, y, size, size);
	} else if (letter === "<") {
		draw(arrowLeft, x, y, size, size);
	} else if (letter === ">") {
		draw(arrowRight, x, y, size, size);
	} else if (letter === "\\") {
		draw(backslash, x, y, size, size);
	} else if (letter === ":") {
		draw(colon, x, y, size, size);
	} else if (letter === "?") {
		draw(questionMark, x, y, size, size);
	} else if (letter === "/") {
		draw(slash, x, y, size, size);
	} else if (letter === "*") {
		draw(asterisk, x, y, size, size);
	}
};

//Logs supported key presses
function collectKeyPresses(){
	//if the length of the input is 1 char (to exclude things like shift)
	if ((keyPressedThisFrame.length === 1 || (keyPressedThisFrame === "enter" && wordleInput.length === word.length)) && trackedKeys.includes(keyPressedThisFrame)) {
		wordleInput.push(keyPressedThisFrame);
	}
	//if the user doesn't have space for a longer word and the input is not enter or if the user presses "backspace"
	if ((wordleInput.length > word.length && !(keyPressedThisFrame === "enter")) || keyPressedThisFrame === "backspace") {
		del(wordleInput, wordleInput.length - 1);
	}
};

//Draws selected string or list onto the screen with specific text size in px
function drawText(string, x, y, size = 50, type = "letter") {
	x += size/2;
	y += size/2;
	for (let stringIndex = 0; stringIndex < string.length; stringIndex++) {
		if (type === "letter"){drawLetter(string[stringIndex], x + (size * stringIndex), y, size);}
		if (type === "character"){drawCharacter(string[stringIndex], x + (size * stringIndex), y, size);}
	}
};

//Draws text box onto screen with center at x and y with width width and height height, can't be less than 100 px long
function drawTextBox(x, y, width, height = 50){
	draw(textboxLeft, x - Math.round(width/2) + 25, y, 50, height);
	draw(textboxRight, x + Math.round(width/2) - 25, y, 50, height);
	draw(textboxMiddle, x, y, width - 100, height);
};

//clears text boxes
function clearTextBoxes() {
	let keys = Object.keys(textboxData);
	for (let key = 0; key < keys.length; key++) {
		textboxData[keys[key]] = [];
	}
}


//------------------------------------------------------------------------------------//
//Log in functions

function logInput(maxLength = 20) {
	//gather the user's input and append it to the proper list
	if (shiftKey && keyPressedThisFrame.length === 1) {
		keyPressedThisFrame = keyPressedThisFrame.toUpperCase();
	}
	if (selectedTextBox == "") {
		//nothing for now
	} else if (keyPressedThisFrame.length === 1 && textboxData[selectedTextBox].length < maxLength && keyPressedThisFrame !== " "){
		textboxData[selectedTextBox].push(keyPressedThisFrame);
	}
	if (keyPressedThisFrame === "backspace") {
		del(textboxData[selectedTextBox], textboxData[selectedTextBox].length - 1);
	}
	if (keyPressedThisFrame === "enter") {
		selectedTextBox = "";
	}
}; //Also used for server input

function textBoxSelection(){
	if (button(500, 400, 700, 75, "none")) {
		selectedTextBox = "createUsername";
	} else if (button(500, 600, 700, 75, "none")) {
		selectedTextBox = "createPassword";
	} else if (button(1420, 400, 700, 75, "none")) {
		selectedTextBox = "loginUsername";
	} else if (button(1420, 600, 700, 75, "none")) {
		selectedTextBox = "loginPassword";
	} else if (mouseButtonUp) {
		selectedTextBox = "";
	}
};

function drawCreateAccount(){
	draw(outlineSquare, 500, 550, 750, 820);
	drawText("create account", 150, 180);
	drawText("username", 150, 320, 33);
	drawTextBox(500, 400, 700, 75);
	drawText("password", 150, 520, 33);
	drawTextBox(500, 600, 700, 75);
	draw(placeholder, 500, 850, 300, 100);
	drawText("create", 350, 825, 50);
	drawText(textboxData["createUsername"], 170, 385, 33, "character");
	drawText(textboxData["createPassword"], 170, 585, 33, "character");
	if (selectedTextBox === "createUsername") {
		drawTextMarker(170, 385);
	} else if (selectedTextBox === "createPassword") {
		drawTextMarker(170, 585);
	}
};

function drawLogin(){
	draw(outlineSquare, 1420, 550, 750, 820);
	drawText("login", 1075, 180);
	drawText("username", 1070, 320, 33);
	drawTextBox(1420, 400, 700, 75);
	drawText("password", 1070, 520, 33);
	drawTextBox(1420, 600, 700, 75);
	draw(placeholder, 1420, 850, 300, 100);
	drawText("login", 1295, 825, 50);
	drawText(textboxData["loginUsername"], 1095, 385, 33, "character");
	drawText(textboxData["loginPassword"], 1095, 585, 33, "character");
	if (selectedTextBox === "loginUsername") {
		drawTextMarker(1095, 385);
	} else if (selectedTextBox === "loginPassword") {
		drawTextMarker(1095, 585);
	}
};

//------------------------------------------------------------------------------------//
//Server Funtions

//Draws server creation menu
function drawCreateServer(){ 
	draw(outlineSquare, 960, 550, 750, 820);
	drawText("create server", 615, 180); 
	drawText("server name", 610, 320, 33); 
	drawTextBox(960, 400, 700, 75);
	drawText("password", 610, 520, 33);
	drawTextBox(960, 600, 700, 75);
	draw(placeholder, 960, 850, 300, 100, true);
	drawText("create", 810, 825, 50);
	drawText(textboxData["serverName"], 635, 385, 33, "character");
	drawText(textboxData["serverPassword"], 635, 585, 33, "character");
	if (button(960, 400, 700, 75, "none")) {
		selectedTextBox = "serverName";
	} else if (button(960, 600, 700, 75, "none")) {
		selectedTextBox = "serverPassword";
	} else if (mouseButtonUp) {
		selectedTextBox = "";
	}
	if (selectedTextBox === "serverName") {
		drawTextMarker(635, 385);
	} else if (selectedTextBox === "serverPassword") {
		drawTextMarker(635, 585);
	}
};

function drawJoinServer(){ 
	draw(outlineSquare, 960, 550, 750, 820);
	drawText("join server", 615, 180); 
	drawText("server name", 610, 320, 33); 
	drawTextBox(960, 400, 700, 75);
	drawText("password", 610, 520, 33);
	drawTextBox(960, 600, 700, 75);
	drawText("join", 810, 825, 50);
	drawText(textboxData["serverName"], 635, 385, 33, "character");
	drawText(textboxData["serverPassword"], 635, 585, 33, "character");

	if (button(960, 400, 700, 75, "none")) {
		selectedTextBox = "serverName";
	} else if (button(960, 600, 700, 75, "none")) {
		selectedTextBox = "serverPassword";
	} else if (mouseButtonUp) {
		selectedTextBox = "";
	}
	if (selectedTextBox === "serverName") {
		drawTextMarker(635, 385);
	} else if (selectedTextBox === "serverPassword") {
		drawTextMarker(635, 585);
	}
	if (button(960, 850, 300, 100, placeholder)) {
		joinServer(clientData["username"], textboxData["serverName"].join(""), textboxData["serverPassword"].join(""));
	}
	if (serverEvent === "joinedRoom") {
		gameState = "initLobby";
		serverName = textboxData["serverName"];
	}
};

function drawTextMarker(x, y) {
	if (Math.round(frames/15) % 2 == 1) {
		draw(textMarker, x + 5 + 33 * textboxData[selectedTextBox].length, y + 15, 20, 50);
	}
};

function displayAvailableServers() {
	let keys = Object.keys(availableServers);
	let spacing = "                    ";
	for (let serverIndex = 0; serverIndex < keys.length; serverIndex++) {
		spacing = "                    ";
		for (let letterIndex = 0; letterIndex < keys[serverIndex].length; letterIndex++) {
			spacing = spacing.slice(1);
		}
		drawText(keys[serverIndex] + ": " + spacing + availableServers[keys[serverIndex]], 80, 235 + serverIndex * 50, 25, "character");
		drawTextBox(960, 250 + serverIndex * 50, 1800);
		if (button(1780, 250 + serverIndex * 50, 35, 30, joinArrow)) { 
			clearTextBoxes(); 
			console.log(keys[serverIndex].split(""));
			textboxData["serverName"] = keys[serverIndex].split(""); 
			serverSelected = true;}
	}
};

//------------------------------------------------------------------------------------//
//Crossword Functions

//simulates crossword displays with center at x and y. Will allow user to click and drag if the size is larger than the avalable space (has 50px of padding on every side and a gray outline)
function displayCrossword(x, y){
	crosswordOffset = [canvas.width/12, canvas.height/12];
	//index of longest row, used for positioning of the crossword
	let longestRow = 0;
	//loop through crosswordData to find the longest row
	for (let row = 0; row < crosswordData.length; row++){
		if (crosswordData[row].length > crosswordData[longestRow].length){
			longestRow = row;
		}
	}
	crosswordOffset = [(x - crosswordData[longestRow].length * CES / 2), (y - crosswordData.length * CES / 2)];
	//for every item
	for (let row = 0; row < crosswordData.length; row++){
		for (let column = 0; column < crosswordData[row].length; column++){
			//if the item is a letter
			if (crosswordData[row][column][1] != "/"){
				//if the item is supposed to be shown (has + identifier) draw it
				//draw blank tile
				draw(crosswordTile, crosswordOffset[0] + column * CES, crosswordOffset[1] + row * CES, CES, CES);
				if (crosswordData[row][column][0] == "+") {
					//display the letter inside of the box
					drawLetter(crosswordData[row][column][1], crosswordOffset[0] + column * CES, crosswordOffset[1] + row * CES, (15/25) * CES);
				} else {
					//DO NOTHING. Right now displays the letter for debugging purposes.
					//drawLetter(crosswordData[row][column][1], crosswordOffset[0] + column * CES, crosswordOffset[1] + row * CES, (15/25) * CES);
					
				}
			} else {
				//the tile is blank. Draw something for debuging purposes
				//draw(greenSquare, crosswordOffset[0] + column * CES, crosswordOffset[1] + row * CES, CES, CES);
			}
		}
	}
	for (let i = 0; i < highlightData.length; i++) {
		drawHighlight(highlightData[i][0] * CES + crosswordOffset[0], highlightData[i][1] * CES + crosswordOffset[1], highlightData[i][2], highlightData[i][3], highlightData[i][4]);
	}
	//for every hitbox
	for (let i = 0; i < hitboxes.length; i++){
		//if the mouse is over a hitbox
		leftBound = mouseX >= (hitboxes[i][0] * CES + crosswordOffset[0] - CES/2) * sizeMult + horizontalOffset;
		rightBound = mouseX <= ((hitboxes[i][0] + hitboxes[i][2]) * CES + crosswordOffset[0] - CES/2) * sizeMult + horizontalOffset;
		upperBound = mouseY >= (hitboxes[i][1] * CES + crosswordOffset[1] - CES/2) * sizeMult  + verticalOffset;
		lowerBound = mouseY <= ((hitboxes[i][1] + hitboxes[i][3]) * CES + crosswordOffset[1] - CES/2) * sizeMult + verticalOffset;
		xBounds = leftBound && rightBound
		yBounds = upperBound && lowerBound
		isSolved = hitboxes[i][5];
		if ((xBounds && yBounds && !isSolved)) {
			//Draw the hitbox
			drawHighlight(hitboxes[i][0] * CES + crosswordOffset[0], hitboxes[i][1] * CES + crosswordOffset[1], hitboxes[i][2], hitboxes[i][3], clientData["color"]);
			//if the mouse button was just pressed and the word being highlighted is not found
			if (mouseButtonDown && !hitboxes[i][5]){
				//gamestate is initWordle
				gameState = "initWordle";
				//assign hitboxPressed
				hitboxPressed = hitboxes[i];
				if (playState === "coopCrossword") {
					hitboxSelected(currentRoom, hitboxPressed.slice(0, 4), clientData["color"]);
				}
			}
			//and don't highlight any others
			break;
		}
	}
};

//draws a highlight in direction from points x and y
function drawHighlight(x, y, width, height, color = "blue"){
	if (height > 1) {
		draw(hitboxVerticalTop[color], x, y, CES, CES);
		for (let k = 1; k < height - 1; k++) {
			draw(hitboxVerticalMiddle[color], x, y + (k * CES), CES, CES);
		}
		draw(hitboxVerticalBottom[color], x, y + (height - 1) * CES, CES, CES);
	}
	if (width > 1) {
		draw(hitboxHorizontalLeft[color], x, y, CES, CES);
		for (let k = 1; k < width - 1; k++) {
			draw(hitboxHorizontalMiddle[color], x + (k * CES), y, CES, CES);
		}
		draw(hitboxHorizontalRight[color], x + (width - 1) * CES, y, CES, CES);
	}
};

function checkWin() {
	won = false;
	for (let i = 0; i < hitboxes.length; i++){
		if (hitboxes[i][5] === false) {
			break;
		}
   		if (i === hitboxes.length - 1) {
	  		won = true;
		}
	}
	return won;
};

//Sends an update to the server if crosswordData changes
function checkCoopCrossword() {
	if (!compareCrosswords(crosswordData, tempData)) {
		//eventually send data to server
		console.log("change in crosswordData");
		updateGameData(currentRoom, crosswordData, hitboxes);
		tempData = [];
		for (let rowIndex = 0; rowIndex < crosswordData.length; rowIndex++) {
			tempData.push([...crosswordData[rowIndex]])
		}
	}
};

//Makes sure things are not being overwritten
function updateCrosswordData() {
	for (let rowIndex = 0; rowIndex < crosswordData.length; rowIndex++) {
		for (let columnIndex = 0; columnIndex < crosswordData.length; columnIndex++) {
			if (tempCrosswordData[rowIndex][columnIndex][0] !== crosswordData[rowIndex][columnIndex][0]) {
				if (crosswordData[rowIndex][columnIndex][0] === "-") {
					crosswordData[rowIndex][columnIndex] = tempCrosswordData[rowIndex][columnIndex];
				}
			}
		}
	}
	for (let hitboxIndex = 0; hitboxIndex < hitboxes.length; hitboxIndex++) {
		if (tempHitboxes[hitboxIndex][5] !== hitboxes[hitboxIndex][5]) {
			if (hitboxes[hitboxIndex][5] === false) {
				hitboxes[hitboxIndex][5] = true;
			}
		}
	}
};

//------------------------------------------------------------------------------------//
//Animation Functions

//updates every animation on the screen from the animations list
function drawAnimations() { //animations[animIndex] = [0:type, 1:startingFrame, 2:x, 3:y, 4:data]
	//for each animation
	for (let animIndex = 0; animIndex < animations.length; animIndex++) {
		//set animation frame
		animFrame = frames - animations[animIndex][1];
		if (animFrame < 0) {
			continue;
		}
		//the test animation. animations.push(["test", frames, x, y]);
		if (animations[animIndex][0] === "test") {
			draw(placeholder, animations[animIndex][2] + animFrame * 3, animations[animIndex][3], 100, 100);
			if (animFrame === 500) {
				finishedAnimations.push(animIndex);
			}
		}
		//the greenFound animation. animations.push(["greenFound", frames, x, y]);
		if (animations[animIndex][0] === "greenFound") {
			draw(greenSquare, animations[animIndex][2], animations[animIndex][3], 75 * animFrame/10, 75 * animFrame/10);
			if (animFrame === 10) {
				finishedAnimations.push(animIndex);
			}
		}
	}
	finishedAnimations.reverse();
	//for each finished animation
	for (let i = 0; i < finishedAnimations.length; i++) {
		del(animations, finishedAnimations[i]);
	}
	finishedAnimations = [];
};

//------------------------------------------------------------------------------------//
//Wordle functions

//draws user input portion of the wordle game
function displayWordleInput() {
	//draw letter spaces
	for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
		draw(crosswordTile, letterIndex * 75 + 1920/2 - ((word.length/2) * 75), 1080/2 - 200, 75, 75);
		if (!(letterIndex > wordleInput.length - 1)) {
			drawLetter(wordleInput[letterIndex], 1920/2 + ((letterIndex - word.length/2) * 75), 1080/2 - 200, 65);
		}
	}
};

//Displays boxes above wordleInput with known letters in them
function displayGreens() {
	for (let letterIndex = 0; letterIndex < greens.length; letterIndex++) {
		draw(greenOutline, letterIndex * 75 + 1920/2 - ((greens.length/2) * 75), 1080/2 - 300, 75, 75);
		drawLetter(greens[letterIndex], 1920/2 + ((letterIndex - word.length/2) * 75), 1080/2 - 300, 65);
	}
};

//Displays wordleInput in box with the length of the word in the wordle
function displayKeyboardData() {
	if (keyboardDataDisplayShape == "rows") {
		//for every letter
		for (let letterIndex = 0; letterIndex < alphabet.length; letterIndex++) {
			if (keyboardData[alphabet[letterIndex]] == "gray") {
				draw(graySquare, rowsKeyboardDisplayShape[alphabet[letterIndex]][0], rowsKeyboardDisplayShape[alphabet[letterIndex]][1], 75, 75);	
			} else if (keyboardData[alphabet[letterIndex]] == "green") {
				draw(greenSquare, rowsKeyboardDisplayShape[alphabet[letterIndex]][0], rowsKeyboardDisplayShape[alphabet[letterIndex]][1], 75, 75);	
			} else if (keyboardData[alphabet[letterIndex]] == "yellow") {
				draw(yellowSquare, rowsKeyboardDisplayShape[alphabet[letterIndex]][0], rowsKeyboardDisplayShape[alphabet[letterIndex]][1], 75, 75);	
			} else if (keyboardData[alphabet[letterIndex]] == "brown") {
				draw(brownSquare, rowsKeyboardDisplayShape[alphabet[letterIndex]][0], rowsKeyboardDisplayShape[alphabet[letterIndex]][1], 75, 75);	
			} else if (keyboardData[alphabet[letterIndex]] == "red") {
				draw(redSquare, rowsKeyboardDisplayShape[alphabet[letterIndex]][0], rowsKeyboardDisplayShape[alphabet[letterIndex]][1], 75, 75);	
			}
			draw(grayOutline, rowsKeyboardDisplayShape[alphabet[letterIndex]][0] - 1, rowsKeyboardDisplayShape[alphabet[letterIndex]][1] - 1, 77, 77);
			drawLetter(alphabet[letterIndex], rowsKeyboardDisplayShape[alphabet[letterIndex]][0], rowsKeyboardDisplayShape[alphabet[letterIndex]][1], 65);
		}
	}
};

//Displays yellow letters under the user input
function displayYellows() {
	//create toDisplay list to store rows of yellows that we want to display
	let toDisplay = [];
	//add to toDisplay by reading yellows
	for (let i = 0; i < Object.keys(yellows).length; i++) {
		toDisplay.push(yellows[Object.keys(yellows)[i]]);
	}
	//reorder toDisplay in descending order by length
	progress = 0;
	temp = null;
	for (let i = 0; i < toDisplay.length; i++) {
		//prevents index out of range error
		if (i > 0) {
			//if previous item's length is less than the current item's
			if (toDisplay[i].length > toDisplay[i - 1].length) {
				temp = toDisplay[i];
				toDisplay[i] = toDisplay[i - 1];
				toDisplay[i - 1] = temp;
				progress = i;
				i -= 2
			} else if (progress > i) {
				i = progress;
			}
		}
	}
	for (let i = 0; i < toDisplay.length; i++) {
		for (let j = 0; j < toDisplay[i].length; j++) {
			if (toDisplay[i][j] != "") {
				draw(yellowOutline, j * 75 + 1920/2 - ((greens.length/2) * 75), 1080/2 - 100 + 80 * i, 75, 75);
				drawLetter(toDisplay[i][j], 1920/2 + ((j - word.length/2) * 75), 1080/2 - 100 + 80 * i, 65);
			}
		}
	}
};

//Clears yellows if they are empty and or under greens
function clearYellows() {
	//for each letter
	for (let letterIndex = 0; letterIndex < inputtedWord.length; letterIndex++) {
		//if there is a green there
		if (greens[letterIndex] !== "") {
			//for each row of yellows
			console.log("A column of yellows has been deleted");
			for (let yellowIndex = 0; yellowIndex < Object.keys(yellows).length; yellowIndex++) {
				yellows[Object.keys(yellows)[yellowIndex]][letterIndex] = "";
			}
		}
	}
	//for each row of yellows
	for (let yellowIndex = 0; yellowIndex < Object.keys(yellows).length; yellowIndex++) {
		//if that row is empty
		if (yellows[Object.keys(yellows)[yellowIndex]] === emptyYellow) {
			console.log("An empty row of yellows has been deleted")
			//delete the empty row
			delete yellows[Object.keys(yellows)[yellowIndex]];
		}
	}
}

//updates wordle data
function updateWordleData() {
	//set up inputtedWord variable
	while (wordleInput.length > word.length) {
		del(wordleInput, word.length);
	}
	inputtedWord = wordleInput.join("");
	//if the word is acceptable (is contained in the word list)
	if (wordList.includes(inputtedWord)) {
		//update keyboardData
		guesses += 1;
		//for each letter in the user's input at index i
		for (let i = 0; i < wordleInput.length; i++) {
			if (word[i] == wordleInput[i]) {
				//the letter is in the right position
				if (greens[i] === "") {
					//animations.push(["greenFound", frames, i * 75 + 1920/2 - ((greens.length/2) * 75), 1080/2 - 300]);
				}
				greens[i] = wordleInput[i];
				//set that location in crosswordData to be shown
				if (hitboxPressed[3] == 1) {
					//the word is horizontal
					crosswordData[hitboxPressed[1]][hitboxPressed[0] + i] = "+" + crosswordData[hitboxPressed[1]][hitboxPressed[0] + i][1];
				} else {
					//the word is vertical
					crosswordData[hitboxPressed[1] + i][hitboxPressed[0]] = "+" + crosswordData[hitboxPressed[1] + i][hitboxPressed[0]][1];
				}
				//if there are no more of that letter to be found
				if (countLetter(greens.toString(), wordleInput[i]) == countLetter(word, wordleInput[i])) {
					keyboardData[wordleInput[i]] = "green";
					delete yellows[wordleInput[i]];
					//Delete all yellow letters below the green 
				} else {
					//since there are more of that letter to be found
					keyboardData[wordleInput[i]] = "yellow";
					//if yellows[wordleInput[i]] does not exist, initiate it
					try {
						temp = yellows[wordleInput[i]].length;
					} catch(err) {
						yellows[wordleInput[i]] = [...emptyYellow];
					}
					//if that column is not already occupied by a green
					if (greens[i] == "") {
						yellows[wordleInput[i]][i] = wordleInput[i];
					}
				}
			} else {
				//the letter is not in the right position
				if (word.includes(wordleInput[i])) {
					//the letter is included in the word, but is not in the right position
					if (!(keyboardData[wordleInput[i]] == "green")) {
						//since there are more of that letter to be found
						keyboardData[wordleInput[i]] = "yellow";
						//if yellows[wordleInput[i]] does not exist, initiate it
						try {
							temp = yellows[wordleInput[i]].length;
						} catch(err) {
							yellows[wordleInput[i]] = [...emptyYellow];
						}
						//if that column is not already occupied by a green
						if (greens[i] == "") {
							yellows[wordleInput[i]][i] = wordleInput[i];
						}
					}
				} else {
					//the letter is not contained in the word
					keyboardData[wordleInput[i]] = "red";
				}
			}
		}
		clearYellows()
	} else {
		console.log("Word not real");
		//Add red flash x2 0.33Hz for words with bad sound and shake for words and crossword squares
	}
};

//simulates wordle portion of game
function simulateWordle() {
	if (serverEvent === "crosswordDataUpdate") {
		coopWordleCheck();
	}
	collectKeyPresses();
	let enterPressed = false;
	if (wordleInput.length > word.length) {
		if (wordleInput[word.length] == "enter") {
			updateWordleData();
			enterPressed = true;
		}
	} 
	//Draw
	displayWordleInput();
	displayGreens();
	displayYellows();
	displayKeyboardData();
	if (wordleInput.join("") === word && enterPressed) {
		//the wordle is won
		//update hitboxes to display that the word is found
		hitboxes[hitboxes.indexOf(hitboxPressed)][5] = true;
		for (let i = 0; i < hitboxPressed[2]; i++) {
			crosswordData[hitboxPressed[1]][hitboxPressed[0] + i] = "+" + crosswordData[hitboxPressed[1]][hitboxPressed[0] + i][1];
		}
		for (let i = 0; i < hitboxPressed[3]; i++) {
			crosswordData[hitboxPressed[1] + i][hitboxPressed[0]] = "+" + crosswordData[hitboxPressed[1] + i][hitboxPressed[0]][1];
		}
		if (playState === "coopCrossword") {
			hitboxDeselected(currentRoom);
		}
		gameState = playState;
	}
	if (enterPressed) {
		wordleInput = [];
	}
	if (playState === "coopCrossword") {
		checkCoopCrossword();
	}
};

//Checks crosswordData and changes greens and yellows to match it
function checkCrosswordData() {
	if (hitboxPressed[3] == 1) {
		//the word is horizontal
		for (let i = 0; i < word.length; i++) {
			if (crosswordData[hitboxPressed[1]][hitboxPressed[0] + i][0] == "+") {
				greens.push(word[i]);
				if (countLetter(greens.toString(), word[i]) == countLetter(word, word[i])) {
					keyboardData[word[i]] = "green";
				} else {	
					keyboardData[word[i]] = "yellow";
				}
			} else {
				greens.push("");	
			}
		}
	} else {
		//the word is vertical
		for (let i = 0; i < word.length; i++) {
			if (crosswordData[hitboxPressed[1] + i][hitboxPressed[0]][0] == "+") {
				greens.push(word[i]);
				if (countLetter(greens.toString(), word[i]) == countLetter(word, word[i])) {
					keyboardData[word[i]] = "green";
				} else {
					keyboardData[word[i]] = "yellow";
				}
			} else {
				greens.push("");	
			}
		}
	}
};

//Checks crosswordData upon a coop crossword update (serverevent = crosswordDataUpdate) and fills in greens/yellows accordingly
function coopWordleCheck() {
	if (hitboxPressed[3] == 1) {
		//the word is horizontal
		for (let i = 0; i < word.length; i++) {
			if (crosswordData[hitboxPressed[1]][hitboxPressed[0] + i][0] == "+") {
				greens[i] = word[i];
				if (countLetter(greens.toString(), word[i]) == countLetter(word, word[i])) {
					keyboardData[word[i]] = "green";
				} else {	
					keyboardData[word[i]] = "yellow";
				}
			}
		}
	} else {
		//the word is vertical
		for (let i = 0; i < word.length; i++) {
			if (crosswordData[hitboxPressed[1] + i][hitboxPressed[0]][0] == "+") {
				greens[i] = word[i];
				if (countLetter(greens.toString(), word[i]) == countLetter(word, word[i])) {
					keyboardData[word[i]] = "green";
				} else {
					keyboardData[word[i]] = "yellow";
				}
			}
		}
	}
};

//Initalizes the wordle data
function initWordle() {
	//hitboxPressed is the hitbox that was clicked and defined when gamestate is changed
	//reset data
	resetData("wordle");
	word = hitboxPressed[4];
	console.log(word);
	for (let i = 0; i < word.length; i++) {
		emptyYellow.push("");
	}
	checkCrosswordData();
	wordleInput = [];
	gameState = "wordle";
	update = true;	
};

//------------------------------------------------------------------------------------//
//Game State Functions

//Menus

function gameStateMainMenu() {
	//Game Title
	draw(mainBanner, 960, 235, 781.25, 208);
	//Play button image
	if (button(960, 500, 500, 180, play)){
		gameState = "gameSelect";
		update = true;
	}
	//Leaderboard button image
	if (button(960, 700, 500, 180, leaderboard)){
		gameState = "leaderboard";
		update = true;
	}
	//How to play button image
	if (button(960, 900, 500, 180, howToPlay)){
		gameState = "help";
		update = true;
	}
	host = false;
	//Settings button
	if (button(1920 - 100, 1080 - 100, 128, 128, settings)){gameState = "settings"; update = true;}
};

function gameStateGameSelect() {
	//Title "Play Options"
	draw(placeholder, 1920/2, 1080/2 - 300, 500, 180);
	//Singleplayer button
	if (button(1920/2, 1080/2 - 100, 500, 180, solo)){
		gameState = "difficultySelect";
		update = true;
	}
	//Host server button
	if (button(1920/2, 1080/2 + 100, 500, 180, hostServerImg)){
	gameState = "initHosting";
	update = true;
}
	//Join server button
	if (button(1920/2, 1080/2 + 300, 500, 180, joinServerImg)){gameState = "initServerRequest"; update = true;}
	//Back button
	if (button(125, 75, 200, 100, back)) {  gameState = "mainMenu"; update = true;}
};

function gameStateDifficultySelect() {
	if (button(1920/2, 1080/2 - 300, 500, 150, easy)){
		selectedDifficulty = "easy";
		gameState = "initSoloCrossword";
	}
	if (button(1920/2, 1080/2 - 100, 500, 150, medium)){
		selectedDifficulty = "medium";
		gameState = "initSoloCrossword";
	}

	if (button(1920/2, 1080/2 + 100, 500, 150, hard)){
		selectedDifficulty = "hard";
		gameState = "initSoloCrossword";
	}

	if (button(1920/2, 1080/2 + 300, 500, 150, custom)){
		selectedDifficulty = "custom"; 
		gameState = "customDifficulty";
	}

	//Back button
	if (button(125, 75, 200, 100, back)) {
		gameState = "gameSelect";
		update = true;
	}
};

function gameStateHelp() {
	//Back button
	if (button(125, 75, 200, 100, back)) { gameState = "mainMenu"; update = true;}
};

function gameStateSignIn() {
	//draw create account on left side of screen
	drawCreateAccount();
		
	//draw line in center of screen
	draw(seperator, 960, 540, 10, 920);
		
	//draw login on right side of screen
	drawLogin();

	//Log User Input, 20 char max at size 33
	if (collectInput) {logInput();}

	//When create button is pressed
	if (button(500, 850, 300, 100, "none") && textboxData["createUsername"] !== "" && textboxData["createPassword"] !== "") {
		createAccount(textboxData["createUsername"].join(""), textboxData["createPassword"].join(""));
		collectInput = false;
	}

	//When login button is pressed
	if (button(1420, 850, 300, 100, "none") && textboxData["loginUsername"] !== "" && textboxData["loginPassword"] !== "") {
		requestLogin(textboxData["loginUsername"].join(""), textboxData["loginPassword"].join(""));
		collectInput = false;
	}
	
	//When different text boxes on the screen are selected select them
	textBoxSelection();
	//Server Event listeners for login
	if (serverEvent === "accountCreated") {
		clientData["username"] = textboxData["createUsername"].join("");
		sendUsername();
		gameState = "mainMenu";
		update = true;
	}
	
	if (serverEvent === "loggedIn") {
		clientData["username"] = textboxData["loginUsername"].join("");
		sendUsername();
		gameState = "mainMenu";
		update = true;
	}

	if (serverError === "usernameInUse") {
		collectInput = true;
	}
	if (serverError === "incorrectPassword") {
		collectInput = true;
	}
	if (serverError === "usernameUndefined") {
		collectInput = true;
	}
	//Back button
	if (button(125, 75, 200, 100, back)) { gameState = "mainMenu"; update = true;}
};

function displaySignIn() {
	if (clientData["username"] === "guest") {
		//display login button in upper right. If logged in display username
		if (button(1750, 65, 250, 75, signIn) && (clientData["userData"] === {} || clientData["username"] === "guest")) {
			gameState = "signIn";
			update = true;
		}
	} else {
		drawTextBox(2050 - (clientData["username"].length + 2) * 33, 65, (clientData["username"].length + 2) * 33)
		drawText(clientData["username"], 2050 - ((clientData["username"].length + 2) + (clientData["username"].length + 2)/2) * 33 + 20, 50, 33, "character");
	}
};

//Hosting

function gameStateInitHosting() {
	//Set up hosting variables
	//Have user create server name and password
	resetData("crossword");
	logInput();
	drawCreateServer();
	//Host server button
	if (button(960, 850, 300, 100, "none") && textboxData["serverName"].length > 0) {
		hostServer(clientData["username"], textboxData["serverName"].join(""), textboxData["serverPassword"].join(""));
		host = true;
		update = true;
	}
	//Back button
	if (button(125, 75, 200, 100, back)) { gameState = "gameSelect"; update = true;}
};

//Server Selection

function gameStateInitServerRequest() {
	noServers = false;
	requestServers();
	gameState = "requestingServers"; 
};

function serverSearchAnimation() {
	if (frames/15 % 3 <= 1) {
		drawText("looking for servers.", 1920/2 - "looking for servers...".length/2 * 50, 1080/2 - 100);
	} else if (frames/15 % 3 <= 2) {
		drawText("looking for servers..", 1920/2 - "looking for servers...".length/2 * 50, 1080/2 - 100);
	} else if (frames/15 % 3 <= 3) {
		drawText("looking for servers...", 1920/2 - "looking for servers...".length/2 * 50, 1080/2 - 100);
	}
};

function gameStateRequestingServers() {
	serverSearchAnimation();
	if (serverError === "noServers") {
		noServers = true;
	}
	if (noServers) {
		drawText("it looks like there are no servers.", 1920/2 - "it looks like there are no servers.".length/2 * 50, 1080/2);
		drawText("we will keep looking though.", 1920/2 - "we will keep looking though.".length/2 * 50, 1080/2 + 100);
	} 
	if (Object.keys(availableServers).length !== 0) {
		serverSelected = false
		gameState = "serverSelect";
	}
	//Back button
	if (button(125, 75, 200, 100, back)) { gameState = "gameSelect"; update = true;}
};

function gameStateServerSelect() {
	//Display all available servers
	//"Join by name" option
	//Upon selection of a server through manual selection or join by name, input box with server name and password appears.
	displayAvailableServers();
	//Back button
	if (button(125, 75, 200, 100, back)) {
		gameState = "gameSelect";
		update = true;
	}
	
	if (Object.keys(availableServers).length === 0) {
		noServers = true;
		gameState = "requestingServers";
		update = true;
	}
	
	if (serverSelected) {
		logInput();
		drawJoinServer();
		//If the user clicks off of the box
		if (mouseButtonUp && !button(960, 550, 750, 820, "none")) {
			serverSelected = "";
		}
	}
};

//Solo Crossword

function gameStateInitSoloCrossword() {
	resetData("crossword");
	if (clientData["username"] !== ""){
		sendUserPlay(clientData["username"]);
	}
	requestCrossword(difficulty[selectedDifficulty][0], difficulty[selectedDifficulty][1]);
	gameState = "loadingSoloCrossword";
	playState = "soloCrossword";
	update = true;
};

function gameStateLoadingSoloCrossword() {
	//Show loading screen
	drawText("loading", 1920/2 - "loading".length/2 * 50, 1080/2);
	//if crosswordData and hitboxes are both not empty (data from server recieved)
	if (crosswordData.length !== 0 && hitboxes.length !== 0){
		for (let i = 0; i < hitboxes.length; i++) {
			averageWordLength += hitboxes[i][4].length;
		}
		averageWordLength = averageWordLength / hitboxes.length;
		ms = Date.now();
		gameState = "soloCrossword";
		update = true;
	}
};

//Multiplayer Gamestates

function gameStateLoadingCoopCrossword() {
	drawText("loadingcoopcrossword", 1920/2 - "loadingcoopcrossword".length/2 * 50, 1080/2);
	if (crosswordData.length !== 0 && hitboxes.length !== 0){
		tempData = [];
		for (let rowIndex = 0; rowIndex < crosswordData.length; rowIndex++) {
			tempData.push([...crosswordData[rowIndex]])
		}
		gameState = "coopCrossword";
		update = true;
	}
};

//------------------------------------------------------------------------------------//
//Functions in development

function gameStateHosting() {
	//Description of selected gamemode
	draw(placeholder, 300, 275, 475, 250);
	
	//User list
	draw(placeholder, 800, 275, 475, 250);
	
	//Chat (same as lobby chat)
	draw(placeholder, 1440, 600, 720, 900);

	//Crossword Generation settings
	draw(placeholder, 550, 720, 960, 540);

	//Play Button
	
	if (button(1920/2 - 200, 1080/2 - 100, 200, 100, placeholder)) { 
		requestRoomCrossword(currentRoom, [4, 6], 20); 
		crosswordData = []; 
		hitboxes = []; 
		gameState = "loadingCoopCrossword"; 
	}
};

function gameStateLoadingLobby() {
	if (Object.keys(roomData).length !== 0) {
		gameState = "lobby";
	}
};

function gameStateLobby() {
	//Host Info
	draw(placeholder, 480, 400, 720, 400);
	//Display relevant server information, ready button, and chat
	drawText("Host: " + roomData["host"], 200, 200, 33, "character");
	drawText("Gamemode: " + roomData["gameMode"], 200, 300, 33, "character");
	if (roomData["gameMode"] === "cooperative") {
		drawText("Instructions: ", 200, 400, 33, "character");
		//Display instructions image
	} else if (roomData["gameMode"] === "competitive") {
		//Display instructions image for competitive
	}
	//Player List
	draw(placeholder, 480, 800, 720, 350);

	//Chat
	draw(placeholder, 1440, 600, 720, 900);
	
	//Back button
	if (button(125, 75, 200, 100, back)) {
		gameState = "mainMenu";
		leaveServer();
		update = true;
	}
};

function gameStateCompCrossword() {
	crosswordOffset = [canvas.width/12, canvas.height/12];
		displayCrossword(960, 540);
		//If the user has solved a word tell the server. If the user has won tell the server
		for (let i = 0; i < hitboxes.length; i++){
			if (hitboxes[i][5] === false) {
				break;
			}
			if (i === hitboxes.length - 1) {
			//tell the server the user won and redirect the user to a win screen, if it is ranked display win, if private allow the user to view the crossword of the other players
			}
		}
};

function gameStateCoopCrossword() {
	crosswordOffset = [canvas.width/12, canvas.height/12];
	displayCrossword(960, 540);
	checkCoopCrossword();
	if (checkWin()) {
		gameState = "win"
	}
};

function gameStateWin() {
	drawText("woohoo you won congrats", 1920/2 - "woohoo you won congrats".length/2 * 50, 1080/2);
	//Continue button
	if (button(960, 840, 200, 100, placeholder)) {
		if (playState === "soloCrossword") {
			gameState = "mainMenu";
		} else if (playState === "coopCrossword") {
			if (host) {
				gameState = "hosting";
			} else {
				gameState = "initLobby";
			}
		}
	}
};

//------------------------------------------------------------------------------------//
//Function Queue

function gameStateLeaderboard() {
	
};


//------------------------------------------------------------------------------------//
//Temporary Functions

//draws bounding box for the game, for debugging
function drawBounds(){
	//Left bar
	ctx.drawImage(leftSideBar, 0, 0, horizontalOffset, canvas.height)
	//Right bar
	ctx.drawImage(rightSideBar, canvas.width - horizontalOffset, 0, horizontalOffset, canvas.height)
	//Top bar
	ctx.drawImage(topBar, 0, 0, canvas.width, verticalOffset);
	//Bottom bar
	ctx.drawImage(bottomBar, 0, canvas.height - verticalOffset, canvas.width, verticalOffset);
};

//plays music and lets user adjust volume, going to be deprecitated
function musicControls(){
	if (musicPlaying) {draw(musicEnabled, 100 + 250, 100, 100, 100, true)} else {draw(musicDisabled, 100 + 250, 100, 100, 100, true)};
	if (button(100 + 250, 100, 100, 100, "none")) {
		if (musicPlaying) {
			mainMusic.pause();
			mainMusic.currentTime = 0;
			calm2.pause();
			calm2.currentTime = 0;
			calm3.pause();
			calm3.currentTime = 0;
			music1.pause();
			music1.currentTime = 0;
			musicPlaying = false;
		} else {
			let randomInt = randint(1, 3);
			if (randomInt === 1) {
				mainMusic.play();
				musicPlaying = true;
			} else if (randomInt === 2) {
				calm2.play();
				musicPlaying = true;
			} else if (randomInt === 3) {
				calm3.play();
				musicPlaying = true;
			} else if (randomInt === 4) {
				music1.play();
				musicPlaying = true;
			}
		}
	}
	if (musicPlaying) {
		if (button(50 + 250, 200, 50, 50, volumeDown)) {
			mainMusic.volume = 0.8 * mainMusic.volume;
			calm2.volume = 0.8 * calm2.volume;
			calm3.volume = 0.8 * calm3.volume;
			music1.volume = 0.8 * music1.volume;
		}
		if (button(150 + 250, 200, 50, 50, volumeUp)) {
			mainMusic.volume = 1/(-4*mainMusic.volume - 1) + 1;
			calm2.volume = 1/(-4*calm2.volume - 1) + 1;
			calm3.volume = 1/(-4*calm3.volume - 1) + 1;
			music1.volume = 1/(-4*music1.volume - 1) + 1;
		}
	} else {
		return;
	}
};

//------------------------------------------------------------------------------------//
//Main Game Function

function updateGame() {
	update = false;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	//setup for 16:9 aspect ratio at 1920px * 1080px base
	if (canvas.width / 16 > canvas.height / 9) {
		sizeMult = canvas.height/1080;
		horizontalOffset = (canvas.width / 16 - canvas.height / 9) * 16 / 2;
		verticalOffset = 0;
	} else {
		sizeMult = canvas.width/1920;
		verticalOffset = (canvas.height / 9 - canvas.width / 16) * 9 / 2;
		horizontalOffset = 0;
	}

	//Music Buttons
	musicControls();

	if (gameState === "mainMenu") {
		gameStateMainMenu();
	}
	
	if (gameState === "gameSelect") {
		gameStateGameSelect();
	}
	
	if (gameState === "difficultySelect") {
		gameStateDifficultySelect();
	}
	
	if (gameState === "help") {
		gameStateHelp();
	}

	if (gameState === "initHosting") {
		gameStateInitHosting();
	}

	if (gameState === "hosting") {
		gameStateHosting();
	}

	if (gameState === "initServerRequest") {
		gameStateInitServerRequest();
	}

	if (gameState === "requestingServers") {
		gameStateRequestingServers();
	}

	if (gameState === "serverSelect") {
		gameStateServerSelect();
	}

	if (gameState === "initLobby") {
		resetData("crossword");
		resetData("text");
		resetData("server");
		requestRoomDataUpdate(currentRoom);
		gameState = "loadingLobby";
	}

	if (gameState === "loadingLobby") {
		gameStateLoadingLobby();
	}
	
	if (gameState === "lobby") {
		gameStateLobby();
	}
	
	//initalizes any variables used in crossword gamestate
	if (gameState === "initSoloCrossword") {
		gameStateInitSoloCrossword();
	}
	
	//displays loading screen while server generates crossword
	if (gameState === "loadingSoloCrossword") {
		gameStateLoadingSoloCrossword();
	}
	
	//displays loading screen while server generates coop crossword
	if (gameState === "loadingCoopCrossword") {
		playState = "coopCrossword";
		gameStateLoadingCoopCrossword();
	}
	
	//displays crossword on screen by calling crossword function
	if (gameState === "soloCrossword") {
		//check to see if crossword has been solved
		if (checkWin()) {
			if (clientData["username"] !== "")	{
				sendUserWin(clientData["username"]);
				console.log(Date.now() - ms);
				score = (hitboxes.length * averageWordLength) / guesses - (Date.now() - ms);
				updateScore(clientData["username"], score);
			}
			gameState = "win"
		}
		displayCrossword(960, 540);
	}
	
	if (gameState === "coopCrossword") {
		gameStateCoopCrossword();
	}
	
	if (gameState === "compCrossword") {
		gameStateCompCrossword();
	}

	//initalizes any variables needed for the worldle gamestate
	if (gameState === "initWordle") {
		initWordle();
	}

	//displays wordle on screen by calling worldle function
	if (gameState === "wordle") {
		simulateWordle();
		//Back button
		if (button(125, 75, 200, 100, back)) {
			if (playState === "coopCrossword") {
				hitboxDeselected(currentRoom);
			}
			gameState = playState;
			update = true;
		}
	}
	
	//displays game win screen
	if (gameState === "win"){
		gameStateWin();
	}

	//displayes leaderboard, leaderboard data sent from server whenever it updates.
	if (gameState === "leaderboard"){
		//Back button
		if (button(125, 75, 200, 100, back)) { gameState = "mainMenu"; update = true;}
	}
	
	//displays login / create account screen
	if (gameState === "signIn"){
		gameStateSignIn();
	}

	if (gameState === "mainMenu" || gameState === "leaderboard" || gameState === "win") {
		displaySignIn();
	}

	//------------------------------------------------------------------------------------//
	//Needed code for rerunablility of the function
	
	//reset all single frame vars, keep on end of function
	keyPressedThisFrame = "";
	mouseButtonDown = false;
	mouseButtonUp = false;
	serverEvent = "";
	serverError = "";
	drawAnimations();
	//If the screen needs to be redrawn because of gameState change inside function
	if (update) {
		updateGame();
	}
};

//------------------------------------------------------------------------------------//
//Automaticaly update the game

//Update Step, 30 steps per second
setInterval(() => {
	if (!socket.connected) {
		draw(placeholder, 1920/2, 1080/2, 200, 100);
	}
	updateGame();
	//Stop the integer of frames from going over 64 bits, probably will never fire
	if (frames >= (2**64) - 1) {
		frames = 0;
	}
	frames++;
}, 1000/30);

//Communication Step, 5 seconds per frame
setInterval(() => {
	//If the client has not recived the word list
	if (wordList.length === 0) {
		//Send username
		sendUsername();
		//request word list from server
		requestWordList();
		console.log("pinged server");
	}
}, 5000);

//------------------------------------------------------------------------------------//
//Event Listeners
//triggers on all mouse down events, sets mouseButtonState to "down"
canvas.addEventListener("mousedown", (event) => {
	//if it was a left click
	if (event.button === 0){
		mouseButtonState = "down";
		mouseButtonDown = true;
	}
});

//triggers on all mouse up events, sets mouseButtonState to "false"
canvas.addEventListener("mouseup", (event) => {
	//if it was a left click
	if (event.button === 0){
		mouseButtonState = "";
		mouseButtonUp = true;
	}
});

//triggers on all mouse movements, updates mouse values
canvas.addEventListener('mousemove', (event) => {
	mouseX = event.clientX;
	mouseY = event.clientY;
});

//triggers on all key presses and sets the keyPressed value to true
document.addEventListener("keydown", (event) => {
	//caps lock key is not deleted in key up
	if (event.key !== "CapsLock") {keysPressed.push(event.key.toLowerCase());}
	keyPressedThisFrame = event.key.toLowerCase();
	if (event.key === "Shift") {shiftKey = true;}
	//remove duplicates
	let KPS = new Set(keysPressed);
	keysPressed = Array.from(KPS);
	//allow all key presses to register
	updateGame();
});

//removes the key from keysPressed on key release
document.addEventListener("keyup", (event) => {
	let letterToDel = event.key.toLowerCase();
	//for every key that is currently pressed
	for (let keyIndex = 0; keyIndex < keysPressed.length; keyIndex++) {
		//if the values are the same delete the index from keysPressed
		if (letterToDel == keysPressed[keyIndex]){
			del(keysPressed, keyIndex);
			keyIndex -= 1;
		}
	}
	if (event.key === "Shift") {shiftKey = false;}
	//allow all key presses to register
	updateGame();
});

//------------------------------------------------------------------------------------//
//Server Events

//When server sends crosswordData
socket.on("crosswordData", (data) => {
	serverEvent = "crosswordDataUpdate";
	tempCrosswordData = data[0];
	tempHitboxes = data[1];
	if (crosswordData.length > 0 && hitboxes.length > 0) {
		updateCrosswordData();
	} else {
		crosswordData = tempCrosswordData;
		hitboxes = tempHitboxes;
	}
	
});

//On world list sent from server
socket.on("wordList", (allWords) => {wordList = allWords;});

//On log in load the user database from the server
socket.on("loggedIn", (userDatabase) => {
	clientData["userData"] = userDatabase;
	console.log(clientData);
	serverEvent = "loggedIn";
});

//On successful account creation
socket.on("accountCreated", (userDatabase) => {
	clientData["userData"] = userDatabase;
	serverEvent = "accountCreated";
});

//On successful password change
socket.on("changePassword", () => {
	serverEvent = "changePassword";
});

//On successful username change
socket.on("usernameChanged", (newUsername) => {
	clientData["username"] = newUsername;
	serverEvent = "usernameChanged";
});

//On database update from the server
socket.on("databaseUpdate", (userDatabase) => {
	clientData["userData"] = userDatabase;
});

//Recieving the server names
socket.on("serverNames", (servers) => {
	availableServers = servers;
	console.log(servers);
});

//On user joining a room
socket.on("joinedRoom", (roomName) => {
	currentRoom = roomName;
	serverEvent = "joinedRoom";
});

socket.on("roomDataUpdate", (data) => {
	roomData = data;
});

socket.on("generatingRoomCrossword", () => {
	resetData("crossword");
	gameState = "loadingCoopCrossword";
});

socket.on("highlightUpdate", (newHighlightData) => {
	serverEvent = "highlightUpdate";
	highlightData = Object.values(newHighlightData);
});

//On server input errors (incorrect password, incorrect username, ect.)
socket.on("error", (message) => {
	serverError = message;
	console.log(message);
	//reload the page if the server crashed
	if (message === "serverDied") {
		location.reload();
	}
});

//Runs upon loading of page by the client

//Send username
sendUsername();
//request word list from server
requestWordList();