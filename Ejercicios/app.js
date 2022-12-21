import fs from 'fs';
import fetch from 'node-fetch';

/*
    PREGUNTAS

    1.  ¿Qué estamos realizando en la línea 6 ? concretamente, ¿para qué se usa el método fs.mkdirSync?
        Y ¿ el parámetro recursive:true que le hemos pasado ?
        
            -   El método fs.mkdirSync sirve para crear un directorio de manera síncrona. 
                Recibe dos parámetros: 
                    Path    ->  La ruta donde se creará el directorio. Puede ser de tipo string, buffer, etc
                    Options ->  Es un parámetro opcional que describe la forma de crear el directorio. 
                                Por ejemplo, si la opción 'recursive' está marcada a 'true', se podrán crear 
                                subdirectorios de manera recursiva.
        
    2.  En el módulo fs, se ofrecen métodos para la gestión de ficheros. Entender lo que hacen
        algunos es sencillo al leer su nombre. Pero hay otros, que no son tan sencillos de comprender,
        por ejemplo, ¿qué hace el método fs.createWriteStream (línea 17)?

            -   fs.createWriteStream: Permite crear un flujo de escritura con el fin de escribir datos
                en un archivo cuya ruta la pasamos como argumento al método.
    
    3.  Preguntamos sobre la variable res.status que aparece en la línea 16. El código 200 HTTP
        nos indica que todo ha ido correctamente. Otro cógido famoso es 404 HTTP (404: page not
        found). Pero, ¿para qué se utilizan estos otros códigos: 302,401,429, 500? (recuerda el código
        429, aparecerá más veces)

            -   302 Found: Este código de estado se utiliza para indicar que la solicitud ha sido redirigida temporalmente a otra URI.
                Esto se hace a menudo cuando se cambia la dirección de un recurso,
                pero se quiere que los usuarios sigan accediendo a la antigua dirección por un tiempo.
            
            -   401 Unauthorized: Este código de estado se utiliza para indicar que la solicitud
                no puede ser completada debido a que el usuario no ha proporcionado las credenciales necesarias.
                Esto suele ocurrir cuando se requiere autenticación para acceder a un recurso y el usuario no ha proporcionado las credenciales correctas.
            
            -   429 Too Many Requests: Este código de estado se utiliza para indicar que el servidor ha recibido demasiadas solicitudes en un periodo de tiempo determinado.
                Esto puede ser una medida de protección para evitar que el servidor se sobrecargue y deje de responder.
            
            -   500 Internal Server Error: Este código de estado se utiliza para indicar que ha ocurrido un error en el servidor mientras se procesaba la solicitud.
                Esto puede deberse a un problema con el código del servidor o a un problema con el servidor en si.

    
    4.  (Adelantado) ¿Qué hace el método res.body.pipe de la línea 17? (Aclaración: streams, pipe,
        nodejs)

            -   res.body.pipe: Los pipes son formas de conectar dos 'streams' (flujos). Se escribe en un stream a través de la lectura
                del otro stream. En nuestro caso, leemos el contenido de res.body (se trata de un stream de lectura), y lo escribimos
                en el stream de escritura que abrimos mediante el método fs.createWriteStream. De esta forma, en la ruta que le especificamos
                al método fs.createWriteStream, estamos creando un archivo con el contenido de res.body.

*/

const leaguePath  = 'json/leagues';
const countryPath = 'json/nations';
const teamsPath   = 'json/teams';
const playerPath  = 'json/players';

const URL = '';
let intervalId;

const init = () => {
    fs.mkdirSync(leaguePath,  {recursive: true});
    fs.mkdirSync(countryPath, {recursive: true});
    fs.mkdirSync(teamsPath,   {recursive: true});
    fs.mkdirSync(playerPath,  {recursive: true});

    create('leagueImages');
    create('countryFlag');
    create('teamImages');
    createWithInterval('playerImages', 10);
}

const method = {
    leagueImages : {
        url  : function (elem) {
            return `https://playfootball.games/media/competitions/${elem}.png`;
        },
        path : function (elem) {
            return `json/leagues/${elem}.png`;
        },
        file : 'leagues.txt',
    },
    countryFlag : {
        url : function (elem) {
            const encoded = encodeURIComponent(elem);
            return `https://playfootball.games/who-are-ya/media/nations/${encoded}.svg`;
        },
        path: function (elem) {
            return `json/nations/${elem}.svg`;
        },
        file : 'nationalities.txt',
    },
    teamImages : {
        url : function (elem) {
            return `https://cdn.sportmonks.com/images/soccer/teams/${elem%32}/${elem}.png`;
        },
        path: function (elem) {
            return `json/teams/${elem}.png`;
        },
        file : 'teamids.txt',
    },
    playerImages : {
        url : function (elem) {
            return `https://playfootball.games/media/players/${elem%32}/${elem}.png`;
        },
        path: function (elem) {
            return `json/players/${elem}.png`;
        },
        file : 'playerids.txt',
    }
}

const create = (methodName) => {
    if(!method[methodName]) return;
    const { file } = method[methodName];
    
    const rows = getDataFromFile(file);
    rows.forEach((elem, index) => {
        const data = buildData(elem, index, methodName);
        sendRequest(data);
    });
}

const createWithInterval = (methodName, timesPerSecond) => {
    if(!method[methodName]) return;
    const { file } = method[methodName];

    const rows = getDataFromFile(file);
    let row    = 0;

    intervalId = setInterval(() => {
        const data = buildData(rows[row], row, methodName);
        sendRequest(data);

        row ++;
        if(row > rows.length - 1) clearInterval(intervalId);
    }, 1000 / timesPerSecond);
}

const buildData = (elem, index, methodName) => {
    return {
        elem,
        index,
        url  : method[methodName].url(elem),
        path : method[methodName].path(elem)
    }
}

const sendRequest = async (data) => {
    try {
        const response = await fetch(data.url);
        handleResponse(response, data);
    }catch (err) {
        console.log(err);
    }
}

const handleResponse = (response, { elem, index, path }) => {
    if(response.status != 200) {
        console.log(`status: ${response.status} line: ${index} elem: ${elem} not found`);
        return;
    }
    response.body.pipe(fs.createWriteStream(path));
}

const getDataFromFile = (file) => {
    let data = [];
    try{
        data = fs.readFileSync(file, 'utf-8').split('\n');
    }catch(err) {
        console.log(err);
    }finally{
        return data;
    }
}

// init();

const pruebaAPI = () => {
    const key = '010d05e74f3f5bfa0f42de9333e1121e';

    fetch("https://v3.football.api-sports.io/leagues", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": key
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log(err);
        });
}

pruebaAPI();