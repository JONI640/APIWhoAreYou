const $ = (value) => document.querySelector(value);

window.addEventListener('DOMContentLoaded', () => {

    $('#submitBtn').addEventListener('click', handleSubmit);
});

const handleSubmit = e => {
    const data = {
        id: $('#id').value,
        name: $('#name').value,
        birth: $('#birth').value,
        nation: $('#nation').value,
        team: $('#team').value,
        position: $('#position').value,
        number: $('#number').value
    }
    const headerOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch('/api/players/edit', headerOptions)
    .then(res => res.json())
    .then(data => console.log(data));
}