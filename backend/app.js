import fs from 'fs';
import fetch from 'node-fetch'

const writepath = 'json/leagues/'

//Esta linea de codigo crea un directorio en el sistema de archivos con el nombre especificado en writepath,
// y si alguno de los directorios en el camino no existe, tambien se creara. Bloquea la ejecucion del codigo
// La opcion recursive: true indica que se deben crear todos los directorios en el camino especificado, si es necesario.
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
                    // La funcion createWriteStream genera un fichero en la direccion writepath, con el nombre del elemento
                    // que estamos sacando del fichero leagues.txt

                    // En este caso concreto, se esta utilizando res.body.pipe() para escribir el cuerpo de la respuesta HTTP
                    // en un archivo de imagen en la ruta especificada por writepath y con el nombre especificado por elem.
                    // Es decir, se esta utilizando para descargar el archivo de imagen a la ubicación especificada en el sistema de archivos del servidor.
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