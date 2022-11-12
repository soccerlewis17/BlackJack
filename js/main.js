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


let scores = {
}
let winner;

/*----- cached element references -----*/

const shuffledContainer = document.getElementById('shuffled-deck-container');

let dealerScoreEl = document.querySelector('#dealerScore');
let playerScoreEl = document.querySelector('#playerScore');



/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);



/*----- functions -----*/

function init() {
    
    scores.player = 0;
    scores.dealer = 0;


    render();
}

function winnerMessage() {

}

function deal() {

}

function hit() {
    
}

function stand() {
}

function render() {

}

function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }
  
  function renderNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
  }
  
  function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });

    container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();