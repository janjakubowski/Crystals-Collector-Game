//  game.js - Jan Jakubowski 
// //////////////////////////// Global Variables 
var gameOver;
var startNewGame;
var isWinner;
var months = [];
var currentGame = [];
const birthstones = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const cannedMsg = {
    pickNext : "Pick a birthstone until",
    untilOver : "your total is equal to the jackpot",
    winner: "Winner, Winner, Chicken Dinner",
    loser: "Your Total is Over, You L-O-S-E!",
    welcome : "Welcome ~ Bienvenue ~ Witamy", 
    newGame : "Click on <Start New Game>",
    nextGame : "<Start New Game> or <Play Over>"
}; 

// ////////////////////////////////////////////////
// ///// scoreboard Object & Methods

const scoreboard = {
    wins : 0,
    losses : 0,
    addWin : function () { this.wins++; $("#W").text(this.wins);},
    addLoss : function  () { this.losses++; $("#L").text(this.losses);},
    changeMsg1 : function (choice) { $("#userMsg1").text(choice);},
    changeMsg2 : function (choice) { $("#userMsg2").text(choice);},
    isWinner : function () {
        this.addWin (); 
        this.changeMsg1(cannedMsg.winner);
        $("#userMsg1").addClass("sb-element-w");
        this.changeMsg2(cannedMsg.nextGame);
        $('#newGame').prop("disabled", false); 
        gameOver =true; 
        isWinner = true;
    },
    isLoser : function () {
        this.addLoss (); 
        this.changeMsg1(cannedMsg.loser); 
        $("#userMsg1").addClass("sb-element-l");
        this.changeMsg2(cannedMsg.nextGame);
        $('#newGame').prop("disabled", false); 
        gameOver =true; 
        isWinner = false;
    }
};

// //////////////////////////////// gameboard object and methods
const gameboard = {
    winningTotal : 0,
    runningTotal : 0,
    displayWinning : function () {
        $("#winningDollars").text((this.winningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
        $("#userMsg1").removeClass("sb-element-w");
    },   
    displayRunning : function () {
        $("#runningDollars").text((this.runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
        $("#userMsg1").removeClass("sb-element-l");
    }
};

// ////////// f u n c t i o n s /////////////

function shuffle () {
    for (var i=0; i<4; i++) {
        x = Math.floor(Math.random()*months.length);
        currentGame[i] = months[x];
        months.splice(x,1);
    };
    console.log("months: " + months + " | currentGame: " + currentGame);
}

function resetGame () {
    $("#gems").empty();
    for (var i=0; i<4; i++) { months.push(currentGame.pop()); };
}

function nextGame () {
    shuffle();

    for (i=0; i < 4; i++) {
        var stoneImage = $("<img>");
        stoneImage.addClass("gem");
        var temp = "assets/images/" + birthstones[currentGame[i]] + ".png";
        stoneImage.attr("src", temp);
        stoneImage.attr("data-stonevalue", (Math.floor(Math.random()*12) + 1));
        $("#gems").append(stoneImage);
        console.log("stone: " + birthstones[currentGame[i]] + " | value: " + stoneImage.attr("data-stonevalue"));
    }
    
    gameboard.winningTotal = Math.floor(Math.random()*101) + 19;
    gameboard.displayWinning ();
    gameboard.runningTotal = 0;
    gameboard.displayRunning ();
    console.log("winningTotal: " + gameboard.winningTotal);
    scoreboard.changeMsg1(cannedMsg.pickNext);
    scoreboard.changeMsg2(cannedMsg.untilOver);
    if (isWinner) {
        $("#runningTotalDiv").removeClass("winnerColor");
        $("#userMsg1").removeClass("sb-element-w");
    } else {
        $("#runningTotalDiv").removeClass("loserColor");
        $("#userMsg1").removeClass("sb-element-l");
    }
    // $("#runningTotalDiv").addClass("normalColor");
    $('#newGame').prop("disabled", true);
    $('#playOver').prop("disabled", false);
    isWinner = null;
    startNewGame = false;
    gameOver = false;
    // $(document).on("click", "img.gem", betterWork);
}

function replayGame () {
    gameboard.runningTotal = 0;
    gameboard.displayRunning ();
    console.log("winningTotal: " + gameboard.winningTotal);
    scoreboard.changeMsg1(cannedMsg.pickNext);
    scoreboard.changeMsg2(cannedMsg.untilOver);
    if (isWinner) {
        $("#runningTotalDiv").removeClass("winnerColor");
        $("#userMsg1").removeClass("sb-element-w");
    } else {
        $("#runningTotalDiv").removeClass("loserColor");
        $("#userMsg1").removeClass("sb-element-l")
    }
    $("#runningTotalDiv").addClass("normalColor");
    $('#newGame').prop("disabled", true);
    isWinner = null;
    startNewGame = false;
    gameOver = false;
}

// ///////////////////////////////  WELCOME - first time through

var firstGame = true;
$('#newGame').prop("disabled", false);
$('#playOver').prop("disabled", true);
scoreboard.changeMsg1(cannedMsg.welcome);
scoreboard.changeMsg2(cannedMsg.newGame);
for (var i=0; i<12; i++) { months[i] = i; };

// /////////////////////////////   PLAY THE GAME

$(document).ready(function() {

    $("#newGame").on("click", function () {
        console.log("***** start clicked");
        if (firstGame) {
            nextGame();
            firstGame = false;
        } else if (gameOver) {
            resetGame();
            nextGame();
        }
    });

    $("#playOver").on("click", function () { 
        console.log("***** play over clicked");
        replayGame();
    });

    $(document).on("click", "img.gem", function () {
    // $(".gem").on("click", function() {

        if (!gameOver) {
            gameboard.runningTotal += parseInt($(this).attr("data-stonevalue"));
            gameboard.displayRunning();
            // console.log("runningTotal: " + gameboard.runningTotal);

            if (gameboard.runningTotal == gameboard.winningTotal)  {
                // console.log("----> winner, winner, chicken dinner");
                scoreboard.isWinner();
                $("#runningTotalDiv").addClass("winnerColor");
                isWinner = true;
                gameOver = true;
                return;
            }

            if (gameboard.runningTotal >= gameboard.winningTotal) {
                // console.log("----> loser");
                scoreboard.isLoser();
                $("#runningTotalDiv").addClass("loserColor");
                isWinner = false;
                gameOver = true;
                return;
            }
        }
    })
    
})