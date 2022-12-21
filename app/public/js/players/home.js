import Player from "../components/Player.js";

const $ = (value) => document.querySelector(value);


window.addEventListener('DOMContentLoaded', () => {
    

    $('#buscarBtn').addEventListener('click', handleFindBtn);

})

const handleFindBtn = async e => {
    e.preventDefault();
    
    const playerId = $('#playerId').value;
    if(!playerId) return;
    clean($('#result'));

    const data = await fetch(`/api/players/${playerId}`).then(res => res.json());

    if(!data.ok) {
        $('#playerId').value = '';
        $('#error').innerText = 'No existe ese jugador';
        return;
    }

    $('#error').innerText = '';
    const player = new Player(data.data);
    $('#result').appendChild(player.render());
}

function clean (elem) {
    while(elem.firstChild) {
        elem.removeChild(elem.lastChild);
    }
}

