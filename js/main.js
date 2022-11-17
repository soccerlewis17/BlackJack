
/*----- constants -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
let masterDeck;

/*----- app's state (variables) -----*/

let shuffledDeck;
let scores = {
    player: 0,
    dealer: 0
};

/*----- cached element references -----*/

let dealerScoreEl = document.querySelector("#dealerScore");
let playerScoreEl = document.querySelector("#playerScore");
let playerCardsEl = document.querySelector(".playerCards");
let dealerCardsEl = document.querySelector(".dealerCards");
let messageEl = document.querySelector(".message");
let playerBtnsEl = document.querySelector(".playerButtons");

/*----- event listeners -----*/

document.querySelector("#dealBtn").addEventListener("click", playRound);
document.querySelector("#resetBtn").addEventListener("click", init);
document.querySelector("#hitBtn").addEventListener("click", playerHit);
document.querySelector("#standBtn").addEventListener("click", dealerHit);

/*----- functions -----*/
init();

function init() {
    scores.player = 0;
    scores.dealer = 0;  
    messageEl.innerText = "Do you have what it takes?"
    playerBtnsEl.style.visibility = 'hidden';
    masterDeck = buildMasterDeck();
    shuffledDeck = getShuffledDeck(); 
    resetCards();
    render();
}

function resetCards() {
    const oldCards = document.querySelectorAll(".card")
        oldCards.forEach(e => e.remove());
}

function playRound() {
    init();
    getShuffledDeck();
    dealPlayer();
    dealDealer();
    render();
}

function winnerMessage() {
    if (scores.player > 21) {
        messageEl.innerText = "Bust!"
    }
    else if (scores.player > scores.dealer || scores.dealer > 21) {
        messageEl.innerText = "Congratulations, you won! I bet you can't do it again though..."
    } else if (scores.player === scores.dealer) {
        messageEl.innerText = "Push"
    } else {
        messageEl.innerText = "Dealer wins. Sorry about your luck."
    }
    render();
}

function render() {
    dealerScoreEl.innerText = scores.dealer;
    playerScoreEl.innerText = scores.player;
}

function dealPlayer() {    

    let newPlayerCardOne = shuffledDeck.pop();
    scores.player += newPlayerCardOne.value;

    let playerCardOneEl = document.createElement('div');
    playerCardOneEl.setAttribute('class', `card ${newPlayerCardOne.face}`);
    playerCardsEl.appendChild(playerCardOneEl);

    let newPlayerCardTwo = shuffledDeck.pop();
    scores.player += newPlayerCardTwo.value;

    let playerCardTwoEl = document.createElement('div');
    playerCardTwoEl.setAttribute('class', `card ${newPlayerCardTwo.face}`);
    playerCardsEl.appendChild(playerCardTwoEl);

    if (scores.player === 21) {
        winnerMessage();
    }
        
    playerBtnsEl.style.visibility = 'visible';
    render();
}

function dealDealer() {    
    let newDealerCardOne = shuffledDeck.pop();  
    scores.dealer += newDealerCardOne.value;
    
    let dealerCardOneEl = document.createElement('div');
    dealerCardOneEl.setAttribute('class', `card ${newDealerCardOne.face}`);
    dealerCardsEl.appendChild(dealerCardOneEl);   
    
    render();            
}

function playerHit() {    
    let newPlayerCard = shuffledDeck.pop();
    scores.player += newPlayerCard.value;


    let playerCardThreeEl = document.createElement('div');
    playerCardThreeEl.setAttribute('class', `card ${newPlayerCard.face}`);
    playerCardsEl.appendChild(playerCardThreeEl);
    
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
        let newDealerCard = shuffledDeck.pop()
        scores.dealer += newDealerCard.value;
        
        let dealerCardTwoEl = document.createElement('div');
        dealerCardTwoEl.setAttribute('class', `card ${newDealerCard.face}`);
        dealerCardsEl.appendChild(dealerCardTwoEl);

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
