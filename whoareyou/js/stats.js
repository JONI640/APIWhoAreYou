export {initState}

let initState = function(what, solutionId) { 
    // YOUR CODE HERE
    if(localStorage.getItem(what) != null)      
        return [localStorage.getItem(what), function(guess) {
            let nuevo = JSON.parse(localStorage.getItem(what))
            console.log(nuevo)
            nuevo["guesses"].push(guess)
            nuevo["solution"] = solutionId
            localStorage.setItem(what, JSON.stringify(nuevo))
        }]
}
