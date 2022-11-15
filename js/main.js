
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let shuffledDeck = getShuffledDeck();
let scores = {
    player: 0,
    dealer: 0
};
let winner;
let cardTotals;

/*----- cached element references -----*/

let dealerScoreEl = document.querySelector('#dealerScore');
let playerScoreEl = document.querySelector('#playerScore');

let dealerCardOneEl = document.querySelector('#dealerCardOne');
let dealerCardTwoEl = document.querySelector('#dealerCardTwo');
let playerCardOneEl = document.querySelector('#playerCardOne');
let playerCardTwoEl = document.querySelector('#playerCardTwo');

let playerCardsEl = document.querySelector('.playerCards');



/*----- event listeners -----*/
document.querySelector('#dealBtn').addEventListener('click', init);

document.querySelector('#dealBtn').addEventListener('click', dealDealer); // maybe after stand button show the score?

document.querySelector('#hitBtn').addEventListener('click', playerHit);
document.querySelector('#standBtn').addEventListener('click', dealerHit);


/*----- functions -----*/

function init() {
    
    scores.player = 0;
    scores.dealer = 0;

    getShuffledDeck();
    dealPlayer();
    dealDealer();


    render();
}

function winnerMessage() {
    if (scores.player > 21) {
        console.log('Bust!')
    }
    else if (scores.player > scores.dealer || scores.dealer > 21) {
        console.log('Congratulations, you won! I bet you cannot do it again though...')
    } else if (scores.player === scores.dealer) {
        console.log('Push')
    } else {
        console.log('Dealer wins. Sorry about your luck.')
    }
    render();
}

function playerHit() {    
    let newPlayerCard = shuffledDeck.pop();
    scores.player += newPlayerCard.value;


    let playerCardThreeEl = document.createElement('div');
    playerCardThreeEl.setAttribute('class', `card ${newPlayerCard.face}`);
    playerCardsEl.appendChild(playerCardThreeEl);

// create div?
// set attribute to class stuff
// append child
    
    if (scores.player > 21) {
            return winnerMessage();
        } else if (scores.player === 21) {
            return dealerHit();
        } else {}
    render();
    }

function dealerHit() {
    if (scores.dealer === 21) {
        winnerMessage();
    } else if (scores.dealer > 16) {
        winnerMessage();
    } else { 
        scores.dealer += shuffledDeck.pop().value;
        
        if (scores.dealer > 21) {
            winnerMessage();
        } else if (scores.dealer === 21) {
            winnerMessage();
        } else if (scores.dealer < 17) {
            dealerHit()
        } else {
            winnerMessage();
        }
    } render();
}

function render() {
    dealerScoreEl.innerText = scores.dealer;
    playerScoreEl.innerText = scores.player;

    // playerCardOneEl.

}



function buildMasterDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function getShuffledDeck() {
    const tempDeck = [...masterDeck];
    const shuffledDeck = [];
        while (tempDeck.length) {
         const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
     }
    return shuffledDeck;
    }


function dealPlayer() {    
    playerCardOne = shuffledDeck.pop();
    playerCardTwo = shuffledDeck.pop();
    scores.player = playerCardOne.value + playerCardTwo.value;

    playerCardOneEl.setAttribute('class', `card ${playerCardOne.face}`);
    playerCardTwoEl.setAttribute('class', `card ${playerCardTwo.face}`);
        
    render();
    }

function dealDealer() {    
    dealerCardOne = shuffledDeck.pop();  
    scores.dealer = dealerCardOne.value;
    
    dealerCardOneEl.setAttribute('class', `card ${dealerCardOne.face}`);
    dealerCardTwoEl.setAttribute('src', 'images/background/blue.svg');
        
    render();

    // dealerCardOneEl.innerHTML +=
    // playerCardOneEl.innerHTML += `<div class="card ${cardOne.face}"></div>`
            
    }