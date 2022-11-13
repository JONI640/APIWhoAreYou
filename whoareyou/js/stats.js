import { stats } from './fragments.js'
export {updateStats, getStats, initState}

let initState = function(what, solutionId) { 
    // Vemos si el objeto que queremos esta en el localStorage
    // Si esta, añadimos el nuevo intento y actualizamos
    let aux = localStorage.getItem(what)
    if(aux != null){      
        return [aux, function(guess) {
            let nuevo = JSON.parse(aux)
            console.log(nuevo)
            nuevo["guesses"].push(guess)
            nuevo["solution"] = solutionId
            localStorage.setItem(what, nuevo)
        }]
    }
    // Si no esta, lo creamos y lo añadimos
    else{
        return [aux, function(guess) {
            let situacion = { "guesses" : [], "solution": solutionId}
            situacion["guesses"].push(guess)
            localStorage.setItem("WAYgameState", situacion)
        }]
    }
}

//Milestone6

function successRate (e){
    return e.successRate
}

let getStats = function(what) {
    // Vemos si el objeto que queremos esta en el localStorage
    // Si esta, lo devolvemos
    let aux = localStorage.getItem(what)
    if(aux == null){      
        let stats = {winDistribution: [0,0,0,0,0,0,0,0,0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            successRate: 0
            }
        localStorage.setItem(what, JSON.stringify(stats))
        return stats
    }
    // Si no esta, lo creamos y lo devolvemos
    else{
        return JSON.parse(aux)
    }   
};

function updateStats(t){
    let aux = JSON.parse(localStorage.getItem('gameStats'))

    if (t >= 8) // Si no acerto, no se actuliza el array de winDistribution
    {
        aux.gamesFailed += 1
        aux.currentStreak = 0
    }
    else // Si acerto, actualiza winDistribution
    {
        aux.winDistribution[t] += 1 // es un array de 9 elementos ?¿
        aux.currentStreak += 1
        if (aux.currentStreak > aux.bestStreak) aux.bestStreak = aux.currentStreak
    }
    //para los dos casos
    aux.totalGames += 1
    aux.successRate = ((aux.winDistribution.reduce((sumaParcial, a) => sumaParcial + a, 0)/aux.totalGames)*100).toFixed(2); //el ultimo simpre sera 0, por lo tanto no afecta
    
    localStorage.setItem('gameStats',JSON.stringify(aux))
};

let gamestats = getStats('gameStats');