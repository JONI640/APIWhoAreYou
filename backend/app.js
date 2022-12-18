import fs from 'fs';
import fetch from 'node-fetch'

const writepath = 'json/'

fs.mkdirSync(writepath, {recursive:true})


const getLeagueImages = () => {
    // Get league images from leagues file
    try {
        // read leagues file into an array of lines
        let data = fs.readFileSync('leagues.txt', 'utf8').split(" ")
        data.forEach((elem, idx) => {
            const url = `https://playfootball.games/media/competitions/${elem}.png`
            fetch(url)
                .then(res => {
                    // check status
                    if (res.status === 200) {
                        res.body.pipe(fs.createWriteStream(`${writepath}leagues/${elem}.png`))
                    } else {
                        console.log('Leagues')
                        console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
                    }
                })
                .catch(err => console.log(err))
        })
    } catch (err) {
        console.error(err);
    }
}

const getCountryFlag = () => {
    // Get country flag from nationalities file
    try {
        const data = fs.readFileSync('nationalities.txt', 'utf8').split("\n")
        data.forEach((elem, idx) => {
            const clean = elem.replaceAll(/\r/g, '');
            const clean2 = clean.replaceAll(/\n/g, '');
            const encodedCountryName = encodeURIComponent(clean2);
            const url = `https://playfootball.games/who-are-ya/media/nations/${encodedCountryName}.svg`;

            fetch(url)
                .then(res => {
                    // check status
                    if (res.status === 200) {
                        res.body.pipe(fs.createWriteStream(`${writepath}nations/${clean2}.svg`))
                    } else {
                        console.log('Country images')
                        console.log(`status: ${res.status} line: ${idx} elem: ${clean2} not found`)
                    }
                })
                .catch(err => console.log(err))
        })
    } catch (err) {
        console.error(err);
    }
}


const getTeamImages = () => {
    // Get team images from teamids file
    try {
        const data = fs.readFileSync('teamids.txt', 'utf8').split("\n");
        data.forEach((elem, idx) => {
            const clean = elem.replaceAll(/\r/g, '');
            const url = `https://cdn.sportmonks.com/images/soccer/teams/${elem%32}/${elem}.png`;
            fetch(url)
                .then(res => {
                    // check status
                    if (res.status === 200) {
                        res.body.pipe(fs.createWriteStream(`${writepath}teams/${clean}.png`))
                    } else {
                        console.log('Team IDs')
                        console.log(`status: ${res.status} line: ${idx} elem: ${clean} not found`)
                    }
                })
                .catch(err => console.log(err))
        });
    } catch (err) {
        console.error(err);
    }
}

const getPlayerImages = () => {
    // Get player images from playerids file
    try {
        const data = fs.readFileSync('playerids.txt', 'utf8').split("\n");
        data.forEach((elem, idx) => {
            const clean = elem.replaceAll(/\r/g, '');
            const url = `https://media.api-sports.io/football/players/${elem}.png`;
            fetch(url)
                .then(res => {
                    // check status
                    if (res.status === 200) {
                        res.body.pipe(fs.createWriteStream(`${writepath}players/${elem}.png`))
                    } else {
                        console.log(`status: ${res.status} line: ${idx} elem: ${clean} not found`)
                    }
                })
                .catch(err => console.log(err))
        })
    } catch (err) {
        console.error(err);
    }
}

// getLeagueImages();
// getCountryFlag();
// getTeamImages();

const playerImgagesRequest = (elem, idx) => {
    const url = `https://playfootball.games/media/players/${elem%32}/${elem}.png`;
    fetch(url)
        .then(res => {
            console.log('Request on:', url);
            // check status
            if (res.status === 200) {
                res.body.pipe(fs.createWriteStream(`${writepath}players/${elem}.png`))
            } else {
                console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
            }
        })
        .catch(err => console.log(err))
}
let intervalId;
const sendRequest = ( numberOfRequest, data ) => {
    let actual = 0;
    intervalId = setInterval(() => {
        playerImgagesRequest(data[actual]);
        actual ++;
        console.log(actual);
        if(actual > data.length - 1) {
            console.log(`Eliminando intervalo (actual: ${actual})`);
            clearInterval(intervalId);
        }
    }, 1000 / numberOfRequest);

    
}

const playerImages = () => {
    try {
        const data = fs.readFileSync('playerids.txt', 'utf8').split("\n");
        sendRequest(10, data);
    }catch(err) {
        console.log(err);
    }
}
playerImages();
