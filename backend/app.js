import fs from 'fs';
import fetch from 'node-fetch'

const writepath = 'json/leagues/'

fs.mkdirSync(writepath, {recursive:true})

try {
    // read leagues file into an array of lines
    let data = fs.readFileSync('leagues.txt', 'utf8').split(" ")

    console.log(data)

    data.forEach( (elem, idx) => {
        const url = `https://playfootball.games/media/competitions/${elem}.png`
        fetch (url)
            .then (res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath}${elem}.png`))
                } else{
                    console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err){
    console.error(err);
}
