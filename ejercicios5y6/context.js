const TOKEN = '965d86bf719448449287eb81a7716b6f';

const loadDB = async () => {
    const res = await fetch('./competitions.json');
    const {competitions} = await res.json();
    return competitions.filter(elem => elem.name != 'Championship'); // ejer35: Se ha anyadido un filtro para eliminar Championship ya que no esta dentro de las 5 grandes ligas
}

const load = async (url) => {
    return fetch(url).then(res => res.json());
}


const ejer31 = (competitions) => {
    const tmp = competitions.filter(elem => elem.id == 2014)
    return tmp;
}

const ejer32 = (competitions) => {
    const tmp = competitions.filter(elem => elem.plan == 'TIER_ONE');
    return tmp;
}

const ejer33 = (competitions) => {
    const tmp = competitions.filter(elem => elem.area.code == 'ESP');
    return tmp;
}

const ejer34 = (competitions) => {
    const paises = ['ESP', 'DEU', 'ENG', 'FRA', 'ITA'];
    const tmp = competitions.filter(elem => paises.includes(elem.area.code) && elem.plan == 'TIER_ONE');
    return tmp;
}

const ejer36 = (competitions) => {
    const filtered = ejer34(competitions);
    const tmp = filtered.map(elem => elem.id);
    return tmp;
}

/////////////////////////////////////////////////////////////////////////////////////////

const ejer51 = ({teams}, name) => {
    console.log(teams);
    const [{squad}] = teams.filter(team => team.name == name);
    console.log(squad);
    return squad;
}

const ejer52 = (players) => {
    const reduced = players.reduce((start, actual) => [...start, actual.name], []);
    console.log(reduced);
    return reduced;
}

const ejer53 = (players, pos) => players[pos];

const ejer54 = (player) => {
    
    const positionNormalize = {
        Offence : "FW",
        Goalkeeper : "GK",
        Midfield : "MF",
        Defence : "DF",
    }

    return {
        id : player.id,
        name : player.name,
        birthdate : player.dateOfBirth,
        nationality : player.nationality,
        leagueID : 0,
        teamID : 0,
        position : positionNormalize[player.position]
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

const differenceInDays = (date1) => {
    const diff = new Date() - date1;
    return Math.floor(diff / (1000*60*60*24));    
}

const fetchJSON = async (file) => {
    return fetch(file).then(res => res.json());
}

window.addEventListener('DOMContentLoaded', async ()=> {
    const competitions = await loadDB();
    const premiere = await load('./premiere.json');

    console.log("Ejercicio 3.1");
    console.log(ejer31(competitions));

    console.log("Ejercicio 3.2");
    console.log(ejer32(competitions));

    console.log("Ejercicio 3.3");
    console.log(ejer33(competitions));

    console.log("Ejercicio 3.4");
    console.log(ejer34(competitions));

    console.log("Ejercicio 3.6");
    console.log(ejer36(competitions));


    console.log("Ejercicio 5.1");
    const arsenal = ejer51(premiere, "Arsenal FC");

    console.log("Ejercicio 5.2");
    ejer52(arsenal)

    console.log("Ejercicio 5.3");
    const player0 = ejer53(arsenal, 0);
    console.log(player0);

    console.log("Ejercicio 5.4");
    console.log(ejer54(player0));

    console.log("Ejercicio 6.1")
    console.log(differenceInDays(new Date(2022,7,22)));

    console.log("Ejercicio 6.2")
    console.log(await fetchJSON('./competitions.json'));

    console.log("Ejercicio 6.3");
    let fullplayers = await fetchJSON('./fullplayers.json');
    let solutions = await fetchJSON('./solution.json');
    console.log(getSolution(fullplayers, solutions, 16))
});

function getSolution(players, solutionArray, differenceInDays) {
    let { id } = solutionArray[differenceInDays - 1];
    return players.find(player => player.id == id);
}