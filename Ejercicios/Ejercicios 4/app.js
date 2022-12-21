//Ejercicio 4
import * as fs from "fs";
import fetch from "node-fetch";
import mongojs from "mongojs"

async function main(data) {
    // Conecta a la base de datos de MongoDB
    const db = mongojs('mongodb://localhost:27017/mydatabase');
    const teamsCollection = db.collection('teams');

    // Itera sobre los identificadores de los equipos
    for (const elem of data) {
        // Hace una llamada a la API para obtener los datos del equipo
        console.log(elem)
        const response = await fetch(`https://v3.football.api-sports.io/teams?id=${elem.newId}`, {
            headers: {
                'X-RapidAPI-Key': '73a6fce586222fe2e731f55c0b63f1d9',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        const teamData = await response.json();

        // Inserta los datos del equipo en la colección "teams" de MongoDB
        teamsCollection.insert(teamData, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
    // Cierra la conexión a la base de datos
    db.close();
}

main(JSON.parse(fs.readFileSync('./json/fullLaliga.json', 'utf8')));