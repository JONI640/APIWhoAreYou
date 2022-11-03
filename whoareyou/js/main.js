import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";

function differenceInDays(date1) {
  const diff = new Date() - date1;
  return Math.floor(diff / (1000*60*60*24));    
}

let difference_In_Days = differenceInDays(new Date("08-18-2022"));

window.onload = function () {
  document.getElementById(
    "gamenumber"
  ).innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
  let { id } = solutionArray[(difference_In_Days - 1) % solutionArray.length]; // hago el resto para que nunca salga del rango del array
  return players.find(player => player.id == id);
}

Promise.all([fetchJSON("fullplayers"), fetchJSON("solution")]).then(
  (values) => {

    let solution;
    
    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);
    
    console.log(game.solution);

    document.getElementById(
      "mistery"
    ).src = `https://playfootball.games/media/players/${
      game.solution.id % 32
    }/${game.solution.id}.png`;
  
  }
);
