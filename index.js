const moves = document.querySelectorAll(".move");
const header = document.querySelector(".header");
const result = document.querySelector(".result");
const matchOverview = document.querySelector(".match-overview");
const history = document.querySelector(".entries");
const counters = document.querySelectorAll(".wins,.draws,.losses");
const resetSection = document.querySelector(".reset-and-message");

//for each element in moves add a 'click' event listener that
//generates a random number and invokes update() giving it
//the two moves and victory value as arguments
moves.forEach(element =>
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

//add a 'click' event listener to the reset button that
//deletes or sets back to default the content of history,
//matchOverview, result, counters, and hides the reset button again
resetSection.children[1].addEventListener("click", () => {
  history.textContent = "";
  matchOverview.textContent = "";
  result.textContent = "Let's Play!";
  resetSection.setAttribute("style", "visibility: hidden");
  counters.forEach(element => {
    element.textContent = "0";
    element.setAttribute("style", "visibility: hidden");
  });
});

//if it is a draw return null,
//if the player has won return true,
//if the computer has won return false
function checkVictory(playerMove, computerMove) {
  if (playerMove === computerMove) return null;
  if (computerMove === (playerMove === 0 ? 2 : playerMove - 1)) return true;
  return false;
}

//invokes the functions to update the header, matchOverview and the history footer
//invokes the createEntry function and appends the result to the history
function update(playerWon, playerMove, computerMove) {
  updateHeader(playerWon);
  updateMatchOverview(playerWon, playerMove, computerMove);
  updateHistoryFooter(playerWon);

  history.appendChild(createEntry(playerWon, playerMove, computerMove));
  history.scrollTop = history.scrollHeight;
  if (gameOver()) showReset();
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
    header.setAttribute("style", "gap: 21%");
    return;
  }
  header.setAttribute("style", "gap: 23%");
  if (playerWon) {
    result.textContent = "You win!";
  } else {
    result.textContent = "You lose!";
  }
}

//appends 3 divs to the text overview containing a text showing the result of the match
// and invokes the matchOverviewEffects() function;
function updateMatchOverview(playerWon, playerMove, computerMove) {
  matchOverview.textContent = "";
  matchOverview.appendChild(
    createTextDiv(playerWon ? playerMove : computerMove)
  );
  matchOverview.appendChild(
    createTextDiv(playerWon === null ? "DRAW" : "BEATS")
  );
  matchOverview.appendChild(
    createTextDiv(playerWon ? computerMove : playerMove)
  );
  matchOverviewEffects(playerWon);
}

//changes the text-shadows (borders) of the moves so that the player's move has a green border
//and the computer's move has a red border and gives matchOverview some style attributes that are
//reverted after 1 second with a nice transition set in the css
function matchOverviewEffects(playerWon) {
  matchOverview.children[playerWon !== false ? 0 : 2].setAttribute(
    "style",
    "text-shadow: 2px 2px 0 #008000, 2px -2px 0 #008000, -2px 2px 0 #008000, -2px -2px 0 #008000, 2px 0px 0 #008000, 0px 2px 0 #008000, -2px 0px 0 #008000, 0px -2px 0 #008000, 0px 0px 11px rgba(0,128,0,0);"
  );
  matchOverview.children[playerWon !== false ? 2 : 0].setAttribute(
    "style",
    "text-shadow: 2px 2px 0 #ff0000, 2px -2px 0 #ff0000, -2px 2px 0 #ff0000, -2px -2px 0 #ff0000, 2px 0px 0 #ff0000, 0px 2px 0 #ff0000, -2px 0px 0 #ff0000, 0px -2px 0 #ff0000, 0px 0px 11px rgba(255,0,0,0);"
  );
  matchOverview.setAttribute(
    "style",
    `font-size: 135px; 
    gap: 65px;`
  );
  setTimeout(() => {
    matchOverview.setAttribute("style", "font-size: 100px;");
  }, 1000);
}

//increments the counters in the footer under the history and sets their
//visibility to visible the first time it touches them
function updateHistoryFooter(playerWon) {
  const counter = counters[playerWon === null ? 1 : playerWon ? 0 : 2];
  counter.textContent = +counter.textContent + 1;
  if (counter.getAttribute("style") === "visibility: hidden")
    counter.setAttribute("style", "visibility: visible");
}

//returns true if one of the counters reached 5 before the other
function gameOver() {
  return (
    (counters[0].textContent === "5" && counters[2].textContent < 5) ||
    (counters[2].textContent === "5" && counters[0].textContent < 5)
  );
}

//sets the text above the reset button and shows it
function showReset() {
  resetSection.children[0].textContent =
    counters[0].textContent > counters[2].textContent
      ? "You win!"
      : "You lose!";
  resetSection.setAttribute("style", "visibility: visible");
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
