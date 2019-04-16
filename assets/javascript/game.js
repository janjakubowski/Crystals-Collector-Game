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
let images = ["darkslateblue","lawngreen","orangered","powderblue","blueviolet","blue","yellow"];
// function gemCard(x,y,z) {
//     this.name = x;
//     this.value = y;
//     this.image = z;
// }
var cardGemValue = -1;
var image = "#000";
function getNumber () { return (Math.floor(Math.random() * images.length)) };
// n.toLocaleString()

function nextGame () {
    for (i=0; i < 4; i++) {
        var gemButton = $("<button>");
        gemButton.attr("data-x", Math.floor((Math.random()*12) + 1));
        // gems[i] = new gemCard('"gem_'+i+'"',
                    // Math.floor((Math.random()*12) + 1),
                    // images[Math.floor(Math.random() * images.length)]);
        // console.log("name:"+gems[i].name +" | value:" +gems[i].value +" | image:"+gems[i].image);
        // $(gems[i]).attr("data-x", gems[i].value);
        var xxx=$(gemButton).attr("data-x");
        console.log("i:"+i+ " | x:",xxx);
        gemButton.addClass("gem-button gem gem-button-color");
        var random = Math.floor(Math.random() * images.length);
        console.log("random: " + random + " | images: " + images[random]);
        // gemButton.css("background","url(assets/images/a.png");
        gemButton.css("background-color",images[random]);
        $("#gemCards").append(gemButton);
        // $(gems[i]).addClass("used-button-color-used");
    }
    // // gem2 = new gemCard('gem-2',0,'x000');
    // // $("gem_1").attr("data-letter", gem1.value);
    // // $("gem_1").css("background-color", gem1.image);
    // // gem3 = new gemCard('gem-3',0,'x000');
    // // gem4 = new gemCard('gem-4',0,'x000');
    winningTotal = Math.floor(Math.random()*101) + 19;
    runningTotal = 0;
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

        // gemValue = $(this).value();
        // console.log("gem.name ""gemValue: " + gemValue);

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