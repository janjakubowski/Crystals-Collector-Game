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
var gems = [];
var gemValue = 0;
var startNextGame = false;
var runningTotal = 0;
let images = ["feb-amethyst","mar-aquamarine","apr-diamond","aug-peridot"];
// function gemCard(x,y,z) {
//     this.name = x;
//     this.value = y;
//     this.image = z;
// }
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const scoreboardDiv = $(".scoreboard");
var cardGemValue = -1;
var image = "#000";
function getNumber () { return (Math.floor(Math.random() * images.length)) };
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
    
    winningTotal = Math.floor(Math.random()*101) + 19;
    // winningDollars = winningTotal * 10000;
    console.log("winningDollars: " + (winningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    $("#winningDollars").text((winningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    runningTotal = 0;
    $("#runningDollars").text((runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
    startNewGame = false;
    
}
// nextGame ();

// startNextGame = true;
// if (startNextGame) {
    nextGame();
    startNextGame = false;
    console.log("winningTotal: " + winningTotal + " | runningTotal:" + runningTotal);
    // console.log("winningTotal: " + winningTotal + " | runningTotal:" + runningTotal);
    // for (i=0;i<4;i++) {console.log("name:"+gems[i].name +" | value:" +gems[i].value +" | image:"+gems[i].image);}
    // return;
// }
$(document).ready(function() {

    $(".gem").on("click", function() {

        // console.log("startNextGame: " + startNextGame);
        if (startNextGame) {
            nextGame();
            startNextGame = false;
            console.log("winningTotal: " + winningTotal + " | runningTotal:" + runningTotal);
            for (i=0;i<4;i++) {console.log("name:"+gems[i].name +" | value:" +gems[i].value +" | image:"+gems[i].image);}
            // return;
        }
        // gemValue = parseInt($(this).value);

        // console.log($(this));
        gemValue = $(this).attr("data-x");
        console.log("gemValue: " + gemValue);
        // debugger;
        // console.log("gem.name: " + gemCard.name + " | gemValue: " + gemValue);
        

        runningTotal += parseInt(gemValue);
        $("#runningDollars").text((runningTotal*10000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: '0'}));
        console.log("runningTotal: " + runningTotal);

        if (runningTotal == winningTotal)  {
            console.log("winner, winner, chicken dinner");
            runningTotal = 0;
            return;
        }

        if (runningTotal >= winningTotal) {
            console.log("loser");
            runningTotal = 0;
            return;
        }
    })
    
})