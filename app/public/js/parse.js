export {parse}

function parse(input, matches) {
    let first = input.toLowerCase().substring(0,matches[0])
    let second = input.toLowerCase().substring(matches[0],matches[1])
    let third = input.toLowerCase().substring(matches[1],input.length )
    let fPart = {"text": first, "highlight": false}
    let sPart = {"text": second, "highlight": true}
    let tPart = {"text": third, "highlight": false}
    return [fPart,sPart,tPart]
}