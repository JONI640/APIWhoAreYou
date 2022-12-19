import fs from 'fs';
import fetch from 'node-fetch'

const writepath = 'json/'

//Esta linea de codigo crea un directorio en el sistema de archivos con el nombre especificado en writepath,
// y si alguno de los directorios en el camino no existe, tambien se creara. Bloquea la ejecucion del codigo
// La opcion recursive: true indica que se deben crear todos los directorios en el camino especificado, si es necesario.
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
                        // La funcion createWriteStream genera un fichero en la direccion writepath, con el nombre del elemento
                        // que estamos sacando del fichero leagues.txt

                        // En este caso concreto, se esta utilizando res.body.pipe() para escribir el cuerpo de la respuesta HTTP
                        // en un archivo de imagen en la ruta especificada por writepath y con el nombre especificado por elem.
                        // Es decir, se esta utilizando para descargar el archivo de imagen a la ubicación especificada en el sistema de archivos del servidor.
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
    // 302 Found: Este código de estado se utiliza para indicar que la solicitud ha sido redirigida temporalmente a otra URI.
    // Esto se hace a menudo cuando se cambia la dirección de un recurso,
    // pero se quiere que los usuarios sigan accediendo a la antigua dirección por un tiempo.
    //
    // 401 Unauthorized: Este código de estado se utiliza para indicar que la solicitud
    // no puede ser completada debido a que el usuario no ha proporcionado las credenciales necesarias.
    // Esto suele ocurrir cuando se requiere autenticación para acceder a un recurso y el usuario no ha proporcionado las credenciales correctas.
    //
    // 429 Too Many Requests: Este código de estado se utiliza para indicar que el servidor ha recibido demasiadas solicitudes en un periodo de tiempo determinado.
    // Esto puede ser una medida de protección para evitar que el servidor se sobrecargue y deje de responder.
    //
    // 500 Internal Server Error: Este código de estado se utiliza para indicar que ha ocurrido un error en el servidor mientras se procesaba la solicitud.
    // Esto puede deberse a un problema con el código del servidor o a un problema con el servidor en si.
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
