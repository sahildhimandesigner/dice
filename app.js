/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Declare the varriable
var score, roundScore, activePalyer, dice, secondDice, gamePlaying;

init()

var lastDisc, setScore;

//To get the random number of dise we use Math function
//Store the value of math random number in dise
//we need number between the one or 6 for that we need to multiply with 6
//floor method we use so that we will get the number down to near number

// function rollDise () {
//     dise = Math.floor(Math.random() * 6) + 1;
//     document.querySelector("#score-0").innerHTML = dise;
//     document.querySelector("#score-1").innerHTML = dise;
// }

// function holdScore (dise) {
//     alert(dise)
// }

//In this case we have set the value
// document.querySelector('#current-' + activePalyer).innerHTML = '<em>' +dice+ '</em>';

//To read the value of element.
//In this case we have get the value.
// var x = document.querySelector("#current-1").textContent;
// console.log(x)

//To hide the disce value by CSS

// document.querySelector('.dice').style.display = 'none';

//We need to pass the 2 parameters. 
//First we need to pass event methode
//Second is function callback


document.querySelector('.btn-roll').addEventListener('click', function(){
    
    //So bydefault gamePlaying var true.
    if(gamePlaying) {
        //Step 1: Random Number
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1, dice2, 'both dice')
        //Step 2: Display the Result

        //We have store the image display in varriable
        //To change the dynamically of image we update the last number of image with count of desc
        showDice()
        
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
       
        //Step 3: Update the round space if the rolled number was Not a 1

        // previousScore = dice;
        // console.log(previousScore, 'dice scorescore')

        //If disc show 6 twise the total score should be zero
        if(lastDisc === 6 && dice1 === 6 && dice2 === 6){
            //here we have set the current player value 0
            score[activePalyer] = 0;

            //Update the score in ui or current user
            document.querySelector("#score-" + activePalyer).textContent = '0';

            //Call the next player
            nextPlayer();

        } else if((dice1 > 1 && dice2 > 1) || (dice1 > 1 || dice2 > 1)) {
            //Add score
            roundScore += dice1 + dice2;
            console.log(roundScore, 'roundScore dic 1 dic 2')
            //Or You can write this way
            //roundScore = roundScore + dice;

            //Now we need to show the count which increasing
            document.querySelector("#current-" + activePalyer).textContent = roundScore;

        } else {
            //Next Player
            nextPlayer()
        }
        lastDisc = `${dice1} ${dice2}`;
    }
})

//Create the functionality for hold the count

document.querySelector(".btn-hold").addEventListener('click', function(){
    //IT WILL ONLY ACCESSIBLE IF THE PLAYER IS ACTIVE RIGHT NOW

    if(gamePlaying){
        //TOTAL OF BOTH DICE
        //STORE THE TOTAL VALUE OF DICE IN ROUDSCORE
        roundScore += dice1 + dice2;                

        //ADD CURRENT SCORE TO GLOBAL SCORE
        score[activePalyer] += roundScore;
      
        document.querySelector("#score-" + activePalyer).textContent = score[activePalyer];
       
        //CREATED THE FUNCTION FOR SET THE WINNER SCORE
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input) {
            winningScore = input;
        } else {
            winningScore = 50;
        }
        //CHECK IF THE PALYER WON THE GAME
        //SET THE SCORE OF WHICH USER PROIVDED
        if(score[activePalyer] >= winningScore) {
            document.querySelector("#name-" + activePalyer).textContent = "Winner";
            document.querySelector('.player-' + activePalyer + '-panel').classList.add("winner");
            document.querySelector('.player-' + activePalyer + '-panel').classList.remove("active");
            hideDice()
            //SO WHEN OUR SCORE REACH TO 50 THEN IT WILL SET FALSE
            gamePlaying = false;
        }
        else{
            nextPlayer()
        }
    }
});

function nextPlayer() {
    activePalyer === 0 ? activePalyer = 1 : activePalyer = 0;
        
    //We need to set the value 0 
    roundScore = 0;

    //It is same lie if condition
    //if(activePlayer === 0){
        //activePalyer = 1
   // } else {
        // activePalyer = 0
   //}

   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

    //we need to change the class when it is swtich to other user

    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

   //document.querySelector(".player-0-panel").classList.remove('active');
   //document.querySelector(".player-1-panel").classList.add('active');

   showDice()
}

//For new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    //initialize the varriable
    //we have use array for both palyer
    //Or we can do score1 and score2
    //we have set the value of score 0

    score = [0,0]
    //Store the info of roundscore
    roundScore = 0;

    //current active player
    activePalyer = 0;

    gamePlaying = true;

    hideDice()
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("winner");
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");
}

function showDice() {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function gameLoading() {
    document.querySelector(".loading-game").style.display = 'block';
    setTimeout(function(){
        document.querySelector('.loading-window h3').style.display = 'none';
        document.querySelector(".loading-game").style.display = 'none';
        document.querySelector('.loading-window').style.display = 'none';
    }, 3000)
}

window.onload = gameLoading();