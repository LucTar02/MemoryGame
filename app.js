const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', ];

let gameContainer = document.getElementById('game-container'); //kort container
let flippedCards = []; 
let matchedCards = []; 
let PlayerOneName = document.getElementById('Player-One-Name').value;
let PlayerTwoName = document.getElementById('Player-Two-Name').value;
let cardOne 
let cardTwo

const playertwocontainer = document.getElementById('player-two-container');
const TwoOpponentContainer = document.getElementById('Two-player-container');
const NumberOfPlayers = document.getElementById('Number-of-players');
const activePlayerName = document.getElementById('active-player-name');
const playerOnePoints = document.getElementById('player-one-points');
const playerTwoPoints = document.getElementById('player-two-points');
const historyScore = document.getElementById('ul-History')

let activePlayerIndex = 0;

const playerOne = {  
    name: PlayerOneName,
    score: 0
}

const playerTwo = {
    name: PlayerTwoName,
    score: 0
}

//------------------------------------
function getActivePlayer() {
    if(activePlayerIndex == 0) {
        return playerOne;
    } else {
        return playerTwo;
    }
}
//------------------------------------

//------------------------------------
function setNextTurn() { //byta spelare
    if(activePlayerIndex == 0) {
        activePlayerIndex = 1;
        document.getElementById('active-player-name').innerHTML = playerTwo.name;

    } else {
        activePlayerIndex = 0;
        document.getElementById('active-player-name').innerHTML = playerOne.name;

    }
}
//------------------------------------

//------------------------------------
function onePlayerOpition(){ //mer om det ska vara en spelare mot dator, 
    NumberOfPlayers.classList.add('hide');
    TwoOpponentContainer.classList.add('hide');
    document.getElementById('player2Name').innerHTML = 'Dator';
    document.getElementById('player1Name').innerHTML = 'Human';
    playerTwo.name = 'Dator';
    playerOne.name = 'Human';
    document.getElementById('active-player-name').innerHTML = playerOne.name;

}

function twoPlayerOpition(){
    NumberOfPlayers.classList.add('hide'); //klar  
}


//------------------------------------


//------------------------------------
function saveUserInput(){   //till Namn
    let PlayerOneName = document.getElementById('Player-One-Name').value; // dåligt val av namn ,Player-One-Name och player-two-name olika ställen.
    let PlayerTwoName = document.getElementById('Player-Two-Name').value; //tar namnet

    playerOne.name = PlayerOneName;  // Update player namn
    playerTwo.name = PlayerTwoName;

    document.getElementById('player-one-name').innerHTML = PlayerOneName; //placera namn
    document.getElementById('player-two-name').innerHTML = PlayerTwoName;
    TwoOpponentContainer.classList.add('hide');
    console.log(PlayerOneName);
    console.log(PlayerTwoName);
    document.getElementById('active-player-name').innerHTML = playerOne.name;
}

//------------------------------------




//----------------------------------------------------------------------------------------------
function initializeGame() { //starta spelet
    // Blanda korten
    cards.sort(() => Math.random() - 0.5);

    // skapa kort
    for (let card of cards) {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden'); //card och hidden i css
        cardElement.innerText = card;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameContainer.appendChild(cardElement);
    }
}

initializeGame(); //starta spelet

//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
//FlipCard new flip/match
function flipCard(cardElement) {
    // Check if the card is already flipped or matched
    if (!cardElement.classList.contains('matched') && flippedCards.length < 2) {
        cardElement.classList.add('flipped'); // här 
        cardElement.classList.remove('hidden');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 750);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.innerText === card2.innerText) {
        cardOne =  card1.innerText
        cardTwo =  card2.innerText

        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        playerMatchCheck(); //vem fick poäng
        ShowMatchHistory();//History
        console.log(card1.innerText + card2.innerText); 
        
        if (matchedCards.length === cards.length) {
            endGame();
        }
    } 
    else {
        // vänd korten
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        
        // byt spelare
        setNextTurn();
    }

    flippedCards = [];
}

//----------------------------------------------------------------------------------------------
function playerMatchCheck(){// vem ska få poäng 
    if(getActivePlayer() == playerOne){
        playerOne.score += 1;
        document.getElementById('player-one-points').innerHTML = playerOne.score;  
        console.log(playerOne.name + playerOne.score);
    }
    else{
        playerTwo.score += 1;
        document.getElementById('player-two-points').innerHTML = playerTwo.score; 
        console.log(playerTwo.name + playerTwo.score);
    }
}
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
function ShowMatchHistory() {
    if(getActivePlayer() == playerOne){
        let li = document.createElement('li');
        li.textContent = `Spelare ${playerOne.name} hittade ${cardOne}`;
        historyScore.append(li);

    } else {
        let li = document.createElement('li');
        li.textContent = `Spelare ${playerTwo.name} hittade ${cardOne}`;
        historyScore.append(li);
    }
}
// ----------------------------------------------------------------------------------------------



function endGame() {
    if(playerOne.score > playerTwo.score){ 
    alert(`Spelare ${playerOne.name} vinner! med ${playerOne.score} Points`);
    
    }
    else if(playerOne.score < playerTwo.score){
        alert(`Spelare ${playerTwo.name} vinner! med ${playerTwo.score} Points`); // spelare två vann
        
    }
    else
    alert(`Spelare ${playerOne.name} och ${playerTwo.name} fick lika mycket poäng`); 
    
}
