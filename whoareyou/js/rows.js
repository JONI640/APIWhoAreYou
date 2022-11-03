import { higher, lower, stringToHTML } from "./fragments.js";

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']

const leagueTags = {
    564 : 'es1',
    8 : 'en1',
    82 : 'de1',
    384 : 'it1',
    301 : 'fr1',
}

let setupRows = function (game) {

    function leagueToFlag(leagueId) {
        return leagueTags[leagueId]
    }


    function getAge(dateString) {
        // YOUR CODE HERE
        return new Date().getFullYear() - new Date(dateString).getFullYear();
    }
    
    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        let value = game.solution[theKey];
        if (theKey == 'birthdate') {
            let realDate = getAge(value);
            let userDate = getAge(theValue);
            if (realDate > userDate) return 'higher';
            else if (realDate < userDate) return 'lower';
            else return 'correct';
        }
        if (value == theValue) return 'correct';
        return 'incorrect';
    }

    function showAgeInfo(guess) {
        const guessAge = getAge(guess.birthdate);
        const solutionAge = getAge(game.solution['birthdate']);
        if(guessAge > solutionAge) return lower;
        else if(guessAge < solutionAge) return higher;
        return '';
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}${showAgeInfo(guess)}`
        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE   
        return game.players.find(player => player.id == playerId);
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}

export {setupRows}