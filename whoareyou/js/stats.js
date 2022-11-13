export {initState}

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
            localStorage.setItem(what, JSON.stringify(nuevo))
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
