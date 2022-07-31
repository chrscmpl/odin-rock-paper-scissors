const moves = document.querySelectorAll(".move");
const header = document.querySelector(".header");
const result = document.querySelector(".result");
const history = document.querySelector(".entries");
const counters = document.querySelectorAll(".wins,.draws,.losses");

//for each element in moves add a 'click' event listener that
//generates a random number and invokes update() giving it
//the two moves and victory value as arguments
moves.forEach((element) =>
  element.addEventListener("click", () => {
    const computerMove = random(3);
    const playerMove = +element.getAttribute("data-value");

    update(
      checkVictory(playerMove, computerMove),
      numberToEmoji(playerMove),
      numberToEmoji(computerMove)
    );
  })
);

//if it is a draw return null,
//if the player has won return true,
//if the computer has won return false
function checkVictory(playerMove, computerMove) {
  if (playerMove === computerMove) return null;
  if (computerMove === (playerMove === 0 ? 2 : playerMove - 1)) return true;
  return false;
}

//invokes the functions to update the header and the history footer
//invokes the createEntry function and appends the result to the history
function update(playerWon, playerMove, computerMove) {
  updateHeader(playerWon);
  updateFooter(playerWon);

  history.appendChild(createEntry(playerWon, playerMove, computerMove));
  history.scrollTop = history.scrollHeight;
}

//creates and returns a div element with class entry and color that
//changes depending on who won, then appends to it the return of createTextDiv()
//first called with playerMove as  argument, and after with computerMove,
//and it also appends a text stating who won in the middle of the two
function createEntry(playerWon, playerMove, computerMove) {
  let entry = document.createElement("div");

  entry.setAttribute("class", "entry");
  entry.setAttribute(
    "style",
    `color: ${playerWon === null ? "blue" : playerWon ? "green" : "red"};`
  );

  entry.appendChild(createTextDiv(playerMove));
  entry.appendChild(
    createTextDiv(playerWon === null ? "draw" : playerWon ? "win" : "loss")
  );
  entry.appendChild(createTextDiv(computerMove));
  return entry;
}

//takes a string as argument and returns a div element containing that string
function createTextDiv(text) {
  let div = document.createElement("div");
  div.textContent = text;
  return div;
}

//changes the textContent of the result text in the header depending
//on who won and changes the gap in the header to center it better
function updateHeader(playerWon) {
  if (playerWon === null) {
    result.textContent = "It's a draw";
    header.setAttribute("style", "gap: 22%");
    return;
  }
  header.setAttribute("style", "gap: 24%");
  if (playerWon) {
    result.textContent = "You win!";
  } else {
    result.textContent = "You lose";
  }
}

//increments the counters in the footer under the history and sets their
//visibility to visible the first time it touches them
function updateFooter(playerWon) {
  const counter = counters[playerWon === null ? 1 : playerWon ? 0 : 2];
  counter.textContent = +counter.textContent + 1;
  if (counter.getAttribute("style") === "visibility: hidden")
    counter.setAttribute("style", "visibility: visible;");
}

//takes a number and returns the corresponding emoji
function numberToEmoji(move) {
  if (move === 0) return "✊";
  if (move === 1) return "🖐";
  if (move === 2) return "✌";
}

//generates a random integer in the range [0, n)
function random(n) {
  return Math.floor(Math.random() * n);
}
