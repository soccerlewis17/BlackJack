// hit until the player either stands or busts. I would give the dealer a hit limit of 17, to even out the odds for the player.
// My logic would be something like:
// If player sum = 21, player wins (if in 2 cards)
// If player sum > 21, dealer wins
// If player sum <21 (21 in 3 or more) and player stands, then it's the dealer's turn
//       If dealer sum > player sum, dealer wins
//       If dealer sum >= 17, dealer stands
//       If dealer sum < 17, dealer hits
// If player sum > dealer sum, player wins
// If dealer sum > player sum, dealer wins
// If player sum === dealer sum, "push"
// Then I'd console.log a winning message, losing message or a push message with its effect on the player's money balance. That's also when I'd give the option to deal again. I'd also log a message if the player's account reaches $0 about how they should try another game...




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
let playerCardOneEl = document.querySelector('#playerCardOne');



/*----- event listeners -----*/
document.querySelector('#dealBtn').addEventListener('click', getShuffledDeck);
document.querySelector('#dealBtn').addEventListener('click', dealPlayer);

document.querySelector('#dealBtn').addEventListener('click', dealDealer); // maybe after stand button show the score?

document.querySelector('#hitBtn').addEventListener('click', playerHit);
document.querySelector('#standBtn').addEventListener('click', dealerHit);


/*----- functions -----*/

function init() {
    
    scores.player = 0;
    scores.dealer = 0;


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
    scores.player += shuffledDeck.pop().value
    
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
    cardOne = shuffledDeck.pop();
    cardTwo = shuffledDeck.pop();
    // console.log(cardOne);
    // console.log(cardTwo);

    scores.player = cardOne.value + cardTwo.value;


    playerCardOneEl.setAttribute('class', `card ${cardOne.face}`);
        
    render();
    }

function dealDealer() {    
    cardOne = shuffledDeck.pop();  
    scores.dealer = cardOne.value;
    
    dealerCardOneEl.setAttribute('class', `card ${cardOne.face}`);
        
    render();

    // dealerCardOneEl.innerHTML +=
    // playerCardOneEl.innerHTML += `<div class="card ${cardOne.face}"></div>`
            
    }