// I'd like to do a blackjack game. I'd start with a 'deal' button and a total amount to bet from an available balance.
// Then, to play the game, I'd show two cards for the player and one card for the dealer. I would give the player the option to hit or stand, totaling the sum of the cards after each 
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
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));


/*----- app's state (variables) -----*/
let shuffledDeck;
let scores;
let winner;
let cardTotals;

/*----- cached element references -----*/

let dealerScoreEl = document.querySelector('#dealerScore');
let playerScoreEl = document.querySelector('#playerScore');
let dealerCardsEl = document.querySelector('.dealerCards');
let playerCardsEl = document.querySelector('.playerCards');



/*----- event listeners -----*/
document.querySelector('#dealBtn').addEventListener('click', getShuffledDeck);


/*----- functions -----*/

function init() {
    
    scores.player = 0;
    scores.dealer = 0;


    render();
}

function winnerMessage() {
    if (scores.player > scores.dealer) {
        console.log('Congratulations, you won! I bet you cannot do it again though...')
    } else if (scores.player === scores.dealer) {
        console.log('Push')
    } else {
        console.log('Dealer wins. Sorry about your luck.')
    }
    render();
}

function deal() {

}

function hit() {
    
}

function stand() {
}

function render() {
    dealerScoreEl.innerHTML = scores.dealer;
    playerScoreEl.innerHTML = scores.player;

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
    cardOne = shuffledDeck[0];
    cardTwo = shuffledDeck[1];
    

  playerCardsEl.innerHTML += `<div class="card ${card.face}"></div>`
        
    }