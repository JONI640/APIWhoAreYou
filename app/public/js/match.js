export {contain, match}

function contain(s1,s2) {

    return s1.toLowerCase().includes(s2.toLowerCase())
}

function match(s1,s2) {
    let inicio = s1.toLowerCase().search(s2.toLowerCase())
    let fin = inicio + s2.length
    return [inicio,fin]
}