let board = document.getElementById('gameBoard');
let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues];  
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(value, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;
  card.dataset.value = value;
  
  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  
  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.textContent = value;

  card.appendChild(cardFront);
  card.appendChild(cardBack);

  card.addEventListener('click', flipCard);

  board.appendChild(card);
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === cards.length) {
      setTimeout(() => alert('congratulation! you won this game'), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function startGame() {
  board.innerHTML = '';
  flippedCards = [];
  matchedCards = 0;

  shuffle(cards);

  cards.forEach((value, index) => {
    createCard(value, index);
  });
}
startGame();
