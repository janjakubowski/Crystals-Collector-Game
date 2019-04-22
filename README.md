# Crystals-Collector-Game
Week 4 - Homework - Collect Crystals Worth a Random Value to Equal the Desired Total to Win

## Hints To Play
_Note:_ It may be impossible to win, especially if the jackot number is odd and all the birthstone values are even.
1. All values are multipled by 10,000 to display. The gem values are between 1 and 12, it is possible to have duplicates, and the jackpot is between 19 and 120.
0. *Cheat:* Open the console log to see all the values.  

## Assignment
The player will have to guess the answer, just like in Word Guess. This time, though, the player will guess with numbers instead of letters. 

Here's how the app works:
   * There will be four crystals displayed as buttons on the page.
   * The player will be shown a random number at the start of the game.
   * When the player clicks on a crystal, it will add a specific amount of points to the player's total score. 
     - Your game will hide this amount until the player clicks a crystal.
     - When they do click one, update the player's score counter.
   * The player wins if their total score matches the random number from the beginning of the game.
   * The player loses if their score goes above the random number.
   * The game restarts whenever the player wins or loses.
     - When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.
   * The app should show the number of games the player wins and loses. To that end, do not refresh the page as a means to restart the game.

#####  Game design notes

* The random number shown at the start of the game should be between 19 - 120.
* Each crystal should have a random hidden value between 1 - 12.

##### My Personalizations 

* Using dollar values equal to random number x 10,000 and crystal value x 10,000
* Allow player to replay game with same jackpot and gem values
* Imported a font, the scoreboard font

## Challenges
The three components of _html, css, JavaScript_ are straight forward. 
1. Using jQuery rather than straight JavaScript
2. Represent the crystals using objects and methods. (not done)
    a. Randomly select 4 birthstones with no dups (not done)
    b. Instead the scoreboard and the gameboard are objects.
3. 

###### Versions
- 1.0 20.apr.19 PM 
    - html & css updates to line up elements and use muted colors
- 0.4 18.apr.19 midnite 
    - js: start/play again added, gems are hardcoded, no longer dynamic except      for value 
    - all html, css & logic complete, ready for UAT
- 0.3 18.apr.19 PM 
    - js: win/lose logic added, including score updates,
        scoreboard and gameboard are now objects
- 0.2 18.apr.19 AM
    - js: Basic game playing functionality: get winning number, get values for      gems, click on gems and keep running total, win or lose message to         console.log
    - html & css: basic framework of scoreboard
- 0.1 Initial 