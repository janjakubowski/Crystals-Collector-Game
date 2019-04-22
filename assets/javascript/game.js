//  game.js 
//  Jan Jakubowski 15.apr.19
// 
// ////////////////////////////////////////////////
// ///// Global Variables 
var gameOver;
var startNewGame;
var isWinner;
const images = ["feb-amethyst","mar-aquamarine","apr-diamond","aug-peridot"];
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

// ////////////////////////////////////////////////
// ///// gameboard object and methods

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

// ////////////////////////////////////////////////
// ///// functions

function nextGame () {
    for (i=0; i < 4; i++) {
        switch (i) {
            case 0 : $("#gem_0").attr("data-value", Math.floor((Math.random()*12) + 1)); 
                console.log(images[i] + " | value: " + $("#gem_0").attr("data-value"));
                break;
            case 1 : $("#gem_1").attr("data-value", Math.floor((Math.random()*12) + 1)); 
                console.log(images[i] + " | value: " + $("#gem_1").attr("data-value"));
                break;
            case 2 : $("#gem_2").attr("data-value", Math.floor((Math.random()*12) + 1)); 
                console.log(images[i] + " | value: " + $("#gem_2").attr("data-value"));
                break;
            case 3 : $("#gem_3").attr("data-value", Math.floor((Math.random()*12) + 1)); 
                console.log(images[i] + " | value: " + $("#gem_3").attr("data-value"));
                break;
        }
    }
    
    gameboard.winningTotal = Math.floor(Math.random()*101) + 19;
    gameboard.displayWinning ();
    gameboard.runningTotal = 0;
    gameboard.displayRunning ();
    // $("#runningDollars").text((gameboard.runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    console.log("winningTotal: " + gameboard.winningTotal + " | runningTotal:" + gameboard.runningTotal);
    scoreboard.changeMsg1(cannedMsg.pickNext);
    scoreboard.changeMsg2(cannedMsg.untilOver);
    if (isWinner) {
        $("#runningTotalDiv").removeClass("winnerColor");
        $("#userMsg1").removeClass("sb-element-w");
    } else {
        $("#runningTotalDiv").removeClass("loserColor");
        $("#userMsg1").removeClass("sb-element-l");
    }
    $("#runningTotalDiv").addClass("normalColor");
    $('#newGame').prop("disabled", true);
    $('#playOver').prop("disabled", false);
    isWinner = null;
    startNewGame = false;
    gameOver = false;
}

function replayGame () {
    gameboard.runningTotal = 0;
    gameboard.displayRunning ();
    // $("#runningDollars").text((gameboard.runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    console.log("winningTotal: " + gameboard.winningTotal + " | runningTotal:" + gameboard.runningTotal);
    scoreboard.changeMsg1(cannedMsg.pickNext);
    scoreboard.changeMsg2(cannedMsg.untilOver);
    if (isWinner) {
        $("#runningTotalDiv").removeClass("winnerColor");
    } else {
        $("#runningTotalDiv").removeClass("loserColor");
    }
    $("#runningTotalDiv").addClass("normalColor");
    $('#newGame').prop("disabled", false);
    isWinner = null;
    startNewGame = false;
    gameOver = false;
}

// /////////////////////////////////////////////
// WELCOME - first time through

    var firstGame = true;
    $('#newGame').prop("disabled", false);
    $('#playOver').prop("disabled", true);
    scoreboard.changeMsg1(cannedMsg.welcome);
    scoreboard.changeMsg2(cannedMsg.newGame);

// /////////////////////////////////////////////
// PLAY THE GAME

$(document).ready(function() {

    $("#newGame").on("click", function () {
        console.log("***** start clicked");
        if ((firstGame) || (gameOver)) {
            nextGame();
            
        }
    });

    $("#playOver").on("click", function () { 
        console.log("***** play over clicked");
        replayGame();
    });

    $(".gem").on("click", function() {

        if (!gameOver) {

            // var gemValue = $(this).attr("data-value");
            // console.log("gemValue: " + gemValue);

            gameboard.runningTotal += parseInt($(this).attr("data-value"));
            gameboard.displayRunning ();
            // $("#runningDollars").text((gameboard.runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
            console.log("runningTotal: " + gameboard.runningTotal);

            if (gameboard.runningTotal == gameboard.winningTotal)  {
                console.log("----> winner, winner, chicken dinner");
                scoreboard.isWinner();
                // gameboard.isWinner();
                $("#runningTotalDiv").removeClass("normalColor");
                $("#runningTotalDiv").addClass("winnerColor");
                isWinner = true;
                gameOver = true;
                return;
            }

            if (gameboard.runningTotal >= gameboard.winningTotal) {
                console.log("----> loser");
                scoreboard.isLoser();
                // gameboard.isLoser();
                $("#runningTotalDiv").removeClass("normalColor");
                $("#runningTotalDiv").addClass("loserColor");
                isWinner = false;
                gameOver = true;
                return;
            }
        }
    })
    
})