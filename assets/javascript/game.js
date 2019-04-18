//  game.js 
//  Jan Jakubowski 15.apr.19
//  functions
//      new game
// 
//      change score
//      displaymessge
//
//  splash instructions
//  create scoreboard
//  play game
//      generate random winning number
//      generate random values & assign to cards
//      
//      update scoreboard
// 
// the "gems" are going to be objects
// 
// ////////////////////////////////////////////////
// ///// Global Variables 
var gems = [];
var gemValue = 0;
var startNextGame = false;
var images = ["feb-amethyst","mar-aquamarine","apr-diamond","aug-peridot"];
// var cannedMsgs = [ " ",
//     "Winner, Winner, Chicken Dinner",
//     "Your Total is Over, You L-O-S-E!",
//     "Welcome Bienvenue Witamy", 
//     "Click on Start New Game",
//     "Click on Start New Game or Play Over"
// ]; 
// function gemCard(x,y,z) {
//     this.name = x;
//     this.value = y;
//     this.image = z;
// }
// ////////////////////////////////////////////////
// ///// Scoreboard 
const scoreboard = {
    wins : 0,
    losses : 0,
    // msg1 : "",
    // msg2 : "",

    addWin : function () { this.wins++; $("#W").text(this.wins);},
    addLoss : function  () { $("#L").text(this.losses++);},
    changeMsg1 : function (choice) { $("#userMsg1").text(choice);},
    changeMsg2 : function (choice) { $("#userMsg2").text(choice);},
    isWinner : function () {
        this.addWin (); this.changeMsg1(cannedMsg.winner); this.changeMsg2(cannedMsg.nextGame);
    },
    isLoser : function () {
        this.addLoss (); this.changeMsg1(cannedMsg.loser); this.changeMsg2(cannedMsg.nextGame);
    }
};


// ////////////////////////////////////////////////
// ///// Gameboard - aka bag of gems
const cannedMsg = {
    pickNext : "Pick a birthstone until",
    untilOver : "your total is equal to the jackpot",
    winner: "Winner, Winner, Chicken Dinner",
    loser: "Your Total is Over, You L-O-S-E!",
    welcome : "Welcome Bienvenue Witamy", 
    newGame : "Click on Start New Game",
    nextGame : "Click on Start New Game or Play Over"
}; 

// ////////////////////////////////////////////////
// ///// Gameboard - aka bag of gems
const gameboard = {
    winningTotal : 0,
    runningTotal : 0
};


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// const scoreboardDiv = $(".scoreboard");
// var cardGemValue = -1;
// var image = "#000";
// function getNumber () { return (Math.floor(Math.random() * images.length)) };
// n.toLocaleString()

function nextGame () {
    for (i=0; i < 4; i++) {
        var gemButton = $("<button>");
        gemButton.attr("data-x", Math.floor((Math.random()*12) + 1));
        gemButton.addClass("gem-button gem gem-button-color");
        gemButton.html('<img src="assets/images/' + images[i] + '.png">')
        // gemButton.css("background-color",images[Math.floor(Math.random() * images.length)]);
        gemButton.css("background-color","#f0f0f0");
        $("#gemCards").append(gemButton);
        // console.log("name:"+gems[i].name +" | value:" +gems[i].value +" | image:"+gems[i].image);
    }
    
    gameboard.winningTotal = Math.floor(Math.random()*101) + 19;
    console.log("winningDollars: " + (gameboard.winningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    $("#winningDollars").text((gameboard.winningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    gameboard.runningTotal = 0;
    $("#runningDollars").text((gameboard.runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    startNewGame = false;
    
}
// nextGame ();

    nextGame();
    startNextGame = false;
    var gameOver = false;
    scoreboard.changeMsg1(cannedMsg.pickNext);
    scoreboard.changeMsg2(cannedMsg.untilOver);
    console.log("winningTotal: " + gameboard.winningTotal + " | runningTotal:" + gameboard.runningTotal);
$(document).ready(function() {

    $("#newGame").on("click", function () {
        console.log("start clicked");
    });

    // 
    $(".gem").on("click", function() {

        if (!gameOver) {

            gemValue = $(this).attr("data-x");
            console.log("gemValue: " + gemValue);

            gameboard.runningTotal += parseInt(gemValue);
            $("#runningDollars").text((gameboard.runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
            console.log("runningTotal: " + gameboard.runningTotal);

            if (gameboard.runningTotal == gameboard.winningTotal)  {
                console.log("winner, winner, chicken dinner");
                scoreboard.isWinner();
                // gameboard.isWinner();
                $("#runningTotalDiv").removeClass("normalColor");
                $("#runningTotalDiv").addClass("winnerColor");
                gameOver = true;
                return;
            }

            if (gameboard.runningTotal >= gameboard.winningTotal) {
                console.log("loser");
                scoreboard.isLoser();
                // gameboard.isLoser();
                $("#runningTotalDiv").removeClass("normalColor");
                $("#runningTotalDiv").addClass("loserColor");
                gameOver = true;
                return;
            }
        }
    })
    
})